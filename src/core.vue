<script>
import multiple from './fields/multiple'
import util from './util'
import locale from './locale'

const {getLocale} = locale
const {Field} = util

export default {
    name: "VueCronCore",
    props: {
        value: {
            type: String,
            required: true
        },
        locale: {
            type: String,
            default: 'en'
        },
        fields: {
            type: Array,
            default: function() {

                let locale = getLocale(this.locale)

                return [
                    {id: 'minute', items: locale.minuteItems},
                    {id: 'hour', items: locale.hourItems},
                    {id: 'day', items: locale.dayItems},
                    {id: 'month', items: locale.monthItems},
                    {id: 'dayOfWeek', items: locale.dayOfWeekItems},
                ]
            }
        },
        periods: {
            type: Array,
            default: () => {
                return [
                    { text: 'Minute', value: [] },
                    { text: 'Hour', value: ['minute'] },
                    { text: 'Day', value: ['hour', 'minute'] },
                    { text: 'Week', value: ['day', 'hour', 'minute'] },
                    { text: 'Month', value: ['dayOfWeek', 'day', 'hour', 'minute'] },
                    { text: 'Year', value: ['month', 'dayOfWeek', 'day', 'hour', 'minute'] },
                ]
            }
        }
    },
    data(){

        let selected = {}
        for(let field of this.fields){
            selected[field.id] = []
        }

        return {
            selected: selected,
            error: '',
            selectedPeriod: this.periods[this.periods.length-1].value
        }
    },

    computed: {
        splitValue(){
            return this.value.split(' ')
        },
        fieldIndex(){
            return this.fields.reduce((acc, f, i) => {
                acc[f.id] = i
                return acc
            }, {})
        },
        computedFields(){
            return this.fields.map((f) => new Field(f.id, f.items))
        },
        filteredFields(){
            return this.selectedPeriod.map((fieldId) => {
                let i = this.fieldIndex[fieldId]
                return this.computedFields[i]
            })
        }
    },
    
    watch: {
        value: {
            handler: function(value){
                this.cronToSelected(value)
            },
            immediate: true
        },
        selected: {
            handler: function(selected){
                this.selectedToCron(selected)
            },
            deep:true
        },
        selectedPeriod: {
            handler: function(){
                this.selectedToCron(this.selected)
            },
        }
    },

    render(){

        if(!this.$scopedSlots.default){
            return
        }

        let fieldProps = []
        for(let field of this.filteredFields){
            let i = this.fieldIndex[field.id]
            let values = this.selected[field.id]

            let attrs = {
                value: values,
            }
            let events = {
                input: ((fieldId) => (evt) => {
                    console.log('input', fieldId, evt)
                    this.selected[fieldId] = evt
                })(field.id)
            }

            fieldProps.push({
                ...field,
                cron: this.splitValue[i],
                selectedStr: multiple.arrayToStr(values, field).text,
                events,
                attrs
            })
        }

        return this.$scopedSlots.default({
            error: this.error,
            fields: fieldProps,

            periodAttrs: {
                value: this.selectedPeriod
            },
            periodEvents: {
                input: (evt) => {
                    this.selectedPeriod = evt
                }
            },
            periodData: {
                items: this.periods
            },
        })
    },

    methods: {
        defaultValue(){
            return new Array(this.fields.length).fill('*').join(' ')
        },
        cronToSelected(value){
            if(!value){
                this.$emit('input', this.defaultValue())
                return
            }

            if(this.splitValue.length != this.fields.length){
                this.error = 'invalid pattern'
                return
            }
            
            for(var i = 0; i < this.splitValue.length; i++){
                let field = this.computedFields[i]
                if(!this.selectedPeriod.includes(field.id)){
                    continue
                }

                let array = multiple.strToArray(this.splitValue[i], field)
                if(array === null){
                    this.error = 'invalid pattern'
                    return
                }
                this.selected[field.id] = array
            }

            this.error = ''
        },
        selectedToCron(selected){

            let strings = []
            for(let field of this.computedFields){
                if(!this.selectedPeriod.includes(field.id)){
                    strings.push('*')
                    continue
                }
                let array = selected[field.id]
                let str = multiple.arrayToStr(array, field)
                if(str === null){
                    this.error = 'invalid selection'
                    return
                }
                strings.push(str.value)
            }
            this.error = ''
            this.$emit('input', strings.join(' '))
        }
    }
}
</script>
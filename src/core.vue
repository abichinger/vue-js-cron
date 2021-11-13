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
                    {id: 'minute', items: locale.minuteItems, rank: 0},
                    {id: 'hour', items: locale.hourItems, rank: 1},
                    {id: 'day', items: locale.dayItems, rank: 2},
                    {id: 'month', items: locale.monthItems, rank: 4},
                    {id: 'dayOfWeek', items: locale.dayOfWeekItems, rank: 3},
                ]
            }
        },
        ranks: {
            type: Array,
            default: () => {
                return [
                    { text: 'Minute', value: -1 },
                    { text: 'Hour', value: 0 },
                    { text: 'Day', value: 1 },
                    { text: 'Week', value: 2 },
                    { text: 'Month', value: 3 },
                    { text: 'Year', value: 4 },
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
            selectedRank: this.ranks[this.ranks.length-1].value
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
            return this.fields.map((f) => new Field(f.id, f.items, f.rank))
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
        selectedRank: {
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
        for(let field of this.computedFields){
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

            rankAttrs: {
                value: this.selectedRank
            },
            rankEvents: {
                input: (evt) => {
                    this.selectedRank = evt
                }
            },
            rankData: {
                items: this.ranks
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
                if(field.rank > this.selectedRank){
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
                if(field.rank > this.selectedRank){
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
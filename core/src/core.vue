<script>
import {MultipleColumns} from './fields/multiple'
import types from './types'
import locale from './locale'
import util from './util'

const {getLocale, defaultItems, getSuffix, getPrefix} = locale
const {Field} = types

export default {
    name: "VueCronCore",
    props: {
        value: {
            type: String,
            default: '* * * * *'
        },
        locale: {
            type: String,
            default: 'en'
        },
        fields: {
            type: Array,
            default: function() {

                let items = defaultItems(this.locale)

                return [
                    {id: 'minute', items: items.minuteItems},
                    {id: 'hour', items: items.hourItems},
                    {id: 'day', items: items.dayItems},
                    {id: 'month', items: items.monthItems},
                    {id: 'dayOfWeek', items: items.dayOfWeekItems},
                ]
            }
        },
        periods: {
            type: Array,
            default: () => {
                return [
                    { id: 'minute', text: 'Minute', value: [] },
                    { id: 'hour', text: 'Hour', value: ['minute'] },
                    { id: 'day', text: 'Day', value: ['hour', 'minute'] },
                    { id: 'week', text: 'Week', value: ['dayOfWeek', 'hour', 'minute'] },
                    { id: 'month', text: 'Month', value: ['day', 'dayOfWeek', 'hour', 'minute'] },
                    { id: 'year', text: 'Year', value: ['month', 'day', 'dayOfWeek', 'hour', 'minute'] },
                ]
            }
        },
        customLocale: {
            type: Object,
            default: function() {
                return getLocale(this.locale)
            }
        },
        mergeLocale: {
            type: Boolean,
            default: true
        },
        enableEveryAt: {
          type: Boolean,
          default: false
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
            selectedPeriod: this.periods[this.periods.length-1],
            multiple: new MultipleColumns(this.enableEveryAt)
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
        periodIndex(){
            return this.periods.reduce((acc, p, i) => {
                acc[p.id] = i
                return acc
            })
        },
        computedFields(){
            return this.fields.map((f) => new Field(f.id, f.items))
        },
        filteredFields(){
            return this.selectedPeriod.value.map((fieldId) => {
                let i = this.fieldIndex[fieldId]
                return this.computedFields[i]
            })
        },
        computedLocale(){
            if(this.mergeLocale){
                let defaultLocale = getLocale(this.locale)
                return util.deepMerge(defaultLocale, this.customLocale)
            }
            else{
                return this.customLocale
            }
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
        },
        error: {
            handler: function(error){
                this.$emit('error', error)
            }
        },
      enableEveryAt: {
          handler: function(enableEveryAt){
            this.multiple.enableEveryAt = enableEveryAt
          }
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
                    const selected = Array.from(evt).sort((a, b) => { return a > b ? 1 : -1 })
                    this.selected[fieldId] = selected
                })(field.id)
            }

            fieldProps.push({
                ...field,
                cron: this.splitValue[i],
                selectedStr: this.multiple.arrayToStr(values, field).getText(this.computedLocale, this.selectedPeriod.id),
                events,
                attrs,
                prefix: getPrefix(this.computedLocale, this.selectedPeriod.id, field.id),
                suffix: getSuffix(this.computedLocale, this.selectedPeriod.id, field.id)
            })
        }

        return this.$scopedSlots.default({
            error: this.error,
            fields: fieldProps,

            period:{
                attrs:{
                    value: this.selectedPeriod.id
                },
                events:{
                    input: (periodId) => {
                        let i = this.periodIndex[periodId] || 0
                        this.selectedPeriod = this.periods[i]
                    }
                },
                items: this.periods,
                prefix: this.computedLocale.periodPrefix,
                suffix: this.computedLocale.periodSuffix
            }
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
                if(!this.selectedPeriod.value.includes(field.id)){
                    continue
                }

                let array = this.multiple.strToArray(this.splitValue[i], field)
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
                if(!this.selectedPeriod.value.includes(field.id)){
                    strings.push('*')
                    continue
                }
                let array = selected[field.id]
                let str = this.multiple.arrayToStr(array, field)
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

<script>
import multiple from './fields/multiple'
import { Field, Position } from './types'
import { getLocale, defaultItems, Locale } from './locale'
import util from './util'

export default {
  name: 'VueCronCore',
  props: {
    modelValue: {
      type: String,
      default: '* * * * *'
    },
    locale: {
      type: String,
      default: 'en'
    },
    fields: {
      type: Array,
      default: function (props) {
        const items = defaultItems(props.locale)

        return [
          { id: 'minute', items: items.minuteItems },
          { id: 'hour', items: items.hourItems },
          { id: 'day', items: items.dayItems },
          { id: 'month', items: items.monthItems },
          { id: 'dayOfWeek', items: items.dayOfWeekItems }
        ]
      }
    },
    periods: {
      type: Array,
      default: () => {
        return [
          { id: 'minute', value: [] },
          { id: 'hour', value: ['minute'] },
          { id: 'day', value: ['hour', 'minute'] },
          { id: 'week', value: ['dayOfWeek', 'hour', 'minute'] },
          { id: 'month', value: ['day', 'dayOfWeek', 'hour', 'minute'] },
          { id: 'year', value: ['month', 'day', 'dayOfWeek', 'hour', 'minute'] }
        ]
      }
    },
    customLocale: {
      type: Object,
      default: function (props) {
        return null
      }
    },
    mergeLocale: {
      type: Boolean,
      default: true
    }
  },
  emits: ['update:model-value', 'error'],
  data () {
    const selected = {}
    for (const field of this.fields) {
      selected[field.id] = []
    }

    return {
      selected,
      error: '',
      selectedPeriod: this.periods[this.periods.length - 1]
    }
  },

  computed: {
    splitValue () {
      return this.modelValue.split(' ')
    },
    fieldIndex () {
      return this.fields.reduce((acc, f, i) => {
        acc[f.id] = i
        return acc
      }, {})
    },
    periodIndex () {
      return this.periods.reduce((acc, p, i) => {
        acc[p.id] = i
        return acc
      })
    },
    computedFields () {
      return this.fields.map((f) => new Field(f.id, f.items))
    },
    filteredFields () {
      return this.selectedPeriod.value.map((fieldId) => {
        const i = this.fieldIndex[fieldId]
        return this.computedFields[i]
      })
    },
    _loc () {
      if (this.mergeLocale) {
        return getLocale(this.locale, this.customLocale)
      } else {
        return this.customLocale ? new Locale(this.customLocale) : getLocale(this.locale)
      }
    },
    _periods () {
      if (!this.periods) {
        return []
      }
      return this.periods.map(p => {
        return Object.assign({
          text: this._loc.getLocaleStr(p.id, Position.Text)
        }, p)
      })
    }
  },

  watch: {
    modelValue: {
      handler: function (value) {
        this.cronToSelected(value)
      },
      immediate: true
    },
    selected: {
      handler: function (selected) {
        this.selectedToCron(selected)
      },
      deep: true
    },
    selectedPeriod: {
      handler: function () {
        this.selectedToCron(this.selected)
      }
    },
    error: {
      handler: function (error) {
        this.$emit('error', error)
      }
    }
  },

  render () {
    if (!this.$slots || !this.$slots.default) {
      return
    }

    const fieldProps = []
    for (const field of this.filteredFields) {
      const i = this.fieldIndex[field.id]
      const values = this.selected[field.id]

      const attrs = {
        modelValue: values
      }
      const events = {
        'update:model-value': ((fieldId) => (evt) => {
          const selected = Array.from(evt).sort((a, b) => { return a > b ? 1 : -1 })
          this.selected[fieldId] = selected
        })(field.id)
      }

      const cronSegment = multiple.arrayToStr(values, field)
      const segments = Array.isArray(cronSegment.segments) ? cronSegment.segments : [cronSegment]

      const selectedStr = segments.map((seg) => {
        const params = util.populate(seg, field.itemMap)
        params.field = field
        return this._loc.render(this.selectedPeriod.id, field.id, seg.type, Position.Text, params)
      }).join(',')
      const prefix = this._loc.getLocaleStr(this.selectedPeriod.id, field.id, cronSegment.type, Position.Prefix)
      const suffix = this._loc.getLocaleStr(this.selectedPeriod.id, field.id, cronSegment.type, Position.Suffix)

      fieldProps.push({
        ...field,
        cron: this.splitValue[i],
        selectedStr,
        events,
        attrs,
        prefix,
        suffix
      })
    }

    return this.$slots.default({
      error: this.error,
      fields: fieldProps,

      period: {
        attrs: {
          modelValue: this.selectedPeriod.id
        },
        events: {
          'update:model-value': (periodId) => {
            const i = this.periodIndex[periodId] || 0
            this.selectedPeriod = this.periods[i]
          }
        },
        items: this._periods,
        prefix: this._loc.getLocaleStr(this.selectedPeriod.id, Position.Prefix),
        suffix: this._loc.getLocaleStr(this.selectedPeriod.id, Position.Suffix)
      }
    })
  },

  methods: {
    defaultValue () {
      return new Array(this.fields.length).fill('*').join(' ')
    },
    cronToSelected (value) {
      if (!value) {
        this.$emit('update:model-value', this.defaultValue())
        return
      }

      if (this.splitValue.length !== this.fields.length) {
        this.error = 'invalid pattern'
        return
      }

      for (let i = 0; i < this.splitValue.length; i++) {
        const field = this.computedFields[i]
        if (!this.selectedPeriod.value.includes(field.id)) {
          continue
        }

        const array = multiple.strToArray(this.splitValue[i], field)
        if (array === null) {
          this.error = 'invalid pattern'
          return
        }
        this.selected[field.id] = array
      }

      this.error = ''
    },
    selectedToCron (selected) {
      const strings = []
      for (const field of this.computedFields) {
        if (!this.selectedPeriod.value.includes(field.id)) {
          strings.push('*')
          continue
        }
        const array = selected[field.id]
        const str = multiple.arrayToStr(array, field)
        if (str === null) {
          this.error = 'invalid selection'
          return
        }
        strings.push(str.value)
      }
      this.error = ''
      this.$emit('update:model-value', strings.join(' '))
    }
  }
}
</script>

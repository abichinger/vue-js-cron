<script>

export default {
  inheritAttrs: false,
  name: 'RenderlessSelect',
  props: {
    multiple: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: [String, Array, Object],
      default (props) {
        return props.multiple ? [] : null
      }
    },
    items: {
      type: Array,
      default: () => []
    },
    returnObject: {
      type: Boolean,
      default: false
    },
    itemText: {
      type: String,
      default: 'text'
    },
    itemValue: {
      type: String,
      default: 'value'
    },
    cols: {
      type: Number,
      default: 1
    },
    selection: {
      type: String,
      default: ''
    },
    clearable: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:model-value'],
  data () {
    return {
      menu: false
    }
  },
  computed: {
    _value () {
      return (this.multiple) ? this.modelValue : [this.modelValue]
    },
    selectedItems () {
      return this.items.filter((item) => {
        for (const value of this._value) {
          if (this.returnObject) {
            if (value === item) return true
          } else {
            if (value === item[this.itemValue]) return true
          }
        }
        return false
      })
    },
    selectedStr () {
      return this.selection || this.selectedItems.map((item) => item[this.itemText]).join(',')
    },
    rows () {
      return Array.isArray(this.items) ? Math.ceil(this.items.length / this.cols) : 0
    },
    itemRows () {
      return Array.from(Array(this.rows), (_, i) => {
        return Array.from(Array(this.cols), (_, j) => {
          return this.items[this.cols * i + j]
        })
      })
    }
  },
  methods: {
    select (item) {
      if (!item) {
        return
      }

      if (this.multiple) {
        const value = this.selectedItems.slice()
        const i = this.selectedItems.indexOf(item)
        // deselect
        if (i >= 0) {
          value.splice(i, 1)
        } else { // select
          value.push(item)
        }
        this.$emit('update:model-value', (this.returnObject) ? value : value.map((item) => item[this.itemValue]))
      } else {
        this.$emit('update:model-value', (this.returnObject) ? item : item[this.itemValue])
      }
    },
    isSelected (item) {
      return this.selectedItems.includes(item)
    },
    clear () {
      this.$emit('update:model-value', this.multiple ? [] : null)
    }
  },

  render () {
    if (!this.$slots || !this.$slots.default) {
      return
    }

    return this.$slots.default({
      selectedStr: this.selectedStr,
      modelValue: this.modelValue,
      items: this.items,
      select: this.select,
      isSelected: this.isSelected,
      clearable: this.clearable && this.selectedItems.length > 0,
      clear: this.clear,
      cols: this.cols,
      rows: this.rows,
      itemRows: this.itemRows,
      multiple: this.multiple,
      itemText: this.itemText,
      itemValue: this.itemValue
    })
  }
}
</script>

<style>
</style>

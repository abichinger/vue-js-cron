<template>
  <v-chip v-if="true" :density="density" :variant="variant">

    <template #append v-if="clearable">
      <v-icon v-if="selectedItems.length > 0" size="small" icon="mdi-close" @click.stop="clear()">
      </v-icon>
    </template>

    {{selection ? selection : selectedStr}}

    <v-menu activator="parent" :close-on-content-click="closeOnContentClick">
      <v-list class="pa-0 ma-0">
          <v-row v-for="(itemRow, index) in itemRows" :key="index" no-gutters>
            <v-col v-for="(item, index) in itemRow" :key="index">
              <v-list-item v-if="item" @click="select(item)" :active="selectedItems.includes(item)">{{item[itemText]}}</v-list-item>
            </v-col>
          </v-row>
      </v-list>
    </v-menu>
  </v-chip>
</template>

<script>

export default {
  inheritAttrs: false,
  name: 'CustomSelect',
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
    width: {
      type: String,
      default: 'unset'
    },
    variant: {
      type: String,
      default: 'elevated'
    },
    density: {
      type: String,
      default: 'default'
    },
    selection: {
      type: String,
      default: ''
    },
    closeOnContentClick: {
      type: Boolean,
      default: true
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
    listStyle () {
      return {
        display: (this.menu) ? 'inline-block' : 'none',
        minWidth: '5em',
        width: this.width
      }
    },
    listItemStyle () {
      return {
        width: 100 / this.cols + '%'
      }
    },
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
      return this.selectedItems.map((item) => item[this.itemText]).join(',')
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
    menuEvtListener (evt) {
      this.menu = false
      document.removeEventListener('click', this.menuEvtListener)
    },
    toggleMenu () {
      this.menu = !this.menu

      if (this.menu) {
        setTimeout(() => {
          document.addEventListener('click', this.menuEvtListener)
        }, 1)
      } else {
        document.removeEventListener('click', this.menuEvtListener)
      }
    },
    select (item) {
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
    clear () {
      this.$emit('update:model-value', this.multiple ? [] : null)
    }
  }
}
</script>

<style>
</style>

<template>
  <div class="vcron-select-container">
    <span class="vcron-select-input" @click="toggleMenu">
      <slot>{{selectedStr}}</slot>
    </span>
    <span class="vcron-select-list" :style="listStyle">
      <span v-for="item in items"
        :key="item[itemValue]+''"
        class="vcron-select-list-item"
        :class="{'vcron-select-list-item-selected': selectedItems.includes(item)}"
        :style="listItemStyle"
        @click="select(item)"
        @click.stop="multiple ? () => {} : toggleMenu()">

        {{item[itemText]}}
      </span>
    </span>
  </div>
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
    }
  }
}
</script>

<style>

.vcron-select-container {
  display: inline-block;
  position: relative;
  margin: 0 0.2em;
}

.vcron-select-input {
  display: inline-block;
  border-radius: 3px;
  border: 1px solid #ddd;
  background-color: #eee;
  user-select: none;
  padding: 0 0.5em;
}

.vcron-select-input:hover {
  border: 1px solid #ccc;
  background-color: #ddd;
}

.vcron-select-list {
  position: absolute;
  top: 1.8em;
  left: 0px;
  margin: 0;
  padding: 0;
  box-shadow: 2px 2px 3px rgba(0,0,0,0.5);
  border: 1px solid #aaa;
  background-color: #eee;
  list-style: none;
  z-index: 100;
}

.vcron-select-list-item {
  display: inline-block;
  box-sizing: border-box;
  user-select: none;
  width: 100%;
  padding: 0.2em 0.5em;
  text-align: center;
}

.vcron-select-list-item:hover {
  background-color: rgb(52, 147, 190);
  color: white;
}

.vcron-select-list-item-selected {
  background-color: rgb(43, 108, 138);
  color: white;
}

</style>

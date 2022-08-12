<template>
  <renderless-select
    v-bind="$attrs"
    @update:model-value="$emit('update:model-value', $event)"
    #default="{ selectedStr, itemRows, select, isSelected, multiple }">

    <div class="vcron-select-container">
      <span class="vcron-select-input" @click="toggleMenu">
        {{selectedStr}}
      </span>

      <div class="vcron-select-list" v-if="menu">
        <div class="vcron-select-row" v-for="(row, i) in itemRows" :key="i">
          <div v-for="(item, j) in row"
            :key="i+'-'+j"
            class="vcron-select-col"
            :class="{'vcron-select-selected': isSelected(item)}"
            @click="select(item)"
            @click.stop="multiple ? () => {} : toggleMenu()">

            <div v-if="item">{{item.text}}</div>
          </div>
        </div>
      </div>
    </div>
  </renderless-select>
</template>

<script>
import { RenderlessSelect } from '@vue-js-cron/core'

export default {
  inheritAttrs: false,
  components: {
    RenderlessSelect
  },
  name: 'CustomSelect',
  props: {},
  emits: ['update:model-value'],
  data () {
    return {
      menu: false
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
  color: black;
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

.vcron-select-row {
  display: flex;
}

.vcron-select-col {
  flex-grow: 1;
  flex-basis: 0%;
  display: inline-block;
  box-sizing: border-box;
  user-select: none;
  padding: 0.2em 0.5em;
  text-align: center;
  color: black;
}

.vcron-select-col:hover {
  background-color: rgb(52, 147, 190);
  color: white;
}

.vcron-select-selected {
  background-color: rgb(43, 108, 138);
  color: white;
}

.vcron-select-selected:hover {
  background-color: rgb(43, 108, 138);
  color: white;
}

</style>

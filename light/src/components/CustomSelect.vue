<template>
  <div class="vcron-select-container">
    <span class="vcron-select-input" @click="toggleMenu">
      {{ selection ?? selectedStr }}
    </span>

    <div class="vcron-select-list" v-if="menu">
      <div class="vcron-select-row" v-for="(row, i) in itemRows" :key="i">
        <div
          v-for="(item, j) in row"
          :key="i + '-' + j"
          class="vcron-select-col"
          :class="{ 'vcron-select-selected': has(item) }"
          @click="select(item)"
          @click.stop="multiple ? () => {} : toggleMenu()"
        >
          <div v-if="item">{{ item.text }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { selectProps, useSelect } from '@vue-js-cron/core'
import { ref, watch } from 'vue'

export default {
  name: 'CustomSelect',
  props: {
    ...selectProps(),
    modelValue: {
      type: [String, Number, Array],
    },
    selection: {
      type: String,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const s = useSelect(props)
    const menu = ref(false)

    if (props.modelValue) {
      s.setValues(props.modelValue)
    }

    const menuEvtListener = () => {
      menu.value = false
      document.removeEventListener('click', menuEvtListener)
    }
    const toggleMenu = () => {
      menu.value = !menu.value

      if (menu.value) {
        setTimeout(() => {
          document.addEventListener('click', menuEvtListener)
        }, 1)
      } else {
        document.removeEventListener('click', menuEvtListener)
      }
    }

    watch(s.selected, () => {
      emit('update:modelValue', s.selected.value)
    })

    watch(
      () => props.modelValue,
      (value) => {
        s.setValues(value)
      },
    )

    return {
      ...s,
      menu,
      toggleMenu,
    }
  },
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
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.5);
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

<template>
  <div class="vcron-select-container">
    <span
      class="vcron-select-input"
      :class="{ 'vcron-select-disabled': disabled }"
      @click="
        () => {
          if (!disabled) toggleMenu()
        }
      "
      ref="btn"
    >
      {{ selection ?? selectedStr }}

      <span v-if="clearable && !isEmpty" @click="clear">&#x2715;</span>
    </span>

    <div v-if="menu" class="vcron-select-list" :style="floatingStyles" ref="floating">
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

<script lang="ts">
import { autoUpdate, flip, offset, shift, useFloating } from '@floating-ui/vue'
import { selectProps, setupSelect } from '@vue-js-cron/core'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'CustomSelect',
  props: {
    ...selectProps(),
  },
  emits: ['update:model-value'],
  setup(props, ctx) {
    const s = setupSelect<any, any>(props, () => props.modelValue, ctx)
    const btn = ref(null)
    const floating = ref(null)
    const menu = ref(false)

    const { floatingStyles } = useFloating(btn, floating, {
      placement: 'bottom-start',
      middleware: [flip(), shift(), offset(7)],
      whileElementsMounted: autoUpdate,
    })

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

    return {
      ...s,
      menu,
      toggleMenu,
      btn,
      floating,
      floatingStyles,
    }
  },
})
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
  user-select: none;
  padding: 0 0.5em;
  color: black;
}

.vcron-select-disabled {
  background-color: #ccc;
  color: #444;
}

:not(.vcron-select-disabled).vcron-select-input {
  background-color: #eee;
}

:not(.vcron-select-disabled).vcron-select-input:hover {
  border: 1px solid #ccc;
  background-color: #ddd;
}

.vcron-select-list {
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

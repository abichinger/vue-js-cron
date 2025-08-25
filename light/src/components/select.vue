<template>
  <div class="cl-select">
    <span
      class="cl-btn"
      :class="{ disabled: disabled }"
      @click="
        () => {
          if (!disabled) toggleMenu()
        }
      "
      ref="btn"
    >
      {{ selection ?? selectedStr }}

      <span v-if="clearable && !isEmpty" class="cl-btn-clear" @click="clear">&#x2715;</span>
    </span>

    <div v-if="menu" class="cl-menu" :style="floatingStyles" ref="floating">
      <div class="cl-row" v-for="(row, i) in itemRows" :key="i">
        <div
          v-for="(item, j) in row"
          :key="i + '-' + j"
          class="cl-col"
          :class="{ selected: has(item) }"
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
.cl-select {
  display: inline-block;
  position: relative;
  /* margin: 0.2em 0.3em; */
}

.cl-btn {
  display: inline-flex;
  align-items: center;
  color: black;
  background-color: #eee;
  border: 1px solid #ddd;
  border-radius: 3px;
  margin: 0.2em 0.3em;
  padding: 0.1em 0.5em;
  user-select: none;
  min-height: 1.2em;
}

.cl-btn.disabled {
  background-color: #ccc;
  color: #444;
}

.cl-btn:not(.disabled):hover {
  /* border: 1px solid #ccc; */
  background-color: #ddd;
}

.cl-btn-clear {
  font-size: 1.2em;
  margin-left: 3px;
  line-height: 1;
}

.cl-menu {
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.5);
  border: 1px solid #aaa;
  background-color: #eee;
  list-style: none;
  z-index: 100;
}

.cl-row {
  display: flex;
}

.cl-col {
  flex-grow: 1;
  flex-basis: 0%;
  display: inline-block;
  box-sizing: border-box;
  user-select: none;
  padding: 0.2em 0.5em;
  text-align: center;
  color: black;
}

.cl-col:hover {
  background-color: rgb(52, 147, 190);
  color: white;
}

.cl-col.selected {
  background-color: rgb(43, 108, 138);
  color: white;
}

.cl-col.selected:hover {
  background-color: rgb(43, 108, 138);
  color: white;
}
</style>

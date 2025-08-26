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

    <div :style="floatingStyles" ref="floating">
      <transition name="cl-menu">
        <div v-if="menu" class="cl-menu">
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
      </transition>
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
      middleware: [flip(), shift(), offset(3)],
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
  color: var(--cl-text-color, inherit);
  background-color: var(--cl-bg-color, #eee);
  border: var(--cl-border, 1px solid #ddd);
  border-radius: 3px;
  margin: 0.2em 0.3em;
  padding: 0.1em 0.5em;
  user-select: none;
  min-height: 1.2em;
}

.cl-btn.disabled {
  background-color: var(--cl-disabled-bg-color, #ccc);
  color: var(--cl-disabled-text-color, #444);
}

.cl-btn:not(.disabled):hover {
  /* border: 1px solid #ccc; */
  background-color: var(--cl-hover-bg-color, #d6d6d6);
}

.cl-btn-clear {
  font-size: 1.2em;
  margin-left: 3px;
  line-height: 1;
}

.cl-menu {
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.5);
  border: var(--cl-border, 1px solid #ddd);
  background-color: var(--cl-bg-color, #eee);
  list-style: none;
  z-index: 100;
  transform-origin: top left;
}

.cl-menu-enter-active,
.cl-menu-leave-active {
  transition: all 0.1s ease;
}

.cl-menu-enter-from,
.cl-menu-leave-to {
  transform: scaleY(0.7);
  opacity: 0;
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
}

.cl-col:hover {
  background-color: var(--cl-hover-bg-color, #d6d6d6);
  color: var(--cl-hover-text-color, inherit);
}

.cl-col.selected,
.cl-col.selected:hover {
  background-color: var(--cl-selected-bg-color, rgb(43, 108, 138));
  color: var(--cl-selected-text-color, white);
}

/* Dark mode styles */
.dark {
  --cl-text-color: #eee;
  --cl-bg-color: #222;
  --cl-border: 1px solid #444;

  --cl-disabled-bg-color: #333;
  --cl-disabled-text-color: #888;

  --cl-hover-bg-color: #333;

  --cl-selected-bg-color: #0a3041;
  --cl-selected-text-color: #43c3ff;
}

.dark .cl-menu {
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.8);
}
</style>

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
    >
      {{ selection ?? selectedStr }}

      <span v-if="clearable && !isEmpty" @click="clear">&#x2715;</span>
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

<script lang="ts">
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
    const menu = ref(false)

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
    }
  },
})
</script>

<style>
.vcron-select-container {
  display: inline-block;
  position: relative;
  margin: 0 0.125rem;
  width: 100%;
}

.vcron-select-input {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  border: 1px solid #e2e8f0;
  background-color: #ffffff;
  color: #0f172a;
  font-size: 0.875rem;
  user-select: none;
  transition: colors 0.2s, border-color 0.2s, box-shadow 0.2s;
  cursor: pointer;
}

.vcron-select-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}

.vcron-select-disabled {
  background-color: #f1f5f9;
  color: #64748b;
  cursor: not-allowed;
  opacity: 0.5;
}

:not(.vcron-select-disabled).vcron-select-input:hover {
  border-color: #e2e8f0;
  background-color: #f8fafc;
}

.vcron-select-list {
  position: absolute;
  width: 100%;
  top: calc(100% + 0.25rem);
  left: 0;
  margin: 0;
  padding: 0.25rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  background-color: #ffffff;
  color: #0f172a;
  list-style: none;
  z-index: 50;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  animation: fade-in 0.15s ease-out;
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(-0.25rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.vcron-select-row {
  display: flex;
}

.vcron-select-col {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  user-select: none;
  padding: 0.375rem 0.5rem;
  text-align: center;
  font-size: 0.875rem;
  color: #0f172a;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.15s ease, color 0.15s ease;
}

.vcron-select-col:hover {
  background-color: #f1f5f9;
  color: #0f172a;
}

.vcron-select-selected {
  background-color: #0f172a;
  color: #ffffff;
  font-weight: 500;
}

.vcron-select-selected:hover {
  background-color: #0f172a;
  color: #ffffff;
}
</style>

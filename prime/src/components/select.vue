<template>
  <span class="vcron-p-select">
    <!-- HACK: load style of PrimeVue Listbox -->
    <Listbox v-show="false"></Listbox>
    <p-button :disabled="disabled" v-bind="buttonProps" @click="toggle">
      {{ selection ?? selectedStr
      }}<i class="pi pi-times" v-if="clearable && !isEmpty" @click="clear()" @click.stop="" />
    </p-button>

    <p-popover v-bind="popoverProps" ref="popover">
      <div class="vcron-p-row" v-for="(itemRow, i) in itemRows" :key="i">
        <div
          :class="[has(item) ? 'vcron-p-col-selected' : '']"
          class="vcron-p-col"
          :flex="1"
          v-for="(item, j) in itemRow"
          :key="j"
          @click="
            (evt) => {
              if (!item) return
              select(evt, item)
            }
          "
        >
          <template v-if="item">
            {{ item.text }}
          </template>
        </div>
      </div>
    </p-popover>
  </span>
</template>

<script lang="ts">
import { selectProps, setupSelect } from '@vue-js-cron/core'
import { default as PButton, type ButtonProps } from 'primevue/button'
import { usePrimeVue } from 'primevue/config'
import Listbox from 'primevue/listbox'
import { default as PPopover, type PopoverProps } from 'primevue/popover'
import { defineComponent, ref, type PropType } from 'vue'

export default defineComponent({
  inheritAttrs: false,
  name: 'CustomSelect',
  components: {
    PButton,
    PPopover,
    Listbox,
  },
  props: {
    ...selectProps<any, string | number>(),
    buttonProps: {
      type: Object as PropType<ButtonProps>,
      default: () => {},
    },
    popoverProps: {
      type: Object as PropType<PopoverProps>,
      default: () => {},
    },
    hideOnClick: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['update:model-value'],
  setup(props, ctx) {
    const s = setupSelect(props, () => props.modelValue, ctx)
    const popover = ref()
    const primevue = usePrimeVue()
    const prefix: string = primevue.config.theme?.options?.prefix + '-' ?? ''

    const cx = (name: string) => {
      return prefix + name
    }

    const toggle = (evt: Event) => {
      popover.value.toggle(evt)
    }

    const select = (evt: Event, item: any) => {
      if (!item) return
      s.select(item)
      if (props.hideOnClick) {
        toggle(evt)
      }
    }

    return {
      ...s,
      popover,
      toggle,
      cx,
      select,
    }
  },
})
</script>

<style>
.vcron-p-row {
  display: flex;
  flex-wrap: nowrap;
  border: 0px !important;
  box-shadow: none !important;
}

.vcron-p-col {
  flex-basis: 100%;
  min-width: 0;
  text-align: center;
  cursor: pointer;
  overflow: hidden;
  padding: var(--p-listbox-option-padding);
  border: 0 none;
  border-radius: var(--p-listbox-option-border-radius);
  color: var(--p-listbox-option-color);
  transition:
    background var(--p-listbox-transition-duration),
    color var(--p-listbox-transition-duration),
    border-color var(--p-listbox-transition-duration),
    box-shadow var(--p-listbox-transition-duration),
    outline-color var(--p-listbox-transition-duration);
}

.vcron-p-col:not(.vcron-p-col-selected):hover {
  background: var(--p-listbox-option-focus-background);
  color: var(--p-listbox-option-focus-color);
}

.vcron-p-col-selected {
  background: var(--p-listbox-option-selected-background);
  color: var(--p-listbox-option-selected-color);
}
</style>

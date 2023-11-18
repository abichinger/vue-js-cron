<template>
  <span>
    <n-popover v-model:show="show" trigger="click" v-bind="popoverProps" :disabled="disabled">
      <template #trigger>
        <n-button v-bind="buttonProps" icon-placement="right" :disabled="disabled">
          {{ selection ?? selectedStr }}

          <template v-if="clearable && !isEmpty" #icon>
            <n-icon @click="clear">
              <close />
            </n-icon>
          </template>
        </n-button>
      </template>

      <n-grid class="vcron-n-grid" :cols="cols">
        <n-grid-item v-for="item in items" :key="item.vaue">
          <n-tag :checked="has(item)" @updateChecked="select(item)" checkable>
            {{ item.text }}
          </n-tag>
        </n-grid-item>
      </n-grid>
    </n-popover>
  </span>
</template>

<script lang="ts">
import { Close } from '@vicons/ionicons5'
import { selectProps, setupSelect } from '@vue-js-cron/core'
import { NButton, NGrid, NGridItem, NIcon, NPopover, NTag } from 'naive-ui'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  inheritAttrs: false,
  name: 'CustomSelect',
  components: {
    NButton,
    NPopover,
    NGrid,
    NGridItem,
    NTag,
    NIcon,
    Close,
  },
  props: {
    ...selectProps<any, string | number>(),
    buttonProps: {
      type: Object,
      default: () => {},
    },
    popoverProps: {
      type: Object,
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
    const show = ref(false)

    const select = (item: any) => {
      s.select(item)
      if (props.hideOnClick) {
        show.value = false
      }
    }

    return {
      ...s,
      show,
      select,
    }
  },
})
</script>

<style scoped>
.vcron-n-grid .n-tag {
  width: 100%;
  justify-content: center;
}
</style>

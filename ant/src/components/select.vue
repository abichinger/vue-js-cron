<template>
  <span class="custom-select">
    <a-dropdown :trigger="['click']" v-model:visible="visible" v-bind="dropdownProps">
      <a-button v-bind="buttonProps">
        {{ selection ?? selectedStr
        }}<CloseCircleFilled v-if="clearable && !isEmpty" @click="clear()" @click.stop="" />
      </a-button>

      <template #overlay>
        <a-menu multiple :selectedKeys="Array.isArray(modelValue) ? modelValue : [modelValue]">
          <div class="vcron-a-row" type="flex" v-for="(itemRow, i) in itemRows" :key="i">
            <div class="vcron-a-col" :flex="1" v-for="(item, j) in itemRow" :key="j">
              <a-menu-item
                v-if="item"
                :key="item['value']"
                @click="
                  () => {
                    select(item)
                    updateVisibility()
                  }
                "
                >{{ item.text }}</a-menu-item
              >
              <a-menu-item v-else></a-menu-item>
            </div>
          </div>
        </a-menu>
      </template>
    </a-dropdown>
  </span>
</template>

<script lang="ts">
import { CloseCircleFilled } from '@ant-design/icons-vue'
import { selectProps, setupSelect } from '@vue-js-cron/core'
import type { ButtonProps, DropdownProps } from 'ant-design-vue'
import { defineComponent, ref, type PropType } from 'vue'

export default defineComponent({
  inheritAttrs: false,
  components: {
    CloseCircleFilled,
  },
  name: 'CustomSelect',
  props: {
    ...selectProps<any, any>(),
    buttonProps: {
      type: Object as PropType<ButtonProps>,
      default: () => {},
    },
    dropdownProps: {
      type: Object as PropType<DropdownProps>,
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
    const visible = ref(false)

    const updateVisibility = () => {
      if (props.hideOnClick && visible.value) {
        visible.value = false
      }
    }

    return {
      ...s,
      updateVisibility,
      visible,
    }
  },
})
</script>

<style scoped>
.vcron-a-row {
  display: flex;
  flex-wrap: nowrap;
}

.vcron-a-col {
  flex-basis: 100%;
  min-width: 0;
  text-align: center;
}
</style>

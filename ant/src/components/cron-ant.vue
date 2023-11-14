<template>
  <div>
    {{ period.prefix.value }}

    <div class="vcron-a-spacer">
      <custom-select
        :model-value="period.selected.value.id"
        item-value="id"
        :items="period.items"
        @update:model-value="period.select($event)"
        :disabled="disabled"
        :button-props="buttonProps"
      />
    </div>

    {{ period.suffix.value }}

    <template v-for="f in selected" :key="f.id">
      {{ f.prefix.value }}

      <div class="vcron-a-spacer">
        <custom-select
          :model-value="f.selected.value"
          @update:model-value="f.select($event)"
          :items="f.items"
          :cols="cols[f.id] || 1"
          :selection="f.text.value"
          multiple
          clearable
          :disabled="disabled"
          :button-props="buttonProps"
          :dropdown-props="dropdownProps"
          :hideOnClick="false"
        />
      </div>

      {{ f.suffix.value }}
    </template>
  </div>
</template>

<script lang="ts">
import CustomSelect from '@/components/select.vue'
import { cronCoreProps, setupCron } from '@vue-js-cron/core'

import type { ButtonProps, DropdownProps } from 'ant-design-vue'
import { defineComponent, type ExtractPropTypes, type PropType } from 'vue'

export const cronAntProps = () => ({
  /**
   * Properties of Ant Design Vue Button
   *
   * @remarks
   * See {@link https://antdv.com/components/button#api}
   */
  buttonProps: {
    type: Object as PropType<ButtonProps>,
    default() {
      return {}
    },
  },
  /**
   * Properties of Ant Design Vue Dropdown
   *
   * @remarks
   * See {@link https://antdv.com/components/dropdown#api}
   */
  dropdownProps: {
    type: Object as PropType<DropdownProps>,
    default: () => {},
  },
  ...cronCoreProps(),
})

/**
 * Props of {@link CronAnt}
 *
 * See {@link @vue-js-cron/core!CronCoreProps | CronCoreProps} for a detailed description of each prop
 *
 * @interface
 */
export type CronAntProps = Partial<ExtractPropTypes<ReturnType<typeof cronAntProps>>>

export default defineComponent({
  name: 'CronAnt',
  components: {
    CustomSelect,
  },
  props: cronAntProps(),
  emits: ['update:model-value', 'error'],
  setup(props, ctx) {
    return setupCron(props, () => props.modelValue, ctx)
  },
})
</script>

<style lang="css">
.vcron-a-spacer {
  display: inline-block;
  padding: 3px;
}
</style>

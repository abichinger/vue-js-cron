<template>
  <div>
    {{ period.prefix.value }}

    <div class="vcron-n-spacer">
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

      <div class="vcron-n-spacer">
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
import { defineComponent, type ExtractPropTypes } from 'vue'

export const cronNaiveProps = () => ({
  /**
   * Properties of Naive UI Button
   *
   * @remarks
   * See {@link https://www.naiveui.com/en-US/os-theme/components/button#Button-Props}
   */
  buttonProps: {
    type: Object,
    default() {
      return {}
    },
  },
  /**
   * Properties of Naive UI Popover
   *
   * @remarks
   * See {@link https://www.naiveui.com/en-US/os-theme/components/popover#Popover-Props}
   */
  dropdownProps: {
    type: Object,
    default: () => {},
  },
  ...cronCoreProps(),
})

/**
 * Props of {@link CronNaive}
 *
 * See {@link @vue-js-cron/core!CronCoreProps | CronCoreProps} for a detailed description of each prop
 *
 * @interface
 */
export type CronNaiveProps = Partial<ExtractPropTypes<ReturnType<typeof cronNaiveProps>>>

export default defineComponent({
  name: 'CronNaive',
  components: {
    CustomSelect,
  },
  props: cronNaiveProps(),
  emits: ['update:model-value', 'error'],
  setup(props, ctx) {
    return setupCron(props, () => props.modelValue, ctx)
  },
})
</script>

<style lang="css">
.vcron-n-spacer {
  display: inline-block;
  padding: 3px;
}
</style>

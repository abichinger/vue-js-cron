<template>
  <div>
    {{ period.prefix.value }}

    <custom-select
      :model-value="period.selected.value.id"
      item-value="id"
      :items="period.items"
      @update:model-value="period.select($event)"
      :disabled="disabled"
      :button-props="buttonProps"
      :popover-props="popoverProps"
    />

    {{ period.suffix.value }}

    <template v-for="f in selected" :key="f.id">
      {{ f.prefix.value }}

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
        :popover-props="popoverProps"
        :hideOnClick="false"
      />

      {{ f.suffix.value }}
    </template>
  </div>
</template>

<script lang="ts">
import CustomSelect from '@/components/select.vue'
import { cronCoreProps, setupCron } from '@vue-js-cron/core'
import { defineComponent, type ExtractPropTypes } from 'vue'

export const cronPrimeProps = () => ({
  /**
   * Properties of PrimeVue Button
   *
   * @remarks
   * See {@link https://primevue.org/button/#api.button.props}
   */
  buttonProps: {
    type: Object,
    default() {
      return {}
    },
  },
  /**
   * Properties of PrimeVue Popover
   *
   * @remarks
   * See {@link https://primevue.org/popover/#api.popover.props}
   */
  popoverProps: {
    type: Object,
    default: () => {},
  },
  ...cronCoreProps(),
})

/**
 * Props of {@link CronPrime}
 *
 * See {@link @vue-js-cron/core!CronCoreProps | CronCoreProps} for a detailed description of each prop
 *
 * @interface
 */
export type CronPrimeProps = Partial<ExtractPropTypes<ReturnType<typeof cronPrimeProps>>>

export default defineComponent({
  name: 'CronPrime',
  components: {
    CustomSelect,
  },
  props: cronPrimeProps(),
  emits: ['update:model-value', 'update:period', 'error'],
  setup(props, ctx) {
    return setupCron(props, ctx)
  },
})
</script>

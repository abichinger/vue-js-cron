<template>
  <span>
    <span>
      {{ period.prefix.value }}

      <CustomSelect
        :model-value="period.selected.value.id"
        item-value="id"
        :items="period.items"
        @update:model-value="period.select($event)"
        :disabled="disabled"
        :button-props="buttonProps"
        :menu-props="{ autoClose: true }"
      />

      {{ period.suffix.value }}

      <template v-for="f in selected" :key="f.id">
        {{ f.prefix.value }}

        <CustomSelect
          :model-value="f.selected.value"
          @update:model-value="f.select($event)"
          :items="f.items"
          :cols="cols[f.id] || 1"
          :selection="f.text.value"
          multiple
          clearable
          :disabled="disabled"
          :button-props="buttonProps"
        />

        {{ f.suffix.value }}
      </template>
    </span>
  </span>
</template>

<script lang="ts">
import CustomSelect from '@/components/select.vue'
import { cronCoreProps, setupCron } from '@vue-js-cron/core'
import { defineComponent, type ExtractPropTypes } from 'vue'

export const cronQuasarProps = () => ({
  /**
   * Properties of Quasar Button
   *
   * @remarks
   * See {@link https://quasar.dev/vue-components/button#qbtn-api}
   */
  buttonProps: {
    type: Object,
    default() {
      return {
        outline: true,
        rounded: true,
        color: 'primary',
      }
    },
  },
  ...cronCoreProps(),
})

/**
 * Props of {@link CronQuasar}
 *
 * See {@link @vue-js-cron/core!CronCoreProps | CronCoreProps} for a detailed description of each prop
 *
 * @interface
 */
export type CronQuasarProps = Partial<ExtractPropTypes<ReturnType<typeof cronQuasarProps>>>

export default defineComponent({
  name: 'CronQuasar',
  components: {
    CustomSelect,
  },
  props: cronQuasarProps(),
  emits: ['update:model-value', 'error'],
  setup(props, ctx) {
    return setupCron(props, () => props.modelValue, ctx)
  },
})
</script>

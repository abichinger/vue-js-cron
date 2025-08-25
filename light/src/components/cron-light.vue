<template>
  <span class="cron-light">
    <span class="cl-prefix">{{ period.prefix.value }}</span>
    <custom-select
      :model-value="period.selected.value.id"
      item-value="id"
      :items="period.items"
      @update:model-value="period.select($event)"
      :cols="cols['period'] || 1"
      :disabled="disabled"
    />
    <span class="cl-suffix">{{ period.suffix.value }}</span>

    <template v-for="f in selected" :key="f.id">
      <span class="cl-prefix">{{ f.prefix.value }}</span>
      <custom-select
        :model-value="f.selected.value"
        @update:model-value="f.select($event)"
        :items="f.items"
        :cols="cols[f.id] || 1"
        :selection="f.text.value"
        multiple
        clearable
        :disabled="disabled"
      ></custom-select>
      <span class="cl-suffix">{{ f.suffix.value }}</span>
    </template>
  </span>
</template>

<script lang="ts">
import CustomSelect from '@/components/select.vue'
import { cronCoreProps, setupCron } from '@vue-js-cron/core'
import { defineComponent, type ExtractPropTypes } from 'vue'

export const cronLightProps = () => ({
  ...cronCoreProps(),
})

/**
 * Props of {@link CronLight}
 *
 * See {@link @vue-js-cron/core!CronCoreProps | CronCoreProps} for a detailed description of each prop
 *
 * @interface
 */
export type CronLightProps = Partial<ExtractPropTypes<ReturnType<typeof cronLightProps>>>

export default defineComponent({
  name: 'CronLight',
  components: {
    CustomSelect,
  },
  emits: ['update:model-value', 'update:period', 'error'],
  props: cronLightProps(),
  setup(props, ctx) {
    return setupCron(props, ctx)
  },
})
</script>

<style></style>

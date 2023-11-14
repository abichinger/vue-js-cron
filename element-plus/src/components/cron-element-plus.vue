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
    />

    {{ period.suffix.value }}

    <template v-for="f in selected" :key="f.id">
      {{ f.prefix.value }}

      <div class="vcron-el-spacer">
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
          :dropdown-props="{ hideOnClick: false }"
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

export const cronElementPlusProps = () => ({
  /**
   * Properties of Element Plus Button
   *
   * @remarks
   * See {@link https://element-plus.org/en-US/component/button.html#button-attributes}
   */
  buttonProps: {
    type: Object,
    default() {
      return {}
    },
  },
  ...cronCoreProps(),
})

/**
 * Props of {@link CronElementPlus}
 *
 * See {@link @vue-js-cron/core!CronCoreProps | CronCoreProps} for a detailed description of each prop
 *
 * @interface
 */
export type CronElementPlusProps = Partial<
  ExtractPropTypes<ReturnType<typeof cronElementPlusProps>>
>

export default defineComponent({
  name: 'VueCronEditor',
  components: {
    CustomSelect,
  },
  props: cronElementPlusProps(),
  emits: ['update:model-value', 'error'],
  setup(props, ctx) {
    return setupCron(props, () => props.modelValue, ctx)
  },
})
</script>

<style lang="css">
.vcron-el-spacer {
  display: inline-block;
  padding: 3px;
}
</style>

<template>
  <div style="display: inline-block">
    <v-row align="baseline" dense>
      <v-col v-if="period.prefix.value" class="flex-grow-0">{{ period.prefix.value }}</v-col>
      <v-col cols="auto">
        <custom-select
          :model-value="period.selected.value.id"
          item-value="id"
          :items="period.items"
          @update:model-value="period.select($event)"
          :chip-props="chipProps"
        />
      </v-col>
      <v-col v-if="period.suffix.value" class="flex-grow-0">{{ period.suffix.value }}</v-col>

      <template v-for="f in selected" :key="f.id">
        <v-col v-if="f.prefix.value" class="flex-grow-0">{{ f.prefix.value }}</v-col>
        <v-col cols="auto">
          <custom-select
            :model-value="f.selected.value"
            @update:model-value="f.select($event)"
            :items="f.items"
            :cols="cols[f.id] || 1"
            :selection="f.text.value"
            multiple
            clearable
            :chip-props="chipProps"
            :menu-props="{ closeOnContentClick: false }"
          />
        </v-col>
        <v-col v-if="f.suffix.value" class="flex-grow-0">{{ f.suffix.value }}</v-col>
      </template>
    </v-row>
  </div>
</template>

<script lang="ts">
import CustomSelect from '@/components/select.vue'
import { cronCoreProps, setupCron } from '@vue-js-cron/core'
import type { ExtractPropTypes } from 'vue'
import { defineComponent } from 'vue'

export const cronVuetifyProps = () => ({
  /**
   * Properties of Vuetify VChip
   *
   * @remarks
   * See {@link https://vuetifyjs.com/en/api/v-chip/#props}
   */
  chipProps: {
    type: Object,
    default() {
      return {}
    },
  },
  ...cronCoreProps(),
})

/**
 * Props of {@link CronVuetify}
 *
 * See {@link @vue-js-cron/core!CronCoreProps | CronCoreProps} for a detailed description of each prop
 *
 * @interface
 */
export type CronVuetifyProps = Partial<ExtractPropTypes<ReturnType<typeof cronVuetifyProps>>>

export default defineComponent({
  name: 'CronVuetify',
  components: {
    CustomSelect,
  },
  props: cronVuetifyProps(),
  emits: ['update:model-value', 'error'],
  setup(props, ctx) {
    return setupCron(props, () => props.modelValue, ctx)
  },
})
</script>

<style lang="css"></style>

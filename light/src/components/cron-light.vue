
<template>
  <div class="cron-editor vcron-editor">
    
    <div class="fields-grid">
      <div class="cron-section">
        <div class="section-content">
          <span class="prefix-text">{{ period.prefix.value }}</span>
          <div class="select-container">
            <custom-select
              :model-value="period.selected.value.id"
              item-value="id"
              :items="period.items"
              @update:model-value="period.select($event)"
              :cols="cols['period'] || 1"
              :disabled="disabled"
            />
          </div>
          <span class="suffix-text">{{ period.suffix.value }}</span>
        </div>
      </div>
      <div 
        v-for="f in selected" 
        :key="f.id" 
        class="field-section"
      >
        <label class="field-label">{{ f.id }}</label>
        <div class="field-content">
          <div class="select-container">
            <custom-select
              :model-value="f.selected.value"
              @update:model-value="f.select($event)"
              :items="f.items"
              :cols="cols[f.id] || 1"
              :selection="f.text.value"
              multiple
              clearable
              :disabled="disabled"
            />
          </div>
          <!-- <span class="suffix-text" v-if="f.suffix.value">
            {{ f.suffix.value }}
          </span> -->
        </div>
      </div>
    </div>
  </div>
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

<style scoped>
.cron-editor {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 100%;
}


.section-content {
  display: flex;
  flex-direction: column;
  gap: 8px 0;

}

.fields-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}



.field-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  text-transform: capitalize;
  margin-bottom: 0.5rem;
}

.field-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.select-container {
  flex: 1;
  min-width: 150px;
}

.prefix-text,
.suffix-text {
  font-size: 0.875rem;
  color: #6b7280;
  white-space: nowrap;
}

@media (max-width: 640px) {
  .fields-grid {
    grid-template-columns: 1fr;
  }
}
</style>
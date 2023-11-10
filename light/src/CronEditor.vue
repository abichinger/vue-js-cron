<template>
  <span class="vcron-editor">
    <span>{{ period.prefix.value }}</span>
    <div class="vcron-l-spacer">
      <custom-select
        :model-value="period.selected.value.id"
        item-value="id"
        :items="period.items"
        @update:model-value="period.select($event)"
        :cols="cols['period'] || 1"
      />
    </div>
    <span>{{ period.suffix.value }}</span>

    <template v-for="f in selected" :key="f.id">
      <span>{{ f.prefix.value }}</span>
      <div class="vcron-l-spacer">
        <custom-select
          :model-value="f.selected.value"
          @update:model-value="f.select($event)"
          :items="f.items"
          :cols="cols[f.id] || 1"
          :selection="f.text.value"
          multiple
          clearable
        ></custom-select>
      </div>
      <span>{{ f.suffix.value }}</span>
    </template>
  </span>
</template>

<script lang="ts">
import { cronProps, useCron } from '@vue-js-cron/core'
import { defineComponent, watch } from 'vue'
import CustomSelect from './components/CustomSelect.vue'

export default defineComponent({
  name: 'CronLight',
  components: {
    CustomSelect,
  },
  emits: ['update:model-value', 'error'],
  props: {
    ...cronProps,
    cols: {
      type: Object,
      default: () => {
        return {
          second: 5,
          minute: 5,
          hour: 4,
          day: 4,
        }
      },
    },
  },
  setup(props, { emit }) {
    const cron = useCron(props)

    watch(
      () => props.modelValue,
      (value) => {
        if (value) {
          cron.cron.value = value
        }
      },
    )

    watch(cron.cron, (value) => {
      emit('update:model-value', value)
    })

    watch(cron.error, (error) => {
      emit('error', error)
    })

    return {
      ...cron,
    }
  },
})
</script>

<style>
.vcron-l-spacer {
  display: inline-block;
  padding: 3px;
}
</style>

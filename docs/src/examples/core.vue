<script setup>
import { CronCore } from '@vue-js-cron/core'
import { ref } from 'vue'

const expression = ref('0 9 * * *')
</script>

<template>
  <CronCore v-model="expression" v-slot="{ period, fields }">
    <label>
      Period
      <select
        :value="period.attrs.modelValue"
        @change="period.events['update:model-value']($event.target.value)"
      >
        <option v-for="item in period.items" :key="item.id" :value="item.id">
          {{ item.text }}
        </option>
      </select>
    </label>

    <label v-for="field in fields" :key="field.id">
      {{ field.id }}
      <select
        multiple
        @change="
          field.events['update:model-value'](
            Array.from($event.target.selectedOptions, (option) => field.items[option.index].value),
          )
        "
      >
        <option
          v-for="item in field.items"
          :key="item.value"
          :selected="field.attrs.modelValue.includes(item.value)"
        >
          {{ item.text }}
        </option>
      </select>
    </label>
  </CronCore>

  <p>
    <code>{{ expression }}</code>
  </p>
</template>

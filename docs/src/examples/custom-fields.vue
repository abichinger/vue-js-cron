<script setup>
import { defaultItems } from '@vue-js-cron/core'
import { CronLight } from '@vue-js-cron/light'
import '@vue-js-cron/light/dist/light.css'
import { ref } from 'vue'

const { hourItems, minuteItems } = defaultItems('en')
const fields = [
  { id: 'hour', items: hourItems },
  { id: 'minute', items: minuteItems },
]
const periods = [{ id: 'day', value: ['hour', 'minute'] }]
const expression = ref('9 30')
</script>

<template>
  <CronLight v-model="expression" :fields="fields" :periods="periods" />
  <p>
    <code>{{ expression }}</code>
  </p>
</template>

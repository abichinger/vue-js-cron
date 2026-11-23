<script setup>
import { CronLight } from '@vue-js-cron/light'
import '@vue-js-cron/light/dist/light.css'
import { ref } from 'vue'

const expression = ref('0 9 * * *')
const periods = [
  { id: 'day', value: ['hour', 'minute'] },
  { id: 'month', value: ['day', 'hour', 'minute'] },
]
</script>

<template>
  <CronLight v-model="expression" :periods="periods" />
  <p>
    <code>{{ expression }}</code>
  </p>
</template>

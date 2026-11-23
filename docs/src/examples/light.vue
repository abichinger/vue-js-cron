<script setup>
import { CronLight } from '@vue-js-cron/light'
import '@vue-js-cron/light/dist/light.css'
import { ref } from 'vue'

const expression = ref('0 9 * * 1-5')
</script>

<template>
  <CronLight v-model="expression" />
  <p>
    <code>{{ expression }}</code>
  </p>
</template>

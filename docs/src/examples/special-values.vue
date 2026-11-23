<script setup>
import { CronLight } from '@vue-js-cron/light'
import '@vue-js-cron/light/dist/light.css'
import { ref } from 'vue'

const expression = ref('0 0 9 LW * ?')
</script>

<template>
  <CronLight v-model="expression" format="quartz" period="month" />
  <p>
    <code>{{ expression }}</code>
  </p>
</template>

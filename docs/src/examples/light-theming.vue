<script setup>
import { CronLight } from '@vue-js-cron/light'
import '@vue-js-cron/light/dist/light.css'
import { ref } from 'vue'

const expression = ref('0 9 * * 1-5')
</script>

<template>
  <p>Ant</p>
  <CronLight v-model="expression" />

  <p>Legacy</p>
  <CronLight v-model="expression" theme="legacy" />
</template>

<template>
  <div id="app">
    <CronQuasar v-model="expr" />
    <div class="q-ma-md">{{ expr }}</div>
  </div>
</template>

<script setup lang="ts">
import CronQuasar from '@/components/cron-quasar.vue'
import { ref } from 'vue'

const expr = ref('* * * * *')
</script>

<template>
  <div id="app">
    <CronQuasar v-model="expr" />
    <div class="q-ma-md">{{ expr }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CronQuasar from './components/CronQuasar.vue'

const expr = ref('* * * * *')
</script>

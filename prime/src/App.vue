<template>
  <div id="app">
    <CronPrime v-model="value" />
  </div>
</template>

<script lang="ts" setup>
import CronPrime from '@/components/cron-prime.vue'
import { ref } from 'vue'

const value = ref('* * * * *')
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>

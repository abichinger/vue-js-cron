<template>
  <n-config-provider :theme="theme">
    <App />
  </n-config-provider>
</template>

<script setup lang="ts">
import { NConfigProvider, darkTheme, lightTheme } from 'naive-ui'
import App from './App.vue'
import { prefersDark } from './util'

const theme = prefersDark() ? darkTheme : lightTheme
</script>

<style>
.cron-demo p {
  margin-top: 1rem;
}
</style>

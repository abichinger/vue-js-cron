<template>
  <div>
    <cron-light
      v-model="value"
      v-model:period="period"
      format="crontab"
      :locale="locale"
      :key="locale"
      @error="error = $event"
    >
    </cron-light>
    <div>
      <br />
      cron expression: <input :value="value" @change="updateValue" />
    </div>
    <br />
    Error: {{ error }}
    <div style="margin-top: 1em">
      <button @click="toggleDarkMode" class="cl-btn">
        Switch to {{ isDark ? 'Light' : 'Dark' }} Mode
      </button>
      <button @click="switchLocale" class="cl-btn">Locale: {{ locale }}</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import CronLight from '@/components/cron-light.vue'
import { ref, watch } from 'vue'

const value = ref(undefined)
const period = ref('month')
const error = ref('')
const isDark = ref(false)
const locale = ref('en')

watch(value, (value) => {
  console.log('value changed: ' + value)
})
watch(period, (value) => {
  console.log('period changed: ' + value)
})

function updateValue(evt: any) {
  value.value = evt.target.value
}

function toggleDarkMode() {
  const body = document.querySelector('body')
  isDark.value = body?.classList.toggle('dark') ?? false
}

function switchLocale() {
  const locales = ['en', 'de']
  const i = (locales.indexOf(locale.value) + 1) % locales.length
  locale.value = locales[i]
}
</script>

<style>
body {
  font-family: sans-serif;
}

body.dark {
  color: #f0f6fc;
  background-color: #0d1117;
}
</style>

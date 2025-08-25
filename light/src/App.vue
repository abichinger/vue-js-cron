<template>
  <div>
    <cron-light
      v-model="value"
      v-model:period="period"
      format="crontab"
      locale="en"
      @error="error = $event"
    >
    </cron-light>
    <div>
      <br />
      cron expression: <input :value="value" @change="updateValue" />
    </div>
    <br />
    Error: {{ error }}
    <div>
      <button @click="toggleDarkMode" class="cl-btn" style="margin-top: 1em">
        Switch to {{ isDark ? 'Light' : 'Dark' }} Mode
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import CronLight from '@/components/cron-light.vue'

export default {
  components: {
    CronLight,
  },
  data: () => {
    return {
      value: undefined,
      period: 'month',
      error: '',
      isDark: false,
    }
  },
  watch: {
    value: function (value) {
      console.log('value changed: ' + value)
    },
    period: function (value) {
      console.log('period changed: ' + value)
    },
  },
  methods: {
    updateValue(evt: any) {
      this.value = evt.target.value
    },
    toggleDarkMode() {
      const body = document.querySelector('body')
      this.isDark = body?.classList.toggle('dark') ?? false
    },
  },
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

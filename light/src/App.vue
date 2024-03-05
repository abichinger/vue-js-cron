<template>
  <div>
    <cron-light
      v-model="value"
      v-model:period="period"
      format="quartz"
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
      value: '* * * * * *',
      period: 'month',
      error: '',
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
  },
}
</script>

<style>
.vcron-editor {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
}
</style>

<template>
  <div>
    <VueCronEditor
      v-model="value"
      initial-period="month"
      format="quartz"
      locale="en"
      @error="error = $event"
    >
    </VueCronEditor>
    <div>
      <br />
      cron expression: <input :value="value" @change="updateValue" />
    </div>
    <br />
    Error: {{ error }}
  </div>
</template>

<script>
import VueCronEditor from '../src/CronEditor'

export default {
  components: {
    VueCronEditor,
  },
  data: () => {
    return {
      value: '* * * * * *',
      error: '',
    }
  },
  methods: {
    updateValue(evt) {
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

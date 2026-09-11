<template>
  <div>
    <div class="mb-2">{{ value }}</div>
    <CronLight v-model="value" :fields="fields" @error="error = $event" />
  </div>
</template>

<script>
import { DefaultCronOptions, withSpecialDays } from '@vue-js-cron/core'

const locale = 'en'

export default {
  data() {
    return {
      value: '0 0 L * *',
      error: '',
      fields: new DefaultCronOptions()
        .fields('crontab', locale)
        .map((field) => (field.id === 'day' ? withSpecialDays(field) : field)),
    }
  },
}
</script>

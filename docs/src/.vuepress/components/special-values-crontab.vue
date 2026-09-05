<template>
  <div>
    <div class="mb-2">{{ value }}</div>
    <CronLight v-model="value" :fields="fields" @error="error = $event" />
  </div>
</template>

<script>
import { createL10n, DefaultCronOptions, withSpecialDays } from '@vue-js-cron/core'

const locale = 'en'
const l10n = createL10n(locale)

export default {
  data() {
    return {
      value: '0 0 L * *',
      error: '',
      fields: new DefaultCronOptions()
        .fields('crontab', locale, l10n)
        .map((field) => (field.id === 'day' ? withSpecialDays(field, l10n) : field)),
    }
  },
}
</script>

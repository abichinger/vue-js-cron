<template>
  <div>
    <div class="mb-2">{{value}}</div>
    <CronLight
      v-model="value"
      :periods="periods"
      :fields="fields"
      @error="error=$event"
      :custom-locale="customLocale" />
  </div>
</template>

<script>

import core from '@vue-js-cron/core'
const { locale, util } = core

export default {
  data () {
    const defaultItems = locale.defaultItems('en')

    return {
      value: '* * * * *',
      error: '',
      periods: [
        { id: 'year', text: 'year', value: ['month', 'day', 'hour', 'minute', 'second'] },
        { id: 'hour', text: 'hour', value: ['minute', 'second'] },
        { id: 'minute', text: 'minute', value: ['second'] },
        { id: 'second', text: 'second', value: [] }
      ],
      fields: [
        { id: 'second', items: util.genItems(0, 59) },
        { id: 'minute', items: defaultItems.minuteItems },
        { id: 'hour', items: defaultItems.hourItems },
        { id: 'day', items: defaultItems.dayItems },
        { id: 'month', items: defaultItems.monthItems }
      ],
      customLocale: {
        eachPeriod: {
          secondField: {
            prefix: ':'
          }
        },
        hourPeriod: {
          minuteField: {
            prefix: 'at',
            suffix: '',
            empty: 'every minute'
          }
        },
        minutePeriod: {
          secondField: {
            prefix: 'at',
            suffix: 'second(s)',
            empty: 'every'
          }
        }
      }
    }
  }
}
</script>

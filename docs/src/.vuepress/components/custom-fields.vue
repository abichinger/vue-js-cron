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

import { defaultItems, genItems, pad } from '@vue-js-cron/core';

export default {
  data () {
    const items = defaultItems('en')

    return {
      value: '* * * * *',
      error: '',
      periods: [
        { id: 'year', value: ['month', 'day', 'hour', 'minute', 'second'] },
        { id: 'hour', value: ['minute', 'second'] },
        { id: 'minute', value: ['second'] },
        { id: 'second', value: [] }
      ],
      fields: [
        { id: 'second', items: genItems(0, 59, (value) => pad(value, 2)) },
        { id: 'minute', items: items.minuteItems },
        { id: 'hour', items: items.hourItems },
        { id: 'day', items: items.dayItems },
        { id: 'month', items: items.monthItems }
      ],
      customLocale: {
        '*': {
          second: {
            '*': {
              prefix: ':'
            }
          }
        },
        hour: {
          minute: {
            '*': {
              prefix: 'at',
              suffix: ''
            },
            empty: {
              text: 'every minute'
            }
          }
        },
        minute: {
          second: {
            '*': {
              prefix: 'at',
              suffix: 'second(s)'
            },
            empty: {
              text: 'every'
            }
          }
        },
        second: {
          text: 'Second'
        }
      }
    }
  }
}
</script>

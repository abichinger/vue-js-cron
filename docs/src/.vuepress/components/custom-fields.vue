<template>
  <div>
    <div class="mb-2">{{value}}</div>
    <CronLight
      v-model="value"
      :periods="periods"
      :fields="fields"
      @error="error=$event"
      :custom-locale="customLocale"
      :cols="cols" />
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
        { id: 'year', value: ['month', 'day', 'hour', 'minute', 'second'] },
        { id: 'hour', value: ['minute', 'second'] },
        { id: 'minute', value: ['second'] },
        { id: 'second', value: [] }
      ],
      fields: [
        { id: 'second', items: util.genItems(0, 59, (value) => util.pad(value, 2)) },
        { id: 'minute', items: defaultItems.minuteItems },
        { id: 'hour', items: defaultItems.hourItems },
        { id: 'day', items: defaultItems.dayItems },
        { id: 'month', items: defaultItems.monthItems }
      ],
      cols (fieldId) {
        if (fieldId === 'minute') return 5
        else if (fieldId === 'hour') return 4
        else if (fieldId === 'day') return 4
        else if (fieldId === 'second') return 3
        else return 1
      },
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

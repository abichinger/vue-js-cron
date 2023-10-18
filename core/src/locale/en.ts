import type { Localization } from './types'

const locale: Localization = {
  '*': {
    prefix: 'Every',
    suffix: '',
    text: 'Unknown',
    '*': {
      empty: { text: 'every {{field.id}}' },
      value: { text: '{{value.text}}' },
      range: { text: '{{start.text}}-{{end.text}}' },
      everyX: { text: 'every {{every.value}}' }
    },
    month: {
      '*': { prefix: 'in' },
      value: { text: '{{value.alt}}' },
      range: { text: '{{start.alt}}-{{end.alt}}' }
    },
    day: {
      '*': { prefix: 'on' }
    },
    dayOfWeek: {
      '*': { prefix: 'on' },
      empty: { text: 'every day of the week' },
      value: { text: '{{value.alt}}' },
      range: { text: '{{start.alt}}-{{end.alt}}' }
    },
    hour: {
      '*': { prefix: 'at' }
    },
    minute: {
      '*': { prefix: ':' }
    }
  },
  minute: {
    text: 'Minute'
  },
  hour: {
    text: 'Hour',
    minute: {
      '*': {
        prefix: 'at',
        suffix: 'minute(s)'
      },
      empty: { text: 'every' }
    }
  },
  day: {
    text: 'Day'
  },
  week: {
    text: 'Week'
  },
  month: {
    text: 'Month',
    dayOfWeek: {
      '*': { prefix: 'and' }
    }
  },
  year: {
    text: 'Year',
    dayOfWeek: {
      '*': { prefix: 'and' }
    }
  }
}

export default locale

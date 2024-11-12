import type { Localization } from './types'

const locale: Localization = {
  '*': {
    prefix: 'Hver',
    suffix: '',
    text: 'Ukendt',
    '*': {
      value: { text: '{{value.text}}' },
      range: { text: '{{start.text}}-{{end.text}}' },
      everyX: { text: 'hver {{every.value}}' },
    },
    month: {
      '*': { prefix: 'i' },
      // TODO: translate to danish
      empty: { text: 'every month' },
      value: { text: '{{value.alt}}' },
      range: { text: '{{start.alt}}-{{end.alt}}' },
    },
    day: {
      '*': { prefix: 'på' },
      // TODO: translate to danish
      empty: { text: 'every day' },
    },
    dayOfWeek: {
      '*': { prefix: 'på' },
      empty: { text: 'hver dag i ugen' },
      value: { text: '{{value.alt}}' },
      range: { text: '{{start.alt}}-{{end.alt}}' },
    },
    hour: {
      '*': { prefix: 'klokken' },
      // TODO: translate to danish
      empty: { text: 'every hour' },
    },
    minute: {
      '*': { prefix: ':' },
      // TODO: translate to danish
      empty: { text: 'every minute' },
    },
    second: {
      '*': { prefix: ':' },
      // TODO: translate to danish
      empty: { text: 'every second' },
    },
  },
  minute: {
    text: 'Minut',
  },
  hour: {
    text: 'Time',
    minute: {
      '*': {
        prefix: 'på de(t)',
        suffix: 'minutter',
      },
      empty: { text: 'hver' },
    },
  },
  day: {
    text: 'Dag',
  },
  week: {
    text: 'Uge',
  },
  month: {
    text: 'Måned',
    dayOfWeek: {
      '*': { prefix: 'og' },
    },
  },
  year: {
    text: 'År',
    dayOfWeek: {
      '*': { prefix: 'og' },
    },
  },

  // quartz format
  // TODO: translate to danish
  'q-second': {
    text: 'Second',
  },
  'q-minute': {
    text: 'Minute',
    second: {
      '*': {
        prefix: 'at',
        suffix: 'second(s)',
      },
      empty: { text: 'every' },
    },
  },
  'q-hour': {
    text: 'Hour',
    minute: {
      '*': {
        prefix: 'at',
      },
    },
  },
}

export default locale

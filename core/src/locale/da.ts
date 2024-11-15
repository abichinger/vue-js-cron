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
      empty: { text: 'hver måned' },
      value: { text: '{{value.alt}}' },
      range: { text: '{{start.alt}}-{{end.alt}}' },
    },
    day: {
      '*': { prefix: 'og' },
      empty: { text: 'hver dag i måneden' },
      value: { text: '{{value.alt}}.' },
      range: { text: '{{start.alt}}.-{{end.alt}}.' },
      noSpecific: {
        text: 'ingen specifik dag',
      },
    },

    dayOfWeek: {
      '*': { prefix: 'på' },
      empty: { text: 'hver dag i ugen' },
      value: { text: '{{value.alt}}' },
      range: { text: '{{start.alt}}-{{end.alt}}' },
      noSpecific: {
        text: 'ingen specifik dag i ugen',
      },
    },
    hour: {
      '*': { prefix: 'klokken' },
      empty: { text: 'hver time' },
    },
    minute: {
      '*': { prefix: ':' },
      empty: { text: 'hvert minut' },
    },
    second: {
      '*': { prefix: ':' },
      empty: { text: 'hvert sekund' },
    },
  },
  second: {
    prefix: 'Hvert',
  },
  minute: {
    prefix: 'Hvert',
    text: 'Minut',
  },
  hour: {
    text: 'Time',
    minute: {
      '*': {
        prefix: 'ved',
        suffix: 'minutter',
      },
      empty: { text: 'alle' },
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
    prefix: 'Hvert',
    text: 'År',
    dayOfWeek: {
      '*': { prefix: 'og' },
    },
  },

  // quartz format
  // TODO: translate to danish
  'q-second': {
    text: 'Sekund',
  },
  'q-minute': {
    text: 'Minut',
    second: {
      '*': {
        suffix: 'sekund(er)',
      },
      empty: { text: 'hvert' },
    },
  },
  'q-hour': {
    text: 'Time',
    minute: {
      '*': {
        prefix: 'på',
      },
    },
  },
}

export default locale

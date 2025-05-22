import type { Localization } from './types'

const locale: Localization = {
  '*': {
    prefix: 'Hver',
    suffix: '',
    text: 'Ukendt',
    '*': {
      value: { text: '{{value.text}}' },
      range: { text: '{{start.text}}-{{end.text}}' },
      step: { text: 'hver {{step.value}}' },
    },
    month: {
      '*': { prefix: 'i' },
      any: { text: 'hver måned' },
      value: { text: '{{value.alt}}' },
      range: { text: '{{start.alt}}-{{end.alt}}' },
    },
    day: {
      '*': { prefix: 'og' },
      any: { text: 'hver dag i måneden' },
      value: { text: '{{value.alt}}.' },
      range: { text: '{{start.alt}}.-{{end.alt}}.' },
      noSpecific: {
        text: 'ingen specifik dag',
      },
    },

    dayOfWeek: {
      '*': { prefix: 'på' },
      any: { text: 'hver dag i ugen' },
      value: { text: '{{value.alt}}' },
      range: { text: '{{start.alt}}-{{end.alt}}' },
      noSpecific: {
        text: 'ingen specifik dag i ugen',
      },
    },
    hour: {
      '*': { prefix: 'klokken' },
      any: { text: 'hver time' },
    },
    minute: {
      '*': { prefix: ':' },
      any: { text: 'hvert minut' },
    },
    second: {
      '*': { prefix: ':' },
      any: { text: 'hvert sekund' },
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
      any: { text: 'alle' },
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
  'q-second': {
    text: 'Sekund',
  },
  'q-minute': {
    text: 'Minut',
    second: {
      '*': {
        suffix: 'sekund(er)',
      },
      any: { text: 'hvert' },
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

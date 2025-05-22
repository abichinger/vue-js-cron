import type { Localization } from './types'

const locale: Localization = {
  '*': {
    prefix: 'Jede',
    suffix: '',
    text: 'Unknown',
    '*': {
      value: { text: '{{value.text}}' },
      range: { text: '{{start.text}}-{{end.text}}' },
      step: { text: 'alle {{step.value}}' },
    },
    month: {
      '*': { prefix: 'im' },
      any: {
        prefix: 'in',
        text: 'jedem Monat',
      },
      value: { text: '{{value.alt}}' },
      range: { text: '{{start.alt}}-{{end.alt}}' },
    },
    day: {
      '*': { prefix: 'den' },
      any: {
        prefix: 'an',
        text: 'jedem Tag',
      },
      step: {
        prefix: '',
        text: 'alle {{step.value}} Tage',
      },
      noSpecific: {
        prefix: 'an',
        text: 'keinem bestimmten Tag',
      },
    },
    dayOfWeek: {
      '*': { prefix: 'am' },
      any: {
        prefix: 'an',
        text: 'jedem Wochentag',
      },
      value: { text: '{{value.alt}}' },
      range: { text: '{{start.alt}}-{{end.alt}}' },
      noSpecific: {
        prefix: 'und',
        text: 'keinem bestimmten Wochentag',
      },
    },
    hour: {
      '*': { prefix: 'um' },
      any: {
        prefix: 'zu',
        text: 'jeder Stunde',
      },
      step: {
        prefix: '',
        text: 'alle {{step.value}} Stunden',
      },
    },
    minute: {
      '*': { prefix: ':' },
      any: { text: 'jede Minute' },
      step: {
        prefix: '',
        text: 'alle {{step.value}} Minuten',
      },
    },
    second: {
      '*': { prefix: ':' },
      any: { text: 'jede Sekunde' },
      step: {
        prefix: '',
        text: 'alle {{step.value}} Sekunden',
      },
    },
  },
  minute: {
    text: 'Minute',
  },
  hour: {
    text: 'Stunde',
    minute: {
      '*': {
        prefix: 'zu',
        suffix: 'Minute(n)',
      },
      any: { text: 'jeder' },
    },
  },
  day: {
    prefix: 'Jeden',
    text: 'Tag',
  },
  week: {
    text: 'Woche',
  },
  month: {
    prefix: 'Jedes',
    text: 'Monat',
  },
  year: {
    prefix: 'Jedes',
    text: 'Jahr',
  },

  //quartz format
  'q-second': {
    text: 'Sekunde',
  },
  'q-minute': {
    text: 'Minute',
    second: {
      '*': {
        prefix: 'und',
      },
    },
  },
  'q-hour': {
    text: 'Stunde',
    minute: {
      '*': {
        prefix: 'und',
      },
    },
    second: {
      '*': {
        prefix: 'und',
      },
    },
  },
}

export default locale

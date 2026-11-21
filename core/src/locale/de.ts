import type { Localization } from './types'

const locale: Localization = {
  '*': {
    prefix: 'Jede',
    suffix: '',
    text: 'Unbekannt',
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
      step: { prefix: '', text: 'alle {{step.value}} Monate' },
    },
    day: {
      '*': { prefix: 'am' },
      any: {
        prefix: 'an',
        text: 'jedem Tag',
      },
      step: { prefix: '', text: 'alle {{step.value}} Tage' },
      noSpecific: { prefix: '', text: '(Tag des Monats nicht festgelegt)' },
      lastDay: { text: 'letzten Tag' },
      lastDayOffset: { prefix: '', text: '{{offset.text}} Tag(e) vor Monatsende' },
      lastWeekday: { text: 'letzten Werktag' },
      nearestWeekday: { text: 'nächstgelegenen Werktag zum {{value.text}}.' },
    },
    dayOfWeek: {
      '*': { prefix: 'am' },
      any: {
        prefix: 'an',
        text: 'jedem Wochentag',
      },
      value: { text: '{{value.alt}}' },
      range: { prefix: '', text: '{{start.alt}} bis {{end.alt}}' },
      noSpecific: { prefix: '', text: '(Wochentag nicht festgelegt)' },
      step: { prefix: '', text: 'alle {{step.value}} Tage' },
    },
    hour: {
      '*': { prefix: 'um' },
      any: {
        prefix: 'zu',
        text: 'jeder Stunde',
      },
      step: { prefix: '', text: 'alle {{step.value}} Stunden' },
    },
    minute: {
      '*': { prefix: ':' },
      any: { text: 'jede Minute' },
      step: { prefix: '', text: 'alle {{step.value}} Minuten' },
    },
    second: {
      '*': { prefix: ':' },
      any: { text: 'jede Sekunde' },
      step: { prefix: '', text: 'alle {{step.value}} Sekunden' },
    },
  },
  minute: {
    text: 'Minute',
  },
  hour: {
    text: 'Stunde',
    minute: {
      '*': {
        prefix: 'bei Minute',
        suffix: '',
      },
      any: { prefix: '', text: 'jede Minute' },
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
    prefix: 'Jeden',
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
      '*': { prefix: 'bei Sekunde', suffix: '' },
      any: { prefix: '', text: 'jede Sekunde' },
    },
  },
  'q-hour': {
    text: 'Stunde',
    minute: {
      '*': {
        prefix: 'bei Minute',
      },
      any: { prefix: '' },
    },
    second: {
      '*': {
        prefix: 'bei Sekunde',
      },
      any: { prefix: '' },
    },
  },
}

export default locale

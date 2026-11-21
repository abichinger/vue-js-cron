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
      any: { prefix: '', text: 'hver måned' },
      value: { text: '{{value.alt}}' },
      range: { text: '{{start.alt}}-{{end.alt}}' },
      step: { prefix: '', text: 'med {{step.value}} måneders mellemrum' },
    },
    day: {
      '*': { prefix: 'på' },
      any: { prefix: '', text: 'hver dag i måneden' },
      value: { text: '{{value.alt}}.' },
      range: { text: '{{start.alt}}.-{{end.alt}}.' },
      noSpecific: { prefix: '', text: '(dag i måneden ikke angivet)' },
      lastDay: { text: 'den sidste dag' },
      lastDayOffset: { prefix: '', text: '{{offset.text}} dag(e) før den sidste dag' },
      lastWeekday: { text: 'den sidste hverdag' },
      nearestWeekday: { text: 'den nærmeste hverdag til den {{value.text}}.' },
      step: { prefix: '', text: 'med {{step.value}} dages mellemrum' },
    },

    dayOfWeek: {
      '*': { prefix: 'på' },
      any: { prefix: '', text: 'hver dag i ugen' },
      value: { text: '{{value.alt}}' },
      range: { text: '{{start.alt}}-{{end.alt}}' },
      noSpecific: { prefix: '', text: '(ugedag ikke angivet)' },
      step: { prefix: '', text: 'med {{step.value}} dages mellemrum' },
    },
    hour: {
      '*': { prefix: 'klokken' },
      any: { prefix: '', text: 'hver time' },
      step: { prefix: '', text: 'med {{step.value}} timers mellemrum' },
    },
    minute: {
      '*': { prefix: ':' },
      any: { text: 'hvert minut' },
      step: { prefix: '', text: 'med {{step.value}} minutters mellemrum' },
    },
    second: {
      '*': { prefix: ':' },
      any: { text: 'hvert sekund' },
      step: { prefix: '', text: 'med {{step.value}} sekunders mellemrum' },
    },
  },
  minute: {
    prefix: 'Hvert',
    text: 'minut',
  },
  hour: {
    text: 'time',
    minute: {
      '*': {
        prefix: 'ved minut',
        suffix: '',
      },
      any: { prefix: '', text: 'hvert minut' },
    },
  },
  day: {
    text: 'dag',
  },
  week: {
    text: 'uge',
  },
  month: {
    text: 'måned',
  },
  year: {
    prefix: 'Hvert',
    text: 'år',
  },

  // quartz format
  'q-second': {
    prefix: 'Hvert',
    text: 'sekund',
  },
  'q-minute': {
    prefix: 'Hvert',
    text: 'minut',
    second: {
      '*': {
        prefix: 'ved sekund',
        suffix: '',
      },
      any: { prefix: '', text: 'hvert sekund' },
    },
  },
  'q-hour': {
    text: 'time',
    minute: {
      '*': {
        prefix: 'ved minut',
      },
      any: { prefix: '' },
    },
    second: {
      '*': { prefix: 'ved sekund' },
      any: { prefix: '' },
    },
  },
}

export default locale

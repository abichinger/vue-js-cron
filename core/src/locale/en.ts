import type { Localization } from './types'

const locale: Localization = {
  '*': {
    prefix: 'Every',
    suffix: '',
    text: 'Unknown',
    '*': {
      value: { text: '{{value.text}}' },
      range: { text: '{{start.text}}-{{end.text}}' },
      step: { text: 'every {{step.value}}' },
      rangeStep: { text: '{{start.text}}-{{end.text}}/{{step.value}}' },
      stepFrom: { text: '{{start.text}}/{{step.value}}' },
    },
    month: {
      '*': { prefix: 'in' },
      any: { text: 'every month' },
      value: { text: '{{value.alt}}' },
      range: { text: '{{start.alt}}-{{end.alt}}' },
      rangeStep: { text: '{{start.alt}}-{{end.alt}}/{{step.value}}' },
      stepFrom: { text: '{{start.alt}}/{{step.value}}' },
      step: { prefix: '', text: 'every {{step.value}} months' },
    },
    day: {
      '*': { prefix: 'on' },
      any: { text: 'every day' },
      noSpecific: { prefix: '', text: '(day of month unspecified)' },
      lastDay: { text: 'the last day' },
      lastDayOffset: { text: '{{offset.text}} day(s) before the last day' },
      lastWeekday: { text: 'the last weekday' },
      nearestWeekday: { text: 'the weekday nearest to day {{value.text}}' },
      step: { prefix: '', text: 'every {{step.value}} days' },
    },
    dayOfWeek: {
      '*': { prefix: 'on' },
      any: { prefix: '', text: 'regardless of the day of the week' },
      value: { text: '{{value.alt}}' },
      range: { text: '{{start.alt}}-{{end.alt}}' },
      rangeStep: { text: '{{start.alt}}-{{end.alt}}/{{step.value}}' },
      stepFrom: { text: '{{start.alt}}/{{step.value}}' },
      noSpecific: { prefix: '', text: '(day of week unspecified)' },
      step: { prefix: '', text: 'every {{step.value}} days' },
    },
    hour: {
      '*': { prefix: 'at' },
      any: { text: 'every hour' },
      step: { prefix: '', text: 'every {{step.value}} hours' },
    },
    minute: {
      '*': { prefix: ':' },
      any: { text: 'every minute' },
      step: { prefix: '', text: 'every {{step.value}} minutes' },
    },
    second: {
      '*': { prefix: ':' },
      any: { text: 'every second' },
      step: { prefix: '', text: 'every {{step.value}} seconds' },
    },
  },
  minute: {
    text: 'Minute',
  },
  hour: {
    text: 'Hour',
    minute: {
      '*': {
        prefix: 'at minute',
      },
      any: { prefix: '', text: 'every minute' },
      step: { prefix: '', suffix: '' },
    },
  },
  day: {
    text: 'Day',
  },
  week: {
    text: 'Week',
  },
  month: {
    text: 'Month',
  },
  year: {
    text: 'Year',
  },

  //quartz format
  'q-second': {
    text: 'Second',
  },
  'q-minute': {
    text: 'Minute',
    second: {
      '*': {
        prefix: 'at second',
      },
      any: { prefix: '', text: 'every second' },
      step: { prefix: '', suffix: '' },
    },
  },
  'q-hour': {
    text: 'Hour',
    minute: {
      '*': {
        prefix: 'at minute',
      },
      any: { prefix: '' },
      step: { prefix: '', suffix: '' },
    },
    second: {
      '*': { prefix: 'at second' },
      any: { prefix: '' },
      step: { prefix: '', suffix: '' },
    },
  },
}

export default locale

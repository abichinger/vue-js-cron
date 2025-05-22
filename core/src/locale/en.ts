import type { Localization } from './types'

const locale: Localization = {
  '*': {
    prefix: 'Every',
    suffix: '',
    text: 'Unknown',
    '*': {
      any: { text: 'every {{field.id}}' },
      value: { text: '{{value.text}}' },
      range: { text: '{{start.text}}-{{end.text}}' },
      step: { text: 'every {{step.value}}' },
      rangeStep: { text: '{{start.text}}-{{end.text}}/{{step.value}}' },
    },
    month: {
      '*': { prefix: 'in' },
      value: { text: '{{value.alt}}' },
      range: { text: '{{start.alt}}-{{end.alt}}' },
      rangeStep: { text: '{{start.alt}}-{{end.alt}}/{{step.value}}' },
    },
    day: {
      '*': { prefix: 'on' },
      noSpecific: {
        text: 'no specific day',
      },
    },
    dayOfWeek: {
      '*': { prefix: 'on' },
      any: { text: 'every day of the week' },
      value: { text: '{{value.alt}}' },
      range: { text: '{{start.alt}}-{{end.alt}}' },
      rangeStep: { text: '{{start.alt}}-{{end.alt}}/{{step.value}}' },
      noSpecific: {
        text: 'no specific day of the week',
      },
    },
    hour: {
      '*': { prefix: 'at' },
    },
    minute: {
      '*': { prefix: ':' },
    },
    second: {
      '*': { prefix: ':' },
    },
  },
  minute: {
    text: 'Minute',
  },
  hour: {
    text: 'Hour',
    minute: {
      '*': {
        prefix: 'at',
        suffix: 'minute(s)',
      },
      any: { text: 'every' },
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
    dayOfWeek: {
      '*': { prefix: 'and' },
    },
  },
  year: {
    text: 'Year',
    dayOfWeek: {
      '*': { prefix: 'and' },
    },
  },

  //quartz format
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
      any: { text: 'every' },
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

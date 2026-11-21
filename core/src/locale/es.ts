import type { Localization } from './types'

const locale: Localization = {
  '*': {
    prefix: 'Cada',
    suffix: '',
    text: 'Desconocido',
    '*': {
      any: { text: 'todos los {{ field.id }}' },
      value: { text: '{{ value.text }}' },
      range: { text: '{{ start.text }}-{{ end.text }}' },
      step: { text: 'cada {{ step.value }}' },
    },
    month: {
      '*': { prefix: 'en' },
      any: { text: 'todos los meses' },
      value: { text: '{{ value.alt }}' },
      range: { text: '{{ start.alt }}-{{ end.alt }}' },
      step: { prefix: '', text: 'cada {{step.value}} meses' },
    },
    day: {
      '*': { prefix: 'el' },
      any: { prefix: '', text: 'todos los días' },
      value: { text: 'día {{ value.text }}' },
      noSpecific: { prefix: '', text: '(día del mes sin especificar)' },
      lastDay: { text: 'último día del mes' },
      lastDayOffset: { prefix: '', text: '{{offset.text}} día(s) antes del último día' },
      lastWeekday: { text: 'último día laborable del mes' },
      nearestWeekday: { text: 'día laborable más cercano al {{value.text}} del mes' },
      step: { prefix: '', text: 'cada {{step.value}} días' },
    },
    dayOfWeek: {
      '*': { prefix: '' },
      any: { text: 'todos los días de la semana' },
      value: { text: 'los {{ value.alt }}' },
      range: { text: 'de {{ start.alt }} a {{ end.alt }}' },
      noSpecific: { prefix: '', text: '(día de la semana sin especificar)' },
      step: { prefix: '', text: 'cada {{step.value}} días' },
    },
    hour: {
      '*': { prefix: 'a' },
      any: { prefix: '', text: 'cada hora' },
      value: { text: 'las {{ value.text }}' },
      step: { prefix: '', text: 'cada {{step.value}} horas' },
    },
    minute: {
      '*': { prefix: ':' },
      any: { text: 'cada minuto' },
      step: { prefix: '', text: 'cada {{step.value}} minutos' },
    },
    second: {
      '*': { prefix: ':' },
      any: { text: 'cada segundo' },
      step: { prefix: '', text: 'cada {{step.value}} segundos' },
    },
  },
  minute: {
    text: 'minuto',
  },
  hour: {
    text: 'hora',
    minute: {
      '*': {
        prefix: 'en el minuto',
        suffix: '',
      },
      any: { prefix: '', text: 'cada minuto' },
    },
  },
  day: {
    text: 'día',
  },
  week: {
    text: 'semana',
  },
  month: {
    text: 'mes',
  },
  year: {
    text: 'año',
  },

  // quartz format
  'q-second': {
    text: 'segundo',
  },
  'q-minute': {
    text: 'minuto',
    second: {
      '*': { prefix: 'en el segundo', suffix: '' },
      any: { prefix: '', text: 'cada segundo' },
    },
  },
  'q-hour': {
    text: 'hora',
    minute: {
      '*': { prefix: 'en el minuto' },
      any: { prefix: '' },
    },
    second: {
      '*': { prefix: 'en el segundo' },
      any: { prefix: '' },
    },
  },
}

export default locale

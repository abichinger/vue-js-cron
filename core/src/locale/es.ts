import type { Localization } from './types'

const locale: Localization = {
  '*': {
    prefix: 'todos los',
    suffix: '',
    text: 'Desconocido',
    '*': {
      any: { text: 'todos los {{ field.id }}' },
      value: { text: '{{ value.text }}' },
      range: { text: '{{ start.text }}-{{ end.text }}' },
      step: { text: 'todos/as {{ step.value }}' },
    },
    month: {
      '*': { prefix: 'en' },
      any: { text: 'todos los meses' },
      value: { text: '{{ value.alt }}' },
      range: { text: '{{ start.alt }}-{{ end.alt }}' },
    },
    day: {
      '*': { prefix: 'en' },
      any: { text: 'todos los días' },
      value: { text: 'los días {{ value.alt }}' },
      lastDay: { text: 'el último día' },
      lastDayOffset: { prefix: '', text: '{{offset.text}} día(s) antes del último día' },
      lastWeekday: { text: 'el último día laborable' },
      nearestWeekday: { text: 'el día laborable más cercano al {{value.text}}' },
    },
    dayOfWeek: {
      '*': { prefix: 'de' },
      any: { text: 'todos los días de la semana' },
      value: { text: 'los {{ value.alt }}' },
      range: { text: '{{ start.alt }}-{{ end.alt }}' },
    },
    hour: {
      '*': { prefix: 'a' },
      any: { text: 'todas las horas' },
      value: { text: 'las {{ value.text }}' },
    },
    minute: {
      '*': { prefix: ':' },
      any: { text: 'todos los minutos' },
    },
  },
  minute: {
    prefix: 'todos los',
    text: 'minutos',
  },
  hour: {
    prefix: 'todas las',
    text: 'horas',
    minute: {
      '*': {
        prefix: 'a los',
        suffix: 'minutos',
      },
      any: { text: 'todos', prefix: 'a', suffix: 'los minutos' },
    },
  },
  day: {
    text: 'Días',
  },
  week: {
    text: 'Semanas',
  },
  month: {
    text: 'Meses',
    dayOfWeek: {
      '*': { prefix: 'y' },
    },
  },
  year: {
    text: 'años',
    dayOfWeek: {
      '*': { prefix: 'y' },
    },
  },
}

export default locale

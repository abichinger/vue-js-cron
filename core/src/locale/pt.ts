import type { Localization } from './types'

const locale: Localization = {
  '*': {
    prefix: 'Todo(a)',
    suffix: '',
    text: 'Desconhecido',
    '*': {
      any: { text: 'todo {{field.id}}' },
      value: { text: '{{value.text}}' },
      range: { text: '{{start.text}}-{{end.text}}' },
      step: { text: 'todo {{step.value}}' },
    },
    month: {
      '*': { prefix: 'de' },
      value: { text: '{{value.alt}}' },
      range: { text: '{{start.alt}}-{{end.alt}}' },
      any: { text: 'todo mês' },
    },
    day: {
      '*': { prefix: 'no(s) dia(s)' },
      any: { text: 'todos' },
    },
    dayOfWeek: {
      '*': { prefix: 'de' },
      any: { text: 'todos dias da semana' },
      value: { text: '{{value.alt}}' },
      range: { text: '{{start.alt}}-{{end.alt}}' },
    },
    hour: {
      '*': { prefix: 'às' },
      any: { text: 'cada hora' },
    },
    minute: {
      '*': { prefix: ':' },
      any: { text: 'cada minuto' },
    },
  },
  minute: {
    text: 'Minuto',
  },
  hour: {
    text: 'Hora',
    minute: {
      '*': {
        prefix: 'e',
        suffix: 'minuto(s)',
      },
      any: { text: 'cada' },
    },
  },
  day: {
    text: 'Dia',
  },
  week: {
    text: 'Semana',
  },
  month: {
    text: 'Mês',
    dayOfWeek: {
      '*': { prefix: 'e de' },
    },
  },
  year: {
    text: 'Ano',
    dayOfWeek: {
      '*': { prefix: 'e de' },
    },
  },
}

export default locale

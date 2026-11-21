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
      noSpecific: { prefix: 'em', text: 'nenhum dia específico' },
      lastDay: { prefix: 'no', text: 'último dia' },
      lastDayOffset: { prefix: '', text: '{{offset.text}} dia(s) antes do último dia' },
      lastWeekday: { prefix: 'no', text: 'último dia útil' },
      nearestWeekday: { prefix: 'no', text: 'dia útil mais próximo do dia {{value.text}}' },
    },
    dayOfWeek: {
      '*': { prefix: 'de' },
      any: { text: 'todos dias da semana' },
      value: { text: '{{value.alt}}' },
      range: { text: '{{start.alt}}-{{end.alt}}' },
      noSpecific: { text: 'nenhum dia específico da semana' },
    },
    hour: {
      '*': { prefix: 'às' },
      any: { text: 'cada hora' },
    },
    minute: {
      '*': { prefix: ':' },
      any: { text: 'cada minuto' },
    },
    second: {
      '*': { prefix: ':' },
      any: { text: 'cada segundo' },
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

  // quartz format
  'q-second': {
    prefix: 'Todo',
    text: 'Segundo',
  },
  'q-minute': {
    prefix: 'Todo',
    text: 'Minuto',
    second: {
      '*': { prefix: 'aos', suffix: 'segundo(s)' },
      any: { prefix: 'a', text: 'cada', suffix: 'segundo' },
    },
  },
  'q-hour': {
    prefix: 'Toda',
    text: 'Hora',
    minute: {
      '*': { prefix: 'no minuto' },
      any: { prefix: 'a' },
    },
  },
}

export default locale

import type { Localization } from './types'

const locale: Localization = {
  '*': {
    prefix: 'A cada',
    suffix: '',
    text: 'Desconhecido',
    '*': {
      any: { text: 'todo {{field.id}}' },
      value: { text: '{{value.text}}' },
      range: { text: '{{start.text}}-{{end.text}}' },
      step: { text: 'a cada {{step.value}}' },
    },
    month: {
      '*': { prefix: 'em' },
      value: { text: '{{value.alt}}' },
      range: { text: '{{start.alt}}-{{end.alt}}' },
      any: { prefix: '', text: 'em todos os meses' },
      step: { prefix: '', text: 'a cada {{step.value}} meses' },
    },
    day: {
      '*': { prefix: 'no dia' },
      any: { prefix: '', text: 'todos os dias' },
      noSpecific: { prefix: '', text: '(dia do mês não especificado)' },
      lastDay: { prefix: 'no', text: 'último dia' },
      lastDayOffset: { prefix: '', text: '{{offset.text}} dia(s) antes do último dia' },
      lastWeekday: { prefix: 'no', text: 'último dia útil' },
      nearestWeekday: { prefix: 'no', text: 'dia útil mais próximo do dia {{value.text}}' },
      step: { prefix: '', text: 'a cada {{step.value}} dias' },
    },
    dayOfWeek: {
      '*': { prefix: 'nos dias' },
      any: { prefix: '', text: 'todos os dias da semana' },
      value: { text: '{{value.alt}}' },
      range: { prefix: '', text: 'de {{start.alt}} a {{end.alt}}' },
      noSpecific: { prefix: '', text: '(dia da semana não especificado)' },
      step: { prefix: '', text: 'a cada {{step.value}} dias' },
    },
    hour: {
      '*': { prefix: 'às' },
      any: { prefix: '', text: 'a cada hora' },
      step: { prefix: '', text: 'a cada {{step.value}} horas' },
    },
    minute: {
      '*': { prefix: ':' },
      any: { text: 'a cada minuto' },
      step: { prefix: '', text: 'a cada {{step.value}} minutos' },
    },
    second: {
      '*': { prefix: ':' },
      any: { text: 'a cada segundo' },
      step: { prefix: '', text: 'a cada {{step.value}} segundos' },
    },
  },
  minute: {
    text: 'minuto',
  },
  hour: {
    text: 'hora',
    minute: {
      '*': {
        prefix: 'no minuto',
        suffix: '',
      },
      any: { prefix: '', text: 'a cada minuto' },
    },
  },
  day: {
    text: 'dia',
  },
  week: {
    text: 'semana',
  },
  month: {
    text: 'mês',
  },
  year: {
    text: 'ano',
  },

  // quartz format
  'q-second': {
    text: 'segundo',
  },
  'q-minute': {
    text: 'minuto',
    second: {
      '*': { prefix: 'no segundo', suffix: '' },
      any: { prefix: '', text: 'a cada segundo' },
    },
  },
  'q-hour': {
    text: 'hora',
    minute: {
      '*': { prefix: 'no minuto' },
      any: { prefix: '', text: 'a cada minuto' },
    },
    second: {
      '*': { prefix: 'no segundo' },
      any: { prefix: '' },
    },
  },
}

export default locale

import type { Localization } from './types'

/**
 * Russian localization generated with GPT-4
 */
const locale: Localization = {
  '*': {
    prefix: 'Каждый',
    suffix: '',
    text: 'Неизвестно',
    '*': {
      value: { text: '{{value.text}}' },
      range: { text: '{{start.text}}-{{end.text}}' },
      step: { text: 'каждый {{step.value}}' },
    },
    month: {
      '*': { prefix: 'в' },
      any: { prefix: 'в', text: 'каждом месяце' },
      value: { text: '{{value.alt}}' },
      range: { text: '{{start.alt}}-{{end.alt}}' },
      step: { prefix: '', text: 'с интервалом в {{step.value}} мес.' },
    },
    day: {
      '*': { prefix: 'в' },
      any: { prefix: '', text: 'каждый день' },
      step: { prefix: '', text: 'с интервалом в {{step.value}} дн.' },
      noSpecific: { prefix: '', text: '(день месяца не задан)' },
      lastDay: { text: 'последний день' },
      lastDayOffset: { prefix: 'за', text: '{{offset.text}} дн. до последнего дня' },
      lastWeekday: { text: 'последний рабочий день' },
      nearestWeekday: { text: 'рабочий день, ближайший к {{value.text}}-му числу' },
    },
    dayOfWeek: {
      '*': { prefix: 'по' },
      any: { prefix: 'по', text: 'каждому дню недели' },
      value: { text: '{{value.alt}}' },
      range: { prefix: '', text: 'с {{start.alt}} по {{end.alt}}' },
      noSpecific: { prefix: '', text: '(день недели не задан)' },
      step: { prefix: '', text: 'с интервалом в {{step.value}} дн.' },
    },
    hour: {
      '*': { prefix: 'в' },
      any: { prefix: '', text: 'каждый час' },
      step: { prefix: '', text: 'с интервалом в {{step.value}} ч' },
    },
    minute: {
      '*': { prefix: ':' },
      any: { text: 'каждую минуту' },
      step: { prefix: '', text: 'с интервалом в {{step.value}} мин' },
    },
    second: {
      '*': { prefix: ':' },
      any: { text: 'каждую секунду' },
      step: { prefix: '', text: 'с интервалом в {{step.value}} с' },
    },
  },
  minute: { prefix: 'Каждую', text: 'минуту' },
  hour: {
    text: 'час',
    minute: {
      '*': { prefix: 'на минуте', suffix: '' },
      any: { prefix: '', text: 'каждую минуту' },
    },
  },
  day: { prefix: 'Каждый', text: 'день' },
  week: { prefix: 'Каждую', text: 'неделю' },
  month: { prefix: 'Каждый', text: 'месяц' },
  year: { prefix: 'Каждый', text: 'год' },

  //quartz format
  'q-second': { prefix: 'Каждую', text: 'секунду' },
  'q-minute': {
    prefix: 'Каждую',
    text: 'минуту',
    second: {
      '*': { prefix: 'на секунде', suffix: '' },
      any: { prefix: '', text: 'каждую секунду' },
    },
  },
  'q-hour': {
    text: 'час',
    minute: { '*': { prefix: 'на минуте' }, any: { prefix: '' } },
    second: {
      '*': { prefix: 'на секунде' },
      any: { prefix: '' },
    },
  },
}

export default locale

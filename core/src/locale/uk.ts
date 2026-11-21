import type { Localization } from './types'

/**
 * Ukrainian localization
 */
const locale: Localization = {
  '*': {
    prefix: 'Кожен',
    suffix: '',
    text: 'Невідомо',
    '*': {
      value: { text: '{{value.text}}' },
      range: { text: '{{start.text}}-{{end.text}}' },
      step: { text: 'кожний {{step.value}}' },
    },
    month: {
      '*': { prefix: 'у' },
      any: { prefix: '', text: 'щомісяця' },
      value: { text: '{{value.alt}}' },
      range: { text: '{{start.alt}}-{{end.alt}}' },
      step: { prefix: '', text: 'з інтервалом у {{step.value}} міс.' },
    },
    day: {
      '*': { prefix: 'в' },
      any: { prefix: '', text: 'щодня' },
      step: { prefix: '', text: 'з інтервалом у {{step.value}} дн.' },
      noSpecific: { prefix: '', text: '(день місяця не задано)' },
      lastDay: { text: 'останній день' },
      lastDayOffset: { prefix: 'за', text: '{{offset.text}} дн. до останнього дня' },
      lastWeekday: { text: 'останній робочий день' },
      nearestWeekday: { text: 'робочий день, найближчий до {{value.text}}-го числа' },
    },
    dayOfWeek: {
      '*': { prefix: 'у' },
      any: { prefix: '', text: 'кожного дня тижня' },
      value: { text: '{{value.alt}}' },
      range: { prefix: '', text: 'з {{start.alt}} до {{end.alt}}' },
      noSpecific: { prefix: '', text: '(день тижня не задано)' },
      step: { prefix: '', text: 'з інтервалом у {{step.value}} дн.' },
    },
    hour: {
      '*': { prefix: 'в' },
      any: { prefix: '', text: 'щогодини' },
      step: { prefix: '', text: 'з інтервалом у {{step.value}} год' },
    },
    minute: {
      '*': { prefix: ':' },
      any: { text: 'кожну хвилину' },
      step: { prefix: '', text: 'з інтервалом у {{step.value}} хв' },
    },
    second: {
      '*': { prefix: ':' },
      any: { text: 'кожну секунду' },
      step: { prefix: '', text: 'з інтервалом у {{step.value}} с' },
    },
  },
  minute: { prefix: 'Кожну', text: 'хвилину' },
  hour: {
    prefix: 'Кожну',
    text: 'годину',
    minute: {
      '*': { prefix: 'на хвилині', suffix: '' },
      any: { prefix: '', text: 'щохвилини' },
    },
  },
  day: { prefix: 'Кожен', text: 'день' },
  week: { text: 'тиждень' },
  month: { prefix: 'Кожен', text: 'місяць' },
  year: { prefix: 'Кожен', text: 'рік' },

  //quartz format
  'q-second': { prefix: 'Кожну', text: 'секунду' },
  'q-minute': {
    prefix: 'Кожну',
    text: 'хвилину',
    second: {
      '*': { prefix: 'на секунді', suffix: '' },
      any: { prefix: '', text: 'щосекунди' },
    },
  },
  'q-hour': {
    prefix: 'Кожну',
    text: 'годину',
    minute: {
      '*': { prefix: 'на хвилині' },
      any: { prefix: '' },
    },
    second: {
      '*': { prefix: 'на секунді' },
      any: { prefix: '' },
    },
  },
}

export default locale

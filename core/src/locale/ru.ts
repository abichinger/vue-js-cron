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
      everyX: { text: 'каждый {{every.value}}' },
    },
    month: {
      '*': { prefix: 'в' },
      empty: { prefix: 'в', text: 'каждом месяце' },
      value: { text: '{{value.alt}}' },
      range: { text: '{{start.alt}}-{{end.alt}}' },
    },
    day: {
      '*': { prefix: 'в' },
      empty: { prefix: 'в', text: 'каждый день' },
      everyX: { prefix: '', text: 'каждые {{every.value}} дня' },
      noSpecific: { prefix: 'в', text: 'нет определенного дня' },
    },
    dayOfWeek: {
      '*': { prefix: 'по' },
      empty: { prefix: 'по', text: 'каждому дню недели' },
      value: { text: '{{value.alt}}' },
      range: { text: '{{start.alt}}-{{end.alt}}' },
      noSpecific: { prefix: 'и', text: 'нет определенного дня недели' },
    },
    hour: {
      '*': { prefix: 'в' },
      empty: { prefix: 'в', text: 'каждый час' },
      everyX: { prefix: '', text: 'каждые {{every.value}} часа' },
    },
    minute: {
      '*': { prefix: ':' },
      empty: { text: 'каждую минуту' },
      everyX: { prefix: '', text: 'каждые {{every.value}} минуты' },
    },
    second: {
      '*': { prefix: ':' },
      empty: { text: 'каждую секунду' },
      everyX: { prefix: '', text: 'каждые {{every.value}} секунды' },
    },
  },
  minute: { text: 'Минута' },
  hour: {
    text: 'Час',
    minute: { '*': { prefix: 'в', suffix: 'минут(а/ы)' }, empty: { text: 'каждый' } },
  },
  day: { prefix: 'Каждый', text: 'День' },
  week: { text: 'Неделя' },
  month: { prefix: 'Каждый', text: 'Месяц' },
  year: { prefix: 'Каждый', text: 'Год' },

  //quartz format
  'q-second': { text: 'Секунда' },
  'q-minute': { text: 'Минута', second: { '*': { prefix: 'и' } } },
  'q-hour': { text: 'Час', minute: { '*': { prefix: 'и' } }, second: { '*': { prefix: 'и' } } },
}

export default locale

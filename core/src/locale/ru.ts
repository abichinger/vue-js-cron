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
    },
    day: {
      '*': { prefix: 'в' },
      any: { prefix: 'в', text: 'каждый день' },
      step: { prefix: '', text: 'каждые {{step.value}} дня' },
      noSpecific: { prefix: 'в', text: 'нет определенного дня' },
    },
    dayOfWeek: {
      '*': { prefix: 'по' },
      any: { prefix: 'по', text: 'каждому дню недели' },
      value: { text: '{{value.alt}}' },
      range: { text: '{{start.alt}}-{{end.alt}}' },
      noSpecific: { prefix: 'и', text: 'нет определенного дня недели' },
    },
    hour: {
      '*': { prefix: 'в' },
      any: { prefix: 'в', text: 'каждый час' },
      step: { prefix: '', text: 'каждые {{step.value}} часа' },
    },
    minute: {
      '*': { prefix: ':' },
      any: { text: 'каждую минуту' },
      step: { prefix: '', text: 'каждые {{step.value}} минуты' },
    },
    second: {
      '*': { prefix: ':' },
      any: { text: 'каждую секунду' },
      step: { prefix: '', text: 'каждые {{step.value}} секунды' },
    },
  },
  minute: { text: 'Минута' },
  hour: {
    text: 'Час',
    minute: { '*': { prefix: 'в', suffix: 'минут(а/ы)' }, any: { text: 'каждый' } },
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

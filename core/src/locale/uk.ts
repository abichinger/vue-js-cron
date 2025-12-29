import type { Localization } from './types'

/**
 * Ukrainian localization
 */
const locale: Localization = {
  '*': {
    prefix: 'Кожний',
    suffix: '',
    text: 'Невідомо',
    '*': {
      value: { text: '{{value.text}}' },
      range: { text: '{{start.text}}-{{end.text}}' },
      step: { text: 'кожний {{step.value}}' },
    },
    month: {
      '*': { prefix: 'в' },
      any: { prefix: 'в', text: 'кожному місяці' },
      value: { text: '{{value.alt}}' },
      range: { text: '{{start.alt}}-{{end.alt}}' },
    },
    day: {
      '*': { prefix: 'в' },
      any: { prefix: 'в', text: 'кожний день' },
      step: { prefix: '', text: 'кожні {{step.value}} дні' },
      noSpecific: { prefix: 'в', text: 'немає визначеного дня' },
    },
    dayOfWeek: {
      '*': { prefix: 'по' },
      any: { prefix: 'по', text: 'кожному дню тижня' },
      value: { text: '{{value.alt}}' },
      range: { text: '{{start.alt}}-{{end.alt}}' },
      noSpecific: { prefix: 'і', text: 'немає визначеного дня' },
    },
    hour: {
      '*': { prefix: 'в' },
      any: { prefix: 'в', text: 'кожну годину' },
      step: { prefix: '', text: 'кожні {{step.value}} годин(и)' },
    },
    minute: {
      '*': { prefix: ':' },
      any: { text: 'кожну хвилину' },
      step: { prefix: '', text: 'кожні {{step.value}} хвилин(и)' },
    },
    second: {
      '*': { prefix: ':' },
      any: { text: 'кожну секунду' },
      step: { prefix: '', text: 'кожні {{step.value}} секунд(и)' },
    },
  },
  minute: { text: 'Хвилини' },
  hour: {
    text: 'Година',
    minute: { '*': { prefix: 'в', suffix: 'хвилин(а)' }, any: { text: 'кожні' } },
  },
  day: { prefix: 'Кожний', text: 'День' },
  week: { text: 'Тиждень' },
  month: { prefix: 'Кожний', text: 'Місяц' },
  year: { prefix: 'Кожний', text: 'Рік' },

  //quartz format
  'q-second': { text: 'Секунда' },
  'q-minute': { text: 'Хвилина', second: { '*': { prefix: 'и' } } },
  'q-hour': { text: 'Година', minute: { '*': { prefix: 'і' } }, second: { '*': { prefix: 'і' } } },
}

export default locale

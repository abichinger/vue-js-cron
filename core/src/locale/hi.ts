import type { Localization } from './types'

/**
 * Hindi localization generated with GPT-4
 */
const locale: Localization = {
  '*': {
    prefix: 'हर',
    suffix: '',
    text: 'अज्ञात',
    '*': {
      value: { text: '{{value.text}}' },
      range: { text: '{{start.text}}-{{end.text}}' },
      step: { text: '{{step.value}} हर' },
    },
    month: {
      '*': { prefix: 'में' },
      any: { prefix: 'के', text: 'हर महीने' },
      value: { text: '{{value.alt}}' },
      range: { text: '{{start.alt}}-{{end.alt}}' },
    },
    day: {
      '*': { prefix: 'के' },
      any: { prefix: 'पर', text: 'हर दिन' },
      step: { prefix: '', text: '{{step.value}} दिन हर' },
      noSpecific: { prefix: 'पर', text: 'कोई विशेष दिन नहीं' },
    },
    dayOfWeek: {
      '*': { prefix: 'पर' },
      any: { prefix: 'पर', text: 'हर सप्ताह' },
      value: { text: '{{value.alt}}' },
      range: { text: '{{start.alt}}-{{end.alt}}' },
      noSpecific: { prefix: 'और', text: 'कोई विशेष सप्ताह नहीं' },
    },
    hour: {
      '*': { prefix: 'को' },
      any: { prefix: 'पर', text: 'हर घंटे' },
      step: { prefix: '', text: '{{step.value}} घंटे हर' },
    },
    minute: {
      '*': { prefix: ':' },
      any: { text: 'हर मिनट' },
      step: { prefix: '', text: '{{step.value}} मिनट हर' },
    },
    second: {
      '*': { prefix: ':' },
      any: { text: 'हर सेकंड' },
      step: { prefix: '', text: '{{step.value}} सेकंड हर' },
    },
  },
  minute: { text: 'मिनट' },
  hour: { text: 'घंटा', minute: { '*': { prefix: 'पर', suffix: 'मिनट' }, any: { text: 'हर' } } },
  day: { prefix: 'हर', text: 'दिन' },
  week: { text: 'सप्ताह' },
  month: { prefix: 'हर', text: 'महीना' },
  year: { prefix: 'हर', text: 'साल' },

  //quartz format
  'q-second': { text: 'सेकंड' },
  'q-minute': { text: 'मिनट', second: { '*': { prefix: 'और' } } },
  'q-hour': { text: 'घंटा', minute: { '*': { prefix: 'और' } }, second: { '*': { prefix: 'और' } } },
}

export default locale

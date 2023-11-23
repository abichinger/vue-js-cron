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
      everyX: { text: '{{every.value}} हर' },
    },
    month: {
      '*': { prefix: 'में' },
      empty: { prefix: 'के', text: 'हर महीने' },
      value: { text: '{{value.alt}}' },
      range: { text: '{{start.alt}}-{{end.alt}}' },
    },
    day: {
      '*': { prefix: 'के' },
      empty: { prefix: 'पर', text: 'हर दिन' },
      everyX: { prefix: '', text: '{{every.value}} दिन हर' },
      noSpecific: { prefix: 'पर', text: 'कोई विशेष दिन नहीं' },
    },
    dayOfWeek: {
      '*': { prefix: 'पर' },
      empty: { prefix: 'पर', text: 'हर सप्ताह' },
      value: { text: '{{value.alt}}' },
      range: { text: '{{start.alt}}-{{end.alt}}' },
      noSpecific: { prefix: 'और', text: 'कोई विशेष सप्ताह नहीं' },
    },
    hour: {
      '*': { prefix: 'को' },
      empty: { prefix: 'पर', text: 'हर घंटे' },
      everyX: { prefix: '', text: '{{every.value}} घंटे हर' },
    },
    minute: {
      '*': { prefix: ':' },
      empty: { text: 'हर मिनट' },
      everyX: { prefix: '', text: '{{every.value}} मिनट हर' },
    },
    second: {
      '*': { prefix: ':' },
      empty: { text: 'हर सेकंड' },
      everyX: { prefix: '', text: '{{every.value}} सेकंड हर' },
    },
  },
  minute: { text: 'मिनट' },
  hour: { text: 'घंटा', minute: { '*': { prefix: 'पर', suffix: 'मिनट' }, empty: { text: 'हर' } } },
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

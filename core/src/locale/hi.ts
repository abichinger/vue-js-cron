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
      step: { text: 'हर {{step.value}}' },
    },
    month: {
      '*': { prefix: '', suffix: 'में' },
      any: { suffix: '', text: 'हर महीने' },
      value: { text: '{{value.alt}}' },
      range: { text: '{{start.alt}}-{{end.alt}}' },
      step: { prefix: '', suffix: '', text: 'हर {{step.value}} महीने' },
    },
    day: {
      '*': { prefix: '' },
      value: { text: '{{value.text}} तारीख को' },
      any: { prefix: '', text: 'हर दिन' },
      step: { prefix: '', text: 'हर {{step.value}} दिन' },
      noSpecific: { prefix: '', text: '(महीने की तारीख तय नहीं है)' },
      lastDay: { text: 'अंतिम दिन' },
      lastDayOffset: { prefix: '', text: 'अंतिम दिन से {{offset.text}} दिन पहले' },
      lastWeekday: { text: 'महीने का अंतिम कार्यदिवस' },
      nearestWeekday: { text: '{{value.text}} तारीख के निकटतम कार्यदिवस' },
    },
    dayOfWeek: {
      '*': { prefix: '', suffix: 'को' },
      any: { suffix: '', text: 'सप्ताह के हर दिन' },
      value: { text: '{{value.alt}}' },
      range: { text: '{{start.alt}}-{{end.alt}}' },
      noSpecific: { prefix: '', text: '(सप्ताह का दिन तय नहीं है)', suffix: '' },
      step: { prefix: '', suffix: '', text: 'हर {{step.value}} दिन' },
    },
    hour: {
      '*': { prefix: 'समय' },
      any: { prefix: '', text: 'हर घंटे' },
      step: { prefix: '', text: 'हर {{step.value}} घंटे' },
    },
    minute: {
      '*': { prefix: ':' },
      any: { text: 'हर मिनट' },
      step: { prefix: '', text: 'हर {{step.value}} मिनट' },
    },
    second: {
      '*': { prefix: ':' },
      any: { text: 'हर सेकंड' },
      step: { prefix: '', text: 'हर {{step.value}} सेकंड' },
    },
  },
  minute: { text: 'मिनट' },
  hour: {
    text: 'घंटे',
    minute: {
      '*': { prefix: '', suffix: 'मिनट पर' },
      any: { text: 'हर मिनट', suffix: '' },
    },
  },
  day: { prefix: 'हर', text: 'दिन' },
  week: { text: 'सप्ताह' },
  month: { prefix: 'हर', text: 'महीने' },
  year: { prefix: 'हर', text: 'साल' },

  //quartz format
  'q-second': { text: 'सेकंड' },
  'q-minute': {
    text: 'मिनट',
    second: {
      '*': { prefix: '', suffix: 'सेकंड पर' },
      any: { text: 'हर सेकंड', suffix: '' },
    },
  },
  'q-hour': {
    text: 'घंटे',
    minute: {
      '*': { prefix: '', suffix: 'मिनट पर' },
      any: { suffix: '' },
    },
    second: {
      '*': { prefix: '', suffix: 'सेकंड पर' },
      any: { suffix: '' },
    },
  },
}

export default locale

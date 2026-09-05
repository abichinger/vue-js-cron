import type { Localization } from './types'

/**
 * Tajik localization
 */
const locale: Localization = {
  '*': {
    prefix: 'Ҳар',
    suffix: '',
    text: 'Номаълум',
    '*': {
      value: { text: '{{value.text}}' },
      range: { text: 'аз {{start.text}} то {{end.text}}' },
      step: { text: 'ҳар {{step.value}}' },
      rangeStep: { text: 'аз {{start.text}} то {{end.text}}/{{step.value}}' },
      stepFrom: { text: '{{start.text}}/{{step.value}}' },
    },
    month: {
      '*': { prefix: 'дар' },
      any: { text: 'ҳар моҳ' },
      value: { text: '{{value.alt}}' },
      range: { text: 'моҳҳои аз {{start.alt}} то {{end.alt}}' },
      rangeStep: { text: 'моҳҳои аз {{start.alt}} то {{end.alt}}/{{step.value}}' },
      stepFrom: { text: 'моҳҳои {{start.alt}}/{{step.value}}' },
      step: { text: 'ҳар {{step.value}} моҳ' },
    },
    day: {
      '*': { prefix: 'дар' },
      any: { text: 'ҳар рӯз' },
      value: { text: 'рӯзи {{value.text}}' },
      range: { text: 'рӯзҳои аз {{start.text}} то {{end.text}}' },
      rangeStep: { text: 'рӯзҳои аз {{start.text}} то {{end.text}}/{{step.value}}' },
      stepFrom: { text: 'рӯзҳои {{start.text}}/{{step.value}}' },
      step: { text: 'ҳар {{step.value}} рӯз' },
      noSpecific: { text: 'рӯзи муайян нест' },
    },
    dayOfWeek: {
      '*': { prefix: 'дар' },
      any: { text: 'ҳар рӯзи ҳафта' },
      value: { text: 'рӯзи {{value.alt}}' },
      range: { text: 'рӯзҳои аз {{start.alt}} то {{end.alt}}' },
      rangeStep: { text: 'рӯзҳои аз {{start.alt}} то {{end.alt}}/{{step.value}}' },
      stepFrom: { text: 'рӯзҳои {{start.alt}}/{{step.value}}' },
      noSpecific: { text: 'рӯзи муайяни ҳафта нест' },
    },
    hour: {
      '*': { prefix: 'дар' },
      any: { text: 'ҳар соат' },
      value: { text: 'соати {{value.text}}' },
      range: { text: 'соатҳои аз {{start.text}} то {{end.text}}' },
      rangeStep: { text: 'соатҳои аз {{start.text}} то {{end.text}}/{{step.value}}' },
      stepFrom: { text: 'соатҳои {{start.text}}/{{step.value}}' },
      step: { text: 'ҳар {{step.value}} соат' },
    },
    minute: {
      '*': { prefix: ':' },
      any: { text: 'ҳар дақиқа' },
      step: { text: 'ҳар {{step.value}} дақиқа' },
    },
    second: {
      '*': { prefix: ':' },
      any: { text: 'ҳар сония' },
      step: { text: 'ҳар {{step.value}} сония' },
    },
  },
  minute: { text: 'Дақиқа' },
  hour: {
    text: 'Соат',
    minute: {
      '*': { prefix: 'дар', suffix: 'дақиқа' },
      any: { text: 'ҳар' },
      step: { suffix: '' },
    },
  },
  day: { text: 'Рӯз' },
  week: { text: 'Ҳафта' },
  month: { text: 'Моҳ', dayOfWeek: { '*': { prefix: 'ва' } } },
  year: { text: 'Сол', dayOfWeek: { '*': { prefix: 'ва' } } },

  //quartz format
  'q-second': { text: 'Сония' },
  'q-minute': {
    text: 'Дақиқа',
    second: {
      '*': { prefix: 'дар', suffix: 'сония' },
      any: { text: 'ҳар' },
      step: { suffix: '' },
    },
  },
  'q-hour': {
    text: 'Соат',
    minute: { '*': { prefix: 'дар' } },
    second: { '*': { prefix: 'ва' } },
  },
}

export default locale

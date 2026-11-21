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
      step: { prefix: '', text: 'ҳар {{step.value}} моҳ' },
    },
    day: {
      '*': { prefix: 'дар' },
      any: { text: 'ҳар рӯз' },
      value: { text: 'рӯзи {{value.text}}' },
      range: { text: 'рӯзҳои аз {{start.text}} то {{end.text}}' },
      rangeStep: { text: 'рӯзҳои аз {{start.text}} то {{end.text}}/{{step.value}}' },
      stepFrom: { text: 'рӯзҳои {{start.text}}/{{step.value}}' },
      step: { prefix: '', text: 'ҳар {{step.value}} рӯз' },
      noSpecific: { prefix: '', text: '(рӯзи моҳ муайян нашудааст)' },
      lastDay: { text: 'рӯзи охирин' },
      lastDayOffset: { prefix: '', text: '{{offset.text}} рӯз пеш аз охири моҳ' },
      lastWeekday: { text: 'рӯзи кории охирини моҳ' },
      nearestWeekday: { text: 'рӯзи кории наздиктарин ба санаи {{value.text}}' },
    },
    dayOfWeek: {
      '*': { prefix: 'дар' },
      any: { text: 'ҳар рӯзи ҳафта' },
      value: { text: 'рӯзи {{value.alt}}' },
      range: { text: 'рӯзҳои аз {{start.alt}} то {{end.alt}}' },
      rangeStep: { text: 'рӯзҳои аз {{start.alt}} то {{end.alt}}/{{step.value}}' },
      stepFrom: { text: 'рӯзҳои {{start.alt}}/{{step.value}}' },
      noSpecific: { prefix: '', text: '(рӯзи ҳафта муайян нашудааст)' },
      step: { prefix: '', text: 'ҳар {{step.value}} рӯз' },
    },
    hour: {
      '*': { prefix: 'дар' },
      any: { text: 'ҳар соат' },
      value: { text: 'соати {{value.text}}' },
      range: { text: 'соатҳои аз {{start.text}} то {{end.text}}' },
      rangeStep: { text: 'соатҳои аз {{start.text}} то {{end.text}}/{{step.value}}' },
      stepFrom: { text: 'соатҳои {{start.text}}/{{step.value}}' },
      step: { prefix: '', text: 'ҳар {{step.value}} соат' },
    },
    minute: {
      '*': { prefix: ':' },
      any: { text: 'ҳар дақиқа' },
      step: { prefix: '', text: 'ҳар {{step.value}} дақиқа' },
    },
    second: {
      '*': { prefix: ':' },
      any: { text: 'ҳар сония' },
      step: { prefix: '', text: 'ҳар {{step.value}} сония' },
    },
  },
  minute: { text: 'дақиқа' },
  hour: {
    text: 'соат',
    minute: {
      '*': { prefix: 'дар дақиқаи', suffix: '' },
      any: { prefix: '', text: 'ҳар дақиқа' },
    },
  },
  day: { text: 'рӯз' },
  week: { text: 'ҳафта' },
  month: { text: 'моҳ' },
  year: { text: 'сол' },

  //quartz format
  'q-second': { text: 'сония' },
  'q-minute': {
    text: 'дақиқа',
    second: {
      '*': { prefix: 'дар сонияи', suffix: '' },
      any: { prefix: '', text: 'ҳар сония' },
    },
  },
  'q-hour': {
    text: 'соат',
    minute: {
      '*': { prefix: 'дар дақиқаи' },
      any: { prefix: '' },
    },
    second: {
      '*': { prefix: 'дар сонияи' },
      any: { prefix: '' },
    },
  },
}

export default locale

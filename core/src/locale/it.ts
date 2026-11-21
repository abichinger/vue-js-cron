import type { Localization } from './types'

/**
 * Italian localization
 */
const locale: Localization = {
  '*': {
    prefix: 'Ogni',
    suffix: '',
    text: 'Sconosciuto',
    '*': {
      value: { text: '{{value.text}}' },
      range: { text: '{{start.text}}-{{end.text}}' },
      step: { text: 'ogni {{step.value}}' },
    },
    month: {
      '*': { prefix: 'in' },
      any: { prefix: '', text: 'ogni mese' },
      value: { text: '{{value.alt}}' },
      range: { text: '{{start.alt}}-{{end.alt}}' },
      step: { prefix: '', text: 'ogni {{step.value}} mesi' },
    },
    day: {
      '*': { prefix: 'il' },
      any: { prefix: '', text: 'ogni giorno' },
      step: { prefix: '', text: 'ogni {{step.value}} giorni' },
      noSpecific: { prefix: '', text: '(giorno del mese non specificato)' },
      lastDay: { prefix: '', text: "l'ultimo giorno" },
      lastDayOffset: { prefix: '', text: "{{offset.text}} gg. prima dell'ultimo giorno" },
      lastWeekday: { prefix: '', text: "l'ultimo giorno feriale" },
      nearestWeekday: { text: 'giorno feriale più vicino al {{value.text}}' },
    },
    dayOfWeek: {
      '*': { prefix: 'il' },
      any: { prefix: '', text: 'ogni giorno della settimana' },
      value: { text: '{{value.alt}}' },
      range: { prefix: '', text: 'da {{start.alt}} a {{end.alt}}' },
      noSpecific: { prefix: '', text: '(giorno della settimana non specificato)' },
      step: { prefix: '', text: 'ogni {{step.value}} giorni' },
    },
    hour: {
      '*': { prefix: 'alle' },
      any: { prefix: '', text: 'ogni ora' },
      step: { prefix: '', text: 'ogni {{step.value}} ore' },
    },
    minute: {
      '*': { prefix: ':' },
      any: { text: 'ogni minuto' },
      step: { prefix: '', text: 'ogni {{step.value}} minuti' },
    },
    second: {
      '*': { prefix: ':' },
      any: { text: 'ogni secondo' },
      step: { prefix: '', text: 'ogni {{step.value}} secondi' },
    },
  },
  minute: { text: 'minuto' },
  hour: {
    text: 'ora',
    minute: {
      '*': { prefix: 'al minuto', suffix: '' },
      any: { prefix: '', text: 'ogni minuto' },
    },
  },
  day: { prefix: 'Ogni', text: 'giorno' },
  week: { text: 'settimana' },
  month: { prefix: 'Ogni', text: 'mese' },
  year: { prefix: 'Ogni', text: 'anno' },

  //quartz format
  'q-second': { text: 'secondo' },
  'q-minute': {
    text: 'minuto',
    second: {
      '*': { prefix: 'al secondo', suffix: '' },
      any: { prefix: '', text: 'ogni secondo' },
    },
  },
  'q-hour': {
    text: 'ora',
    minute: { '*': { prefix: 'al minuto' }, any: { prefix: '' } },
    second: {
      '*': { prefix: 'al secondo' },
      any: { prefix: '' },
    },
  },
}

export default locale

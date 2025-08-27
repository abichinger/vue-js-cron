import type { Localization } from './types'

/**
 * French localization generated with GPT-4
 */
const locale: Localization = {
    '*': {
    prefix: 'Tutti',
    suffix: '',
    text: 'Sconosciuto',
    '*': {
      value: { text: '{{value.text}}' },
      range: { text: '{{start.text}}-{{end.text}}' },
      step: { text: 'ogni {{step.value}}' },
    },
    month: {
      '*': { prefix: 'in' },
      any: { prefix: 'in', text: 'ogni mese' },
      value: { text: '{{value.alt}}' },
      range: { text: '{{start.alt}}-{{end.alt}}' },
    },
    day: {
      '*': { prefix: 'il' },
      any: { prefix: 'il', text: 'ogni giorno' },
      step: { prefix: '', text: 'ogni {{step.value}} giorni' },
      noSpecific: { prefix: 'il', text: 'nessun giorno specifico' },
    },
    dayOfWeek: {
      '*': { prefix: 'il' },
      any: { prefix: 'il', text: 'ogni giorno della settimana' },
      value: { text: '{{value.alt}}' },
      range: { text: '{{start.alt}}-{{end.alt}}' },
      noSpecific: { prefix: 'e', text: 'nessun giorno della settimana specifico' },
    },
    hour: {
      '*': { prefix: 'alle' },
      any: { prefix: 'alle', text: 'ogni ora' },
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
  minute: { text: 'Minuto' },
  hour: {
    text: 'Ora',
    minute: { '*': { prefix: 'al', suffix: 'minuto/i' }, any: { text: 'tutti' } },
  },
  day: { prefix: 'Tutti', text: 'Giorno' },
  week: { text: 'Settimana' },
  month: { prefix: 'Tutti', text: 'Mese' },
  year: { prefix: 'Tutti', text: 'Anno' },

  //quartz format
  'q-second': { text: 'Secondo' },
  'q-minute': { text: 'Minuto', second: { '*': { prefix: 'e' } } },
  'q-hour': { text: 'Ora', minute: { '*': { prefix: 'e' } }, second: { '*': { prefix: 'e' } } },
}

export default locale

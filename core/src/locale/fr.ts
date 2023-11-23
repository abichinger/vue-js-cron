import type { Localization } from './types'

/**
 * French localization generated with GPT-4
 */
const locale: Localization = {
  '*': {
    prefix: 'Toutes',
    suffix: '',
    text: 'Inconnu',
    '*': {
      value: { text: '{{value.text}}' },
      range: { text: '{{start.text}}-{{end.text}}' },
      everyX: { text: 'tous les {{every.value}}' },
    },
    month: {
      '*': { prefix: 'en' },
      empty: { prefix: 'en', text: 'tous les mois' },
      value: { text: '{{value.alt}}' },
      range: { text: '{{start.alt}}-{{end.alt}}' },
    },
    day: {
      '*': { prefix: 'le' },
      empty: { prefix: 'à', text: 'tous les jours' },
      everyX: { prefix: '', text: 'tous les {{every.value}} jours' },
      noSpecific: { prefix: 'à', text: 'aucun jour particulier' },
    },
    dayOfWeek: {
      '*': { prefix: 'le' },
      empty: { prefix: 'à', text: 'tous les jours de la semaine' },
      value: { text: '{{value.alt}}' },
      range: { text: '{{start.alt}}-{{end.alt}}' },
      noSpecific: { prefix: 'et', text: 'aucun jour de la semaine particulier' },
    },
    hour: {
      '*': { prefix: 'à' },
      empty: { prefix: 'à', text: 'toutes les heures' },
      everyX: { prefix: '', text: 'toutes les {{every.value}} heures' },
    },
    minute: {
      '*': { prefix: ':' },
      empty: { text: 'toutes les minutes' },
      everyX: { prefix: '', text: 'toutes les {{every.value}} minutes' },
    },
    second: {
      '*': { prefix: ':' },
      empty: { text: 'toutes les secondes' },
      everyX: { prefix: '', text: 'toutes les {{every.value}} secondes' },
    },
  },
  minute: { text: 'Minute' },
  hour: {
    text: 'Heure',
    minute: { '*': { prefix: 'à', suffix: 'minute(s)' }, empty: { text: 'toutes' } },
  },
  day: { prefix: 'Tous', text: 'Jour' },
  week: { text: 'Semaine' },
  month: { prefix: 'Tous', text: 'Mois' },
  year: { prefix: 'Tous', text: 'Année' },

  //quartz format
  'q-second': { text: 'Seconde' },
  'q-minute': { text: 'Minute', second: { '*': { prefix: 'et' } } },
  'q-hour': { text: 'Heure', minute: { '*': { prefix: 'et' } }, second: { '*': { prefix: 'et' } } },
}

export default locale

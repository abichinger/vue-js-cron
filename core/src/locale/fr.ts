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
      step: { text: 'tous les {{step.value}}' },
    },
    month: {
      '*': { prefix: 'en' },
      any: { prefix: 'en', text: 'tous les mois' },
      value: { text: '{{value.alt}}' },
      range: { text: '{{start.alt}}-{{end.alt}}' },
    },
    day: {
      '*': { prefix: 'le' },
      any: { prefix: 'à', text: 'tous les jours' },
      step: { prefix: '', text: 'tous les {{step.value}} jours' },
      noSpecific: { prefix: 'à', text: 'aucun jour particulier' },
    },
    dayOfWeek: {
      '*': { prefix: 'le' },
      any: { prefix: 'à', text: 'tous les jours de la semaine' },
      value: { text: '{{value.alt}}' },
      range: { text: '{{start.alt}}-{{end.alt}}' },
      noSpecific: { prefix: 'et', text: 'aucun jour de la semaine particulier' },
    },
    hour: {
      '*': { prefix: 'à' },
      any: { prefix: 'à', text: 'toutes les heures' },
      step: { prefix: '', text: 'toutes les {{step.value}} heures' },
    },
    minute: {
      '*': { prefix: ':' },
      any: { text: 'toutes les minutes' },
      step: { prefix: '', text: 'toutes les {{step.value}} minutes' },
    },
    second: {
      '*': { prefix: ':' },
      any: { text: 'toutes les secondes' },
      step: { prefix: '', text: 'toutes les {{step.value}} secondes' },
    },
  },
  minute: { text: 'Minute' },
  hour: {
    text: 'Heure',
    minute: { '*': { prefix: 'à', suffix: 'minute(s)' }, any: { text: 'toutes' } },
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

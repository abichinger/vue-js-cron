import type { Localization } from './types'

/**
 * French localization generated with GPT-4
 */
const locale: Localization = {
  '*': {
    prefix: 'Chaque',
    suffix: '',
    text: 'Inconnu',
    '*': {
      value: { text: '{{value.text}}' },
      range: { text: '{{start.text}}-{{end.text}}' },
      step: { text: 'tous les {{step.value}}' },
    },
    month: {
      '*': { prefix: 'en' },
      any: { prefix: '', text: 'tous les mois' },
      value: { text: '{{value.alt}}' },
      range: { text: '{{start.alt}}-{{end.alt}}' },
      step: { prefix: '', text: 'tous les {{step.value}} mois' },
    },
    day: {
      '*': { prefix: 'le' },
      any: { prefix: '', text: 'tous les jours' },
      step: { prefix: '', text: 'tous les {{step.value}} jours' },
      noSpecific: { prefix: '', text: '(jour du mois non précisé)' },
      lastDay: { text: 'dernier jour' },
      lastDayOffset: { prefix: '', text: '{{offset.text}} jour(s) avant le dernier jour' },
      lastWeekday: { text: 'dernier jour ouvré' },
      nearestWeekday: { text: 'jour ouvré le plus proche du {{value.text}}' },
    },
    dayOfWeek: {
      '*': { prefix: 'le' },
      any: { prefix: '', text: 'tous les jours de la semaine' },
      value: { text: '{{value.alt}}' },
      range: { prefix: '', text: 'du {{start.alt}} au {{end.alt}}' },
      noSpecific: { prefix: '', text: '(jour de la semaine non précisé)' },
      step: { prefix: '', text: 'tous les {{step.value}} jours' },
    },
    hour: {
      '*': { prefix: 'à' },
      any: { prefix: '', text: 'toutes les heures' },
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
  minute: { text: 'minute' },
  hour: {
    text: 'heure',
    minute: {
      '*': { prefix: 'à la minute', suffix: '' },
      any: { prefix: '', text: 'chaque minute' },
    },
  },
  day: { prefix: 'Chaque', text: 'jour' },
  week: { text: 'semaine' },
  month: { prefix: 'Chaque', text: 'mois' },
  year: { prefix: 'Chaque', text: 'année' },

  //quartz format
  'q-second': { text: 'seconde' },
  'q-minute': {
    text: 'minute',
    second: {
      '*': { prefix: 'à la seconde', suffix: '' },
      any: { prefix: '', text: 'chaque seconde' },
    },
  },
  'q-hour': {
    text: 'heure',
    minute: {
      '*': { prefix: 'à la minute' },
      any: { prefix: '' },
    },
    second: {
      '*': { prefix: 'à la seconde' },
      any: { prefix: '', text: 'chaque seconde' },
    },
  },
}

export default locale

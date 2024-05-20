import type { Localization } from './types'

const locale: Localization = {
  '*': {
    prefix: 'Każdy',
    suffix: '',
    text: 'Nieznany',
    '*': {
      empty: { text: 'każdy {{field.id}}' },
      value: { text: '{{value.text}}' },
      range: { text: '{{start.text}}-{{end.text}}' },
      everyX: { text: 'co {{every.value}}' },
    },
    month: {
      '*': { prefix: 'w' },
      value: { text: '{{value.alt}}' },
      range: { text: '{{start.alt}}-{{end.alt}}' },
    },
    day: {
      '*': { prefix: 'w' },
      noSpecific: {
        text: 'bez określonego dnia',
      },
    },
    dayOfWeek: {
      '*': { prefix: 'w' },
      empty: { text: 'każdy dzień tygodnia' },
      value: { text: '{{value.alt}}' },
      range: { text: '{{start.alt}}-{{end.alt}}' },
      noSpecific: {
        text: 'bez określonego dnia tygodnia',
      },
    },
    hour: {
      '*': { prefix: 'o' },
    },
    minute: {
      '*': { prefix: ':' },
    },
    second: {
      '*': { prefix: ':' },
    },
  },
  minute: {
    text: 'Minuta',
  },
  hour: {
    text: 'Godzina',
    minute: {
      '*': {
        prefix: 'o',
        suffix: 'minut(a)',
      },
      empty: { text: 'każda' },
    },
  },
  day: {
    text: 'Dzień',
  },
  week: {
    text: 'Tydzień',
  },
  month: {
    text: 'Miesiąc',
    dayOfWeek: {
      '*': { prefix: 'i' },
    },
  },
  year: {
    text: 'Rok',
    dayOfWeek: {
      '*': { prefix: 'i' },
    },
  },

  //quartz format
  'q-second': {
    text: 'Sekunda',
  },
  'q-minute': {
    text: 'Minuta',
    second: {
      '*': {
        prefix: 'o',
        suffix: 'sekund(a)',
      },
      empty: { text: 'każda' },
    },
  },
  'q-hour': {
    text: 'Godzina',
    minute: {
      '*': {
        prefix: 'o',
      },
    },
  },
}

export default locale

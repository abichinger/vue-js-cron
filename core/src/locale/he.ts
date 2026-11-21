import type { Localization } from './types'

const locale: Localization = {
  '*': {
    prefix: 'בכל',
    suffix: '',
    text: 'לא ידוע',
    '*': {
      value: { text: '{{value.text}}' },
      range: { text: '{{start.text}}-{{end.text}}' },
      step: { text: 'כל {{step.value}}' },
    },
    month: {
      '*': { prefix: '' },
      any: { text: 'בכל חודש' },
      value: { text: 'ב{{value.alt}}' },
      range: { text: 'מ{{start.alt}} עד {{end.alt}}' },
      step: { prefix: '', text: 'כל {{step.value}} חודשים' },
    },
    day: {
      '*': { prefix: '' },
      any: { text: 'בכל יום' },
      value: { text: 'ביום {{value.alt}} בחודש' },
      range: { text: 'מיום {{start.text}} עד יום {{end.text}} בחודש' },
      noSpecific: { prefix: '', text: '(לא צוין יום בחודש)' },
      lastDay: { text: 'ביום האחרון בחודש' },
      lastDayOffset: { prefix: '', text: '{{offset.text}} ימים לפני היום האחרון בחודש' },
      lastWeekday: { text: 'ביום האחרון בחודש שחל בין שני לשישי' },
      nearestWeekday: { text: 'ביום הקרוב ביותר ל־{{value.text}} בחודש שחל בין שני לשישי' },
      step: { prefix: '', text: 'כל {{step.value}} ימים' },
    },
    dayOfWeek: {
      '*': { prefix: '' },
      any: { text: 'בכל יום בשבוע' },
      value: { text: 'ב{{value.alt}}' },
      range: { text: 'מ{{start.alt}} עד {{end.alt}}' },
      noSpecific: { prefix: '', text: '(לא צוין יום בשבוע)' },
      step: { prefix: '', text: 'כל {{step.value}} ימים' },
    },
    hour: {
      '*': { prefix: '' },
      any: { text: 'בכל שעה' },
      value: { text: 'בשעה {{value.text}}' },
      range: { text: 'משעה {{start.text}} עד שעה {{end.text}}' },
      step: { prefix: '', text: 'כל {{step.value}} שעות' },
    },
    minute: {
      '*': { prefix: ':' },
      any: { text: 'כל דקה' },
      step: { prefix: '', text: 'כל {{step.value}} דקות' },
    },
    second: {
      '*': { prefix: ':' },
      any: { text: 'כל שנייה' },
      step: { prefix: '', text: 'כל {{step.value}} שניות' },
    },
  },
  minute: {
    text: 'דקה',
  },
  hour: {
    text: 'שעה',
    minute: {
      '*': {
        prefix: 'בדקה',
        suffix: '',
      },
      any: { prefix: '', text: 'בכל דקה' },
    },
  },
  day: {
    text: 'יום',
  },
  week: {
    text: 'שבוע',
  },
  month: {
    text: 'חודש',
  },
  year: {
    text: 'שנה',
  },

  //quartz format
  'q-second': {
    text: 'שנייה',
  },
  'q-minute': {
    text: 'דקה',
    second: {
      '*': {
        prefix: 'בשנייה',
        suffix: '',
      },
      any: { prefix: '', text: 'בכל שנייה' },
    },
  },
  'q-hour': {
    text: 'שעה',
    minute: {
      '*': {
        prefix: 'בדקה',
      },
      any: { prefix: '', text: 'בכל דקה' },
    },
    second: {
      '*': { prefix: 'בשנייה' },
      any: { prefix: '', text: 'בכל שנייה' },
    },
  },
}

export default locale

import type { Localization } from './types'

const locale: Localization = {
  '*': {
    prefix: '',
    suffix: '',
    text: '알 수 없음',
    '*': {
      value: { text: '{{value.text}}' },
      range: { text: '{{start.text}}-{{end.text}}' },
      step: { text: '{{step.value}}마다' },
    },
    month: {
      '*': { prefix: '' },
      any: { prefix: '', text: '매월' },
      value: { text: '{{value.alt}}' },
      range: { text: '{{start.alt}}-{{end.alt}}' },
      step: { prefix: '', text: '{{step.value}}개월마다' },
    },
    day: {
      '*': { prefix: '' },
      any: { prefix: '', text: '매일' },
      step: { prefix: '', text: '{{step.value}}일마다' },
      noSpecific: { prefix: '', text: '(일자 미지정)' },
      lastDay: { text: '마지막 날' },
      lastDayOffset: { text: '마지막 날 {{offset.text}}일 전' },
      lastWeekday: { text: '마지막 평일' },
      nearestWeekday: { text: '{{value.text}}일에 가장 가까운 평일' },
    },
    dayOfWeek: {
      '*': { prefix: '' },
      any: { prefix: '', text: '요일에 관계없이' },
      value: { text: '{{value.alt}}' },
      range: { text: '{{start.alt}}-{{end.alt}}' },
      noSpecific: { prefix: '', text: '(요일 미지정)' },
      step: { prefix: '', text: '{{step.value}}일마다' },
    },
    hour: {
      '*': { prefix: '' },
      any: { prefix: '', text: '매시간' },
      step: { prefix: '', text: '{{step.value}}시간마다' },
    },
    minute: {
      '*': { prefix: ':' },
      any: { text: '매분' },
      step: { prefix: '', text: '{{step.value}}분마다' },
    },
    second: {
      '*': { prefix: ':' },
      any: { text: '매초' },
      step: { prefix: '', text: '{{step.value}}초마다' },
    },
  },
  minute: { text: '매분' },
  hour: {
    text: '매시간',
    minute: {
      '*': { prefix: '', suffix: '분' },
      any: { text: '매분', suffix: '' },
    },
  },
  day: { text: '매일' },
  week: { text: '매주' },
  month: { text: '매월' },
  year: { text: '매년' },

  //quartz format
  'q-second': { text: '매초' },
  'q-minute': {
    text: '매분',
    second: {
      '*': { prefix: '', suffix: '초' },
      any: { text: '매초', suffix: '' },
    },
  },
  'q-hour': {
    text: '매시간',
    minute: {
      '*': { prefix: '', suffix: '분' },
      any: { suffix: '' },
    },
    second: {
      '*': { prefix: '', suffix: '초' },
      any: { suffix: '' },
    },
  },
}

export default locale

import type { Localization } from './types'

/**
 * Japanese localization generated with GPT-4
 */
const locale: Localization = {
  '*': {
    prefix: '',
    suffix: '',
    text: '不明',
    '*': {
      value: { text: '{{value.text}}' },
      range: { text: '{{start.text}}-{{end.text}}' },
      step: { text: '{{step.value}}ごとに' },
    },
    month: {
      '*': { prefix: '' },
      any: { prefix: '', text: '毎月' },
      value: { text: '{{value.alt}}' },
      range: { text: '{{start.alt}}-{{end.alt}}' },
      step: { prefix: '', text: '{{step.value}}か月ごと' },
    },
    day: {
      '*': { prefix: 'の' },
      any: { prefix: '', text: '毎日' },
      step: { prefix: '', text: '{{step.value}}日ごと' },
      noSpecific: { prefix: '', text: '（日付の指定なし）' },
      lastDay: { text: '最終日' },
      lastDayOffset: { text: '最終日の{{offset.text}}日前' },
      lastWeekday: { text: '最後の平日' },
      nearestWeekday: { text: '{{value.text}}日に最も近い平日' },
    },
    dayOfWeek: {
      '*': { prefix: '' },
      any: { prefix: '', text: '曜日を問わず' },
      value: { text: '{{value.alt}}' },
      range: { text: '{{start.alt}}-{{end.alt}}' },
      noSpecific: { prefix: '', text: '（曜日の指定なし）' },
      step: { prefix: '', text: '{{step.value}}日ごと' },
    },
    hour: {
      '*': { prefix: 'の' },
      any: { prefix: '', text: '毎時' },
      step: { prefix: '', text: '{{step.value}}時間ごと' },
    },
    minute: {
      '*': { prefix: ':' },
      any: { text: '毎分' },
      step: { prefix: '', text: '{{step.value}}分ごと' },
    },
    second: {
      '*': { prefix: ':' },
      any: { text: '毎秒' },
      step: { prefix: '', text: '{{step.value}}秒ごと' },
    },
  },
  minute: { text: '毎分' },
  hour: {
    text: '毎時',
    minute: {
      '*': { prefix: '', suffix: '分' },
      any: { text: '毎分', suffix: '' },
    },
  },
  day: { text: '毎日' },
  week: { text: '毎週' },
  month: { text: '毎月' },
  year: { text: '毎年' },

  //quartz format
  'q-second': { text: '毎秒' },
  'q-minute': {
    text: '毎分',
    second: {
      '*': { prefix: '', suffix: '秒' },
      any: { text: '毎秒', suffix: '' },
    },
  },
  'q-hour': {
    text: '毎時',
    minute: {
      '*': { prefix: '', suffix: '分' },
      any: { suffix: '' },
    },
    second: {
      '*': { prefix: '', suffix: '秒' },
      any: { suffix: '' },
    },
  },
}

export default locale

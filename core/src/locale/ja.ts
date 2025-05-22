import type { Localization } from './types'

/**
 * Japanese localization generated with GPT-4
 */
const locale: Localization = {
  '*': {
    prefix: '毎',
    suffix: '',
    text: '不明',
    '*': {
      value: { text: '{{value.text}}' },
      range: { text: '{{start.text}}-{{end.text}}' },
      step: { text: '{{step.value}}ごとに' },
    },
    month: {
      '*': { prefix: 'に' },
      any: { prefix: 'の', text: '毎月' },
      value: { text: '{{value.alt}}' },
      range: { text: '{{start.alt}}-{{end.alt}}' },
    },
    day: {
      '*': { prefix: 'の' },
      any: { prefix: 'に', text: '毎日' },
      step: { prefix: '', text: '{{step.value}}日ごとに' },
      noSpecific: { prefix: 'に', text: '特定の日はなし' },
    },
    dayOfWeek: {
      '*': { prefix: 'の' },
      any: { prefix: 'に', text: '毎週' },
      value: { text: '{{value.alt}}' },
      range: { text: '{{start.alt}}-{{end.alt}}' },
      noSpecific: { prefix: 'と', text: '特定の曜日はなし' },
    },
    hour: {
      '*': { prefix: 'の' },
      any: { prefix: 'に', text: '毎時' },
      step: { prefix: '', text: '{{step.value}}時間ごとに' },
    },
    minute: {
      '*': { prefix: ':' },
      any: { text: '毎分' },
      step: { prefix: '', text: '{{step.value}}分ごとに' },
    },
    second: {
      '*': { prefix: ':' },
      any: { text: '毎秒' },
      step: { prefix: '', text: '{{step.value}}秒ごとに' },
    },
  },
  minute: { text: '分' },
  hour: { text: '時', minute: { '*': { prefix: 'に', suffix: '分' }, any: { text: '毎' } } },
  day: { prefix: '毎', text: '日' },
  week: { text: '週' },
  month: { prefix: '毎', text: '月' },
  year: { prefix: '毎', text: '年' },

  //quartz format
  'q-second': { text: '秒' },
  'q-minute': { text: '分', second: { '*': { prefix: 'と' } } },
  'q-hour': { text: '時', minute: { '*': { prefix: 'と' } }, second: { '*': { prefix: 'と' } } },
}

export default locale

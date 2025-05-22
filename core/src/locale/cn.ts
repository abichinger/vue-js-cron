import type { Localization } from './types'

const locale: Localization = {
  '*': {
    prefix: '每',
    suffix: '',
    text: '未知',
    '*': {
      any: { text: '每 {{field.id}}' },
      value: { text: '{{value.text}}' },
      range: { text: '{{start.text}}-{{end.text}}' },
      step: { text: '每 {{step.value}}' },
    },
    month: {
      '*': { prefix: '的' },
      any: { text: '每月' },
      value: { text: '{{value.alt}}' },
      range: { text: '{{start.alt}}-{{end.alt}}' },
    },
    day: {
      '*': { prefix: '的' },
      any: { text: '每日' },
      value: { text: '{{value.alt}}号' },
      range: { text: '{{start.alt}}号-{{end.alt}}号' },
      noSpecific: {
        text: '无特定日期',
      },
    },
    dayOfWeek: {
      '*': { prefix: '的' },
      any: { text: '一周的每一天' },
      value: { text: '{{value.alt}}' },
      range: { text: '{{start.alt}}-{{end.alt}}' },
      noSpecific: {
        text: '无特定星期几',
      },
    },
    hour: {
      '*': { prefix: '的' },
      any: { text: '每小时' },
    },
    minute: {
      '*': { prefix: ':' },
      any: { text: '每分钟' },
    },
    second: {
      '*': { prefix: ':' },
      any: { text: '每秒' },
    },
  },
  minute: {
    text: '分',
  },
  hour: {
    text: '小时',
    minute: {
      '*': {
        prefix: ':',
        suffix: '分钟',
      },
      any: { text: '每' },
    },
  },
  day: {
    text: '天',
  },
  week: {
    text: '周',
    dayOfWeek: {
      '*': { prefix: '的' },
      any: { text: '每天' },
      value: { text: '{{value.alt}}' },
      range: { text: '{{start.alt}}-{{end.alt}}' },
    },
  },
  month: {
    text: '月',
    dayOfWeek: {
      '*': { prefix: '和' },
    },
    day: {
      '*': { prefix: '的' },
    },
  },
  year: {
    text: '年',
    dayOfWeek: {
      '*': { prefix: '和' },
    },
  },

  //quartz format
  'q-second': {
    text: '秒',
  },
  'q-minute': {
    text: '分钟',
    second: {
      '*': {
        prefix: ':',
        suffix: '秒',
      },
      any: { text: '每' },
    },
  },
  'q-hour': {
    text: '小时',
    minute: {
      '*': {
        prefix: ':',
      },
    },
  },
}

export default locale

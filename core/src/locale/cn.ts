import type { Localization } from './types'

const locale: Localization = {
  '*': {
    prefix: '',
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
      step: { prefix: '', text: '每隔{{step.value}}个月' },
    },
    day: {
      '*': { prefix: '的' },
      any: { text: '每日' },
      value: { text: '{{value.alt}}号' },
      range: { text: '{{start.alt}}号-{{end.alt}}号' },
      noSpecific: { prefix: '', text: '（未指定日期）' },
      lastDay: { text: '最后一天' },
      lastDayOffset: { text: '最后一天前{{offset.text}}天' },
      lastWeekday: { text: '月末最后一个平日' },
      nearestWeekday: { text: '最接近{{value.text}}号的平日' },
      step: { prefix: '', text: '每隔{{step.value}}天' },
    },
    dayOfWeek: {
      '*': { prefix: '的' },
      any: { text: '一周中的每一天' },
      value: { text: '{{value.alt}}' },
      range: { text: '{{start.alt}}-{{end.alt}}' },
      noSpecific: { prefix: '', text: '（未指定星期几）' },
      step: { prefix: '', text: '按{{step.value}}天间隔' },
    },
    hour: {
      '*': { prefix: '的' },
      any: { text: '每小时' },
      step: { prefix: '', text: '每隔{{step.value}}小时' },
    },
    minute: {
      '*': { prefix: ':' },
      any: { text: '每分钟' },
      step: { prefix: '', text: '每隔{{step.value}}分钟' },
    },
    second: {
      '*': { prefix: ':' },
      any: { text: '每秒' },
      step: { prefix: '', text: '每隔{{step.value}}秒' },
    },
  },
  minute: {
    text: '每分钟',
  },
  hour: {
    text: '每小时',
    minute: {
      '*': {
        prefix: '的第',
        suffix: '分钟',
      },
      any: { prefix: '', text: '每' },
    },
  },
  day: {
    text: '每天',
  },
  week: {
    text: '每周',
  },
  month: {
    text: '每月',
  },
  year: {
    text: '每年',
  },

  //quartz format
  'q-second': {
    text: '每秒',
  },
  'q-minute': {
    text: '每分钟',
    second: {
      '*': {
        prefix: '的第',
        suffix: '秒',
      },
      any: { prefix: '', text: '每' },
    },
  },
  'q-hour': {
    text: '每小时',
    minute: {
      '*': {
        prefix: '的第',
        suffix: '分钟',
      },
      any: { prefix: '', suffix: '' },
    },
    second: {
      '*': { prefix: '的第', suffix: '秒' },
      any: { suffix: '' },
    },
  },
}

export default locale

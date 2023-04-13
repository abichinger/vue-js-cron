export default {
  '*': {
    prefix: '每',
    suffix: '',
    text: '未知',
    '*': {
      empty: { text: '每 {{field.id}}' },
      value: { text: '{{val.text}}' },
      range: { text: '{{start.text}}-{{end.text}}' },
      everyX: { text: '每 {{every.value}}' }
    },
    month: {
      '*': { prefix: '的' },
      empty: { text: "每月" },
      value: { text: '{{val.alt}}' },
      range: { text: '{{start.alt}}-{{end.alt}}' }
    },
    day: {
      '*': { prefix: '的' },
      empty: { text: '每日' },
      value: { text: '{{val.alt}}号' },
      range: { text: '{{start.alt}}号-{{end.alt}}号' }
    },
    dayOfWeek: {
      '*': { prefix: '的' },
      empty: { text: '一周的每一天' },
      value: { text: '{{val.alt}}' },
      range: { text: '{{start.alt}}-{{end.alt}}' }
    },
    hour: {
      '*': { prefix: '的' },
      empty: { text: '每小时' }
    },
    minute: {
      '*': { prefix: ':' },
      empty: { text: '每分钟' }
    }
  },
  minute: {
    text: '分'
  },
  hour: {
    text: '小时',
    minute: {
      '*': {
        prefix: ':',
        suffix: '分钟'
      },
      empty: { text: '每' }
    }
  },
  day: {
    text: '天'
  },
  week: {
    text: '周',
    dayOfWeek: {
      '*': { prefix: '的' },
      empty: { text: '每天' },
      value: { text: '{{val.alt}}' },
      range: { text: '{{start.alt}}-{{end.alt}}' }
    },
  },
  month: {
    text: '月',
    dayOfWeek: {
      '*': { prefix: '和' }
    },
    day: {
      prefix: "的"
    }
  },
  year: {
    text: '年',
    dayOfWeek: {
      '*': { prefix: '和' }
    }
  }
}
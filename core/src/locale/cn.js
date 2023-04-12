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
      '*': { prefix: '在' },
      value: { text: '{{val.alt}}' },
      range: { text: '{{start.alt}}-{{end.alt}}' }
    },
    day: {
      '*': { prefix: '在' }
    },
    dayOfWeek: {
      '*': { prefix: '在' },
      empty: { text: '一周的每一天' },
      value: { text: '{{val.alt}}' },
      range: { text: '{{start.alt}}-{{end.alt}}' }
    },
    hour: {
      '*': { prefix: '在' }
    },
    minute: {
      '*': { prefix: ':' }
    }
  },
  minute: {
    text: '分'
  },
  hour: {
    text: '时',
    minute: {
      '*': {
        prefix: '在',
        suffix: '分钟(s)'
      },
      empty: { text: '每' }
    }
  },
  day: {
    text: '天'
  },
  week: {
    text: '周'
  },
  month: {
    text: '月',
    dayOfWeek: {
      '*': { prefix: '和' }
    }
  },
  year: {
    text: '年',
    dayOfWeek: {
      '*': { prefix: '和' }
    }
  }
}

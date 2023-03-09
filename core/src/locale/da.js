export default {
  '*': {
    prefix: 'Hver',
    suffix: '',
    text: 'Ukendt',
    '*': {
      empty: { text: 'hver {{field.id}}' },
      value: { text: '{{val.text}}' },
      range: { text: '{{start.text}}-{{end.text}}' },
      everyX: { text: 'hver {{every.value}}' }
    },
    month: {
      '*': { prefix: 'i' },
      value: { text: '{{val.alt}}' },
      range: { text: '{{start.alt}}-{{end.alt}}' }
    },
    day: {
      '*': { prefix: 'på' }
    },
    dayOfWeek: {
      '*': { prefix: 'på' },
      empty: { text: 'hver dag i ugen' },
      value: { text: '{{val.alt}}' },
      range: { text: '{{start.alt}}-{{end.alt}}' }
    },
    hour: {
      '*': { prefix: 'klokken' }
    },
    minute: {
      '*': { prefix: ':' }
    }
  },
  minute: {
    text: 'Minut'
  },
  hour: {
    text: 'Time',
    minute: {
      '*': {
        prefix: 'på de(t)',
        suffix: 'minutter'
      },
      empty: { text: 'hver' }
    }
  },
  day: {
    text: 'Dag'
  },
  week: {
    text: 'Uge'
  },
  month: {
    text: 'Måned',
    dayOfWeek: {
      '*': { prefix: 'og' }
    }
  },
  year: {
    text: 'År',
    dayOfWeek: {
      '*': { prefix: 'og' }
    }
  }
}

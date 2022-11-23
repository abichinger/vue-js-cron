export default {
  '*': {
    prefix: 'Todo(a)',
    suffix: '',
    text: 'Desconhecido',
    '*': {
      empty: { text: 'todo {{field.id}}' },
      value: { text: '{{val.text}}' },
      range: { text: '{{start.text}}-{{end.text}}' },
      everyX: { text: 'todo {{every.value}}' }
    },
    month: {
      '*': { prefix: 'de' },
      value: { text: '{{val.alt}}' },
      range: { text: '{{start.alt}}-{{end.alt}}' },
      empty: { text: 'todo mês' }
    },
    day: {
      '*': { prefix: 'no(s) dia(s)' },
      empty: { text: 'todos' }
    },
    dayOfWeek: {
      '*': { prefix: 'de' },
      empty: { text: 'todos dias da semana' },
      value: { text: '{{val.alt}}' },
      range: { text: '{{start.alt}}-{{end.alt}}' }
    },
    hour: {
      '*': { prefix: 'às' },
      empty: { text: 'cada hora' }
    },
    minute: {
      '*': { prefix: ':' },
      empty: { text: 'cada minuto' }
    }
  },
  minute: {
    text: 'Minuto'
  },
  hour: {
    text: 'Hora',
    minute: {
      '*': {
        prefix: 'e',
        suffix: 'minuto(s)'
      },
      empty: { text: 'cada' }
    }
  },
  day: {
    text: 'Dia'
  },
  week: {
    text: 'Semana'
  },
  month: {
    text: 'Mês',
    dayOfWeek: {
      '*': { prefix: 'e de' }
    }
  },
  year: {
    text: 'Ano',
    dayOfWeek: {
      '*': { prefix: 'e de' }
    }
  }
}

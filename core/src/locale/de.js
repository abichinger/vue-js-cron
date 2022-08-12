export default {
  '*': {
    prefix: 'Jede',
    suffix: '',
    text: 'Unknown',
    '*': {
      value: { text: '{{val.text}}' },
      range: { text: '{{start.text}}-{{end.text}}' },
      everyX: { text: 'alle {{every.value}}' }
    },
    month: {
      '*': { prefix: 'im' },
      empty: {
        prefix: 'in',
        text: 'jedem Monat'
      },
      value: { text: '{{val.alt}}' },
      range: { text: '{{start.alt}}-{{end.alt}}' }
    },
    day: {
      '*': { prefix: 'den' },
      empty: {
        prefix: 'an',
        text: 'jedem Tag'
      },
      everyX: {
        prefix: '',
        text: 'alle {{every.value}} Tage'
      }
    },
    dayOfWeek: {
      '*': { prefix: 'am' },
      empty: {
        prefix: 'an',
        text: 'jedem Wochentag'
      },
      value: { text: '{{val.alt}}' },
      range: { text: '{{start.alt}}-{{end.alt}}' }
    },
    hour: {
      '*': { prefix: 'um' },
      empty: {
        prefix: 'zu',
        text: 'jeder Stunde'
      },
      everyX: {
        prefix: '',
        text: 'alle {{every.value}} Stunden'
      }
    },
    minute: {
      '*': { prefix: ':' },
      empty: { text: 'jede Minute' },
      everyX: {
        prefix: '',
        text: 'alle {{every.value}} Minuten'
      }
    }
  },
  minute: {
    text: 'Minute'
  },
  hour: {
    text: 'Stunde',
    minute: {
      '*': {
        prefix: 'zu',
        suffix: 'Minute(n)'
      },
      empty: { text: 'jeder' }
    }
  },
  day: {
    prefix: 'Jeden',
    text: 'Tag'
  },
  week: {
    text: 'Woche'
  },
  month: {
    prefix: 'Jedes',
    text: 'Monat'

  },
  year: {
    prefix: 'Jedes',
    text: 'Jahr'
  }
}

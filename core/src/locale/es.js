export default {
  '*': {
    prefix: 'todos los',
    suffix: '',
    text: 'Desconocido',
    '*': {
      empty: { text: 'todos los {{ field.id }}' },
      value: { text: '{{ val.text }}' },
      range: { text: '{{ start.text }}-{{ end.text }}' },
      everyX: { text: 'todos/as {{ every.value }}' }
    },
    month: {
      '*': { prefix: 'en' },
      empty: { text: 'todos los meses' },
      value: { text: '{{ val.alt }}' },
      range: { text: '{{ start.alt }}-{{ end.alt }}' }
    },
    day: {
      '*': { prefix: 'en' },
      empty: { text: 'todos los días' },
      value: { text: 'los días {{ val.alt }}' }
    },
    dayOfWeek: {
      '*': { prefix: 'de' },
      empty: { text: 'todos los días de la semana' },
      value: { text: 'los {{ val.alt }}' },
      range: { text: '{{ start.alt }}-{{ end.alt }}' }
    },
    hour: {
      '*': { prefix: 'a' },
      empty: { text: 'todas las horas' },
      value: { text: 'las {{ val.text }}' }
    },
    minute: {
      '*': { prefix: ':' },
      empty: { text: 'todos los minutos' }
    }
  },
  minute: {
    prefix: 'todos los',
    text: 'minutos'
  },
  hour: {
    prefix: 'todas las',
    text: 'horas',
    minute: {
      '*': {
        prefix: 'a los',
        suffix: 'minutos'
      },
      empty: { text: 'todos', prefix: 'a', suffix: 'los minutos' }
    }
  },
  day: {
    text: 'Días'
  },
  week: {
    text: 'Semanas'
  },
  month: {
    text: 'Meses',
    dayOfWeek: {
      '*': { prefix: 'y' }
    }
  },
  year: {
    text: 'años',
    dayOfWeek: {
      '*': { prefix: 'y' }
    }
  }
}

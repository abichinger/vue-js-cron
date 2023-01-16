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
    meses: {
      '*': { prefix: 'en' },
      value: { text: '{{ val.alt }}' },
      range: { text: '{{ start.alt }}-{{ end.alt }}' }
    },
    días: {
      '*': { prefix: 'y' },
      value: { text: 'los días {{ val.alt }}' },
    },
    diaDeLaSemana: {
      '*': { prefix: 'de' },
      empty: { text: 'todos los días de la semana' },
      value: { text: 'los {{ val.alt }}' },
      range: { text: '{{ start.alt }}-{{ end.alt }}' }
    },
    horas: {
      '*': { prefix: 'a' },
      empty: { text: 'todas las {{ field.id }}' },
      value: { text: 'las {{ val.text }}' },
    },
    minutos: {
      '*': { prefix: ':' }
    }
  },
  minutos: {
    prefix: 'todos los',
    text: 'minutos',
  },
  horas: {
    prefix: 'todas las',
    text: 'horas',
    minutos: {
      '*': {
        prefix: 'a los',
        suffix: 'minutos'
      },
      empty: { text: 'todos', prefix: 'a', suffix: 'los minutos' }
    }
  },
  días: {
    text: 'Días'
  },
  semanas: {
    text: 'Semanas'
  },
  meses: {
    text: 'Meses',
    dayOfWeek: {
      '*': { prefix: 'y' }
    }
  },
  años: {
    text: 'años',
    dayOfWeek: {
      '*': { prefix: 'y' }
    }
  }
}
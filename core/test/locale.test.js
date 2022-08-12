import { getLocale } from '../src/locale'

test('test getLocaleStr', () => {
  const l = getLocale('en', {
    custom: {
      '*': 'bar',
      message: 'baz'
    }
  })

  expect(l.getLocaleStr('year', 'minute', 'empty', 'text')).toBe('every {{field.id}}')
  expect(l.getLocaleStr('year', 'dayOfWeek', 'value', 'prefix')).toBe('and')
  expect(l.getLocaleStr('year', 'minute', 'range', 'prefix')).toBe(':')
  expect(l.getLocaleStr('custom', 'foo')).toBe('bar')
  expect(l.getLocaleStr('custom', 'message')).toBe('baz')
})

test('test render', () => {
  const l = getLocale('en', {
    '*': {
      '*': {
        '*': {
          '*': '{{start.text}}-{{end.text}}'
        }
      }
    }
  })

  expect(l.render('period', 'field', 'type', 'pos', {
    start: {
      text: '1'
    },
    end: {
      text: '2'
    }
  })).toBe('1-2')
})

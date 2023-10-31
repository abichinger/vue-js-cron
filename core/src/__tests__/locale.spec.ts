import { getLocale } from '@/locale'
import { CronType, TextPosition } from '@/types'
import { describe, expect, it } from 'vitest'

describe('locale', () => {
  it('getLocale', () => {
    const testCases = [
      { locale: 'en', expected: 'Hour' },
      { locale: 'foo-bar', expected: 'Hour' },
      { locale: 'de', expected: 'Stunde' },
      { locale: 'DE-AT', expected: 'Stunde' },
      { locale: 'de-li', expected: 'Stunde' },
    ]

    for (const test of testCases) {
      const l = getLocale(test.locale)
      expect(l.getLocaleStr('hour', 'text')).toBe(test.expected)
    }
  })

  it('getLocaleStr', () => {
    const l = getLocale('en', {
      custom: {
        '*': 'bar',
        message: 'baz',
      },
    })

    expect(l.getLocaleStr('year', 'minute', 'empty', 'text')).toBe('every {{field.id}}')
    expect(l.getLocaleStr('year', 'dayOfWeek', 'value', 'prefix')).toBe('and')
    expect(l.getLocaleStr('year', 'minute', 'range', 'prefix')).toBe(':')
    expect(l.getLocaleStr('custom', 'foo')).toBe('bar')
    expect(l.getLocaleStr('custom', 'message')).toBe('baz')
  })

  it('getLocaleStr pt', () => {
    const l = getLocale('pt', {
      custom: {
        '*': 'bar',
        message: 'baz',
      },
    })

    expect(l.getLocaleStr('year', 'minute', 'empty', 'text')).toBe('cada minuto')
    expect(l.getLocaleStr('year', 'dayOfWeek', 'value', 'prefix')).toBe('e de')
    expect(l.getLocaleStr('year', 'minute', 'range', 'prefix')).toBe(':')
    expect(l.getLocaleStr('custom', 'foo')).toBe('bar')
    expect(l.getLocaleStr('custom', 'message')).toBe('baz')
  })

  it('render', () => {
    const l = getLocale('en', {
      '*': {
        '*': {
          value: {
            text: '{{start.text}}-{{end.text}}',
          },
        },
      },
    })

    expect(
      l.render('period', 'field', CronType.Value, TextPosition.Text, {
        start: {
          text: 'foo',
        },
        end: {
          text: 'bar',
        },
      }),
    ).toBe('foo-bar')
  })
})

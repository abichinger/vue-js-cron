import { createL10n } from '@/locale'
import { FieldPattern, TextPosition } from '@/types'
import { describe, expect, it } from 'vitest'

describe('locale', () => {
  it('createL10n', () => {
    const testCases = [
      { locale: 'en', expected: 'Hour' },
      { locale: 'foo-bar', expected: 'Hour' },
      { locale: 'de', expected: 'Stunde' },
      { locale: 'DE-AT', expected: 'Stunde' },
      { locale: 'de-li', expected: 'Stunde' },
    ]

    for (const test of testCases) {
      const l = createL10n(test.locale)
      expect(l.getTemplate('hour', 'text')).toBe(test.expected)
    }
  })

  it('getTemplate', () => {
    const l = createL10n('en', {
      custom: {
        '*': 'bar',
        message: 'baz',
      },
    })

    expect(l.getTemplate('year', 'minute', 'any', 'text')).toBe('every minute')
    expect(l.getTemplate('year', 'dayOfWeek', 'value', 'prefix')).toBe('and')
    expect(l.getTemplate('year', 'minute', 'range', 'prefix')).toBe(':')
    expect(l.getTemplate('custom', 'foo')).toBe('bar')
    expect(l.getTemplate('custom', 'message')).toBe('baz')
  })

  it('getTemplate pt', () => {
    const l = createL10n('pt', {
      custom: {
        '*': 'bar',
        message: 'baz',
      },
    })

    expect(l.getTemplate('year', 'minute', 'any', 'text')).toBe('cada minuto')
    expect(l.getTemplate('year', 'dayOfWeek', 'value', 'prefix')).toBe('e de')
    expect(l.getTemplate('year', 'minute', 'range', 'prefix')).toBe(':')
    expect(l.getTemplate('custom', 'foo')).toBe('bar')
    expect(l.getTemplate('custom', 'message')).toBe('baz')
  })

  it('getTemplate uk', () => {
    const l = createL10n('uk', {
      custom: {
        '*': 'bar',
        message: 'baz',
      },
    })

    expect(l.getTemplate('year', 'minute', 'any', 'text')).toBe('кожну хвилину')
    // expect(l.getTemplate('year', 'dayOfWeek', 'value', 'prefix')).toBe('e de')
    expect(l.getTemplate('year', 'minute', 'range', 'prefix')).toBe(':')
    expect(l.getTemplate('custom', 'message')).toBe('baz')
  })

  it('render', () => {
    const l = createL10n('en', {
      '*': {
        '*': {
          value: {
            text: '{{start.text}}-{{end.text}}',
          },
        },
      },
    })

    expect(
      l.render('period', 'field', FieldPattern.Value, TextPosition.Text, {
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

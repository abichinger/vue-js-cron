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

  it('special day values are translated', () => {
    const codes = ['da', 'de', 'es', 'fr', 'he', 'hi', 'it', 'ja', 'ko', 'pt', 'ru', 'uk', 'zh']
    const patterns = [
      FieldPattern.LastDay,
      FieldPattern.LastDayOffset,
      FieldPattern.LastWeekday,
      FieldPattern.NearestWeekday,
    ]
    const en = createL10n('en')

    // the localization of a locale is merged into the english one,
    // therefore a missing translation shows up as english text
    for (const code of codes) {
      const l = createL10n(code)
      for (const pattern of patterns) {
        const template = l.getTemplate('*', 'day', pattern, TextPosition.Text)
        expect(template).not.toBe('')
        expect(template).not.toBe(en.getTemplate('*', 'day', pattern, TextPosition.Text))
      }
    }
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

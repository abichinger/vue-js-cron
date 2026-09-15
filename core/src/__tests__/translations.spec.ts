import { DefaultCronOptions } from '@/components/cron-core'
import { L10nEngine } from '@/locale'
import en from '@/locale/en'
import type { Localization } from '@/locale/types'
import { FieldPattern, TextPosition, type CronFormat } from '@/types'
import { deepMerge } from '@/util'
import { appendFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

// every locale is merged into the english one, so a key which a locale doesn't
// define is rendered in english. To find these keys, every string of the english
// locale is replaced by its path before the locale is merged on top of it.
const MARK = '@@en:'

const files = import.meta.glob<Localization>('@/locale/*.ts', { eager: true, import: 'default' })
const locales = Object.entries(files)
  .map(([file, locale]) => [file.split('/').pop()!.replace('.ts', ''), locale] as const)
  .filter(([code]) => !['en', 'index', 'types'].includes(code))

const commonPatterns = [
  FieldPattern.Any,
  FieldPattern.Value,
  FieldPattern.Range,
  FieldPattern.Step,
  FieldPattern.StepFrom,
  FieldPattern.RangeStep,
]
const fieldPatterns: Record<string, FieldPattern[]> = {
  day: [
    FieldPattern.NoSpecific,
    FieldPattern.LastDay,
    FieldPattern.LastDayOffset,
    FieldPattern.LastWeekday,
    FieldPattern.NearestWeekday,
  ],
  dayOfWeek: [FieldPattern.NoSpecific],
}

// all keys which are looked up while an expression is rendered
function lookups(): string[][] {
  const keys = new Map<string, string[]>()
  const add = (...key: string[]) => keys.set(key.join('.'), key)
  const defaults = new DefaultCronOptions()

  for (const format of ['crontab', 'quartz'] as CronFormat[]) {
    for (const period of defaults.periods(format)) {
      for (const position of Object.values(TextPosition)) {
        add(period.id, position)
      }
      for (const field of period.value) {
        const patterns = [...commonPatterns, ...(fieldPatterns[field] ?? [])]
        for (const pattern of patterns) {
          add(period.id, field, pattern, TextPosition.Text)
          add(period.id, field, pattern, TextPosition.Prefix)
          add(period.id, field, pattern, TextPosition.Suffix)
        }
      }
    }
  }
  return [...keys.values()]
}

function markStrings(obj: Record<string, unknown>, path: string[] = []): Localization {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [
      key,
      typeof value === 'string'
        ? MARK + [...path, key].join('.')
        : markStrings(value as Record<string, unknown>, [...path, key]),
    ]),
  )
}

function englishTemplate(path: string): string {
  return path.split('.').reduce<any>((obj, key) => obj[key], en)
}

// `{{start.text}}-{{end.text}}` or `:` look the same in every language
function hasWords(template: string) {
  return /\p{L}{2,}/u.test(template.replace(/\{\{\{?[^}]*\}?\}\}/g, ''))
}

interface Missing {
  // path of the english template, e.g. `q-minute.second.*.suffix`
  path: string
  template: string
}

function findMissing(locale: Localization): Missing[] {
  const l10n = new L10nEngine(deepMerge({}, markStrings(en), locale) as Localization)
  const paths = new Set<string>()
  for (const key of lookups()) {
    const template = l10n.getTemplate(...key)
    if (template.startsWith(MARK)) {
      paths.add(template.slice(MARK.length))
    }
  }
  return [...paths].sort().map((path) => ({ path, template: englishTemplate(path) }))
}

// Missing translations, which are already known. Remove the entry after the
// translation has been added, the test fails as long as the list is outdated.
const knownEnglish: Record<string, string[]> = {
  da: ['q-minute.second.*.prefix'],
  es: [
    '*.day.noSpecific.text',
    '*.dayOfWeek.noSpecific.text',
    '*.second.any.text',
    'q-hour.minute.*.prefix',
    'q-hour.text',
    'q-minute.second.*.prefix',
    'q-minute.second.*.suffix',
    'q-minute.second.any.text',
    'q-minute.text',
    'q-second.text',
  ],
  pt: [
    '*.day.noSpecific.text',
    '*.dayOfWeek.noSpecific.text',
    '*.second.any.text',
    'q-hour.minute.*.prefix',
    'q-hour.text',
    'q-minute.second.*.prefix',
    'q-minute.second.*.suffix',
    'q-minute.second.any.text',
    'q-minute.text',
    'q-second.text',
  ],
}

describe('translations', () => {
  const report = locales.map(([code, locale]) => {
    const missing = findMissing(locale)
    return { code, missing, english: missing.filter((m) => hasWords(m.template)) }
  })

  if (process.env.GITHUB_STEP_SUMMARY) {
    const rows = report.map(
      ({ code, missing, english }) =>
        `| ${code} | ${english.map((m) => `\`${m.path}\` (${m.template})`).join('<br>') || '-'} | ${missing.length} |`,
    )
    appendFileSync(
      process.env.GITHUB_STEP_SUMMARY,
      [
        '## Missing translations',
        '',
        '| locale | english text | missing keys |',
        '| --- | --- | --- |',
        ...rows,
        '',
      ].join('\n'),
    )
  }

  for (const { code, missing } of report) {
    if (missing.length > 0) {
      const lines = missing.map((m) => `  ${m.path}: ${JSON.stringify(m.template)}`)
      console.log([`${code}: ${missing.length} missing`, ...lines].join('\n'))
    }
  }

  it.each(report)('$code has no english text inside a translation', ({ code, english }) => {
    expect(english.map((m) => m.path)).toEqual(knownEnglish[code] ?? [])
  })
})

import { describe, expect, it } from 'vitest'

import { useCron, type CronFormat } from '../cron-core'

type UseCronReturn = ReturnType<typeof useCron>

function cronToString({ selected: { value: selected }, period }: UseCronReturn): string {
  const fields = selected
    .map((seg) => {
      const prefix = seg.prefix.value ? seg.prefix.value + ' ' : ''
      const suffix = seg.suffix.value ? ' ' + seg.suffix.value : ''
      return prefix + seg.text.value + suffix
    })
    .join(' ')

  const prefix = period.prefix.value ? period.prefix.value + ' ' : ''
  const suffix = period.suffix.value ? ' ' + period.suffix.value : ''
  return `${prefix}${period.selected.value.text}${suffix} ${fields}`
}

describe('useCron', () => {
  it('renders properly', () => {
    const tests: {
      format: CronFormat
      value: string
      expected: string
    }[] = [
      {
        format: 'crontab',
        value: '* * * * *',
        expected: `Every Year in every month on every day and every day of the week at every hour : every minute`
      },
      {
        format: 'quartz',
        value: '* * * * * *',
        expected: `Every Year in every month on every day and every day of the week at every hour : every minute : every second`
      }
    ]

    for (const t of tests) {
      const cron = useCron({ format: t.format, initialValue: t.value })
      expect(cronToString(cron)).toEqual(t.expected)
    }
  })

  it('format option', () => {
    const formats: {
      value: CronFormat
      expectedFields: number
      expectedPeriods: number
    }[] = [
      {
        value: 'crontab',
        expectedFields: 5,
        expectedPeriods: 6
      },
      {
        value: 'quartz',
        expectedFields: 6,
        expectedPeriods: 7
      }
    ]

    for (const format of formats) {
      const cron = useCron({ format: format.value })

      expect(cron.segments.length).toEqual(format.expectedFields)
      expect(cron.period.items.length).toEqual(format.expectedPeriods)
    }
  })
})

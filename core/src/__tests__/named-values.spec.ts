import { CronCore, DefaultCronOptions, useCron } from '@/components/cron-core'
import { arrayToSegment, cronToSegment, ValueSegment } from '@/cron'
import { formatToOptions } from '@/format'
import { FieldWrapper, type CronFormat, type CronFormatOptions } from '@/types'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'

function field(id: string, format: CronFormat = 'crontab') {
  const definition = new DefaultCronOptions().fields(format, 'en').find((f) => f.id === id)!
  return new FieldWrapper(definition, { format })
}

function values(input: string, id: string, format: CronFormat = 'crontab') {
  return cronToSegment(input, field(id, format))?.toArray() ?? null
}

describe('named values', () => {
  for (const format of [
    'crontab',
    'quartz',
    'spring',
    {},
    { inherit: 'quartz' },
    { inherit: 'spring' },
  ] as CronFormat[]) {
    it(`accepts all abbreviations in ${JSON.stringify(format)}`, () => {
      const offset =
        typeof format === 'string'
          ? Number(format === 'quartz')
          : Number(format.inherit === 'quartz')
      'jan feb mar apr may jun jul aug sep oct nov dec'.split(' ').forEach((name, index) => {
        expect(values(name, 'month', format)).toEqual([index + 1])
        expect(values(name.toUpperCase(), 'month', format)).toEqual([index + 1])
      })
      'sun mon tue wed thu fri sat'.split(' ').forEach((name, index) => {
        expect(values(name, 'dayOfWeek', format)).toEqual([index + offset])
        expect(values(name.toUpperCase(), 'dayOfWeek', format)).toEqual([index + offset])
      })
    })
  }

  it('accepts lists, mixed tokens, ranges and steps', () => {
    expect(values('JaN,3,DEC', 'month')).toEqual([1, 3, 12])
    expect(values('mar-may', 'month')).toEqual([3, 4, 5])
    expect(values('JAN-5/2', 'month')).toEqual([1, 3, 5])
    expect(values('mon,3,FRI', 'dayOfWeek')).toEqual([1, 3, 5])
    expect(values('MON-FRI/2', 'dayOfWeek', 'quartz')).toEqual([2, 4, 6])
    expect(values('MAR/3', 'month', 'quartz')).toEqual([3, 6, 9, 12])
    expect(values('MAR/3', 'month', 'spring')).toEqual([3, 6, 9, 12])
  })

  for (const inherit of ['crontab', 'quartz', 'spring'] as const) {
    it(`can disable names in ${inherit} without disabling numbers`, () => {
      const format = { inherit, namedValues: false }
      for (const name of ['jan', 'JAN-MAR', 'jan,3', 'jan-mar/2']) {
        expect(values(name, 'month', format)).toBeNull()
      }
      expect(values('mon', 'dayOfWeek', format)).toBeNull()
      expect(values('3-5', 'month', format)).toEqual([3, 4, 5])
      expect(values('7', 'dayOfWeek', format)).toEqual([inherit === 'quartz' ? 7 : 0])
    })
  }

  it('rejects invalid tokens and bounds', () => {
    for (const input of [
      'january',
      'jann',
      'foo',
      'janx',
      'jan/mon',
      'dec-jan',
      'jan-13',
      '0-mar',
      'jan-mar/0',
      'jan-mar/13',
    ]) {
      expect(values(input, 'month'), input).toBeNull()
    }
    for (const id of ['minute', 'hour', 'day']) expect(values('jan', id)).toBeNull()
    for (const input of ['8', '0-8', 'mon-fri/0', 'MON#1', 'FRIL']) {
      expect(values(input, 'dayOfWeek'), input).toBeNull()
    }
    expect(values('0', 'dayOfWeek', 'quartz')).toBeNull()
  })

  it('leaves input untouched for custom factories', () => {
    const f = field('month', { namedValues: false })
    const factory = vi.fn((input: string, wrapped: FieldWrapper) =>
      input === 'CUSTOM' ? new ValueSegment(wrapped, 3) : null,
    )
    f.field.segmentFactories = [factory]
    expect(cronToSegment('CUSTOM', f)?.toArray()).toEqual([3])
    expect(factory).toHaveBeenCalledWith('CUSTOM', f)
    expect(cronToSegment('jan', f)).toBeNull()
    expect(factory).toHaveBeenLastCalledWith('jan', f)
  })
})

describe('Sunday aliases', () => {
  it.each([
    ['7', [0]],
    ['0,7', [0]],
    ['1,7,0', [0, 1]],
    ['5-7', [0, 5, 6]],
    ['1-7/2', [0, 1, 3, 5]],
    ['0-7', [0, 1, 2, 3, 4, 5, 6]],
    ['6-7/2', [6]],
  ])('expands %s before normalization', (input, expected) => {
    for (const format of ['crontab', 'spring'] as const) {
      const f = field('dayOfWeek', format)
      const segment = cronToSegment(input as string, f)!
      // Wildcard normalization represents the full set as an empty selection.
      expect(segment.toArray()).toEqual(input === '0-7' ? [] : expected)
      const serialized = arrayToSegment(segment.toArray(), f)!.toCron()
      expect(cronToSegment(serialized, f)?.toArray()).toEqual(segment.toArray())
    }
  })

  it('keeps Quartz 7 as Saturday', () => {
    expect(values('5-7', 'dayOfWeek', 'quartz')).toEqual([5, 6, 7])
    expect(values('SAT', 'dayOfWeek', 'quartz')).toEqual([7])
  })

  it('keeps full-week ranges when combined with other values', () => {
    for (const input of ['0-7,1', '1,0-7', '0-7/1,5']) {
      expect(cronToSegment(input, field('dayOfWeek'))?.toCron()).toBe('*')
    }
  })

  for (const firstWeekDay of ['sun=0', 'mon=1', 'sun=1', 'mon=2'] as const) {
    it(`respects ${firstWeekDay} numbering and display order`, async () => {
      const format: CronFormatOptions = { firstWeekDay }
      const oneBased = firstWeekDay === 'sun=1' || firstWeekDay === 'mon=2'
      const sunday = oneBased ? 1 : firstWeekDay === 'mon=1' ? 7 : 0
      expect(values('sun', 'dayOfWeek', format)).toEqual([sunday])
      expect(values('mon', 'dayOfWeek', format)).toEqual([oneBased ? 2 : 1])
      expect(values('7', 'dayOfWeek', format)).toEqual([firstWeekDay === 'sun=0' ? 0 : 7])
      const cron = useCron({ format, initialValue: '0 0 * * SUN' })
      await nextTick()
      const weekday = cron.segments[4]
      expect(cron.error.value).toBe('')
      expect(weekday.text.value).toBe('Sun')
      expect(weekday.items).toHaveLength(7)
      expect(weekday.items[0].text).toBe(firstWeekDay.startsWith('mon') ? 'Monday' : 'Sunday')
      const expectedValues = {
        'sun=0': [0, 1, 2, 3, 4, 5, 6],
        'mon=1': [1, 2, 3, 4, 5, 6, 7],
        'sun=1': [1, 2, 3, 4, 5, 6, 7],
        'mon=2': [2, 3, 4, 5, 6, 7, 1],
      }
      expect(weekday.items.map((item) => item.value)).toEqual(expectedValues[firstWeekDay])
      expect(weekday.selected.value).toEqual([sunday])
      expect(weekday.items.find((item) => item.value === sunday)?.text).toBe('Sunday')
      weekday.select(weekday.items.map((item) => item.value))
      await nextTick()
      expect(weekday.cron.value).toBe('*')
    })
  }
})

describe('configurable Sunday aliases', () => {
  it.each(['crontab', 'spring', 'quartz'] as const)('defaults according to %s', (inherit) => {
    const expected = inherit !== 'quartz'
    expect(formatToOptions(inherit).hasSundayAlias).toBe(expected)
    expect(formatToOptions({ inherit }).hasSundayAlias).toBe(expected)
    expect(formatToOptions({ inherit, hasSundayAlias: !expected }).hasSundayAlias).toBe(!expected)
    for (const firstWeekDay of ['sun=0', 'mon=1'] as const) {
      const alias = firstWeekDay === 'sun=0' ? '7' : '0'
      const canonical = firstWeekDay === 'sun=0' ? 0 : 7
      expect(values(alias, 'dayOfWeek', { inherit, firstWeekDay })).toEqual(
        expected ? [canonical] : null,
      )
      expect(values(alias, 'dayOfWeek', { inherit, firstWeekDay, hasSundayAlias: true })).toEqual([
        canonical,
      ])
      expect(
        values(alias, 'dayOfWeek', { inherit, firstWeekDay, hasSundayAlias: false }),
      ).toBeNull()
    }
    expect(formatToOptions({}).hasSundayAlias).toBe(true)
  })

  it.each(['sun=0', 'mon=1'] as const)(
    'disables aliases independently of names for %s',
    (firstWeekDay) => {
      const format = { firstWeekDay, hasSundayAlias: false }
      const alias = firstWeekDay === 'sun=0' ? '7' : '0'
      const canonical = firstWeekDay === 'sun=0' ? 0 : 7
      expect(values('SUN', 'dayOfWeek', format)).toEqual([canonical])
      for (const input of [alias, `${alias},1`, `${alias}-5`, `${alias}-5/2`]) {
        expect(values(input, 'dayOfWeek', format)).toBeNull()
      }
      expect(values(String(canonical), 'dayOfWeek', { ...format, namedValues: false })).toEqual([
        canonical,
      ])
      expect(
        values(alias, 'dayOfWeek', { ...format, namedValues: false, hasSundayAlias: true }),
      ).toEqual([canonical])
    },
  )

  it.each(['sun=1', 'mon=2'] as const)('does not reinterpret Saturday in %s', (firstWeekDay) => {
    const format = { firstWeekDay, hasSundayAlias: true }
    expect(values('7', 'dayOfWeek', format)).toEqual([7])
    expect(values('SAT', 'dayOfWeek', format)).toEqual([7])
    expect(values('SUN', 'dayOfWeek', format)).toEqual([1])
    expect(values('0', 'dayOfWeek', format)).toBeNull()
  })

  const mondayFirst: CronFormatOptions = { firstWeekDay: 'mon=1' }
  it.each([
    ['0', [7], '7'],
    ['0,7', [7], '7'],
    ['5-7', [5, 6, 7], '5-7'],
    ['0-6/2', [2, 4, 6, 7], '2,4,6-7'],
    ['0-1/2', [7], '7'],
    ['*/2', [1, 3, 5, 7], '*/2'],
    ['MON-SUN', [1, 2, 3, 4, 5, 6, 7], '*'],
  ])('normalizes Monday-first %s after expansion', (input, selected, serialized) => {
    const f = field('dayOfWeek', mondayFirst)
    const segment = cronToSegment(input as string, f)!
    expect(segment.toArray()).toEqual(selected)
    const result = arrayToSegment(segment.toArray(), f)!
    expect(result.toCron()).toBe(serialized)
    expect(cronToSegment(result.toCron(), f)?.toArray()).toEqual(serialized === '*' ? [] : selected)
  })

  it('normalizes a full week combined with other values', () => {
    expect(cronToSegment('0-7,1', field('dayOfWeek', mondayFirst))?.toCron()).toBe('*')
    expect(values('SUN-MON', 'dayOfWeek', mondayFirst)).toBeNull()
  })

  it('normalizes initial input, later updates and UI selection with Monday-first numbering', async () => {
    const cron = useCron({ format: mondayFirst, initialValue: '0 0 * * 0' })
    await nextTick()
    const weekday = cron.segments[4]
    expect(cron.error.value).toBe('')
    expect(cron.cron.value).toBe('0 0 * * 7')
    expect(weekday.text.value).toBe('Sun')
    cron.cron.value = '0 0 * * 0-6/2'
    await nextTick()
    expect(cron.error.value).toBe('')
    expect(weekday.selected.value).toEqual([2, 4, 6, 7])
    expect(weekday.text.value).toBe('Tue,Thu,Sat-Sun')
    weekday.select([5, 6, 7])
    await nextTick()
    expect(cron.cron.value).toBe('0 0 * * 5-7')
    expect(weekday.text.value).toBe('Fri-Sun')
    weekday.select(weekday.items.map((item) => item.value))
    await nextTick()
    expect(cron.cron.value).toBe('0 0 * * *')
  })
})

describe('editor integration', () => {
  it.each([
    ['0 12 * jan mon', '0 12 * 1 1', 'month', [1], 'Jan'],
    ['0 0 * * 7', '0 0 * * 0', 'dayOfWeek', [0], 'Sun'],
    ['0 0 * mar-may *', '0 0 * 3-5 *', 'month', [3, 4, 5], 'Mar-May'],
    ['0 0 * * 5-7', '0 0 * * 0,5-6', 'dayOfWeek', [0, 5, 6], 'Sun,Fri-Sat'],
    ['0 0 * * 6-7/2', '0 0 * * 6', 'dayOfWeek', [6], 'Sat'],
  ])('parses and displays %s', async (input, expected, id, selected, text) => {
    const cron = useCron({ initialValue: input as string })
    await nextTick()
    const segment = cron.segments.find((s) => s.id === id)!
    expect(cron.error.value).toBe('')
    expect(segment.selected.value).toEqual(selected)
    expect(segment.text.value).toBe(text)
    expect(cron.cron.value).toBe(expected)
  })

  it('uses English syntax with localized labels', async () => {
    const cron = useCron({ locale: 'de', initialValue: '0 12 * MAY MON' })
    await nextTick()
    expect(cron.error.value).toBe('')
    expect(cron.segments[3].selected.value).toEqual([5])
    expect(cron.segments[3].text.value).toBe('Mai')
  })

  it.each(['quartz', 'spring'] as const)(
    'normalizes names in %s and accepts later updates',
    async (format) => {
      const cron = useCron({ format, initialValue: '0 0 12 ? JAN MON' })
      await nextTick()
      expect(cron.error.value).toBe('')
      expect(cron.cron.value).toBe(`0 0 12 ? 1 ${format === 'quartz' ? 2 : 1}`)
      cron.cron.value = '0 0 12 ? MAR-MAY SAT'
      await nextTick()
      expect(cron.error.value).toBe('')
      expect(cron.cron.value).toBe(`0 0 12 ? 3-5 ${format === 'quartz' ? 7 : 6}`)
      cron.segments[4].select([6])
      await nextTick()
      expect(cron.segments[4].cron.value).toBe('6')
    },
  )

  it('accepts object format props and emits numeric model updates', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    try {
      const wrapper = mount(CronCore, {
        props: {
          format: { inherit: 'spring', namedValues: true },
          modelValue: '0 0 12 ? JAN MON',
        },
        slots: { default: () => null },
      })
      await nextTick()
      expect(wrapper.emitted('update:model-value')?.slice(-1)[0]).toEqual(['0 0 12 ? 1 1'])
      await wrapper.setProps({ modelValue: '0 0 12 ? FEB SUN' })
      expect(wrapper.emitted('update:model-value')?.slice(-1)[0]).toEqual(['0 0 12 ? 2 0'])
      expect(wrapper.emitted('error')).toBeUndefined()
      expect(warn).not.toHaveBeenCalled()
      wrapper.unmount()
    } finally {
      warn.mockRestore()
    }
  })
})

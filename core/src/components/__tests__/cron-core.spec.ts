import { describe, expect, it, test } from 'vitest'

import { createL10n } from '@/locale'
import type { CronFormat, Period } from '@/types'
import { mount } from '@vue/test-utils'
import { defineComponent, nextTick } from 'vue'
import {
  cronCoreProps,
  DefaultCronOptions,
  findFirstPeriod,
  setupCron,
  useCron,
  withSpecialDays,
} from '../cron-core'

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
  describe('renders properly', () => {
    const tests: {
      format: CronFormat
      value: string
      period?: string
      expected: string
    }[] = [
      {
        format: 'crontab',
        value: '* * * * *',
        expected: `Every Year in every month on every day and every day of the week at every hour : every minute`,
      },
      {
        format: 'quartz',
        value: '* * * * * *',
        expected: `Every Year in every month on every day and every day of the week at every hour : every minute : every second`,
      },
      {
        format: 'crontab',
        value: '* * * * *',
        period: 'hour',
        expected: `Every Hour at every minute(s)`,
      },
      {
        format: 'crontab',
        value: '59 23 ? * 0',
        period: 'week',
        expected: `Every Week on Sun at 23 : 59`,
      },
      {
        format: 'crontab',
        value: '10,20,30 23 * * 0-4/2',
        period: 'week',
        expected: `Every Week on Sun-Thu/2 at 23 : 10-30/10`,
      },
      {
        format: 'quartz',
        value: '* * * * * *',
        period: 'q-hour',
        expected: `Every Hour at every minute : every second`,
      },
      {
        format: 'quartz',
        value: '0 15 10 * * ?',
        period: 'month',
        expected: `Every Month on every day and no specific day of the week at 10 : 15 : 00`,
      },
      {
        format: 'quartz',
        value: '0 15 10 ? * *',
        period: 'month',
        expected: `Every Month on no specific day and every day of the week at 10 : 15 : 00`,
      },
      {
        format: 'quartz',
        value: '59 59 23 ? * 1',
        period: 'week',
        expected: `Every Week on Sun at 23 : 59 : 59`,
      },
      {
        format: 'spring',
        value: '59 59 23 ? * 1',
        period: 'week',
        expected: `Every Week on Mon at 23 : 59 : 59`,
      },
      {
        format: 'quartz',
        value: '0 0 0 L * ?',
        period: 'month',
        expected: `Every Month on the last day and no specific day of the week at 00 : 00 : 00`,
      },
      {
        format: 'quartz',
        value: '0 0 0 L-3 * ?',
        period: 'month',
        expected: `Every Month on 3 day(s) before the last day and no specific day of the week at 00 : 00 : 00`,
      },
      {
        format: 'spring',
        value: '0 0 0 LW * ?',
        period: 'month',
        expected: `Every Month on the last weekday and no specific day of the week at 00 : 00 : 00`,
      },
      {
        format: 'quartz',
        value: '0 0 0 15W * ?',
        period: 'month',
        expected: `Every Month on the weekday nearest to day 15 and no specific day of the week at 00 : 00 : 00`,
      },
    ]

    for (const t of tests) {
      test([t.value, t.format].join(', '), async () => {
        const cron = useCron({ format: t.format, initialValue: t.value, initialPeriod: t.period })
        await nextTick()
        expect(cronToString(cron)).toEqual(t.expected)
      })
    }
  })

  it('format option', () => {
    const formats: {
      value: CronFormat
      expectedValue: string
      expectedFields: number
      expectedPeriods: number
    }[] = [
      {
        value: 'crontab',
        expectedValue: '* * * * *',
        expectedFields: 5,
        expectedPeriods: 6,
      },
      {
        value: 'quartz',
        expectedValue: '* * * * * ?',
        expectedFields: 6,
        expectedPeriods: 7,
      },
      {
        value: 'spring',
        expectedValue: '* * * * * *',
        expectedFields: 6,
        expectedPeriods: 7,
      },
    ]

    for (const format of formats) {
      const cron = useCron({ format: format.value })

      expect(cron.cron.value).toEqual(format.expectedValue)
      expect(cron.segments.length).toEqual(format.expectedFields)
      expect(cron.period.items.length).toEqual(format.expectedPeriods)
    }
  })
})

it('setupCron events', async () => {
  let cron!: UseCronReturn

  const component = defineComponent({
    props: cronCoreProps(),
    emits: ['update:model-value', 'update:period', 'error'],
    setup(props, ctx) {
      cron = setupCron(props, ctx)

      return () => {}
    },
  })

  const wrapper = mount(component, {
    props: {
      modelValue: '5 * * * *',
      period: 'day',
    },
  })

  expect(cron.cron.value).toEqual('5 * * * *')
  expect(cron.period.selected.value.id).toEqual('day')

  cron.segments[1].select([12]) // select hour: 12
  cron.period.select('month')

  await nextTick()

  expect(cron.cron.value).toEqual('5 12 * * *')
  expect(cron.period.selected.value.id).toEqual('month')

  expect(wrapper.emitted('update:model-value')![0]).toEqual(['5 12 * * *'])
  expect(wrapper.emitted('update:period')![0]).toEqual(['month'])
})

describe('findFirstPeriod', () => {
  const periods: Period[] = [
    { id: 'week', value: ['dayOfWeek', 'hour', 'minute'] },
    { id: 'month', value: ['day', 'hour', 'minute'] },
    { id: 'day', value: ['hour', 'minute'] },
  ].reverse()
  const options = new DefaultCronOptions()
  const fields = options.fields('crontab', 'en')
  const qFields = options.fields('quartz', 'en')

  const tests = [
    {
      cron: '0 2 * * 0', // Every Sunday at 02:00
      expected: 'week',
    },
    {
      cron: '0 * * * *', // Every hour
      expected: 'day',
    },
    {
      cron: '0 2 1 * *', // Every 1st of the month at 02:00
      expected: 'month',
    },
    {
      cron: '* * * 1 *', // Every minute in January
      expected: undefined,
    },
    {
      cron: '* 0 2 1 * ?',
      fields: qFields,
      expected: 'month',
    },
    {
      cron: '* * * * *',
      periods: options.periods('crontab').reverse(),
      expected: 'year',
    },
  ]

  for (const t of tests) {
    it(t.cron, () => {
      expect(findFirstPeriod(t.periods ?? periods, t.cron, t.fields ?? fields)?.id).toBe(t.expected)
    })
  }
})

describe('special day values', () => {
  const crontabFields = () => {
    const l10n = createL10n('en')
    return new DefaultCronOptions()
      .fields('crontab', 'en', l10n)
      .map((field) => (field.id === 'day' ? withSpecialDays(field, l10n) : field))
  }

  it('round trip', async () => {
    const values = ['0 0 0 L * ?', '0 0 0 L-3 * ?', '0 0 0 LW * ?', '0 0 0 15W * ?']

    for (const value of values) {
      const cron = useCron({ format: 'quartz', initialValue: value })
      await nextTick()

      expect(cron.error.value).toEqual('')
      expect(cron.cron.value).toEqual(value)
    }
  })

  it('crontab is unchanged without opt-in', async () => {
    const cron = useCron({ format: 'crontab', initialValue: '0 0 L * *' })
    await nextTick()

    expect(cron.error.value).toEqual('L is not a valid cron segment (day)')
    expect(cron.cron.value).toEqual('0 0 L * *')
    expect(cron.segments[2].items.length).toEqual(31)
  })

  it('opt-in for crontab', async () => {
    const cron = useCron({
      format: 'crontab',
      initialValue: '0 0 L * *',
      fields: crontabFields(),
    })
    await nextTick()

    expect(cron.error.value).toEqual('')
    expect(cron.cron.value).toEqual('0 0 L * *')
    expect(cron.segments[2].text.value).toEqual('the last day')
    expect(cron.segments[2].items.length).toEqual(33)
  })

  it('selecting a day replaces the special value', async () => {
    const cron = useCron({ format: 'quartz', initialValue: '0 0 0 L * ?' })
    await nextTick()

    cron.segments[3].select([5])
    await nextTick()

    expect(cron.cron.value).toEqual('0 0 0 5 * ?')
  })
})

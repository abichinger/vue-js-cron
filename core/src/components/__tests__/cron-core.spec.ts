import { describe, expect, it } from 'vitest'

import type { CronFormat, Period } from '@/types'
import { mount } from '@vue/test-utils'
import { defineComponent, nextTick } from 'vue'
import {
  cronCoreProps,
  DefaultCronOptions,
  findFirstPeriod,
  setupCron,
  useCron,
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
  it('renders properly', async () => {
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
    ]

    for (const t of tests) {
      const cron = useCron({ format: t.format, initialValue: t.value, initialPeriod: t.period })
      await nextTick()
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
        expectedPeriods: 6,
      },
      {
        value: 'quartz',
        expectedFields: 6,
        expectedPeriods: 7,
      },
    ]

    for (const format of formats) {
      const cron = useCron({ format: format.value })

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

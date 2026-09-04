import { describe, expect, it } from 'vitest'

import { createL10n } from '@/locale'
import { FieldWrapper, type FieldValue, type SelectItem } from '@/types'
import { defaultItems } from '@/util'
import { nextTick, ref, watch } from 'vue'
import { withSpecialDays } from '../cron-core'
import { useCronSegment, type UseCronSegmentReturn } from '../cron-segment'
import { useSelect } from '../select'

const f = () => {
  const fieldDesc = new FieldWrapper(
    {
      id: 'month',
      items: defaultItems('en').monthItems,
    },
    { format: 'crontab' },
  )

  const period = { id: 'year', value: [] }

  return useCronSegment({
    l10n: createL10n('en'),
    field: fieldDesc,
    period: ref(period),
    initialCron: '*',
  })
}

/** day of month segment with support for `L` and `W` */
const day = () => {
  const l10n = createL10n('en')
  const field = new FieldWrapper(
    withSpecialDays({ id: 'day', items: defaultItems('en').dayItems }, l10n),
    { format: 'quartz' },
  )

  return useCronSegment({
    l10n,
    field,
    period: ref({ id: 'month', value: [] }),
    initialCron: '*',
  })
}

describe('CronSegment', () => {
  it('cron/array converted properly', async () => {
    const { cron, selected, text, select, error } = f()

    const tests = [
      {
        cron: '1',
        expectedCron: '1',
        expectedArr: [1],
        expectedText: 'Jan',
        error: '',
      },
      {
        cron: '2-5,6',
        expectedCron: '2-6',
        expectedArr: [2, 3, 4, 5, 6],
        expectedText: 'Feb-Jun',
        error: '',
      },
    ]

    for (const t of tests) {
      cron.value = t.cron
      await nextTick()

      expect(error.value).toEqual(t.error)
      expect(selected.value).toEqual(t.expectedArr)
      expect(cron.value).toEqual(t.expectedCron)
      expect(text.value).toEqual(t.expectedText)
    }

    for (const t of tests) {
      select(t.expectedArr)
      await nextTick()

      expect(error.value).toEqual(t.error)
      expect(selected.value).toEqual(t.expectedArr)
      expect(cron.value).toEqual(t.expectedCron)
      expect(text.value).toEqual(t.expectedText)
    }
  })
})

describe('CronSegment - special values', () => {
  it('special items are selectable', () => {
    const { items } = day()

    expect(items.length).toEqual(33)
    expect(items.slice(31)).toEqual([
      { value: 'L', text: 'L', alt: 'the last day' },
      { value: 'LW', text: 'LW', alt: 'the last weekday' },
    ])
  })

  it('cron/array converted properly', async () => {
    const { cron, selected, text, error } = day()

    const tests = [
      { cron: 'L', expectedArr: ['L'], expectedText: 'the last day' },
      { cron: 'L-3', expectedArr: ['L-3'], expectedText: '3 day(s) before the last day' },
      { cron: 'LW', expectedArr: ['LW'], expectedText: 'the last weekday' },
      { cron: '15W', expectedArr: ['15W'], expectedText: 'the weekday nearest to day 15' },
    ]

    for (const t of tests) {
      cron.value = t.cron
      await nextTick()

      expect(error.value).toEqual('')
      expect(selected.value).toEqual(t.expectedArr)
      expect(cron.value).toEqual(t.cron)
      expect(text.value).toEqual(t.expectedText)
    }
  })

  it('special values are exclusive', async () => {
    const { cron, selected, select } = day()

    select([1, 2])
    await nextTick()
    expect(cron.value).toEqual('1-2')

    // selecting a special value clears the other values
    select([1, 2, 'L'])
    await nextTick()
    expect(selected.value).toEqual(['L'])
    expect(cron.value).toEqual('L')

    // selecting a value clears the special value
    select(['L', 5])
    await nextTick()
    expect(selected.value).toEqual([5])
    expect(cron.value).toEqual('5')
  })

  it('special values are kept, while nothing is selected', async () => {
    const { cron, select } = day()

    // `L-3` and `15W` aren't part of the items, therefore they can't be selected
    for (const value of ['L-3', '15W']) {
      cron.value = value
      await nextTick()

      select([])
      await nextTick()
      expect(cron.value).toEqual(value)
    }
  })
})

/** connects a segment to a select, the same way the prebuilt components do */
const selectOf = (segment: UseCronSegmentReturn) => {
  const s = useSelect<SelectItem, FieldValue>({ items: segment.items, multiple: true })

  watch(s.selected, () => {
    segment.select(s.selected.value as FieldValue[])
  })
  watch(segment.selected, (value) => s.setValues(value), { immediate: true })

  return s
}

describe('CronSegment - select', () => {
  it('special values can be selected', async () => {
    const segment = day()
    const select = selectOf(segment)

    const lastDay = segment.items.find((item) => item.value === 'L')!
    select.select(lastDay)
    await nextTick()

    expect(segment.cron.value).toEqual('L')
    expect(segment.text.value).toEqual('the last day')
    expect(select.selectedStr.value).toEqual('L')

    // selecting a day replaces the special value
    select.select(segment.items[4])
    await nextTick()

    expect(segment.cron.value).toEqual('5')
    expect(select.selectedStr.value).toEqual('5')
  })

  it('special values of the cron expression are selected', async () => {
    const segment = day()
    const select = selectOf(segment)

    segment.cron.value = 'L'
    await nextTick()
    await nextTick()

    expect(segment.cron.value).toEqual('L')
    expect(segment.selected.value).toEqual(['L'])
    expect(select.has(segment.items.find((item) => item.value === 'L')!)).toBe(true)
  })

  it('values without an item are kept', async () => {
    const segment = day()
    const select = selectOf(segment)

    select.select(segment.items[4])
    await nextTick()
    expect(segment.cron.value).toEqual('5')

    // `L-3` isn't part of the items, therefore the select clears its values
    segment.cron.value = 'L-3'
    await nextTick()

    expect(segment.cron.value).toEqual('L-3')
    expect(segment.text.value).toEqual('3 day(s) before the last day')
    expect(select.values.size).toEqual(0)
  })
})

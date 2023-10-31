import { describe, expect, it } from 'vitest'

import { getLocale } from '@/locale'
import { FieldWrapper } from '@/types'
import { defaultItems } from '@/util'
import { nextTick, ref } from 'vue'
import { useCronSegment } from '../cron-segment'

const f = () => {
  const fieldDesc = new FieldWrapper({
    id: 'month',
    items: defaultItems('en').monthItems,
  })

  const period = { id: 'year', value: [] }

  return useCronSegment({
    locale: getLocale('en'),
    field: fieldDesc,
    period: ref(period),
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

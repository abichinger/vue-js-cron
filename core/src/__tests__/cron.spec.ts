import {
  arrayToSegment,
  cronToSegment,
  defaultArraySegmentFactories,
  defaultSegmentFactories,
  specialDayArraySegmentFactories,
  specialDaySegmentFactories,
} from '@/cron'
import { FieldWrapper, type CronFormat, type FieldValue } from '@/types'
import { genItems } from '@/util'
import { describe, expect, it } from 'vitest'

const r = (min: number, max: number, format: CronFormat = 'crontab') => {
  return new FieldWrapper({ id: 'fieldId', items: genItems(min, max) }, { format })
}

/** day of month field with support for `L` and `W` */
const day = (format: CronFormat = 'quartz') => {
  return new FieldWrapper(
    {
      id: 'day',
      items: genItems(1, 31),
      specialItems: [
        { value: 'L', text: 'L', alt: 'the last day' },
        { value: 'LW', text: 'LW', alt: 'the last weekday' },
      ],
      segmentFactories: [...defaultSegmentFactories, ...specialDaySegmentFactories],
      arraySegmentFactories: [...defaultArraySegmentFactories, ...specialDayArraySegmentFactories],
    },
    { format },
  )
}

describe('segments', () => {
  it('cronToSegment', () => {
    const cronToArray = (cron: string, field: FieldWrapper) => {
      return cronToSegment(cron, field)?.toArray() ?? null
    }

    expect(cronToArray('*', r(1, 3))).toEqual([])
    expect(cronToArray('1,3,5', r(0, 24))).toEqual([1, 3, 5])
    expect(cronToArray('*/5', r(0, 11))).toEqual([0, 5, 10])
    expect(cronToArray('*/5', r(1, 11))).toEqual([1, 6, 11])
    expect(cronToArray('10-15', r(0, 59))).toEqual([10, 11, 12, 13, 14, 15])
    expect(cronToArray('10-11,20-22,30-33', r(0, 59))).toEqual([10, 11, 20, 21, 22, 30, 31, 32, 33])
    expect(cronToArray('5,7-8', r(0, 59))).toEqual([5, 7, 8])
    expect(cronToArray('*/10', r(1, 10))).toEqual([1])
    expect(cronToArray('2-6/2', r(1, 10))).toEqual([2, 4, 6])
    expect(cronToArray('3-5/10', r(1, 10))).toEqual([3])
    expect(cronToArray('5/2', r(1, 10, 'quartz'))).toEqual([5, 7, 9])

    expect(cronToArray('x', r(0, 59))).toBe(null)
    expect(cronToArray('1-60', r(0, 59))).toBe(null)
    expect(cronToArray('0-10', r(1, 59))).toBe(null)
    expect(cronToArray('60', r(0, 59))).toBe(null)
    expect(cronToArray('0', r(1, 10))).toBe(null)
    expect(cronToArray('*/90', r(1, 10))).toBe(null)
    expect(cronToArray('*/11', r(1, 10))).toBe(null)
    expect(cronToArray('2-6/11', r(1, 10))).toBe(null)
    expect(cronToArray('5/2', r(1, 10))).toEqual(null)
  })

  it('arrayToSegment', () => {
    const arrayToCron = (arr: number[], field: FieldWrapper) => {
      return arrayToSegment(arr, field)?.toCron() ?? null
    }

    expect(arrayToCron([1, 10], r(1, 10))).toEqual('1,10')
    expect(arrayToCron([1, 2, 3], r(1, 10))).toEqual('1-3')
    expect(arrayToCron([2, 4, 7], r(1, 10))).toEqual('2,4,7')
    expect(arrayToCron([], r(1, 3))).toEqual('*')
    expect(arrayToCron([1, 2, 3], r(1, 3))).toEqual('*')
    expect(arrayToCron([0, 5, 10], r(0, 10))).toEqual('*/5')
    expect(arrayToCron([5, 12, 19, 26], r(5, 30))).toEqual('*/7')
    expect(arrayToCron([0, 5, 10], r(0, 20))).toEqual('0-10/5')
    expect(arrayToCron([1, 2, 5, 8, 9, 10], r(1, 10))).toEqual('1-2,5,8-10')
    expect(arrayToCron([5, 7, 9], r(1, 10, 'quartz'))).toEqual('5/2')
    expect(arrayToCron([5, 7, 9], r(1, 10))).toEqual('5-9/2')
  })
})

describe('special day values', () => {
  const cronToArray = (cron: string, field: FieldWrapper) => {
    return cronToSegment(cron, field)?.toArray() ?? null
  }
  const arrayToCron = (arr: FieldValue[], field: FieldWrapper) => {
    return arrayToSegment(arr, field)?.toCron() ?? null
  }
  const patternOf = (cron: string, field: FieldWrapper) => {
    return cronToSegment(cron, field)?.type ?? null
  }

  it('cronToSegment', () => {
    expect(cronToArray('L', day())).toEqual(['L'])
    expect(cronToArray('L-1', day())).toEqual(['L-1'])
    expect(cronToArray('L-30', day())).toEqual(['L-30'])
    expect(cronToArray('LW', day())).toEqual(['LW'])
    expect(cronToArray('1W', day())).toEqual(['1W'])
    expect(cronToArray('15W', day())).toEqual(['15W'])
    expect(cronToArray('31W', day())).toEqual(['31W'])

    // values of the field are still supported
    expect(cronToArray('*', day())).toEqual([])
    expect(cronToArray('2-4', day())).toEqual([2, 3, 4])
    expect(cronToArray('*/10', day())).toEqual([1, 11, 21, 31])

    expect(cronToArray('W', day())).toBe(null)
    expect(cronToArray('LL', day())).toBe(null)
    expect(cronToArray('L-0', day())).toBe(null)
    expect(cronToArray('L-31', day())).toBe(null)
    expect(cronToArray('0W', day())).toBe(null)
    expect(cronToArray('32W', day())).toBe(null)
    // special values can't be part of a list
    expect(cronToArray('L,5', day())).toBe(null)
    expect(cronToArray('5,L', day())).toBe(null)
    expect(cronToArray('L,LW', day())).toBe(null)
  })

  it('patterns', () => {
    expect(patternOf('L', day())).toBe('lastDay')
    expect(patternOf('L-3', day())).toBe('lastDayOffset')
    expect(patternOf('LW', day())).toBe('lastWeekday')
    expect(patternOf('15W', day())).toBe('nearestWeekday')
  })

  it('arrayToSegment', () => {
    expect(arrayToCron(['L'], day())).toEqual('L')
    expect(arrayToCron(['L-3'], day())).toEqual('L-3')
    expect(arrayToCron(['LW'], day())).toEqual('LW')
    expect(arrayToCron(['15W'], day())).toEqual('15W')

    // values of the field are still supported
    expect(arrayToCron([], day())).toEqual('*')
    expect(arrayToCron([2, 3, 4], day())).toEqual('2-4')
    expect(arrayToCron([1, 11, 21, 31], day())).toEqual('*/10')

    // special values can't be combined with other values
    expect(arrayToCron(['L', 5], day())).toBe(null)
    expect(arrayToCron(['L', 'LW'], day())).toBe(null)
    expect(arrayToCron(['L-0'], day())).toBe(null)
  })

  it('round trip', () => {
    for (const cron of ['L', 'L-1', 'L-3', 'LW', '1W', '15W', '*', '2-4', '*/10']) {
      const segment = cronToSegment(cron, day())
      expect(segment).not.toBe(null)
      expect(arrayToCron(segment!.toArray(), day())).toEqual(cron)
    }
  })

  it('disabled without opt-in', () => {
    // the default factories don't support `L` and `W`
    for (const cron of ['L', 'L-3', 'LW', '15W']) {
      expect(cronToArray(cron, r(1, 31))).toBe(null)
      expect(cronToArray(cron, r(1, 31, 'quartz'))).toBe(null)
      expect(arrayToCron([cron], r(1, 31))).toBe(null)
    }
  })
})

import { arrayToSegment, cronToSegment } from '@/cron'
import { FieldWrapper } from '@/types'
import { genItems } from '@/util'
import { describe, expect, it } from 'vitest'

const r = (min: number, max: number) => {
  return new FieldWrapper({ id: 'fieldId', items: genItems(min, max) })
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

    expect(cronToArray('x', r(0, 59))).toBe(null)
    expect(cronToArray('1-60', r(0, 59))).toBe(null)
    expect(cronToArray('0-10', r(1, 59))).toBe(null)
    expect(cronToArray('60', r(0, 59))).toBe(null)
    expect(cronToArray('0', r(1, 10))).toBe(null)
    expect(cronToArray('*/90', r(1, 10))).toBe(null)
    expect(cronToArray('*/11', r(1, 10))).toBe(null)
    expect(cronToArray('2-6/11', r(1, 10))).toBe(null)
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
  })
})

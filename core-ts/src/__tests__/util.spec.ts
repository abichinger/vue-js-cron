import { Range, deepMerge } from '@/util'
import { describe, expect, it } from 'vitest'

describe('util', () => {
  it('Range', () => {
    const r = new Range(0, 10, 2)
    expect(r[0]).toBe(0)
    expect(r[5]).toBe(10)
    expect(Array.from(r)).toEqual([0, 2, 4, 6, 8, 10])
  })

  it('deepMerge', () => {
    expect(deepMerge({ a: { a: 1 } }, { a: { b: 1 }, b: 1 })).toEqual({ a: { a: 1, b: 1 }, b: 1 })
    expect(deepMerge({}, { a: { b: 1 } })).toEqual({ a: { b: 1 } })
    expect(deepMerge({ a: { b: 1 } }, { a: { b: 2 } })).toEqual({ a: { b: 2 } })
  })
})

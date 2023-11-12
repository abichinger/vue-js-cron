import type { FieldItem } from './types'

function range(start: number, end: number, step = 1) {
  const r = []
  for (let i = start; i <= end; i += step) {
    r.push(i)
  }
  return r
}

class Range {
  [name: string]: number
  start: number
  end: number
  step: number

  constructor(start: number, end: number, step = 1) {
    this.start = start
    this.end = end
    this.step = step

    return new Proxy(this, {
      get: function (target, prop) {
        const i = typeof prop === 'string' ? parseInt(prop) : prop
        if (typeof i === 'number' && i >= 0 && i <= target.length) {
          return target.start + target.step * i
        }
        return Reflect.get(target, prop)
      },
    })
  }

  get length() {
    return (this.end - this.start) / this.step + 1
  }

  [Symbol.iterator]() {
    let index = -1
    return {
      next: () => {
        return { value: this[++index], done: !(this[index + 1] !== undefined) }
      },
    }
  }
}

export type toText = (value: number) => string

/**
 * generate items for fields
 * @param min - first value
 * @param max - last value
 * @param genText - returns a string representation of value
 * @param genAltText - returns an alternative string representation of value
 * @returns array of items
 */
function genItems(
  min: number,
  max: number,
  genText: toText = (value) => {
    return value + ''
  },
  genAltText: toText = (value) => {
    return value + ''
  },
): FieldItem[] {
  const res = []
  for (const i of new Range(min, max)) {
    res.push({
      text: genText(i),
      alt: genAltText(i),
      value: i,
    })
  }
  return res
}

/**
 *
 * @param locale - locale code, e.g.: en, en-GB de-DE
 * @returns items for minute, hour, day, month and day of week
 */
function defaultItems(localeCode: string) {
  return {
    secondItems: genItems(0, 59, (value) => pad(value, 2)),
    minuteItems: genItems(0, 59, (value) => pad(value, 2)),
    hourItems: genItems(0, 23, (value) => pad(value, 2)),
    dayItems: genItems(1, 31),
    monthItems: genItems(
      1,
      12,
      (value) => {
        return new Date(2021, value - 1, 1).toLocaleDateString(localeCode, { month: 'long' })
      },
      (value) => {
        return new Date(2021, value - 1, 1).toLocaleDateString(localeCode, { month: 'short' })
      },
    ),
    dayOfWeekItems: genItems(
      0,
      6,
      (value) => {
        const date = new Date(2021, 0, 3 + value) // first sunday in 2021
        return date.toLocaleDateString(localeCode, { weekday: 'long' })
      },
      (value) => {
        const date = new Date(2021, 0, 3 + value) // first sunday in 2021
        return date.toLocaleDateString(localeCode, { weekday: 'short' })
      },
    ),
  }
}

/**
 * pads numbers
 * @param n - number to pad
 * @param width - length of final string
 * @example
 * ```
 * //returns "001"
 * util.pad(1,3)
 * ```
 * @returns the padded number
 */
function pad(n: number, width: number) {
  const s = n + ''
  return s.length < width ? new Array(width - s.length).fill('0').join('') + n : s
}

/**
 * determines whether the passed value is an object
 * @returns true if value is an object, otherwise false
 */
function isObject(value: any): value is { [key: string]: any } {
  return value && typeof value === 'object' && !Array.isArray(value)
}

/**
 * copies (deep copy) all properties from each source to target
 */
function deepMerge(target: Object, ...sources: { [key: string]: any }[]) {
  if (!isObject(target) || sources.length === 0) return
  const source = sources.shift()

  if (isObject(source)) {
    for (const [key, value] of Object.entries(source)) {
      if (isObject(value)) {
        if (!isObject(target[key])) {
          target[key] = {}
        }
        deepMerge(target[key], source[key])
      } else {
        target[key] = source[key]
      }
    }
  }

  if (sources.length > 0) deepMerge(target, sources)
  return target
}

function traverse(obj: { [key: string]: any }, ...keys: string[][]): any {
  if (keys.length === 0) {
    return obj
  }

  for (const key of keys[0]) {
    if (key in obj) {
      const res = traverse(obj[key], ...keys.slice(1))
      if (res !== undefined) {
        return res
      }
    }
  }
}

function isSquence(numbers: number[]) {
  for (let i = 1; i < numbers.length; i++) {
    if (numbers[i - 1] + 1 !== numbers[i]) {
      return false
    }
  }
  return true
}

function unimplemented(): never {
  throw new Error('not implemented')
}

function splitArray<T>(arr: T[], chunkSize: number, fill: boolean = true): (T | null)[][] {
  const res = []

  for (let i = 0; i < arr.length; i += chunkSize) {
    const slice: (T | null)[] = arr.slice(i, i + chunkSize)
    while (fill && slice.length < chunkSize) {
      slice.push(null)
    }
    res.push(slice)
  }

  return res
}

export {
  Range,
  deepMerge,
  defaultItems,
  genItems,
  isObject,
  isSquence,
  pad,
  range,
  splitArray,
  traverse,
  unimplemented,
}

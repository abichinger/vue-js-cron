import { CronType, FieldWrapper, type CronSegment, type SegmentFromString } from './types'
import { isSquence, range, unimplemented } from './util'

class NoSpecificSegment implements CronSegment {
  field: FieldWrapper
  type: CronType = CronType.NoSpecific

  constructor(field: FieldWrapper) {
    this.field = field
  }

  toCron() {
    return '?'
  }

  toArray() {
    return []
  }

  get items() {
    return {}
  }

  static fromString(str: string, field: FieldWrapper) {
    if (str !== '?') {
      return null
    }
    return new NoSpecificSegment(field)
  }
}

class AnySegment implements CronSegment {
  field: FieldWrapper
  type: CronType = CronType.Empty

  constructor(field: FieldWrapper) {
    this.field = field
  }

  toCron() {
    return '*'
  }

  toArray() {
    return []
  }

  get items() {
    return {}
  }

  static fromString(str: string, field: FieldWrapper) {
    if (str !== '*') {
      return null
    }
    return new AnySegment(field)
  }

  static fromArray(arr: number[], field: FieldWrapper) {
    const { items } = field

    if (arr.length === 0) {
      return new AnySegment(field)
    }
    if (arr.length !== items.length) {
      return null
    }

    for (const item of items) {
      if (!arr.includes(item.value)) {
        return null
      }
    }
    if (!isSquence(items.map((item) => item.value))) {
      return null
    }
    return new AnySegment(field)
  }
}

class RangeSegment implements CronSegment {
  static re = /^\d+-\d+$/

  field: FieldWrapper
  type: CronType = CronType.Range
  start: number
  end: number

  constructor(field: FieldWrapper, start: number, end: number) {
    this.field = field
    this.start = start
    this.end = end
  }

  toCron() {
    return `${this.start}-${this.end}`
  }

  toArray() {
    const start = this.start
    const end = this.end

    return range(start, end)
  }

  get items() {
    return {
      start: this.field.itemMap[this.start],
      end: this.field.itemMap[this.end],
    }
  }

  static fromString(str: string, field: FieldWrapper) {
    if (!RangeSegment.re.test(str)) {
      return null
    }

    const { min, max } = field
    const range = str.split('-')
    const start = parseInt(range[0])
    const end = parseInt(range[1])

    if (start > end || start < min || end > max) {
      return null
    }

    return new RangeSegment(field, start, end)
  }
}

const _every = (n: number, min: number, max: number) => {
  const res = []
  for (let i = min; i <= max; i += n) {
    res.push(i)
  }
  return res
}

class EverySegment implements CronSegment {
  static re = /^(\*|\d+-\d+)\/\d+$/

  field: FieldWrapper
  type: CronType = CronType.EveryX
  every: number
  start: number
  end: number

  constructor(field: FieldWrapper, every: number, start?: number, end?: number) {
    this.field = field
    this.every = every
    this.start = start ?? field.min
    this.end = end ?? field.max
  }

  toCron() {
    if (this.start == this.field.min && this.end == this.field.max) {
      return `*/${this.every}`
    }
    return `${this.start}-${this.end}/${this.every}`
  }

  toArray() {
    return _every(this.every, this.start, this.end)
  }

  get items() {
    return {
      every: this.field.itemMap[this.every],
      start: this.field.itemMap[this.start],
      end: this.field.itemMap[this.end],
    }
  }

  static fromString(str: string, field: FieldWrapper) {
    if (!EverySegment.re.test(str)) {
      return null
    }

    const [rangeStr, everyStr] = str.split('/')
    const every = parseInt(everyStr)

    if (every > field.items.length) {
      return null
    }

    const range = str.split('-').map((s) => parseInt(s))
    const min = rangeStr == '*' ? field.min : range[0]
    const max = rangeStr == '*' ? field.max : range[1]

    if (_every(every, min, max).length == 0) {
      return null
    }

    return new EverySegment(field, every, min, max)
  }

  static fromArray(arr: number[], field: FieldWrapper) {
    const { min, max } = field

    if (arr.length < 3) {
      return null
    }

    const step = arr[1] - arr[0]
    if (step <= 1) {
      return null
    }

    // prevent a-b/x segments until localization is ready
    if (arr[0] != min) {
      return null
    }
    const end = arr[arr.length - 1]
    if (max - end >= step) {
      return null
    }

    for (let i = 2; i < arr.length; i++) {
      if (arr[i] - arr[i - 1] != step) {
        return null
      }
    }

    return new EverySegment(field, step, min, max)
  }
}

class ValueSegment implements CronSegment {
  field: FieldWrapper
  type: CronType = CronType.Value
  value: number

  constructor(field: FieldWrapper, value: number) {
    this.field = field
    this.value = value
  }

  toCron() {
    return `${this.value}`
  }

  toArray() {
    return [this.value]
  }

  get items() {
    return {
      value: this.field.itemMap[this.value],
    }
  }

  static fromString(str: string, field: FieldWrapper) {
    const { min, max } = field
    const value = parseInt(str)
    return String(value) === str && value >= min && value <= max
      ? new ValueSegment(field, value)
      : null
  }

  static fromArray(arr: number[], field: FieldWrapper) {
    const { min, max } = field

    if (arr.length != 1) {
      return null
    }

    const value = arr[0]
    if (value < min || value > max) {
      return null
    }

    return value
  }
}

class CombinedSegment implements CronSegment {
  static segmentFactories: SegmentFromString[] = [
    AnySegment.fromString,
    EverySegment.fromString,
    RangeSegment.fromString,
    ValueSegment.fromString,
  ]

  field: FieldWrapper
  segments: CronSegment[]

  constructor(field: FieldWrapper, segments: CronSegment[] = []) {
    this.field = field
    this.segments = segments
  }

  get type() {
    if (this.segments.length == 1) {
      return this.segments[0].type
    }
    return CronType.Range
  }

  addSegment(segment: CronSegment) {
    this.segments.push(segment)
  }

  toCron() {
    return this.segments.map((c) => c.toCron()).join(',')
  }

  toArray() {
    const values = new Set<number>()
    for (const seg of this.segments) {
      seg.toArray().forEach((value) => values.add(value))
    }
    return Array.from(values)
  }

  get items() {
    return unimplemented()
  }

  static fromString(str: string, field: FieldWrapper) {
    const factories = field.segmentFactories ?? CombinedSegment.segmentFactories
    let segments: CronSegment[] = []
    for (const strSeg of str.split(',')) {
      if (strSeg === '*') {
        segments = [new AnySegment(field)]
        break
      }

      let segment = null
      for (const fromString of factories) {
        segment = fromString(strSeg, field)
        if (segment !== null) {
          break
        }
      }
      if (segment === null) {
        return null
      }
      segments.push(segment)
    }
    return new CombinedSegment(field, segments)
  }

  static fromArray(arr: number[], field: FieldWrapper) {
    const { min, max } = field

    const minValue = arr[0]
    const maxValue = arr[arr.length - 1]

    if (minValue < min) {
      return null
    }
    if (maxValue > max) {
      return null
    }

    const ranges: CronSegment[] = []
    let start = 0
    for (let i = 0; i < arr.length; i++) {
      if (arr[i + 1] === undefined || arr[i + 1] - arr[i] > 1) {
        if (i === start) {
          ranges.push(new ValueSegment(field, arr[start]))
        } else {
          ranges.push(new RangeSegment(field, arr[start], arr[i]))
        }
        start = i + 1
      }
    }

    return new CombinedSegment(field, ranges)
  }
}

function cronToSegment(cron: string, field: FieldWrapper) {
  return CombinedSegment.fromString(cron, field)
}

function arrayToSegment(arr: number[], field: FieldWrapper) {
  for (const fromArray of [
    AnySegment.fromArray,
    EverySegment.fromArray,
    CombinedSegment.fromArray,
  ]) {
    const seg = fromArray(arr, field)
    if (seg != null) {
      return seg
    }
  }
  return null
}

export {
  AnySegment,
  CombinedSegment,
  EverySegment,
  NoSpecificSegment,
  RangeSegment,
  ValueSegment,
  arrayToSegment,
  cronToSegment,
}

import {
  FieldPattern,
  FieldWrapper,
  isSpecialPattern,
  isSpecialValue,
  type CronSegment,
  type FieldItem,
  type FieldValue,
  type SegmentFromArray,
  type SegmentFromString,
} from './types'
import { isSquence, range, unimplemented } from './util'
import { formatToOptions } from './format'

const monthNames = [
  'jan',
  'feb',
  'mar',
  'apr',
  'may',
  'jun',
  'jul',
  'aug',
  'sep',
  'oct',
  'nov',
  'dec',
]
const weekdayNames = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']

function sundayAlias(field: FieldWrapper): { from: number; to: number } | null {
  const { firstWeekDay, hasSundayAlias } = formatToOptions(field.ctx.format)
  if (field.id !== 'dayOfWeek' || !hasSundayAlias) return null
  if (firstWeekDay === 'sun=0' && field.min === 0 && field.max === 6) {
    return { from: 7, to: 0 }
  }
  if (firstWeekDay === 'mon=1' && field.min === 1 && field.max === 7) {
    return { from: 0, to: 7 }
  }
  return null
}

/** Parse a complete field token, retaining Sunday aliases until ranges have been expanded. */
function parseValue(str: string, field: FieldWrapper): number | null {
  let value: number
  if (/^\d+$/.test(str)) {
    value = Number(str)
  } else {
    const options = formatToOptions(field.ctx.format)
    if (!options.namedValues) return null
    const names = field.id === 'month' ? monthNames : field.id === 'dayOfWeek' ? weekdayNames : []
    const index = names.indexOf(str.toLowerCase())
    if (index === -1) return null
    const offset = field.id === 'month' || ['sun=1', 'mon=2'].includes(options.firstWeekDay) ? 1 : 0
    value = index + offset
    if (field.id === 'dayOfWeek' && options.firstWeekDay === 'mon=1' && index === 0) value = 7
  }
  return (value >= field.min && value <= field.max) || value === sundayAlias(field)?.from
    ? value
    : null
}

/**
 * Expand ranges and steps before replacing Sunday aliases, then rebuild from sorted, unique values.
 * Also rebuild steps with alias endpoints so their labels reference valid field items.
 */
function normalizeSunday(segment: CronSegment): CronSegment | null {
  const alias = sundayAlias(segment.field)
  if (alias === null) return segment
  const values = segment.toArray()
  const hasAliasEndpoint =
    segment instanceof StepSegment && (segment.start === alias.from || segment.end === alias.from)
  if (!values.includes(alias.from) && !hasAliasEndpoint) return segment
  const normalized = [
    ...new Set(values.map((value) => (value === alias.from ? alias.to : value))),
  ].sort((a, b) => Number(a) - Number(b))
  return arrayToSegment(normalized, segment.field)
}

/**
 * @returns true, if `arr` doesn't contain any special values, such as `L`
 */
function isValueArray(arr: FieldValue[]): arr is number[] {
  return arr.every((value) => !isSpecialValue(value))
}

class NoSpecificSegment implements CronSegment {
  field: FieldWrapper
  type: FieldPattern = FieldPattern.NoSpecific

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
  type: FieldPattern = FieldPattern.Any

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

  static fromArray(arr: FieldValue[], field: FieldWrapper) {
    const { items } = field

    if (!isValueArray(arr)) {
      return null
    }
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
    if (!isSquence(items.map((item) => item.value).sort((a, b) => a - b))) {
      return null
    }
    return new AnySegment(field)
  }
}

class RangeSegment implements CronSegment {
  static re = /^(\d+|[a-z]{3})-(\d+|[a-z]{3})$/i

  field: FieldWrapper
  type: FieldPattern = FieldPattern.Range
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

  static fromString(str: string, field: FieldWrapper): CronSegment | null {
    if (!RangeSegment.re.test(str)) {
      return null
    }

    const range = str.split('-')
    const start = parseValue(range[0], field)
    const end = parseValue(range[1], field)

    if (start === null || end === null || start > end) {
      return null
    }

    return normalizeSunday(new RangeSegment(field, start, end))
  }
}

function _rangeWithStep(n: number, min: number, max: number) {
  const res = []
  for (let i = min; i <= max; i += n) {
    res.push(i)
  }
  return res
}

class StepSegment implements CronSegment {
  static re = /^(\*|(?:\d+|[a-z]{3})(?:-(?:\d+|[a-z]{3}))?)\/\d+$/i

  field: FieldWrapper
  step: number
  start: number
  end: number

  constructor(field: FieldWrapper, step: number, start?: number, end?: number) {
    this.field = field
    this.step = step
    this.start = start ?? field.min
    this.end = end ?? field.max
  }

  get type() {
    const { min, max } = this.field
    if (
      formatToOptions(this.field.ctx.format).inherit !== 'crontab' &&
      this.start !== min &&
      max - this.end < this.step
    ) {
      return FieldPattern.StepFrom
    }
    if (this.start !== min || max - this.end >= this.step) {
      return FieldPattern.RangeStep
    }
    return FieldPattern.Step
  }

  toCron() {
    if (this.type === FieldPattern.StepFrom) {
      return `${this.start}/${this.step}`
    }
    if (this.type === FieldPattern.RangeStep) {
      return `${this.start}-${this.end}/${this.step}`
    }
    return `*/${this.step}`
  }

  toArray() {
    return _rangeWithStep(this.step, this.start, this.end)
  }

  get items() {
    return {
      step: this.field.itemMap[this.step],
      start: this.field.itemMap[this.start],
      end: this.field.itemMap[this.end],
    }
  }

  /**
   * Parse the bounds before `/`: `*`, `a-b`, or a single start in Quartz/Spring.
   * Preserve Sunday aliases until the range is expanded; return null for invalid bounds.
   */
  private static parseRange(s: string, field: FieldWrapper): [number, number] | null {
    if (s === '*') {
      return [field.min, field.max]
    }
    const parts = s.split('-')
    const start = parseValue(parts[0], field)
    const end =
      parts.length === 1 && formatToOptions(field.ctx.format).inherit !== 'crontab'
        ? Math.max(field.max, start ?? field.max)
        : parseValue(parts[1] ?? '', field)
    return start === null || end === null || start > end ? null : [start, end]
  }

  static fromString(str: string, field: FieldWrapper): CronSegment | null {
    if (!StepSegment.re.test(str)) {
      return null
    }

    const [rangeStr, stepStr] = str.split('/')
    const step = parseInt(stepStr)

    if (step < 1 || step > field.items.length) {
      return null
    }

    const bounds = StepSegment.parseRange(rangeStr, field)
    if (bounds === null) return null
    const [min, max] = bounds

    return normalizeSunday(new StepSegment(field, step, min, max))
  }

  static fromArray(arr: FieldValue[], field: FieldWrapper) {
    if (!isValueArray(arr) || arr.length < 3) {
      return null
    }

    const step = arr[1] - arr[0]
    if (step <= 1) {
      return null
    }

    for (let i = 2; i < arr.length; i++) {
      if (arr[i] - arr[i - 1] != step) {
        return null
      }
    }

    return new StepSegment(field, step, arr[0], arr[arr.length - 1])
  }
}

class ValueSegment implements CronSegment {
  field: FieldWrapper
  type: FieldPattern = FieldPattern.Value
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
    const value = parseValue(str, field)
    // Keep the existing rejection of zero-padded standalone numeric values.
    if (value === null || (/^\d+$/.test(str) && String(value) !== str)) return null
    const alias = sundayAlias(field)
    return new ValueSegment(field, value === alias?.from ? alias.to : value)
  }

  static fromArray(arr: FieldValue[], field: FieldWrapper) {
    const { min, max } = field

    if (!isValueArray(arr) || arr.length != 1) {
      return null
    }

    const value = arr[0]
    if (value < min || value > max) {
      return null
    }

    return value
  }
}

/**
 * Segment of the special value `L` of the day of month field
 *
 * - `L` - last day of the month
 * - `L-3` - 3 days before the last day of the month
 */
class LastDaySegment implements CronSegment {
  static re = /^L(?:-(\d+))?$/

  field: FieldWrapper
  offset: number

  constructor(field: FieldWrapper, offset: number = 0) {
    this.field = field
    this.offset = offset
  }

  get type() {
    return this.offset === 0 ? FieldPattern.LastDay : FieldPattern.LastDayOffset
  }

  toCron() {
    return this.offset === 0 ? 'L' : `L-${this.offset}`
  }

  toArray() {
    return [this.toCron()]
  }

  get items(): Record<string, FieldItem> {
    return this.offset === 0 ? {} : { offset: this.field.itemMap[this.offset] }
  }

  static fromString(str: string, field: FieldWrapper) {
    const match = LastDaySegment.re.exec(str)
    if (match === null) {
      return null
    }
    if (match[1] === undefined) {
      return new LastDaySegment(field)
    }

    const offset = parseInt(match[1])
    if (offset < 1 || offset > field.max - field.min) {
      return null
    }
    return new LastDaySegment(field, offset)
  }

  static fromArray(arr: FieldValue[], field: FieldWrapper) {
    const [value] = arr
    return arr.length === 1 && isSpecialValue(value)
      ? LastDaySegment.fromString(value, field)
      : null
  }
}

/**
 * Segment of the special value `LW` of the day of month field
 *
 * - `LW` - last weekday of the month
 */
class LastWeekdaySegment implements CronSegment {
  static re = /^LW$/

  field: FieldWrapper
  type: FieldPattern = FieldPattern.LastWeekday

  constructor(field: FieldWrapper) {
    this.field = field
  }

  toCron() {
    return 'LW'
  }

  toArray() {
    return [this.toCron()]
  }

  get items() {
    return {}
  }

  static fromString(str: string, field: FieldWrapper) {
    return LastWeekdaySegment.re.test(str) ? new LastWeekdaySegment(field) : null
  }

  static fromArray(arr: FieldValue[], field: FieldWrapper) {
    const [value] = arr
    return arr.length === 1 && isSpecialValue(value)
      ? LastWeekdaySegment.fromString(value, field)
      : null
  }
}

/**
 * Segment of the special value `W` of the day of month field
 *
 * - `15W` - weekday nearest to the 15th of the month
 */
class NearestWeekdaySegment implements CronSegment {
  static re = /^(\d+)W$/

  field: FieldWrapper
  type: FieldPattern = FieldPattern.NearestWeekday
  day: number

  constructor(field: FieldWrapper, day: number) {
    this.field = field
    this.day = day
  }

  toCron() {
    return `${this.day}W`
  }

  toArray() {
    return [this.toCron()]
  }

  get items() {
    return {
      value: this.field.itemMap[this.day],
    }
  }

  static fromString(str: string, field: FieldWrapper) {
    const match = NearestWeekdaySegment.re.exec(str)
    if (match === null) {
      return null
    }

    const { min, max } = field
    const day = parseInt(match[1])
    if (day < min || day > max) {
      return null
    }
    return new NearestWeekdaySegment(field, day)
  }

  static fromArray(arr: FieldValue[], field: FieldWrapper) {
    const [value] = arr
    return arr.length === 1 && isSpecialValue(value)
      ? NearestWeekdaySegment.fromString(value, field)
      : null
  }
}

class CombinedSegment implements CronSegment {
  static segmentFactories: SegmentFromString[] = [
    AnySegment.fromString,
    StepSegment.fromString,
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
    return FieldPattern.Range
  }

  addSegment(segment: CronSegment) {
    this.segments.push(segment)
  }

  toCron() {
    return this.segments.map((c) => c.toCron()).join(',')
  }

  toArray() {
    const values = new Set<FieldValue>()
    for (const seg of this.segments) {
      seg.toArray().forEach((value) => values.add(value))
    }
    const result = Array.from(values)
    return isValueArray(result) ? result.sort((a, b) => a - b) : result
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
      // A normalized full-week range has the same meaning as an explicit wildcard.
      if (segment instanceof AnySegment) {
        segments = [segment]
        break
      }
      // Sunday normalization may split a range across the numeric week boundary.
      segments.push(...(segment instanceof CombinedSegment ? segment.segments : [segment]))
    }

    // special values, such as `?` or `L`, can't be part of a list
    if (segments.length > 1 && segments.some((seg) => isSpecialPattern(seg.type))) {
      return null
    }

    return new CombinedSegment(field, segments)
  }

  static fromArray(arr: FieldValue[], field: FieldWrapper) {
    const { min, max } = field

    if (!isValueArray(arr)) {
      return null
    }

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

/**
 * Default factories to convert a cron segment into a {@link CronSegment}
 */
const defaultSegmentFactories: SegmentFromString[] = CombinedSegment.segmentFactories

/**
 * Default factories to convert the selected values into a {@link CronSegment}
 */
const defaultArraySegmentFactories: SegmentFromArray[] = [
  AnySegment.fromArray,
  StepSegment.fromArray,
  CombinedSegment.fromArray,
]

/**
 * Factories to parse the special values of the day of month field: `L`, `L-3`, `LW` and `15W`
 */
const specialDaySegmentFactories: SegmentFromString[] = [
  LastWeekdaySegment.fromString,
  LastDaySegment.fromString,
  NearestWeekdaySegment.fromString,
]

/**
 * Factories to build the special values of the day of month field: `L`, `L-3`, `LW` and `15W`
 */
const specialDayArraySegmentFactories: SegmentFromArray[] = [
  LastWeekdaySegment.fromArray,
  LastDaySegment.fromArray,
  NearestWeekdaySegment.fromArray,
]

function cronToSegment(cron: string, field: FieldWrapper) {
  return CombinedSegment.fromString(cron, field)
}

function arrayToSegment(arr: FieldValue[], field: FieldWrapper) {
  const factories = field.arraySegmentFactories ?? defaultArraySegmentFactories
  for (const fromArray of factories) {
    const seg = fromArray(arr, field)
    if (seg != null) {
      return seg
    }
  }
  return null
}

export {
  AnySegment,
  arrayToSegment,
  CombinedSegment,
  cronToSegment,
  defaultArraySegmentFactories,
  defaultSegmentFactories,
  LastDaySegment,
  LastWeekdaySegment,
  NearestWeekdaySegment,
  NoSpecificSegment,
  RangeSegment,
  specialDayArraySegmentFactories,
  specialDaySegmentFactories,
  StepSegment,
  ValueSegment,
}

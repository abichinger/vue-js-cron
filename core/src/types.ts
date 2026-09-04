import type { CronContext } from './components/cron-core'
import type { UseCronSegmentReturn } from './components/cron-segment'

export type CronFormat = 'crontab' | 'quartz' | 'spring'

/**
 * Value of a cron segment. Numbers refer to the values of a field, e.g. `1` (January).
 * Strings refer to special values, e.g. `L` (last day of the month).
 */
export type FieldValue = number | string

export interface CronSegment {
  field: FieldWrapper
  type: FieldPattern
  toCron: () => string
  toArray: () => FieldValue[]
  items: Record<string, FieldItem>
}

export type SegmentFromArray = (arr: FieldValue[], field: FieldWrapper) => CronSegment | null
export type SegmentFromString = (str: string, field: FieldWrapper) => CronSegment | null

export enum FieldPattern {
  Any = 'any', // *
  Value = 'value', // a
  Range = 'range', // a-b
  Step = 'step', // */x
  StepFrom = `stepFrom`, // a/x
  RangeStep = 'rangeStep', // a-b/x
  Combined = 'combined',
  NoSpecific = 'noSpecific', // ?
  LastDay = 'lastDay', // L
  LastDayOffset = 'lastDayOffset', // L-a
  LastWeekday = 'lastWeekday', // LW
  NearestWeekday = 'nearestWeekday', // aW
}

/**
 * Patterns, which can't be expressed as a list of {@link FieldValue | field values}
 */
const specialPatterns: ReadonlySet<FieldPattern> = new Set([
  FieldPattern.NoSpecific,
  FieldPattern.LastDay,
  FieldPattern.LastDayOffset,
  FieldPattern.LastWeekday,
  FieldPattern.NearestWeekday,
])

/**
 * @returns true, if the pattern is a special pattern, such as {@link FieldPattern.LastDay}
 */
export function isSpecialPattern(pattern: FieldPattern) {
  return specialPatterns.has(pattern)
}

/**
 * @returns true, if the value is a special value, such as `L`
 */
export function isSpecialValue(value: FieldValue): value is string {
  return typeof value === 'string'
}

export enum TextPosition {
  Prefix = 'prefix',
  Suffix = 'suffix',
  Text = 'text',
}

export interface FieldItem {
  value: number
  text: string
  alt: string
}

/**
 * An item, which represents a special value of a field, e.g. `L` (last day of the month).
 * Special items are appended to the items of a field, but they are not part of
 * {@link FieldWrapper.items}, because they don't take part in ranges and steps.
 */
export interface SpecialItem {
  value: string
  text: string
  alt: string
}

export type SelectItem = FieldItem | SpecialItem

export interface Field {
  id: string
  items: FieldItem[]
  onChange?: (segment: UseCronSegmentReturn, ctx: CronContext) => void
  /**
   * Factories to convert a cron segment into a {@link CronSegment},
   * defaults to `CombinedSegment.segmentFactories`
   */
  segmentFactories?: SegmentFromString[]
  /**
   * Factories to convert the selected values into a {@link CronSegment},
   * defaults to `defaultArraySegmentFactories`
   *
   * Note: `segmentFactories` and `arraySegmentFactories` should support the same patterns,
   * otherwise the selected values can't be converted back into a cron segment.
   */
  arraySegmentFactories?: SegmentFromArray[]
  /** Items of special values, such as `L`, which can be selected in addition to `items` */
  specialItems?: SpecialItem[]
  default?: string
}

export interface Period {
  /**
   * The id of the period
   */
  id: string

  /**
   * The value determines which fields are visible
   */
  value: string[]

  /**
   * The display name of the period
   */
  text?: string
}

interface FieldContext {
  format: CronFormat
}
export class FieldWrapper {
  field: Field
  itemMap: Record<number, FieldItem>
  specialItemMap: Record<string, SpecialItem>
  ctx: FieldContext

  constructor(field: Field, ctx: FieldContext) {
    this.field = field
    this.ctx = ctx

    this.itemMap = this.field.items.reduce(
      (acc, item) => {
        acc[item.value] = item
        return acc
      },
      {} as Record<number, FieldItem>,
    )

    this.specialItemMap = this.specialItems.reduce(
      (acc, item) => {
        acc[item.value] = item
        return acc
      },
      {} as Record<string, SpecialItem>,
    )
  }

  get id() {
    return this.field.id
  }
  get items() {
    return this.field.items
  }
  get onChange() {
    return this.field.onChange
  }
  get segmentFactories() {
    return this.field.segmentFactories
  }
  get arraySegmentFactories() {
    return this.field.arraySegmentFactories
  }
  get specialItems() {
    return this.field.specialItems ?? []
  }
  /** items and special items of the field */
  get allItems(): SelectItem[] {
    return [...this.items, ...this.specialItems]
  }

  get min() {
    return this.items[0].value
  }

  get max() {
    return this.items[this.items.length - 1].value
  }

  getItem(value: number) {
    return this.itemMap[value]
  }

  getSpecialItem(value: string) {
    return this.specialItemMap[value]
  }
}

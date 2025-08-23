import type { CronContext } from './components/cron-core'
import type { UseCronSegmentReturn } from './components/cron-segment'

export type CronFormat = 'crontab' | 'quartz' | 'spring'

export interface CronSegment {
  field: FieldWrapper
  type: FieldPattern
  toCron: () => string
  toArray: () => number[]
  items: Record<string, FieldItem>
}

export type SegmentFromArray = (arr: number[], field: FieldWrapper) => CronSegment | null
export type SegmentFromString = (str: string, field: FieldWrapper) => CronSegment | null

export enum FieldPattern {
  Any = 'any',
  Value = 'value',
  Range = 'range',
  Step = 'step',
  RangeStep = 'rangeStep',
  Combined = 'combined',
  NoSpecific = 'noSpecific',
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

export interface Field {
  id: string
  items: FieldItem[]
  onChange?: (segment: UseCronSegmentReturn, ctx: CronContext) => void
  segmentFactories?: SegmentFromString[]
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

export class FieldWrapper {
  field: Field
  itemMap: Record<number, FieldItem>

  constructor(field: Field) {
    this.field = field

    this.itemMap = this.field.items.reduce(
      (acc, item) => {
        acc[item.value] = item
        return acc
      },
      {} as Record<number, FieldItem>,
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

  get min() {
    return this.items[0].value
  }

  get max() {
    return this.items[this.items.length - 1].value
  }

  getItem(value: number) {
    return this.itemMap[value]
  }
}

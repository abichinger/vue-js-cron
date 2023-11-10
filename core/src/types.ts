import type { CronContext } from './components/cron-core'
import type { UseCronSegmentReturn } from './components/cron-segment'

export type CronFormat = 'crontab' | 'quartz'

export interface CronSegment {
  field: FieldWrapper
  type: CronType
  toCron: () => string
  toArray: () => number[]
  items: Record<string, FieldItem>
}

export type SegmentFromArray = (arr: number[], field: FieldWrapper) => CronSegment | null
export type SegmentFromString = (str: string, field: FieldWrapper) => CronSegment | null

export enum CronType {
  Empty = 'empty',
  Value = 'value',
  Range = 'range',
  EveryX = 'everyX',
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
}

export interface Period {
  id: string
  value: string[]
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

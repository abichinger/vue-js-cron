export enum CronType {
  Empty = 'empty',
  Value = 'value',
  Range = 'range',
  EveryX = 'everyX',
  Combined = 'combined'
}

export enum TextPosition {
  Prefix = 'prefix',
  Suffix = 'suffix',
  Text = 'text'
}

export interface FieldItem {
  value: number
  text: string
  alt: string
}

export interface Field {
  id: string
  items: FieldItem[]
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
      {} as Record<number, FieldItem>
    )
  }

  get id() {
    return this.field.id
  }
  get items() {
    return this.field.items
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

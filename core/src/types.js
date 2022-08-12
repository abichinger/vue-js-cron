const CronType = {
  Empty: 'empty',
  Value: 'value',
  Range: 'range',
  EveryX: 'everyX',
  Combined: 'combined'
}

const Position = {
  Prefix: 'prefix',
  Suffix: 'suffix',
  Text: 'text'
}

class Field {
  /**
     *
     * @param {String} name
     * @param {Array} items
     */
  constructor (id, items) {
    this.id = id
    this.items = items

    this.itemMap = this.items.reduce((acc, item) => {
      acc[item.value] = item
      return acc
    }, {})
  }

  get min () {
    return this.items[0].value
  }

  get max () {
    return this.items[this.items.length - 1].value
  }

  getItem (value) {
    return this.itemMap[value]
  }
}

class CronSegment {
  get type () {
    return CronType.Value
  }

  get value () {
    return '*'
  }
}

class AnySegment extends CronSegment {
  get type () {
    return CronType.Empty
  }

  get value () {
    return '*'
  }
}

class RangeSegment extends CronSegment {
  constructor (start, end) {
    super()
    this.start = start
    this.end = end
  }

  get type () {
    return CronType.Range
  }

  get value () {
    return `${this.start}-${this.end}`
  }
}

class EverySegment extends CronSegment {
  constructor (every) {
    super()
    this.every = every
  }

  get type () {
    return CronType.EveryX
  }

  get value () {
    return `*/${this.every}`
  }
}

class ValueSegment extends CronSegment {
  constructor (value) {
    super()
    this.val = value
  }

  get type () {
    return CronType.Value
  }

  get value () {
    return '' + this.val
  }
}

class CombinedSegment extends CronSegment {
  constructor (segments = []) {
    super()
    this.segments = segments
  }

  get type () {
    return CronType.Combined
  }

  addSegment (cronSegment) {
    this.segments.push(cronSegment)
  }

  get value () {
    return this.segments.map((c) => c.value).join(',')
  }
}

export {
  Field,
  AnySegment,
  RangeSegment,
  ValueSegment,
  EverySegment,
  CombinedSegment,
  CronType,
  Position
}

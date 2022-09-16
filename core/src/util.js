
function range (start, end, step = 1) {
  const r = []
  for (let i = start; i <= end; i += step) {
    r.push(i)
  }
  return r
}

class Range {
  constructor (start, end, step = 1) {
    this.start = start
    this.end = end
    this.step = step

    return new Proxy(this, {
      get: function (target, prop) {
        const i = (typeof prop === 'string') ? parseInt(prop) : prop
        if (typeof i === 'number' && i >= 0 && i <= target.length) {
          return target.start + target.step * i
        }
        return Reflect.get(...arguments)
      }
    })
  }

  get length () {
    return parseInt((this.end - this.start) / this.step) + 1
  }

  [Symbol.iterator] () {
    let index = -1
    return {
      next: () => {
        return { value: this[++index], done: !(this[index + 1] !== undefined) }
      }
    }
  }
}

function getValue (params, key) {
  const keys = key.split('.')
  let value = params
  for (const k of keys) {
    value = value[k]
  }
  return value
}

function format (str, params) {
  const re = /\{\{\S+\}\}/gm
  let m
  while ((m = re.exec(str)) !== null) {
    const key = m[0].substring(2, m[0].length - 2)
    const value = getValue(params, key)
    str = str.substr(0, m.index) + value + str.substr(m.index + m[0].length)
    re.lastIndex = m.index
  }
  return str
}

/**
 * type definition
 * @name toText
 * @function
 * @param {number} value
 * @returns {string}
*/

/**
 * generate items for fields
 * @param {number} min first value
 * @param {number} max last value
 * @param {toText} genText returns a string representation of value
 * @param {toText} genAltText returns an alternative string representation of value
 * @returns {Array<{value:number, text:string, alt:string}>} array of items
 */
function genItems (min, max, genText = (value) => { return value + '' }, genAltText = (value) => { return value + '' }) {
  const res = []
  for (const i of new Range(min, max)) {
    const item = {}
    item.text = genText(i)
    item.alt = genAltText(i)
    item.value = i
    res.push(item)
  }
  return res
}

/**
 * pads numbers
 * @param {number} n number to pad
 * @param {number} width
 * @example
 * //returns "001"
 * util.pad(1,3)
 * @returns {string} the padded number
 */
function pad (n, width) {
  n = n + ''
  return (n.length < width) ? new Array(width - n.length).fill('0').join('') + n : n
}

/**
 * determines whether the passed value is an object
 * @param {any} value
 * @returns {Boolean} true if value is an object, otherwise false
 */
function isObject (value) {
  return (value && typeof value === 'object' && !Array.isArray(value))
}

/**
 * copies (deep copy) all properties from each source to target
 * @param {object} target
 * @param  {...object} sources
 * @returns {object} target
 */
function deepMerge (target, ...sources) {
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

function traverse (obj, ...keys) {
  if (keys.length === 0) { return obj }

  for (const key of keys[0]) {
    if (key in obj) {
      const res = traverse(obj[key], ...keys.slice(1))
      if (res !== undefined) {
        return res
      }
    }
  }
}

function populate (obj, map) {
  const res = {}
  for (const [key, value] of Object.entries(obj)) {
    res[key] = map[value]
  }
  return res
}

function isSquence (numbers) {
  for (let i = 1; i < numbers.length; i++) {
    if (numbers[i - 1] + 1 !== numbers[i]) {
      return false
    }
  }
  return true
}

export default {
  range,
  Range,
  format,
  genItems,
  pad,
  deepMerge,
  isObject,
  traverse,
  populate,
  isSquence
}

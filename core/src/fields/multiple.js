// x,y,z

import any from './any'
import every from './every'
import range from './range'
import value from './value'

const fieldTypes = [any, every, range, value]

function strToArray (str, field) {
  const fields = str.split(',')
  const res = []
  for (const f of fields) {
    if (f === '*') {
      return []
    }

    let values = null
    for (const fieldType of fieldTypes) {
      values = fieldType.strToArray(f, field)
      if (values !== null) {
        break
      }
    }
    if (values === null) {
      return null
    }
    res.push(...values)
  }
  return Array.from(new Set(res))
}

function arrayToStr (arr, field) {
  for (const fieldType of fieldTypes) {
    const value = fieldType.arrayToStr(arr, field)
    if (value) {
      return value
    }
  }
  return null
}

export default {
  strToArray,
  arrayToStr
}

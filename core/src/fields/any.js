
// *
import { AnySegment } from '../types'
import util from '../util'

function strToArray (str) {
  if (str !== '*') {
    return null
  }
  return []
}

function arrayToStr (arr, field) {
  const { items } = field

  if (arr.length === 0) {
    return new AnySegment()
  }
  if (arr.length !== items.length) {
    return null
  }

  for (const item of items) {
    if (!arr.includes(item.value)) {
      return null
    }
  }
  if (!util.isSquence(items.map(item => item.value))) {
    return null
  }
  return new AnySegment()
}

export default {
  strToArray,
  arrayToStr
}

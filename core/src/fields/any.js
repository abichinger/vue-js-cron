
// *
import { AnySegment } from '../types'

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
  return new AnySegment()
}

export default {
  strToArray,
  arrayToStr
}

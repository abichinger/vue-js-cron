// x
import { CombinedSegment, ValueSegment } from '../types'

function strToArray (str, { min, max }) {
  const number = parseInt(str)
  return (String(number) === str && number >= min && number <= max) ? [number] : null
}

function arrayToStr (arr, field) {
  const { min, max } = field

  if (Math.min(arr) < min) {
    return null
  }
  if (Math.max(arr) > max) {
    return null
  }

  const values = arr.map((x) => { return new ValueSegment(x) })
  return new CombinedSegment(values)
}

export default {
  strToArray,
  arrayToStr
}

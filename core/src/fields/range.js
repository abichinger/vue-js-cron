import { CombinedSegment, RangeSegment, ValueSegment } from '../types'
import util from '../util'
// x-y

const re = /^\d+-\d+$/

function strToArray (str, { min, max }) {
  if (!re.test(str)) {
    return null
  }

  const range = str.split('-')
  const start = parseInt(range[0])
  const end = parseInt(range[1])

  if (start > end || start < min || end > max) {
    return null
  }

  return util.range(start, end)
}

function arrayToStr (arr, field) {
  const { min, max } = field

  if (arr.length <= 1) {
    return null
  }

  const minValue = arr[0]
  const maxValue = arr[arr.length - 1]

  if (minValue < min) {
    return null
  }
  if (maxValue > max) {
    return null
  }

  const ranges = []
  let start = 0
  for (let i = 0; i < arr.length; i++) {
    if (arr[i + 1] === undefined || arr[i + 1] - arr[i] > 1) {
      if (i === start) {
        ranges.push(new ValueSegment(arr[start]))
      } else {
        ranges.push(new RangeSegment(arr[start], arr[i]))
      }
      start = i + 1
    }
  }

  return new CombinedSegment(ranges)
}

export default {
  strToArray,
  arrayToStr
}

// x
import types from '../types'
const { ValueColumn, CombinedColumn } = types

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

  const values = arr.map((x) => { return new ValueColumn(field, x) })
  return new CombinedColumn(field, values)
}

export default {
  strToArray,
  arrayToStr
}

// */x
import { EverySegment } from '../types'

const re = /^\*\/\d+$/

function strToArray (str, { min, max }) {
  if (!re.test(str)) {
    return null
  }

  const [, everyStr] = str.split('/')
  const every = parseInt(everyStr)

  const start = every * parseInt(min / every)
  const res = []
  for (let i = start; i <= max; i += every) {
    if (i >= min) {
      res.push(i)
    }
  }
  return res.length > 0 ? res : null
}

function arrayToStr (arr, field) {
  const { min, max } = field

  if (arr.length < 3) {
    return null
  }

  const step = arr[1] - arr[0]
  if (step <= 1) {
    return null
  }

  const first = (min % step === 0) ? min : (parseInt(min / step) + 1) * step
  if (arr.length !== parseInt((max - first) / step) + 1) {
    return null
  }

  for (const value of arr) {
    if (value % step !== 0) {
      return null
    }
  }

  return new EverySegment(step)
}

export default {
  strToArray,
  arrayToStr
}

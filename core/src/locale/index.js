import Mustache from 'mustache'
import util from '../util'
import de from './de'
import en from './en'
import pt from './pt'
const { genItems, pad, traverse } = util

const locales = {
  en,
  de,
  pt
}

class Locale {
  constructor (dict) {
    this.dict = dict
  }

  getLocaleStr (...keys) {
    const k = keys.map(key => [key, '*'])
    return traverse(this.dict, ...k) || ''
  }

  render (periodId, fieldId, cronType, position, params) {
    const template = this.getLocaleStr(periodId, fieldId, cronType, position)
    return Mustache.render(template, params || {})
  }
}

/**
 *
 * @param {string} locale=en
 * @param {object} mixin
 * @returns {Locale} Dictionary with all strings in the requested language
 */
function getLocale (locale, mixin) {
  const l = locales[locale] || locales.en
  const dict = util.deepMerge(l, mixin || {})
  return new Locale(dict)
}

/**
 *
 * @param {string} locale
 * @returns {object} items for minute, hour, day, month and day of week
 */
function defaultItems (locale) {
  return {
    minuteItems: genItems(0, 59, (value) => pad(value, 2)),
    hourItems: genItems(0, 23, (value) => pad(value, 2)),
    dayItems: genItems(1, 31),
    monthItems: genItems(1, 12, (value) => {
      return new Date(2021, value - 1, 1).toLocaleDateString(locale, { month: 'long' })
    }, (value) => {
      return new Date(2021, value - 1, 1).toLocaleDateString(locale, { month: 'short' })
    }),
    dayOfWeekItems: genItems(0, 6, (value) => {
      const date = new Date(2021, 0, 3 + value) // first sunday in 2021
      return date.toLocaleDateString(locale, { weekday: 'long' })
    }, (value) => {
      const date = new Date(2021, 0, 3 + value) // first sunday in 2021
      return date.toLocaleDateString(locale, { weekday: 'short' })
    })
  }
}

export {
  defaultItems,
  getLocale,
  Locale
}

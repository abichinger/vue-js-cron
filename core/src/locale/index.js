import util from '../util'
import en from './en'
const { genItems, pad, traverse } = util

const locales = {
  en
}

/**
 *
 * @param {string} locale=en
 * @returns {object} object with all strings in the requested language
 */
function getLocale (locale) {
  if (locale in locales) {
    return locales[locale]
  } else {
    return locales.en
  }
}

/**
 *
 * @param {string} locale
 * @returns {object} items for minute, hour, day, month and day of week
 */
function defaultItems (locale) {
  return {
    minuteItems: genItems(0, 59, (value) => pad(value, 2)),
    hourItems: genItems(0, 59, (value) => pad(value, 2)),
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

export default {
  getLocaleStr: (locale, periodId, fieldId, localeKey) => {
    return traverse(locale, [periodId + 'Period', 'eachPeriod'], [fieldId + 'Field', 'eachField'], [localeKey]) || ''
  },

  getPrefix: (locale, periodId, fieldId) => {
    return traverse(locale, [periodId + 'Period', 'eachPeriod'], [fieldId + 'Field', 'eachField'], ['prefix']) || ''
  },

  getSuffix: (locale, periodId, fieldId) => {
    return traverse(locale, [periodId + 'Period', 'eachPeriod'], [fieldId + 'Field', 'eachField'], ['suffix']) || ''
  },

  defaultItems,
  getLocale
}

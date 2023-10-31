import type { CronType, TextPosition } from '@/types'
import Mustache from 'mustache'
import { deepMerge, traverse } from '../util'
import cn from './cn'
import da from './da'
import de from './de'
import en from './en'
import es from './es'
import pt from './pt'
import type { Localization } from './types'

const locales: Record<string, Localization> = {
  empty: {},
  en,
  de,
  pt,
  es,
  da,
  zh: cn,
  'zh-cn': cn,
}

class Locale {
  dict: Localization

  constructor(dict: Localization) {
    this.dict = dict
  }

  getLocaleStr(...keys: string[]) {
    const k = keys.map((key) => [key, '*'])
    return traverse(this.dict, ...k) || ''
  }

  render(
    periodId: string,
    fieldId: string,
    cronType: CronType,
    position: TextPosition,
    params: any,
  ) {
    const template = this.getLocaleStr(periodId, fieldId, cronType, position)
    return Mustache.render(template, params || {})
  }
}

/**
 *
 * @param locale - locale code, e.g.: en, en-GB de-DE
 * @param mixin - can be used to override values of the Locale
 * @returns {Locale} Dictionary with all strings in the requested language
 */
function getLocale(localeCode: string, mixin?: Localization) {
  const [language] = localeCode.split('-')
  const l = locales[localeCode.toLowerCase()] || locales[language.toLowerCase()] || locales.en
  const dict = deepMerge(l, mixin || {}) as Localization
  return new Locale(dict)
}

export { Locale, getLocale }

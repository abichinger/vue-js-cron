import type { CronType, TextPosition } from '@/types'
import Mustache from 'mustache'
import { deepMerge, traverse } from '../util'
import cn from './cn'
import da from './da'
import de from './de'
import en from './en'
import es from './es'
import fr from './fr'
import hi from './hi'
import ja from './ja'
import pl from './pl'
import pt from './pt'
import ru from './ru'
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
  ru,
  fr,
  hi,
  ja,
  pl,
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

// The following prompt was used for localizations translated with GPT-4:
//
// You are a service that translates user requests into JSON objects of type "Localizations" according to the following TypeScript definitions:
// ```typescript
// export type PartialRecord<K extends keyof any, T> = Partial<Record<K, T>>

// export type PositionedLocalization = PartialRecord<TextPosition, string>
// export type CronLocalization = PartialRecord<CronType | '*', PositionedLocalization>

// export interface FieldLocalization {
//   // Allow custom field ids
//   [fieldId: string]: unknown

//   /** `*` is used as a wildcard and matches any field id */
//   '*'?: CronLocalization
//   second?: CronLocalization
//   minute?: CronLocalization
//   hour?: CronLocalization
//   day?: CronLocalization
//   month?: CronLocalization
//   dayOfWeek?: CronLocalization
// }

// export type PeriodLocalization = PositionedLocalization | FieldLocalization

// /**
//  * Interface to define localizations for vue-js-cron
//  * The localization strings are accessed by {periodId}.{fieldId}.{cronType}.{position}
//  */
// export interface Localization {
//   /** Allows custom period ids */
//   [periodId: string]: unknown

//   /** `*` is used as a wildcard and matches any period id */
//   '*'?: PeriodLocalization
//   minute?: PeriodLocalization
//   hour?: PeriodLocalization
//   day?: PeriodLocalization
//   week?: PeriodLocalization
//   month?: PeriodLocalization
//   year?: PeriodLocalization
// }
// ```
// The following is a user request:
// """
// Translate the following Javascript object from German into Russian:
// {
//   '*': {
//     prefix: 'Jede',
//     suffix: '',
//     text: 'Unknown',
//     '*': {
//       value: { text: '{{value.text}}' },
//       range: { text: '{{start.text}}-{{end.text}}' },
//       everyX: { text: 'alle {{every.value}}' },
//     },
//     month: {
//       '*': { prefix: 'im' },
//       empty: {
//         prefix: 'in',
//         text: 'jedem Monat',
//       },
//       value: { text: '{{value.alt}}' },
//       range: { text: '{{start.alt}}-{{end.alt}}' },
//     },
//     day: {
//       '*': { prefix: 'den' },
//       empty: {
//         prefix: 'an',
//         text: 'jedem Tag',
//       },
//       everyX: {
//         prefix: '',
//         text: 'alle {{every.value}} Tage',
//       },
//       noSpecific: {
//         prefix: 'an',
//         text: 'keinem bestimmten Tag',
//       },
//     },
//     dayOfWeek: {
//       '*': { prefix: 'am' },
//       empty: {
//         prefix: 'an',
//         text: 'jedem Wochentag',
//       },
//       value: { text: '{{value.alt}}' },
//       range: { text: '{{start.alt}}-{{end.alt}}' },
//       noSpecific: {
//         prefix: 'und',
//         text: 'keinem bestimmten Wochentag',
//       },
//     },
//     hour: {
//       '*': { prefix: 'um' },
//       empty: {
//         prefix: 'zu',
//         text: 'jeder Stunde',
//       },
//       everyX: {
//         prefix: '',
//         text: 'alle {{every.value}} Stunden',
//       },
//     },
//     minute: {
//       '*': { prefix: ':' },
//       empty: { text: 'jede Minute' },
//       everyX: {
//         prefix: '',
//         text: 'alle {{every.value}} Minuten',
//       },
//     },
//     second: {
//       '*': { prefix: ':' },
//       empty: { text: 'jede Sekunde' },
//       everyX: {
//         prefix: '',
//         text: 'alle {{every.value}} Sekunden',
//       },
//     },
//   },
//   minute: {
//     text: 'Minute',
//   },
//   hour: {
//     text: 'Stunde',
//     minute: {
//       '*': {
//         prefix: 'zu',
//         suffix: 'Minute(n)',
//       },
//       empty: { text: 'jeder' },
//     },
//   },
//   day: {
//     prefix: 'Jeden',
//     text: 'Tag',
//   },
//   week: {
//     text: 'Woche',
//   },
//   month: {
//     prefix: 'Jedes',
//     text: 'Monat',
//   },
//   year: {
//     prefix: 'Jedes',
//     text: 'Jahr',
//   },

//   //quartz format
//   'q-second': {
//     text: 'Sekunde',
//   },
//   'q-minute': {
//     text: 'Minute',
//     second: {
//       '*': {
//         prefix: 'und',
//       },
//     },
//   },
//   'q-hour': {
//     text: 'Stunde',
//     minute: {
//       '*': {
//         prefix: 'und',
//       },
//     },
//     second: {
//       '*': {
//         prefix: 'und',
//       },
//     },
//   },
// }
// """
// The following is the user request translated into a JSON object with 2 spaces of indentation and no properties with the value undefined:

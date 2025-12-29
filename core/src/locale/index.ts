import type { FieldPattern, TextPosition } from '@/types'
import Mustache from 'mustache'
import { deepMerge, traverse } from '../util'
import cn from './cn'
import da from './da'
import de from './de'
import en from './en'
import es from './es'
import fr from './fr'
import he from './he'
import hi from './hi'
import it from './it'
import ja from './ja'
import ko from './ko'
import pt from './pt'
import ru from './ru'
import uk from './uk'
import type { Localization } from './types'

const locales: Record<string, Localization> = {
  empty: {},
  en,
  de,
  pt,
  es,
  da,
  zh: cn,
  he,
  ru,
  fr,
  hi,
  ja,
  ko,
  it,
  uk,
}

class L10nEngine {
  dict: Localization

  constructor(dict: Localization) {
    this.dict = dict
  }

  /**
   * Gets a localization template by traversing the dictionary using provided keys.
   * @param keys - Array of keys to traverse through the localization dictionary
   * @returns The found template string or empty string if not found
   */
  getTemplate(...keys: string[]) {
    const k = keys.map((key) => [key, '*'])
    return traverse(this.dict, ...k) || ''
  }

  /**
   * Renders a localization template with the provided parameters using Mustache.
   * @param periodId - The period identifier (e.g. 'year', 'month')
   * @param fieldId - The field identifier (e.g. 'hour', 'minute')
   * @param fieldPattern - The pattern type of the field
   * @param position - The text position
   * @param params - Parameters to be interpolated into the template
   * @returns The rendered localization string
   */
  render(
    periodId: string,
    fieldId: string,
    fieldPattern: FieldPattern,
    position: TextPosition,
    params: any,
  ) {
    const template = this.getTemplate(periodId, fieldId, fieldPattern, position)
    return Mustache.render(template, params || {})
  }
}

/**
 * Creates a localization engine for the specified locale.
 * @param localeCode - Locale code (e.g. 'en', 'en-GB', 'de-DE')
 * @param mixin - Optional dictionary to override default locale strings
 * @returns A new L10nEngine instance for the specified locale with English as fallback
 */
function createL10n(localeCode: string, mixin?: Localization) {
  const [language] = localeCode.split('-')
  const l = locales[localeCode.toLowerCase()] || locales[language.toLowerCase()] || locales.en
  // Note: always use an empty object as target
  const dict = deepMerge({}, locales.en, l, mixin || {}) as Localization
  return new L10nEngine(dict)
}

export { createL10n, L10nEngine }

// The following prompt was used for localizations translated with GPT-4:
//
// You are a service that translates user requests into JSON objects of type "Localizations" according to the following TypeScript definitions:
// ```typescript
// export type PartialRecord<K extends keyof any, T> = Partial<Record<K, T>>

// export type PositionedLocalization = PartialRecord<TextPosition, string>
// export type CronLocalization = PartialRecord<FieldPattern | '*', PositionedLocalization>

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
//  * The localization strings are accessed by {periodId}.{fieldId}.{fieldPattern}.{position}
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
//       step: { text: 'alle {{step.value}}' },
//     },
//     month: {
//       '*': { prefix: 'im' },
//       any: {
//         prefix: 'in',
//         text: 'jedem Monat',
//       },
//       value: { text: '{{value.alt}}' },
//       range: { text: '{{start.alt}}-{{end.alt}}' },
//     },
//     day: {
//       '*': { prefix: 'den' },
//       any: {
//         prefix: 'an',
//         text: 'jedem Tag',
//       },
//       step: {
//         prefix: '',
//         text: 'alle {{step.value}} Tage',
//       },
//       noSpecific: {
//         prefix: 'an',
//         text: 'keinem bestimmten Tag',
//       },
//     },
//     dayOfWeek: {
//       '*': { prefix: 'am' },
//       any: {
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
//       any: {
//         prefix: 'zu',
//         text: 'jeder Stunde',
//       },
//       step: {
//         prefix: '',
//         text: 'alle {{step.value}} Stunden',
//       },
//     },
//     minute: {
//       '*': { prefix: ':' },
//       any: { text: 'jede Minute' },
//       step: {
//         prefix: '',
//         text: 'alle {{step.value}} Minuten',
//       },
//     },
//     second: {
//       '*': { prefix: ':' },
//       any: { text: 'jede Sekunde' },
//       step: {
//         prefix: '',
//         text: 'alle {{step.value}} Sekunden',
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
//       any: { text: 'jeder' },
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

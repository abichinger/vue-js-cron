import type { CronType, TextPosition } from '@/types'

// https://stackoverflow.com/a/53276873/3140799
export type PartialRecord<K extends keyof any, T> = Partial<Record<K, T>>

export type PositionedLocalization = PartialRecord<TextPosition, string>
export type CronLocalization = PartialRecord<CronType | '*', PositionedLocalization>

export interface FieldLocalization {
  // Allow custom field ids
  [fieldId: string]: unknown

  /** `*` is used as a wildcard and matches any field id */
  '*'?: CronLocalization
  second?: CronLocalization
  minute?: CronLocalization
  hour?: CronLocalization
  day?: CronLocalization
  month?: CronLocalization
  dayOfWeek?: CronLocalization
}

export type PeriodLocalization = PositionedLocalization | FieldLocalization

/**
 * Interface to define localizations for vue-js-cron
 * The localization strings are accessed by {periodId}.{fieldId}.{cronType}.{position}
 *
 * See {@link https://github.com/abichinger/vue-js-cron/blob/main/core/src/locale/en.ts | src/locale/en.ts} for the english localization object.
 *
 * @example
 * Here is an incomplete example
 * ```
 * const myLocale: Localization = {
 *   '*': {
 *     prefix: 'Every',
 *     '*': {
 *       empty: { text: 'any {field.id}' },
 *       // ...
 *     },
 *     hour: {
 *       empty: { text: 'every' },
 *       // ...
 *     },
 *   },
 *   month: {
 *     prefix: 'EVERY',
 *   },
 *   // ...
 * }
 * ```
 */
export interface Localization {
  /** Allows custom period ids */
  [periodId: string]: unknown

  /** `*` is used as a wildcard and matches any period id */
  '*'?: PeriodLocalization
  minute?: PeriodLocalization
  hour?: PeriodLocalization
  day?: PeriodLocalization
  week?: PeriodLocalization
  month?: PeriodLocalization
  year?: PeriodLocalization
}

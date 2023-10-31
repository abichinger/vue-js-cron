import type { CronType, TextPosition } from '@/types'

// https://stackoverflow.com/a/53276873/3140799
export type PartialRecord<K extends keyof any, T> = Partial<Record<K, T>>

export type PositionedLocalization = PartialRecord<TextPosition, string>
export type CronLocalization = PartialRecord<CronType | '*', PositionedLocalization>

export interface FieldLocalization {
  // Allow custom field ids
  [fieldId: string]: unknown

  '*'?: CronLocalization
  second?: CronLocalization
  minute?: CronLocalization
  hour?: CronLocalization
  day?: CronLocalization
  month?: CronLocalization
  dayOfWeek?: CronLocalization
}

export type PeriodLocalization = PositionedLocalization | FieldLocalization

export interface Localization {
  /** Allow custom period ids */
  [periodId: string]: unknown

  /** wildcard, matches any period id */
  '*'?: PeriodLocalization
  minute?: PeriodLocalization
  hour?: PeriodLocalization
  day?: PeriodLocalization
  week?: PeriodLocalization
  month?: PeriodLocalization
  year?: PeriodLocalization
}

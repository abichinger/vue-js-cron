import type { CronType, TextPosition } from '@/types'

// https://stackoverflow.com/a/53276873/3140799
type PartialRecord<K extends keyof any, T> = Partial<Record<K, T>>

type PositionedLocalization = PartialRecord<TextPosition, string>
type CronLocalization = PartialRecord<CronType | '*', PositionedLocalization>

interface FieldLocalization {
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

type PeriodLocalization = PositionedLocalization | FieldLocalization

export interface Localization {
  // Allow custom period ids
  [periodId: string]: unknown

  '*'?: PeriodLocalization
  minute?: PeriodLocalization
  hour?: PeriodLocalization
  day?: PeriodLocalization
  week?: PeriodLocalization
  month?: PeriodLocalization
  year?: PeriodLocalization
}

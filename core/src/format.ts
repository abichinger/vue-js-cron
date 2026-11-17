import type { CronFormat, CronFormatOptions } from './types'

/** Resolve both string and object formats without modifying the supplied options. */
export function formatToOptions(format: CronFormat): Required<CronFormatOptions> {
  const inherit = typeof format === 'string' ? format : (format.inherit ?? 'crontab')
  const quartzLike = inherit === 'quartz' || inherit === 'spring'
  const options = typeof format === 'string' ? {} : format

  return {
    inherit,
    seconds: options.seconds ?? quartzLike,
    noSpecific: options.noSpecific ?? quartzLike,
    specialDays: options.specialDays ?? quartzLike,
    namedValues: options.namedValues ?? true,
    hasSundayAlias: options.hasSundayAlias ?? inherit !== 'quartz',
    firstWeekDay: options.firstWeekDay ?? (inherit === 'quartz' ? 'sun=1' : 'sun=0'),
  }
}

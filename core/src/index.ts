import { type App } from 'vue'
import { CronCore } from './components/cron-core'

export {
  CronCore,
  cronCoreProps,
  DefaultCronOptions,
  setupCron,
  specialDayItems,
  useCron,
  withSpecialDays,
  type CronContext,
  type CronCoreProps,
  type CronOptions,
  type UseCronReturn,
} from './components/cron-core'
export {
  RenderlessSelect,
  selectProps,
  setupSelect,
  useSelect,
  type SelectOptions,
  type UseSelectReturn,
} from './components/select'
export {
  AnySegment,
  arrayToSegment,
  CombinedSegment,
  cronToSegment,
  defaultArraySegmentFactories,
  defaultSegmentFactories,
  LastDaySegment,
  LastWeekdaySegment,
  NearestWeekdaySegment,
  NoSpecificSegment,
  RangeSegment,
  specialDayArraySegmentFactories,
  specialDaySegmentFactories,
  StepSegment,
  ValueSegment,
} from './cron'
export { createL10n, L10nEngine } from './locale'
export type * from './locale/types'
export type * from './types'
export { FieldPattern, FieldWrapper, isSpecialPattern, isSpecialValue, TextPosition } from './types'
export { defaultItems, genItems, pad, splitArray, type toText } from './util'

export const CronCorePlugin = {
  install: (app: App) => {
    app.component('CronCore', CronCore)
  },
}
export default CronCorePlugin

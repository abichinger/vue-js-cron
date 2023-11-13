import { type App } from 'vue'
import { CronCore } from './components/cron-core'

export {
  CronCore,
  cronCoreProps,
  setupCron,
  useCron,
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
export { Locale, getLocale } from './locale'
export type * from './locale/types'
export type * from './types'
export { CronType, FieldWrapper, TextPosition } from './types'
export { defaultItems, genItems, pad, splitArray, type toText } from './util'

export const CronCorePlugin = {
  install: (app: App) => {
    app.component('CronCore', CronCore)
  },
}
export default CronCorePlugin

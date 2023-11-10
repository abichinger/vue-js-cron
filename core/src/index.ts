import { type App } from 'vue'
import { CronCore } from './components/cron-core'

export { CronCore, cronProps, useCron } from './components/cron-core'
export { RenderlessSelect, selectProps, useSelect } from './components/select'
export { Locale, getLocale } from './locale'
export type * from './locale/types'
export type * from './types'
export { CronType, FieldWrapper, TextPosition } from './types'
export { defaultItems, genItems, pad, splitArray } from './util'

function install(app: App) {
  app.component('CronCore', CronCore)
}

export const corePlugin = {
  install,
}
export default corePlugin

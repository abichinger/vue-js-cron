import { type App } from 'vue'
import { useCronComponent } from './components/cron-core'

export { cronProps, useCron, useCronComponent } from './components/cron-core'
export { selectProps, useSelect } from './components/select'
export { Locale, getLocale } from './locale'
export { CronType, FieldWrapper, TextPosition } from './types'
export type { Field, FieldItem, Period } from './types'
export { defaultItems, genItems, pad, splitArray } from './util'

function install(app: App) {
  app.component('CronCore', useCronComponent())
}

export const corePlugin = {
  install
}

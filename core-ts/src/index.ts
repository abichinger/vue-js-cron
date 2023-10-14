import { type App } from 'vue'
import { useCronComponent } from './components/cron-core'

export { useCron, useCronComponent } from './components/cron-core'
export { useSelect, useSelectComponent } from './components/select'
export { Locale, getLocale } from './locale'
export { defaultItems, genItems, pad } from './util'

function install(app: App) {
  app.component('CronCore', useCronComponent())
}

export const corePlugin = {
  install,
}

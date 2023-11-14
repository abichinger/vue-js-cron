import {
  default as CronQuasar,
  cronQuasarProps,
  type CronQuasarProps,
} from '@/components/cron-quasar.vue'
import type { App } from 'vue'

export { CronQuasar, cronQuasarProps, type CronQuasarProps }
export const CronQuasarPlugin = {
  install: (app: App) => {
    app.component('CronQuasar', CronQuasar)
  },
}
export default CronQuasarPlugin

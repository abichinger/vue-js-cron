import {
  default as CronNaive,
  cronNaiveProps,
  type CronNaiveProps,
} from '@/components/cron-naive-ui.vue'
import type { App } from 'vue'

export { CronNaive, cronNaiveProps, type CronNaiveProps }
export const CronNaivePlugin = {
  install: (app: App) => {
    app.component('CronNaive', CronNaive)
  },
}
export default CronNaivePlugin

import {
  default as CronPrime,
  cronPrimeProps,
  type CronPrimeProps,
} from '@/components/cron-prime.vue'
import type { App } from 'vue'

export { CronPrime, cronPrimeProps, type CronPrimeProps }
export const CronPrimePlugin = {
  install: (app: App) => {
    app.component('CronPrime', CronPrime)
  },
}
export default CronPrimePlugin

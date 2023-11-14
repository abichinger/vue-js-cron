import {
  default as CronElementPlus,
  cronElementPlusProps,
  type CronElementPlusProps,
} from '@/components/cron-element-plus.vue'
import type { App } from 'vue'

export { CronElementPlus, cronElementPlusProps, type CronElementPlusProps }
export const CronElementPlusPlugin = {
  install: (app: App) => {
    app.component('CronElementPlus', CronElementPlus)
  },
}
export default CronElementPlusPlugin

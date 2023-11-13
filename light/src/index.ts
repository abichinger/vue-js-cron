import {
  default as CronLight,
  cronLightProps,
  type CronLightProps,
} from '@/components/cron-light.vue'
import type { App } from 'vue'

export { CronLight, cronLightProps, type CronLightProps }
export const CronLightPlugin = {
  install: (app: App) => {
    app.component('CronLight', CronLight)
  },
}
export default CronLightPlugin

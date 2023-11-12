import CronLight from '@/components/cron-light.vue'
import type { App } from 'vue'

export { CronLightProps } from '@/components/cron-light-script'
export { CronLight }
export const CronLightPlugin = {
  install: (app: App) => {
    app.component('CronLight', CronLight)
  },
}
export default CronLightPlugin

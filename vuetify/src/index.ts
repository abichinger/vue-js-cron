import {
  default as CronVuetify,
  cronVuetifyProps,
  type CronVuetifyProps,
} from '@/components/cron-vuetify.vue'
import type { App } from 'vue'

export { CronVuetify, cronVuetifyProps, type CronVuetifyProps }
export const CronVuetifyPlugin = {
  install: (app: App) => {
    app.component('CronVuetify', CronVuetify)
  },
}
export default CronVuetifyPlugin

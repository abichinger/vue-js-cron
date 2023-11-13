import { default as CronAnt, cronAntProps, type CronAntProps } from '@/components/cron-ant.vue'
import type { App } from 'vue'

export { CronAnt, cronAntProps, type CronAntProps }
export const CronAntPlugin = {
  install: (app: App) => {
    app.component('CronAnt', CronAnt)
  },
}
export default CronAntPlugin

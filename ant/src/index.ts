import CronAnt from '@/components/cron-ant.vue'
import type { App } from 'vue'

export { cronAntProps, type CronAntProps } from '@/components/cron-ant-script'
export { CronAnt }
export const CronAntPlugin = {
  install: (app: App) => {
    app.component('CronAnt', CronAnt)
  },
}
export default CronAntPlugin

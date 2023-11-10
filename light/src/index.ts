// Import vue component
import type { App } from 'vue'
import CronLight from './CronEditor.vue'

function install(app: App) {
  app.component('CronLight', CronLight)
}

export { CronLight }
export const CronLightPlugin = {
  install,
}
export default CronLightPlugin

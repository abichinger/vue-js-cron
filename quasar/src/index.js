// Import vue component
import core from '@vue-js-cron/core'
import component from './components/CronQuasar.vue'

// Declare install function executed by Vue.use()
export function install(Vue) {
  if (install.installed) return
  install.installed = true
  Vue.component('CronQuasar', component)
}

// Create module definition for Vue.use()
const plugin = {
  install,
  component,
  util: core.util,
}

// To allow use as module (npm/webpack/etc.) export component
export default plugin

export { component as CronQuasar, plugin as CronQuasarPlugin }

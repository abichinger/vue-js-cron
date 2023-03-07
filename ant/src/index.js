// Import vue component
import core from '@vue-js-cron/core'
import component from './CronEditor.vue'

// Declare install function executed by Vue.use()
export function install (Vue) {
  if (install.installed) return
  install.installed = true
  Vue.component('CronAnt', component)
}

// Create module definition for Vue.use()
const plugin = {
  install,
  component,
  util: core.util
}

// To allow use as module (npm/webpack/etc.) export component
export default plugin

export {
  component as CronAnt,
  plugin as CronAntPlugin
}

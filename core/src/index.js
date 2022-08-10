// Import vue component
import component from './core.vue'
import locale from './locale'
import util from './util'

// Declare install function executed by Vue.use()
export function install (Vue) {
  if (install.installed) return
  install.installed = true
  Vue.component('CronCore', component)
}

// Create module definition for Vue.use()
const plugin = {
  install,
  component,
  util,
  locale
}

// To allow use as module (npm/webpack/etc.) export component
export default plugin

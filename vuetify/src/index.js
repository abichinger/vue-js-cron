// Import vue component
import component from './CronEditor.vue'

// Declare install function executed by Vue.use()
export function install(Vue) {
  if (install.installed) return
  install.installed = true
  Vue.component('CronVuetify', component)
}

// Create module definition for Vue.use()
const plugin = {
  install,
  component,
}

// To allow use as module (npm/webpack/etc.) export component
export default plugin

export { component as CronVuetify, plugin as CronVuetifyPlugin }

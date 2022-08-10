// Import vue component
import component from './CronEditor.vue'
import core from '@vue-js-cron/core'

// Declare install function executed by Vue.use()
export function install (Vue) {
  if (install.installed) return
  install.installed = true
  Vue.component('CronLight', component)
}

// Create module definition for Vue.use()
const plugin = {
  install,
  component,
  util: core.util
}

// Auto-install when vue is found (eg. in browser via <script> tag)
/* let GlobalVue = null;
if (typeof window !== 'undefined') {
	GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
	GlobalVue = global.Vue;
}
if (GlobalVue) {
	GlobalVue.use(plugin);
} */

// To allow use as module (npm/webpack/etc.) export component
export default plugin

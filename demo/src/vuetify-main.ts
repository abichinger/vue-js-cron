// Generated file, do not modify
import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import type { App as VueApp } from 'vue'
import { customSetup } from './setup'

export async function setup(app: VueApp) {
  // imports
  await import('vuetify/styles')
  await import('@mdi/font/css/materialdesignicons.css')

  // uses
  let module = null

  // register cron component
  await import('@vue-js-cron/vuetify/dist/vuetify.css')
  module = await import('@vue-js-cron/vuetify')
  app.component('cron-editor', module['CronVuetify'])
}

async function main() {
  const app = createApp(App)
  await setup(app)
  await customSetup('vuetify', app)
  app.mount('#app')
}

main()

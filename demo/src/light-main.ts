// Generated file, do not modify
import './assets/main.css'
import { createApp } from 'vue'
import type { App as VueApp } from 'vue'
import { customSetup } from './setup'
import App from './App.vue'

export async function setup(app: VueApp) {
  // imports

  // uses
  let module = null

  // register cron component
  await import('@vue-js-cron/light/dist/light.css')
  module = await import('@vue-js-cron/light')
  app.component('cron-editor', module['CronLight'])
}

async function main() {
  const app = createApp(App)
  await setup(app)
  await customSetup('light', app)
  app.mount('#app')
}

main()

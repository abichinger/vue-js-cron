// Generated file, do not modify
import './assets/main.css'
import { createApp } from 'vue'
import type { App as VueApp } from 'vue'
import { customSetup } from './setup'
import App from './App.vue'

export async function setup(app: VueApp) {
  // imports
  await import('primeicons/primeicons.css')

  // uses
  let module = null

  // register cron component
  await import('@vue-js-cron/prime/dist/prime.css')
  module = await import('@vue-js-cron/prime')
  app.component('cron-editor', module['CronPrime'])
}

async function main() {
  const app = createApp(App)
  await setup(app)
  await customSetup('prime', app)
  app.mount('#app')
}

main()

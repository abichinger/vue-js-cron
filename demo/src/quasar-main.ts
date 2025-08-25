// Generated file, do not modify
import './assets/main.css'
import { createApp } from 'vue'
import type { App as VueApp } from 'vue'
import { customSetup } from './setup'
import App from './App.vue'

export async function setup(app: VueApp) {
  // imports
  await import('quasar/src/css/index.sass')
  await import('@quasar/extras/material-icons/material-icons.css')

  // uses
  let module = null
  module = await import('quasar')
  // @ts-ignore
  app.use(module.Quasar)

  // register cron component
  module = await import('@vue-js-cron/quasar')
  app.component('cron-editor', module['CronQuasar'])
}

async function main() {
  const app = createApp(App)
  await setup(app)
  await customSetup('quasar', app)
  app.mount('#app')
}

main()

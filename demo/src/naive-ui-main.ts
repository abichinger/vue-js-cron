// Generated file, do not modify
import './assets/main.css'
import { createApp } from 'vue'
import type { App as VueApp } from 'vue'
import { customSetup } from './setup'
import App from './NaiveUIApp.vue'

export async function setup(app: VueApp) {
  // imports

  // uses
  let module = null
  module = await import('naive-ui')
  // @ts-ignore
  app.use(module.default)

  // register cron component
  await import('@vue-js-cron/naive-ui/dist/naive-ui.css')
  module = await import('@vue-js-cron/naive-ui')
  app.component('cron-editor', module['CronNaive'])
}

async function main() {
  const app = createApp(App)
  await setup(app)
  await customSetup('naive-ui', app)
  app.mount('#app')
}

main()

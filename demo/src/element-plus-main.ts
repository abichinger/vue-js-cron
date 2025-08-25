// Generated file, do not modify
import './assets/main.css'
import { createApp } from 'vue'
import type { App as VueApp } from 'vue'
import { customSetup } from './setup'
import App from './App.vue'

export async function setup(app: VueApp) {
  // imports
  await import('element-plus/dist/index.css')

  // uses
  let module = null
  module = await import('element-plus')
  // @ts-ignore
  app.use(module.default)

  // register cron component
  await import('@vue-js-cron/element-plus/dist/element-plus.css')
  module = await import('@vue-js-cron/element-plus')
  app.component('cron-editor', module['CronElementPlus'])
}

async function main() {
  const app = createApp(App)
  await setup(app)
  await customSetup('element-plus', app)
  app.mount('#app')
}

main()

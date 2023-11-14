// Generated file, do not modify
import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import type { App as VueApp } from 'vue'
import { customSetup } from './setup'

export async function setup(app: VueApp) {
  // imports

  // uses
  let module = null
  module = await import('ant-design-vue')
  // @ts-ignore
  app.use(module.default)

  // register cron component
  await import('@vue-js-cron/ant/dist/ant.css')
  module = await import('@vue-js-cron/ant')
  app.component('cron-editor', module['CronAnt'])
}

async function main() {
  const app = createApp(App)
  await setup(app)
  await customSetup('ant', app)
  app.mount('#app')
}

main()

import type { App } from 'vue'

export async function setup(app: App) {
  // imports

  // uses
  let module

  // register cron component
  module = await import('@vue-js-cron/light')
  app.component('cron-editor', module['CronLight'])
}

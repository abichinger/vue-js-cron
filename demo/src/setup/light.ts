// Generated file, do not modify

import type { App } from 'vue'

export async function setup(app: App) {
  // imports

  // uses
  let module = null

  // register cron component
  await import('@vue-js-cron/light/dist/light.css')
  module = await import('@vue-js-cron/light')
  app.component('cron-editor', module['CronLight'])
}

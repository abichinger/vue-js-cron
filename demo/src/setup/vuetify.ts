// Generated file, do not modify

import type { App } from 'vue'

export async function setup(app: App) {
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

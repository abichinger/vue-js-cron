// Generated file, do not modify

import type { App } from 'vue'

export async function setup(app: App) {
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

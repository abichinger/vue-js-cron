// Generated file, do not modify

import type { App } from 'vue'

export async function setup(app: App) {
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

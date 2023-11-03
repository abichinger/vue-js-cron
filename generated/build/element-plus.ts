import type { App } from 'vue'

export async function setup(app: App) {
  // imports
  await import('element-plus/dist/index.css')

  // uses
  let module
  module = await import('element-plus')
  app.use(module)

  // register cron component
  module = await import('@vue-js-cron/element-plus')
  app.component('cron-editor', module['CronElement'])
}

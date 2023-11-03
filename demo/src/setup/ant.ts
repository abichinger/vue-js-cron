// Generated file, do not modify

import type { App } from 'vue'

export async function setup(app: App) {
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

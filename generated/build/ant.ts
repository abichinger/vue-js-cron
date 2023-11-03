import type { App } from 'vue'

export async function setup(app: App) {
  // imports
  await import('ant-design-vue/dist/antd.dark.css')

  // uses
  let module
  module = await import('ant-design-vue')
  app.use(module)

  // register cron component
  module = await import('@vue-js-cron/ant')
  app.component('cron-editor', module['CronAnt'])
}

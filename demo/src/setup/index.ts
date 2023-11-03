import type { App } from 'vue'
import { setup as setupAnt } from './ant'
import { setup as setupElement } from './element-plus'
import { setup as setupLight } from './light'
import { setup as setupQuasar } from './quasar'
import { setup as setupVuetify } from './vuetify'

function prefersDark(): boolean {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
}

async function customVuetifySetup(app: App) {
  const { createVuetify } = await import('vuetify')
  const components = await import('vuetify/components')
  const directives = await import('vuetify/directives')

  const vuetify = createVuetify({
    components,
    directives,
    ssr: true,
  })

  app.use(vuetify)
}

async function customQuasarSetup() {
  const { Dark } = await import('quasar')
  Dark.set(prefersDark())
}

async function customAntSetup() {
  if (prefersDark()) {
    await import('ant-design-vue/dist/antd.dark.css')
  } else {
    await import('ant-design-vue/dist/antd.css')
  }
}

export const setup = async (flavor: string, app: App) => {
  switch (flavor) {
    case 'ant':
      await setupAnt(app)
      await customAntSetup()
      break
    case 'light':
      await setupLight(app)
      break
    case 'vuetify':
      await setupVuetify(app)
      await customVuetifySetup(app)
      break
    case 'quasar':
      await setupQuasar(app)
      await customQuasarSetup()
      break
    case 'element-plus':
      await setupElement(app)
      break
  }
}

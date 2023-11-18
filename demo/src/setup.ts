import { type App } from 'vue'
import { prefersDark } from './util'

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

export const customSetup = async (flavor: string, app: App) => {
  switch (flavor) {
    case 'ant':
      await customAntSetup()
      break
    case 'light':
      break
    case 'vuetify':
      await customVuetifySetup(app)
      break
    case 'quasar':
      await customQuasarSetup()
      break
    case 'element-plus':
      break
    case 'naive-ui':
      break
  }
}

import CronLight from '@vue-js-cron/light'
import '@vue-js-cron/light/dist/light.css'
import CronVuetify from '@vue-js-cron/vuetify'
import '@vue-js-cron/vuetify/dist/vuetify.css'

import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'

import { defineClientConfig } from '@vuepress/client'
import { useDarkMode } from '@vuepress/helper/client'
import { watch } from 'vue'

function prefersDark() {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
}

export default defineClientConfig({
  enhance({ app }) {
    let dark = true
    if (!__VUEPRESS_SSR__) {
      dark = prefersDark()
    }

    const myTheme = {
      dark: dark,
      colors: {
        secondary: '#1F8657',
      },
    }

    const vuetify = createVuetify({
      components,
      directives,
      ssr: true,
      theme: {
        defaultTheme: 'myTheme',
        themes: { myTheme },
      },
    })

    app.use(vuetify)
    app.use(CronVuetify)
    app.use(CronLight)
  },
  setup() {
    const isDark = useDarkMode()

    // watch for changes in the dark mode preference and set `dark` on body accordingly
    watch(isDark, (dark) => {
      if (dark) {
        document.body.classList.add('dark')
      } else {
        document.body.classList.remove('dark')
      }
    }, { immediate: true })

  },
  rootComponents: [],
})

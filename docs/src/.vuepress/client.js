import CronAnt from '@vue-js-cron/ant'
import '@vue-js-cron/ant/dist/ant.css'
import CronCore from '@vue-js-cron/core'
import CronElement from '@vue-js-cron/element-plus'
import '@vue-js-cron/element-plus/dist/element-plus.css'
import CronLight from '@vue-js-cron/light'
import '@vue-js-cron/light/dist/light.css'
import CronVuetify from '@vue-js-cron/vuetify'
import '@vue-js-cron/vuetify/dist/vuetify.css'

import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import Ant from 'ant-design-vue'
// import 'ant-design-vue/dist/antd.css'
// import '../styles/antd.css'

import { defineClientConfig } from '@vuepress/client'

import { variables } from './vars'

function prefersDark() {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
}

export default defineClientConfig({
  enhance ({ app, router, siteData }) {
    const myTheme = {
      dark: prefersDark(),
      colors: {
        secondary: '#3AA675',
      },
    }
    
    const vuetify = createVuetify({
      components,
      directives,
      ssr: true,
      theme: {
        defaultTheme: 'myTheme',
        themes: {myTheme}
      }
    })

    app.use(vuetify)
    app.use(ElementPlus)
    app.use(Ant)
    app.use(CronCore)
    app.use(CronVuetify)
    app.use(CronLight)
    app.use(CronElement)
    app.use(CronAnt)

    app.mixin({
      computed: {
        $vars () {
          return variables
        }
      }
    })
  },
  setup () {},
  rootComponents: []
})

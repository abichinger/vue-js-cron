import { googleAnalyticsPlugin } from '@vuepress/plugin-google-analytics'
import { registerComponentsPlugin } from '@vuepress/plugin-register-components'
import { defaultTheme } from '@vuepress/theme-default'
import { path } from '@vuepress/utils'
import { defineUserConfig, viteBundler } from 'vuepress'
import { description } from '../../package'

export default defineUserConfig({

  /**
   * Ref: https://v2.vuepress.vuejs.org/guide/configuration.html#config-file
   */

  base: '/vue-js-cron/',

  title: 'Vue-js-cron Docs',

  description,

  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900' }],
    ['link', { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/@mdi/font@6.x/css/materialdesignicons.min.css' }]
  ],

  theme: defaultTheme({
    repo: '',
    editLinks: false,
    docsDir: '',
    editLinkText: '',
    lastUpdated: false,
    navbar: [
      {
        text: 'Vue v2',
        link: 'https://abichinger.github.io/vue-js-cron/vue2/'
      },
      {
        text: 'Demo',
        link: '/demo'
      },
      {
        text: 'Guide',
        link: '/guide/getting-started-light'
      },
      {
        text: 'API',
        link: 'https://abichinger.github.io/vue-js-cron/typedoc/'
      },
      {
        text: 'Github',
        link: 'https://github.com/abichinger/vue-js-cron'
      }
    ],
    sidebar: {
      '/guide/': [
        {
          title: 'Guide',
          collapsable: false,
          children: [
            'getting-started-core',
            'getting-started-light',
            'getting-started-ant',
            'getting-started-element-plus',
            'getting-started-quasar',
            'getting-started-vuetify',
            'custom-periods',
            'custom-fields'
          ]
        }
      ],
    }
  }),

  bundler: viteBundler({
    viteOptions: {
      // https://github.com/vuepress/vuepress-next/issues/585#issuecomment-1046188074
      // https://v2.vuepress.vuejs.org/reference/bundler/vite.html#ssr-externals-issue
      ssr: {
        noExternal: ['vuetify', '@vue-js-cron/core']
      }
    },
    vuePluginOptions: {}
  }),

  markdown: {
    importCode: {
      handleImportPath: (str) =>
        str.replace(/^@\/src/, path.resolve(__dirname, '../../src'))
    }
  },

  plugins: [
    registerComponentsPlugin({
      componentsDir: path.resolve(__dirname, './components')
    }),
    googleAnalyticsPlugin({
      id: 'G-8E2WXHH0QS'
    })
  ]
})

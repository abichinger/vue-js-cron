const { description } = require('../../package')
const { defaultTheme } = require('@vuepress/theme-default')
const { registerComponentsPlugin } = require('@vuepress/plugin-register-components')
const { path } = require('@vuepress/utils')
const { viteBundler } = require('@vuepress/bundler-vite')

module.exports = {

  /**
   * Ref: https://v2.vuepress.vuejs.org/guide/configuration.html#config-file
   */

  base: '/vue-js-cron/next/',

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
        text: 'Demo',
        link: '/demo'
      },
      {
        text: 'Guide',
        link: '/guide/getting-started'
      },
      {
        text: 'API',
        link: '/api/core'
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
            'getting-started',
            'custom-periods',
            'custom-fields'
          ]
        }
      ],
      '/api/': [
        {
          title: 'Core',
          collapsable: false,
          children: [
            'core',
            'util',
            'locale'
          ]
        },
        {
          title: 'Light',
          collapsable: false,
          children: [
            'light'
          ]
        },
        {
          title: 'Vuetify',
          collapsable: false,
          children: [
            'vuetify'
          ]
        }
      ]
    }
  }),

  bundler: viteBundler({
    viteOptions: {
      // https://github.com/vuepress/vuepress-next/issues/585#issuecomment-1046188074
      ssr: {
        noExternal: ['vuetify']
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
    })
    // '@vuepress/plugin-back-to-top',
    // '@vuepress/plugin-medium-zoom'
  ]
}

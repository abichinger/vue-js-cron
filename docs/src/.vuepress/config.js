const { description } = require('../../package')
const { defaultTheme } = require('@vuepress/theme-default')
const { registerComponentsPlugin } = require('@vuepress/plugin-register-components')
const { path } = require('@vuepress/utils')
const { viteBundler } = require('@vuepress/bundler-vite')
const { googleAnalyticsPlugin } = require('@vuepress/plugin-google-analytics')

module.exports = {

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
        },
        {
          title: 'Element Plus',
          collapsable: false,
          children: [
            'element-plus'
          ]
        },
        {
          title: 'Ant',
          collapsable: false,
          children: [
            'ant'
          ]
        }
      ]
    }
  }),

  bundler: viteBundler({
    viteOptions: {
      // https://github.com/vuepress/vuepress-next/issues/585#issuecomment-1046188074
      // https://v2.vuepress.vuejs.org/reference/bundler/vite.html#ssr-externals-issue
      ssr: {
        noExternal: ['vuetify', 'ant-design-vue']
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
}

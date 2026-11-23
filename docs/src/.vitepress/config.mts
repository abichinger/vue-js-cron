import { defineConfig } from 'vitepress'

const gettingStarted = {
  text: 'Getting Started',
  items: [
    { text: 'Light', link: '/guide/getting-started-light' },
    { text: 'Core', link: '/guide/getting-started-core' },
    { text: 'Ant Design Vue', link: '/guide/getting-started-ant' },
    { text: 'Element Plus', link: '/guide/getting-started-element-plus' },
    { text: 'Naive UI', link: '/guide/getting-started-naive-ui' },
    { text: 'PrimeVue', link: '/guide/getting-started-prime' },
    { text: 'Quasar', link: '/guide/getting-started-quasar' },
    { text: 'Vuetify', link: '/guide/getting-started-vuetify' },
  ],
}

const guides = {
  text: 'Guides',
  items: [
    { text: 'Theming - Light', link: '/guide/light-theming' },
    { text: 'Custom Periods', link: '/guide/custom-periods' },
    { text: 'Custom Cron Expressions', link: '/guide/custom-fields' },
    { text: 'Special Values', link: '/guide/special-values' },
    { text: 'Named months and weekdays', link: '/guide/named-months-and-weekdays' },
  ],
}

const branch = process.env.GITHUB_REF_NAME ?? ''
const base = ['next', 'vue2', 'beta'].includes(branch) ? `/vue-js-cron/${branch}/` : '/vue-js-cron/'
const analyticsId = 'G-8E2WXHH0QS'

export default defineConfig({
  base,
  title: 'Vue.js Cron',
  description: 'Cron expression editors for Vue 3.',
  head: [
    ['script', { async: '', src: `https://www.googletagmanager.com/gtag/js?id=${analyticsId}` }],
    [
      'script',
      {},
      `window.dataLayer = window.dataLayer || [];
      function gtag() { window.dataLayer.push(arguments); }
      gtag('js', new Date());
      gtag('config', '${analyticsId}');`,
    ],
  ],
  themeConfig: {
    nav: [
      { text: 'Demo', link: '/demo' },
      gettingStarted,
      guides,
      { text: 'Vue 2', link: 'https://abichinger.github.io/vue-js-cron/vue2/' },
      { text: 'API', link: 'https://abichinger.github.io/vue-js-cron/typedoc/' },
    ],
    sidebar: { '/guide/': [gettingStarted, guides] },
    socialLinks: [{ icon: 'github', link: 'https://github.com/abichinger/vue-js-cron' }],
  },
})

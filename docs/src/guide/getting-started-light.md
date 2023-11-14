<!-- Generated file -->
# Getting Started - Light

The fastest way to get started, is to use one of the prebuilt components.
- [cron-core](./getting-started-core) - renderless cron editor
- cron-light - lightweight cron editor without external dependencies
- [cron-ant](./getting-started-ant) - cron editor for [Ant Design Vue](https://antdv.com/)
- [cron-element-plus](./getting-started-element-plus) - cron editor for [Element Plus](https://element-plus.org/en-US/)
- [cron-quasar](./getting-started-quasar) - cron editor for [Quasar](https://quasar.dev/)
- [cron-vuetify](./getting-started-vuetify) - cron editor for [Vuetify.js](https://next.vuetifyjs.com/en/)

## Installation

Open up a terminal and run the following command:

```bash 
yarn add @vue-js-cron/light
```
or

```bash 
npm install @vue-js-cron/light
```

Then you need to register the component

```js
import '@vue-js-cron/light/dist/light.css'
// registers the component globally
// registered name: CronLight
import CronLightPlugin from '@vue-js-cron/light'
app.use(CronLightPlugin)

// alternatively you can also register the component yourself
// https://vuejs.org/guide/components/registration.html
import { CronLight } from '@vue-js-cron/light'
app.component('CronLight', CronLight)
```

Done! 🚀

<br />

## API


[CronLight API](https://abichinger.github.io/vue-js-cron/typedoc/classes/_vue_js_cron_light.CronLight)

[CronLightProps API](https://abichinger.github.io/vue-js-cron/typedoc/interfaces/_vue_js_cron_light.CronLightProps)




## Example

@[code](../.vuepress/components/get-started-light.vue)
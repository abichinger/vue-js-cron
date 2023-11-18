<!-- Generated file -->
# Getting Started - Core

The fastest way to get started, is to use one of the prebuilt components.
- cron-core - renderless cron editor
- [cron-light](./getting-started-light) - lightweight cron editor without external dependencies
- [cron-ant](./getting-started-ant) - cron editor for [Ant Design Vue](https://antdv.com/)
- [cron-element-plus](./getting-started-element-plus) - cron editor for [Element Plus](https://element-plus.org/en-US/)
- [cron-naive](./getting-started-naive-ui) - cron editor for [Naive UI](https://www.naiveui.com)
- [cron-quasar](./getting-started-quasar) - cron editor for [Quasar](https://quasar.dev/)
- [cron-vuetify](./getting-started-vuetify) - cron editor for [Vuetify.js](https://next.vuetifyjs.com/en/)

## Installation

Open up a terminal and run the following command:

```bash 
yarn add @vue-js-cron/core
```
or

```bash 
npm install @vue-js-cron/core
```

Then you need to register the component

```js
// registers the component globally
// registered name: CronCore
import CronCorePlugin from '@vue-js-cron/core'
app.use(CronCorePlugin)

// alternatively you can also register the component yourself
// https://vuejs.org/guide/components/registration.html
import { CronCore } from '@vue-js-cron/core'
app.component('CronCore', CronCore)
```

Done! 🚀

<br />

## API


[CronCore API](https://abichinger.github.io/vue-js-cron/typedoc/classes/_vue_js_cron_core.CronCore)

[CronCoreProps API](https://abichinger.github.io/vue-js-cron/typedoc/interfaces/_vue_js_cron_core.CronCoreProps)




## Example

@[code](../.vuepress/components/get-started-renderless.vue)
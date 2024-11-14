<!-- Generated file -->
# Getting Started - Quasar

The fastest way to get started, is to use one of the prebuilt components.
- [cron-core](./getting-started-core) - renderless cron editor
- [cron-light](./getting-started-light) - lightweight cron editor without external dependencies
- [cron-ant](./getting-started-ant) - cron editor for [Ant Design Vue](https://antdv.com/)
- [cron-element-plus](./getting-started-element-plus) - cron editor for [Element Plus](https://element-plus.org/en-US/)
- [cron-naive](./getting-started-naive-ui) - cron editor for [Naive UI](https://www.naiveui.com)
- [cron-prime](./getting-started-prime) - cron editor for [PrimeVue](https://primevue.org/)
- cron-quasar - cron editor for [Quasar](https://quasar.dev/)
- [cron-vuetify](./getting-started-vuetify) - cron editor for [Vuetify.js](https://next.vuetifyjs.com/en/)


## Requirements

Make sure to install and setup all requirements.
- [Quasar](https://quasar.dev/start)

## Installation

Open up a terminal and run the following command:

```bash 
yarn add @vue-js-cron/quasar
```
or

```bash 
npm install @vue-js-cron/quasar
```

Then you need to register the component

```js
// registers the component globally
// registered name: CronQuasar
import CronQuasarPlugin from '@vue-js-cron/quasar'
app.use(CronQuasarPlugin)

// alternatively you can also register the component yourself
// https://vuejs.org/guide/components/registration.html
import { CronQuasar } from '@vue-js-cron/quasar'
app.component('CronQuasar', CronQuasar)
```

Done! 🚀

<br />

## API


[CronQuasar API](https://abichinger.github.io/vue-js-cron/typedoc/classes/_vue_js_cron_quasar.CronQuasar)

[CronQuasarProps API](https://abichinger.github.io/vue-js-cron/typedoc/interfaces/_vue_js_cron_quasar.CronQuasarProps)



<!-- Generated file -->
# Getting Started - PrimeVue

The fastest way to get started, is to use one of the prebuilt components.
- [cron-core](./getting-started-core) - renderless cron editor
- [cron-light](./getting-started-light) - lightweight cron editor without external dependencies
- [cron-ant](./getting-started-ant) - cron editor for [Ant Design Vue](https://antdv.com/)
- [cron-element-plus](./getting-started-element-plus) - cron editor for [Element Plus](https://element-plus.org/en-US/)
- [cron-naive](./getting-started-naive-ui) - cron editor for [Naive UI](https://www.naiveui.com)
- cron-prime - cron editor for [PrimeVue](https://primevue.org/)
- [cron-quasar](./getting-started-quasar) - cron editor for [Quasar](https://quasar.dev/)
- [cron-vuetify](./getting-started-vuetify) - cron editor for [Vuetify.js](https://next.vuetifyjs.com/en/)


## Requirements

Make sure to install and setup all requirements.
- [PrimeVue](https://primevue.org/setup/)

## Installation

Open up a terminal and run the following command:

```bash 
yarn add @vue-js-cron/prime
```
or

```bash 
npm install @vue-js-cron/prime
```

Then you need to register the component

```js
import '@vue-js-cron/prime/dist/prime.css'

// registers the component globally
// registered name: CronPrime
import CronPrimePlugin from '@vue-js-cron/prime'
app.use(CronPrimePlugin)

// alternatively you can also register the component yourself
// https://vuejs.org/guide/components/registration.html
import { CronPrime } from '@vue-js-cron/prime'
app.component('CronPrime', CronPrime)
```

Done! 🚀

<br />

## API


[CronPrime API](https://abichinger.github.io/vue-js-cron/typedoc/classes/_vue_js_cron_prime.CronPrime)

[CronPrimeProps API](https://abichinger.github.io/vue-js-cron/typedoc/interfaces/_vue_js_cron_prime.CronPrimeProps)



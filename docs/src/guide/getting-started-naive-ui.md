<!-- Generated file -->
# Getting Started - Naive UI

The fastest way to get started, is to use one of the prebuilt components.
- [cron-core](./getting-started-core) - renderless cron editor
- [cron-light](./getting-started-light) - lightweight cron editor without external dependencies
- [cron-ant](./getting-started-ant) - cron editor for [Ant Design Vue](https://antdv.com/)
- [cron-element-plus](./getting-started-element-plus) - cron editor for [Element Plus](https://element-plus.org/en-US/)
- cron-naive - cron editor for [Naive UI](https://www.naiveui.com)
- [cron-quasar](./getting-started-quasar) - cron editor for [Quasar](https://quasar.dev/)
- [cron-vuetify](./getting-started-vuetify) - cron editor for [Vuetify.js](https://next.vuetifyjs.com/en/)
## Requirements

Make sure to install and setup all requirements.
- [Naive UI](https://www.naiveui.com/en-US/os-theme/docs/installation)

## Installation

Open up a terminal and run the following command:

```bash 
yarn add @vue-js-cron/naive-ui
```
or

```bash 
npm install @vue-js-cron/naive-ui
```

Then you need to register the component

```js
import '@vue-js-cron/naive-ui/dist/naive-ui.css'

// registers the component globally
// registered name: CronNaive
import CronNaivePlugin from '@vue-js-cron/naive-ui'
app.use(CronNaivePlugin)

// alternatively you can also register the component yourself
// https://vuejs.org/guide/components/registration.html
import { CronNaive } from '@vue-js-cron/naive-ui'
app.component('CronNaive', CronNaive)
```

Done! 🚀

<br />

## API


[CronNaive API](https://abichinger.github.io/vue-js-cron/typedoc/classes/_vue_js_cron_naive_ui.CronNaive)

[CronNaiveProps API](https://abichinger.github.io/vue-js-cron/typedoc/interfaces/_vue_js_cron_naive_ui.CronNaiveProps)




## Example

@[code](../.vuepress/components/get-started-naive-ui.vue)
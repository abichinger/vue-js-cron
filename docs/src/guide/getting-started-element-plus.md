<!-- Generated file -->
# Getting Started - Element Plus

The fastest way to get started, is to use one of the prebuilt components.
- [cron-core](./getting-started-core) - renderless cron editor
- [cron-light](./getting-started-light) - lightweight cron editor without external dependencies
- [cron-ant](./getting-started-ant) - cron editor for [Ant Design Vue](https://antdv.com/)
- cron-element-plus - cron editor for [Element Plus](https://element-plus.org/en-US/)
- [cron-naive](./getting-started-naive-ui) - cron editor for [Naive UI](https://www.naiveui.com)
- [cron-quasar](./getting-started-quasar) - cron editor for [Quasar](https://quasar.dev/)
- [cron-vuetify](./getting-started-vuetify) - cron editor for [Vuetify.js](https://next.vuetifyjs.com/en/)
## Requirements

Make sure to install and setup all requirements.
- [Element Plus](https://element-plus.org/en-US/)

## Installation

Open up a terminal and run the following command:

```bash 
yarn add @vue-js-cron/element-plus
```
or

```bash 
npm install @vue-js-cron/element-plus
```

Then you need to register the component

```js
import '@vue-js-cron/element-plus/dist/element-plus.css'

// registers the component globally
// registered name: CronElementPlus
import CronElementPlusPlugin from '@vue-js-cron/element-plus'
app.use(CronElementPlusPlugin)

// alternatively you can also register the component yourself
// https://vuejs.org/guide/components/registration.html
import { CronElementPlus } from '@vue-js-cron/element-plus'
app.component('CronElementPlus', CronElementPlus)
```

Done! 🚀

<br />

## API


[CronElementPlus API](https://abichinger.github.io/vue-js-cron/typedoc/classes/_vue_js_cron_element_plus.CronElementPlus)

[CronElementPlusProps API](https://abichinger.github.io/vue-js-cron/typedoc/interfaces/_vue_js_cron_element_plus.CronElementPlusProps)




## Example

@[code](../.vuepress/components/get-started-element.vue)
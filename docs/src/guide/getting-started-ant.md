<!-- Generated file -->
# Getting Started - Ant

The fastest way to get started, is to use one of the prebuilt components.
- [cron-core](./getting-started-core) - renderless cron editor
- [cron-light](./getting-started-light) - lightweight cron editor without external dependencies
- cron-ant - cron editor for [Ant Design Vue](https://antdv.com/)
- [cron-element-plus](./getting-started-element-plus) - cron editor for [Element Plus](https://element-plus.org/en-US/)
- [cron-quasar](./getting-started-quasar) - cron editor for [Quasar](https://quasar.dev/)
- [cron-vuetify](./getting-started-vuetify) - cron editor for [Vuetify.js](https://next.vuetifyjs.com/en/)
## Requirements

Make sure to install and setup all requirements.
- [Ant Design Vue](https://www.antdv.com/components/overview/)

## Installation

Open up a terminal and run the following command:

```bash 
yarn add @vue-js-cron/ant
```
or

```bash 
npm install @vue-js-cron/ant
```

Then you need to register the component

```js
import '@vue-js-cron/ant/dist/ant.css'
// registers the component globally
// registered name: CronAnt
import CronAntPlugin from '@vue-js-cron/ant'
app.use(CronAntPlugin)

// alternatively you can also register the component yourself
// https://vuejs.org/guide/components/registration.html
import { CronAnt } from '@vue-js-cron/ant'
app.component('CronAnt', CronAnt)
```

Done! 🚀

<br />

## API


[CronAnt API](https://abichinger.github.io/vue-js-cron/typedoc/classes/_vue_js_cron_ant.CronAnt)

[CronAntProps API](https://abichinger.github.io/vue-js-cron/typedoc/interfaces/_vue_js_cron_ant.CronAntProps)




## Example

@[code](../.vuepress/components/get-started-ant.vue)
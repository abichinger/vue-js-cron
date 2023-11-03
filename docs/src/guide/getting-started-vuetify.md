<!-- Generated file -->
# Getting Started - Vuetify

The fastest way to get started, is to use one of the prebuilt components.
- [cron-core](./getting-started-core) - renderless cron editor
- [cron-light](./getting-started-light) - lightweight cron editor without external dependencies
- [cron-ant](./getting-started-ant) - cron editor for [Ant Design Vue](https://antdv.com/)
- [cron-element-plus](./getting-started-element-plus) - cron editor for [Element Plus](https://element-plus.org/en-US/)
- [cron-quasar](./getting-started-quasar) - cron editor for [Quasar](https://quasar.dev/)
- cron-vuetify - cron editor for [Vuetify.js](https://next.vuetifyjs.com/en/)
## Requirements

Make sure to install and setup all requirements.
- [Vuetify](https://next.vuetifyjs.com/en/)

## Installation

Open up a terminal and run the following command:

```bash 
yarn add @vue-js-cron/vuetify
```
or

```bash 
npm install @vue-js-cron/vuetify
```

Then you need to register the component

```js
import '@vue-js-cron/vuetify/dist/vuetify.css'
// registers the component globally
// registered name: CronVuetify
import CronVuetifyPlugin from '@vue-js-cron/vuetify'
app.use(CronVuetifyPlugin)

// alternatively you can also register the component yourself
// https://vuejs.org/guide/components/registration.html
import { CronVuetify } from '@vue-js-cron/vuetify'
app.component('CronVuetify', CronVuetify)
```

Done! 🚀

<br />

## Example

@[code](../.vuepress/components/get-started-vuetify.vue)
# Getting Started

The fastest way to get a component, which can generate cron expression, is to install one of the prebuilt components.
For now Vue-js-cron provides a prebuilt component for [Vuetify.js](/guide/getting-started.html#quick-start-vuetify).
If you would like to use a different UI framework, follow the quick start guide on how to use the renderless component.

## Quick Start - Vuetify

#### Installation

Open up a terminal and run the following command:

```bash 
yarn add @vue-js-cron/vuetify
```
or

```bash 
npm install @vue-js-cron/vuetify
```
#### Usage

Then you need to register `vue-js-cron/vuetify` with `Vue.use()`

```js
import cronVuetify from '@vue-js-cron/vuetify'
import '@vue-js-cron/vuetify/dist/vuetify.css'
Vue.use(cronVuetify)
```

Now you can use the component `CronVuetify`.

#### Code

<<< @/src/.vuepress/components/getting-started-vuetify.vue

#### Result 

<getting-started-vuetify />

#### API

- [CronVuetify](../api/vuetify)

## Quick Start - Renderless

This guide will explain how to use the renderless component of vue-js-cron.
In this example [Vuetify](https://vuetifyjs.com/en/) will be used to render the component, but you should be able to follow along using any UI framework.

#### Installation

First open up a terminal and run the following command:

```bash 
yarn add @vue-js-cron/core
```
or

```bash 
npm install @vue-js-cron/core
```

#### Usage

Then you need to register `vue-js-cron/core` with `Vue.use()`

```js
import cronCore from '@vue-js-cron/core'
Vue.use(cronCore)
```

Now you can use the component `CronCore`. The default [scoped slot](https://vuejs.org/v2/guide/components-slots.html#Scoped-Slots) of `CronCore` provides the following **props**:

- `fields` - each field corresponds to one position in the cron expression. Default fields: month, day, day of week, hour and minute.
- `period` - defines which fields are visible
- `error` - error message

#### Code

<<< @/src/.vuepress/components/getting-started-renderless.vue

#### Result

<getting-started-renderless />

#### API

- [CronCore](../api/core)
# Getting Started

The fastest way to get started, is to install one of the prebuilt components.
For now `vue-js-cron` provides the following prebuilt components:
- [CronLight](#quick-start-cronlight) - a lightweight cron editor without external dependencies
- [CronVuetify](#quick-start-cronvuetify) - a cron editor for [Vuetify.js](/guide/getting-started.html#quick-start-vuetify).

If you would like to use a different UI framework, follow the quick start guide on how to use the [renderless component](#quick-start-renderless).

## Quick Start - CronLight

#### Installation

Open up a terminal and run the following command:

```bash 
yarn add @vue-js-cron/light
```
or

```bash 
npm install @vue-js-cron/light
```
#### Usage

Then you need to register `vue-js-cron/light` with `Vue.use()`

```js
import cronLight from '@vue-js-cron/light'
import '@vue-js-cron/light/dist/light.css'
Vue.use(cronLight)
```

Now you can use the component `CronLight`.

<br />

<code-example title="CronLight example">
<template v-slot:source>

<<< @/src/.vuepress/components/getting-started-light.vue

</template>
<getting-started-light />
</code-example>

#### API

- [CronLight](../api/light)

## Quick Start - CronVuetify

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

<br />

<code-example title="CronVuetify example">
<template v-slot:source>

<<< @/src/.vuepress/components/getting-started-vuetify.vue

</template>
<getting-started-vuetify />
</code-example>

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

<br />

<code-example title="CronCore example">
<template v-slot:source>

<<< @/src/.vuepress/components/getting-started-renderless.vue

</template>
<getting-started-renderless />
</code-example>

#### API

- [CronCore](../api/core)
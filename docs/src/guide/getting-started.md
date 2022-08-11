# Getting Started

The fastest way to get started, is to install one of the prebuilt components.
For now `vue-js-cron` provides the following prebuilt components:
- [CronLight](#cronlight) - a lightweight cron editor without external dependencies
- [CronVuetify](#cronvuetify) - a cron editor for [Vuetify.js](https://next.vuetifyjs.com/en/).

If you would like to use a different UI framework, follow the quick start guide on how to use the [renderless component](#renderless).

## CronLight

### Installation

Open up a terminal and run the following command:

```bash 
yarn add @vue-js-cron/light@next
```
or

```bash 
npm install @vue-js-cron/light@next
```

### Usage

Then you need to register `vue-js-cron/light` with `app.use()`

```js
import cronLight from '@vue-js-cron/light'
import '@vue-js-cron/light/dist/light.css'

app.use(cronLight)
```

Now you can use the `CronLight` component.

<br />

### Example

@[code](../.vuepress/components/getting-started-light.vue)

**Result:**
<getting-started-light />

#### API

- [CronLight](../api/light)

## CronVuetify

### Installation

Open up a terminal and run the following command:

```bash 
yarn add @vue-js-cron/vuetify@next
```
or

```bash 
npm install @vue-js-cron/vuetify@next
```
### Usage

Then you need to register `vue-js-cron/vuetify` with `app.use()`

```js
import cronVuetify from '@vue-js-cron/vuetify'
import '@vue-js-cron/vuetify/dist/vuetify.css'

app.use(cronVuetify)
```

Now you can use the `CronVuetify` component.

<br />

### Example

@[code](../.vuepress/components/getting-started-vuetify.vue)

**Result:**
<getting-started-vuetify />


#### API

- [CronVuetify](../api/vuetify)

## Renderless

This guide will explain how to use the renderless component of vue-js-cron.
In this example [Vuetify](https://vuetifyjs.com/en/) will be used to render the component, but you should be able to follow along using any UI framework.

### Installation

First open up a terminal and run the following command:

```bash 
yarn add @vue-js-cron/core@next
```
or

```bash 
npm install @vue-js-cron/core@next
```

### Usage

Then you need to register `vue-js-cron/core` with `Vue.app()`

```js
import cronCore from '@vue-js-cron/core'
Vue.use(cronCore)
```

Now you can use the `CronCore` component. The default [scoped slot](https://vuejs.org/v2/guide/components-slots.html#Scoped-Slots) of `CronCore` provides the following **props**:

- `fields` - each field corresponds to one position in the cron expression. Default fields: month, day, day of week, hour and minute.
- `period` - defines which fields are visible
- `error` - error message

<br />

### Example

@[code](../.vuepress/components/getting-started-renderless.vue)

**Result:**
<getting-started-renderless />

#### API

- [CronCore](../api/core)
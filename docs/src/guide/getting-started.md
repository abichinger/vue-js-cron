# Getting Started

The fastest way to get started, is to install one of the prebuilt components.
For now `vue-js-cron` provides the following prebuilt components:
- [cron-light](#light) - a lightweight cron editor without external dependencies
- [cron-vuetify](#vuetify) - a cron editor for [Vuetify.js](https://next.vuetifyjs.com/en/)
- [cron-element-plus](#element-plus) - cron editor for [Element Plus](https://element-plus.org/en-US/)
- [cron-ant](#ant) - a cron editor for [Ant Design Vue](https://antdv.com/)
- [cron-quasar](#quasar) - a cron editor for [Quasar](https://quasar.dev/)

If you would like to use a different UI framework, follow the quick start guide on how to use the [renderless component](#renderless).

## Light

### Installation

Open up a terminal and run the following command:

```bash 
yarn add @vue-js-cron/light@latest
```
or

```bash 
npm install @vue-js-cron/light@latest
```

Then you need to register `vue-js-cron/light` with `app.use()`

```js
import cronLight from '@vue-js-cron/light'
import '@vue-js-cron/light/dist/light.css'

app.use(cronLight)
```

Now you can use the `cron-light` component.

<br />

### Example

@[code](../.vuepress/components/get-started-light.vue)

**Result:**
<get-started-light />

### API

- [cron-light](../api/light)

## Vuetify

### Requirements

- [Vuetify](https://next.vuetifyjs.com/en/)

### Installation

Open up a terminal and run the following command:

```bash 
yarn add @vue-js-cron/vuetify@latest
```
or

```bash 
npm install @vue-js-cron/vuetify@latest
```

Then you need to register `vue-js-cron/vuetify` with `app.use()`

```js
import cronVuetify from '@vue-js-cron/vuetify'
import '@vue-js-cron/vuetify/dist/vuetify.css'

app.use(cronVuetify)
```

Now you can use the `cron-vuetify` component.

<br />

### Example

@[code](../.vuepress/components/get-started-vuetify.vue)

**Result:**
<get-started-vuetify />


### API

- [cron-vuetify](../api/vuetify)

## Element Plus

### Requirements

- [Element Plus](https://element-plus.org/en-US/)

### Installation

Open up a terminal and run the following command:

```bash 
yarn add @vue-js-cron/element-plus@latest
```
or

```bash 
npm install @vue-js-cron/element-plus@latest
```

Then you need to register `@vue-js-cron/element-plus` with `app.use()`

```js
import cronElementPlus from '@vue-js-cron/element-plus'
import '@vue-js-cron/element-plus/dist/element-plus.css'

app.use(cronElementPlus)
```

Now you can use the `cron-element-plus` component.

<br />

### Example

@[code](../.vuepress/components/get-started-element.vue)

**Result:**
<get-started-element />

### API

- [cron-element-plus](../api/element-plus)

## Ant

### Requirements

- [Ant Design Vue](https://www.antdv.com/components/overview/)

### Installation

Open up a terminal and run the following command:

```bash 
yarn add @vue-js-cron/ant@latest
```
or

```bash 
npm install @vue-js-cron/ant@latest
```

Then you need to register `@vue-js-cron/ant` with `app.use()`

```js
import cronAnt from '@vue-js-cron/ant'
import '@vue-js-cron/ant/dist/ant.css'

app.use(cronAnt)
```

Now you can use the `cron-ant` component.

<br />

### Example

@[code](../.vuepress/components/get-started-ant.vue)

**Result:**
<get-started-ant />

### API

- [cron-ant](../api/ant)

## Quasar

### Requirements

- [Quasar](https://quasar.dev/start)

### Installation

Open up a terminal and run the following command:

```bash 
yarn add @vue-js-cron/quasar@latest
```
or

```bash 
npm install @vue-js-cron/quasar@latest
```

Then you need to register `@vue-js-cron/quasar` with `app.use()`

```js
import cronQuasar from '@vue-js-cron/quasar'
app.use(cronQuasar)
```

Now you can use the `cron-quasar` component.

<br />

<!--
### Example

@[code](../.vuepress/components/get-started-ant.vue)

**Result:**
<get-started-ant />

### API

- [cron-ant](../api/ant)

-->

## Renderless

This guide will explain how to use the renderless component of vue-js-cron.
In this example [Vuetify](https://vuetifyjs.com/en/) will be used to render the component, but you should be able to follow along using any UI framework.

### Installation

First open up a terminal and run the following command:

```bash 
yarn add @vue-js-cron/core@latest
```
or

```bash 
npm install @vue-js-cron/core@latest
```

Then you need to register `vue-js-cron/core` with `Vue.app()`

```js
import cronCore from '@vue-js-cron/core'
Vue.use(cronCore)
```

Now you can use the `cron-core` component. The default [slot](https://vuejs.org/v2/guide/components-slots.html#Scoped-Slots) of `cron-core` provides the following **props**:

- `fields` - each field corresponds to one position in the cron expression. Default fields: month, day, day of week, hour and minute.
- `period` - defines which fields are visible
- `error` - error message

<br />

### Example

@[code](../.vuepress/components/get-started-renderless.vue)

**Result:**
<get-started-renderless />

#### API

- [cron-core](../api/core)
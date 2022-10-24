<p align="center">
<img src="./assets/vue-js-cron-hero.png" alt="vue-js-cron Hero">
</p>
<p align="center">
    <em>generate cron expressions using Vue.js</em>
</p>

# Getting Started

Vue v3: [documentation](https://abichinger.github.io/vue-js-cron)

Vue v2: [documentation](https://abichinger.github.io/vue-js-cron/vue2)

# Packages

This monorepo includes the following packages:

- core - a renderless Vue.js component to generate cron expressions.
- light - a lightweight cron editor without external dependencies
- vuetify - Vuetify component to edit cron expressions.
- element-plus - Element Plus component
- ant - Ant Design Vue component
- docs - Vue.js Cron documentation powered by [VuePress](https://vuepress.vuejs.org/)

# Development

## Install dependencies
```
yarn install
```

## Run development server
```
yarn dev-core
yarn dev-vuetify
yarn dev-docs
```

## Test
```
yarn test
```

## Build
```
yarn build
yarn build-docs
```

## Attribution

This component is inspired by [react-js-cron](https://github.com/xrutayisire/react-js-cron) and [jqcron](https://github.com/arnapou/jqcron)
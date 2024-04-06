# vue-js-cron 
[![npm latest version](https://img.shields.io/npm/v/@vue-js-cron/core)](https://www.npmjs.com/package/@vue-js-cron/core) 
[![Test badge](https://github.com/abichinger/vue-js-cron/actions/workflows/test.yml/badge.svg?branch=main)](https://github.com/abichinger/vue-js-cron/actions?query=workflow%3ATest+branch%3Amain)

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
- quasar - Quasar component
- docs - Vue.js Cron documentation powered by [VuePress](https://v2.vuepress.vuejs.org/)

# Contributing

Contributions are always welcome.

Before you open a PR, please make sure your changes comply with the following rules:
- commits messages follow the [AngularJS commit message format](https://github.com/angular/angular/blob/main/CONTRIBUTING.md#commit)
- `npm run lint` completes without errors
- `npm run build` completes without errors
- `npm run test` completes without errors

## Contributing new localization strings

You can use the commit [feat: add portuguese translation](https://github.com/abichinger/vue-js-cron/commit/64fbe1e7b30bd07e4e61b11cf98292f1cc81bfd4) as a reference.

[Here](https://abichinger.github.io/vue-js-cron/typedoc/interfaces/_vue_js_cron_core.Localization.html) you can find the structure of a localization object.

## Contributors
<a href="https://github.com/abichinger/vue-js-cron/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=abichinger/vue-js-cron" />
</a>

# Development

## Install dependencies
```bash
npm install
```

## Scripts
```bash
# Build packages, demo and docs
npm run build -w=core   # Build the core package, required by other packages
npm run build           # builds all public packages
npm run build-demo      # build demo, embedded inside docs
npm run build-docs      # build documentaion using vuepress

# Start a developement server for the core package
npm run dev -w=core

# Run the development server of @vue-js-cron/light
npm run dev -w=light

# Start a development server of the documentation
cd docs && npm run dev

# Run tests
npm run test

# Have a look at package.json for more scripts
```

## Attribution

This component is inspired by [react-js-cron](https://github.com/xrutayisire/react-js-cron) and [jqcron](https://github.com/arnapou/jqcron)

### Articles

[Renderless Components in Vue.js](https://adamwathan.me/renderless-components-in-vuejs/) by Adam Wathan
<br />
[Composition API v Renderless Components](https://dev.to/thomasferro/composition-api-v-renderless-components-let-s-use-vue-3-s-features-to-clean-our-components-n25) by Thomas Ferro
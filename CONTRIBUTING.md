# Contributing

Contributions are always welcome.

Before opening a PR, please make sure that the following points apply to your changes:
- commits messages follow the [AngularJS commit message format](https://github.com/angular/angular/blob/main/CONTRIBUTING.md#commit)
- `npm run lint` completes without errors
- `npm run build` completes without errors
- `npm run test` completes without errors

## Setup Development Environment

**Requires NodeJS >= 18.0**

First you need to clone the [`vue-js-cron` repository](https://github.com/abichinger/vue-js-cron.git). You should
[fork](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo)
the repository if you plan to submit a pull request.

```sh
git clone https://github.com/abichinger/vue-js-cron.git
cd vue-js-cron
```

After you have obtained a copy of `vue-js-cron` you can install all it's
dependencies by running:

```sh
npm install
```

That's all, your development environment is ready.

## npm run \<task\>

```sh
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

## Add new localization

You can use the commit [feat: add portuguese translation](https://github.com/abichinger/vue-js-cron/commit/64fbe1e7b30bd07e4e61b11cf98292f1cc81bfd4) as a reference.

[Here](https://abichinger.github.io/vue-js-cron/typedoc/interfaces/_vue_js_cron_core.Localization.html) you can find the structure of a localization object.

## Add a new UI Framework

This section will show how to add a new UI framework using [`PrimeVue`](https://primevue.org/) as an example.
The finished package will be called `@vue-js-cron/prime`.

### Create the package

Scaffold the new package by running:

```sh
mkdir prime && cd prime
npm create vue@latest .

✔ Package name: @vue-js-cron/prime
✔ Add TypeScript? › Yes
✔ Add JSX Support? › No
✔ Add Vue Router for Single Page Application development? › No
✔ Add Pinia for state management? › No
✔ Add Vitest for Unit Testing? › No
✔ Add an End-to-End Testing Solution? › No
✔ Add ESLint for code quality? › No
```

**Commits**:

- [create @vue-js-cron/prime](https://github.com/abichinger/vue-js-cron/commit/b386cd92b1ca814f6c9ecebc6608bc7f4247099c)

### Configure the package

Update the `package.json` file of `@vue-js-cron/prime`.
Here is an overview of the changes you should make:

- Make `@vue-js-cron/core` the only dependency
- Add the UI framework to the dev dependencies

Note: Dependencies like `vue` will be provieded by the workspace level dependencies.

```jsonc
// prime/package.json
{
  "name": "@vue-js-cron/prime",
  "version": "0.0.0",
  "description": "Cron editor for PrimeVue",
  "type": "module",
  "main": "dist/prime.umd.cjs",
  "module": "dist/prime.js",
  "types": "dist/prime.d.ts",
  "repository": "https://github.com/abichinger/vue-js-cron",
  "author": "Andreas Bichinger",
  "license": "MIT",
  "private": false,
  "scripts": {
    "dev": "vite",
    "build": "run-p type-check \"build-only {@}\" --",
    "preview": "vite preview",
    "build-only": "vite build",
    "type-check": "vue-tsc --build --force"
  },
  "dependencies": {
    "@vue-js-cron/core": "5.3.0"
  },
  "devDependencies": {
    "@primevue/themes": "^4.2.1",
    "primevue": "^4.2.1"
  },
  "files": [
    "package.json",
    "dist",
    "README.md"
  ],
  "keywords": [
    "vue",
    "vue.js",
    "vue component",
    "cron",
    "cron expression",
    "cron editor",
    "PrimeVue"
  ]
}
```

Add the new package to the list of workspaces

```diff
--- package.json
@@ -10,7 +10,8 @@
     "element-plus",
     "ant",
     "quasar",
-    "naive-ui"
+    "naive-ui",
+    "prime"
   ],
   "private": true,
   "scripts": {
```

Next we are going to add some [build options](https://vite.dev/config/build-options.html) to the vite configuration to build the package. Note that packages like `vue` are declared as external, because we want to exclude these packages from the build artifacts.
The `dts` plugin is registered to generate declaration files.

```ts
// prime/vite.config.ts

import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import path from 'node:path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    dts({
      tsconfigPath: './tsconfig.app.json',
      rollupTypes: true,
      entryRoot: 'src',
    }),
  ],
  build: {
    sourcemap: true,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'CronPrime',
      formats: ['es', 'umd'],
    },
    rollupOptions: {
      external: ['vue', '@vue', 'primevue', '@primevue/themes'],
      output: {
        assetFileNames: 'prime.css',
        exports: 'named',
        globals: {
          vue: 'Vue',
          '@vue-js-cron/core': 'CronCore',
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})

```

Update the typescript configuration to generate `.d.ts` files.

```diff
--- b/prime/tsconfig.app.json
@@ -5,7 +5,8 @@
   "compilerOptions": {
     "composite": true,
     "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
-
+    "declaration": true,
+    "declarationMap": true,
     "baseUrl": ".",
     "paths": {
       "@/*": ["./src/*"]
```

Add a typescript configuration for [TypeDoc](https://typedoc.org/) and add the the newly created config to the entry points of TypeDoc.

```jsonc
// prime/tsconfig.typedoc.json
{
  "extends": "./tsconfig.app.json",
  "include": ["dist/index.d.ts"],
}
```

```diff
--- a/typedoc.json
@@ -1,6 +1,6 @@
 {
     "$schema": "https://typedoc.org/schema.json",   
-    "entryPoints": ["core", "light", "ant", "element-plus", "quasar", "vuetify", "naive-ui"],
+    "entryPoints": ["core", "light", "ant", "element-plus", "quasar", "vuetify", "naive-ui", "prime"],
     "entryPointStrategy": "packages",
     "out": "typedoc",
     "plugin": ["typedoc-plugin-vue"]
```

**Commits**:

- [add prime to workspaces](https://github.com/abichinger/vue-js-cron/commit/83073239a994c049f8c10988cf758aa2f50af6be)
- [update package.json](https://github.com/abichinger/vue-js-cron/commit/a465ec994fd8c20d5a747fe33ba89363f1594c22)
- [update vite configuration](https://github.com/abichinger/vue-js-cron/commit/68a60e5cbe8676479dd7503195c6af6da9249c36)
- [add typedoc entrypoints](https://github.com/abichinger/vue-js-cron/commit/0dafbf8051430898c69613c8ce5bd2af18ec45cc)
- [update tsconfig](https://github.com/abichinger/vue-js-cron/commit/e0147b7e0e6aab66734f5a0126a2aecf76f0d015)

### Package structure

Make sure the `src` directory is empty and create the following files:

```tree
.
└── src/
    ├── components/
    │   ├── cron-prime.vue
    │   └── select.vue
    ├── App.vue
    ├── index.ts
    └── main.ts
```

`index.ts` defines the public interface of the package and exports the following:

- `CronPrime` - The vue component
- `cronPrimeProps` - a function which returns the props of `CronPrime`
- `CronPrimeProps` - The type of `CronPrime.props`
- the default export is a vue plugin

```typescript
// prime/src/index.ts

import {
  default as CronPrime,
  cronPrimeProps,
  type CronPrimeProps,
} from '@/components/cron-prime.vue'
import type { App } from 'vue'

export { CronPrime, cronPrimeProps, type CronPrimeProps }
export const CronPrimePlugin = {
  install: (app: App) => {
    app.component('CronPrime', CronPrime)
  },
}
export default CronPrimePlugin
```

`main.ts` and `App.vue` are used to run the development server of Vite.

```typescript
// prime/src/main.ts

import PrimeVue from 'primevue/config'
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
app.use(PrimeVue)
app.mount('#app')
```

```vue
<!-- prime/src/App.vue -->

<template>
  <div id="app">
    <CronPrime v-model="value" />
  </div>
</template>

<script lang="ts" setup>
import CronPrime from '@/components/cron-prime.vue'
import { ref } from 'vue'

const value = ref('* * * * *')
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
```

`cron-prime.vue` contains the vue component to edit cron expressions.

```vue
<!-- prime/src/components/cron-prime.vue -->

<template>
  <span>CronPrime</span>
</template>

<script lang="ts">
import { cronCoreProps } from '@vue-js-cron/core'
import { defineComponent, type ExtractPropTypes } from 'vue'

export const cronPrimeProps = () => ({
  ...cronCoreProps(),
})

/**
 * Props of {@link CronPrime}
 *
 * See {@link @vue-js-cron/core!CronCoreProps | CronCoreProps} for a detailed description of each prop
 *
 * @interface
 */
export type CronPrimeProps = Partial<ExtractPropTypes<ReturnType<typeof cronPrimeProps>>>

export default defineComponent({
  name: 'CronPrime',
  props: cronPrimeProps(),
  // This component will be implemented in the next step
})
</script>
```

`select.vue` defines a custom select component, which is going to be used by `CronPrime`

```vue
<!-- prime/src/components/select.vue -->

<template>
  <span>CustomSelect</span>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CustomSelect',
  // This component will be implemented in the next step
})
</script>
```

After you have created the project structure, you can run `npm run dev` to start the development server.

**Commits**:

- [create package structure](https://github.com/abichinger/vue-js-cron/commit/7d9f2a4acae9af188d718567ea64b1484f913576)

### Implement the component

#### CustomSelect

The select component of most UI frameworks can only display the available items in a list. That's why
we need to implement a custom select component with grid support.
The [composable](https://vuejs.org/guide/reusability/composables) [`setupSelect`](https://abichinger.github.io/vue-js-cron/typedoc/functions/_vue_js_cron_core.setupSelect.html) from `vue-js-cron` provides the stateful logic of the select component.
The function [`selectProps`](https://abichinger.github.io/vue-js-cron/typedoc/functions/_vue_js_cron_core.selectProps.html) returns the props required by `setupSelect`.

[`select.vue`](https://github.com/abichinger/vue-js-cron/blob/1e7efddae6b52a9384b81cb0ed5a24d6f3db7ba5/prime/src/components/select.vue)

#### CronPrime

`CronPrime` is the cron editor component. The state of the component is defined by [`setupCron`](https://abichinger.github.io/vue-js-cron/typedoc/functions/_vue_js_cron_core.setupCron.html). The function [`cronCoreProps`](https://abichinger.github.io/vue-js-cron/typedoc/functions/_vue_js_cron_core.cronCoreProps-1.html) returns the props required by `setupCron`.

[`select.vue`](https://github.com/abichinger/vue-js-cron/blob/1e7efddae6b52a9384b81cb0ed5a24d6f3db7ba5/prime/src/components/cron-prime.vue)

**Commits**:

- [implement components](https://github.com/abichinger/vue-js-cron/commit/1e7efddae6b52a9384b81cb0ed5a24d6f3db7ba5)
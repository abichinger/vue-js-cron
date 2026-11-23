# Getting Started with Core

Core is the renderless editor for Vue 3. Its default slot exposes `period`, the visible `fields`, and `error` so you can render your own controls. Use TypeScript 5 or newer if your app uses TypeScript.

```sh
npm install @vue-js-cron/core
```

This example wires native selects to the slot. An empty field selection represents a wildcard.

<<< ../examples/core.vue

[Shared props](https://abichinger.github.io/vue-js-cron/typedoc/interfaces/_vue-js-cron_core.CronCoreProps.html) · [Custom cron expressions](./custom-fields)

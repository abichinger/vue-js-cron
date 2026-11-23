# Getting Started with PrimeVue

```sh
npm install @vue-js-cron/prime primevue@4 @primevue/themes@4 primeicons
```

Register PrimeVue with a theme and load PrimeIcons in your app entry point.

```js
import Aura from '@primevue/themes/aura'
import 'primeicons/primeicons.css'
import PrimeVue from 'primevue/config'

app.use(PrimeVue, { theme: { preset: Aura } })
```

```vue
<script setup>
import { CronPrime } from '@vue-js-cron/prime'
import '@vue-js-cron/prime/dist/prime.css'
import { ref } from 'vue'

const expression = ref('0 9 * * 1-5')
</script>

<template>
  <CronPrime v-model="expression" />
</template>
```

[Component props](https://abichinger.github.io/vue-js-cron/typedoc/interfaces/_vue-js-cron_prime.CronPrimeProps.html)

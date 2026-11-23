# Getting Started with Quasar

```sh
npm install @vue-js-cron/quasar quasar@2 @quasar/extras
```

If your app doesn't already use Quasar, register it and load the styles in your app entry point.

```js
import '@quasar/extras/material-icons/material-icons.css'
import { Quasar } from 'quasar'
import 'quasar/dist/quasar.css'

app.use(Quasar)
```

```vue
<script setup>
import { CronQuasar } from '@vue-js-cron/quasar'
import { ref } from 'vue'

const expression = ref('0 9 * * 1-5')
</script>

<template>
  <CronQuasar v-model="expression" />
</template>
```

[Component props](https://abichinger.github.io/vue-js-cron/typedoc/interfaces/_vue-js-cron_quasar.CronQuasarProps.html)

# Getting Started with Vuetify

```sh
npm install @vue-js-cron/vuetify vuetify@3 @mdi/font
```

In your app entry point, register Vuetify with its components and directives.

```js
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'

app.use(createVuetify({ components, directives }))
```

```vue
<script setup>
import { CronVuetify } from '@vue-js-cron/vuetify'
import '@vue-js-cron/vuetify/dist/vuetify.css'
import { ref } from 'vue'

const expression = ref('0 9 * * 1-5')
</script>

<template>
  <CronVuetify v-model="expression" />
</template>
```

[Component props](https://abichinger.github.io/vue-js-cron/typedoc/interfaces/_vue-js-cron_vuetify.CronVuetifyProps.html)

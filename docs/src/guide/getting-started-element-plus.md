# Getting Started with Element Plus

```sh
npm install @vue-js-cron/element-plus element-plus
```

Register Element Plus and load its stylesheet in your app entry point.

```js
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

app.use(ElementPlus)
```

```vue
<script setup>
import { CronElementPlus } from '@vue-js-cron/element-plus'
import '@vue-js-cron/element-plus/dist/element-plus.css'
import { ref } from 'vue'

const expression = ref('0 9 * * 1-5')
</script>

<template>
  <CronElementPlus v-model="expression" />
</template>
```

[Component props](https://abichinger.github.io/vue-js-cron/typedoc/interfaces/_vue-js-cron_element-plus.CronElementPlusProps.html)

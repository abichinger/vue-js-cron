# Getting Started with Ant Design Vue

Use `CronAnt` in a Vue 3 app with Ant Design Vue 3.

```sh
npm install @vue-js-cron/ant ant-design-vue@3
```

Register Ant Design Vue and load its stylesheet in your app entry point.

```js
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

app.use(Antd)
```

```vue
<script setup>
import { CronAnt } from '@vue-js-cron/ant'
import '@vue-js-cron/ant/dist/ant.css'
import { ref } from 'vue'

const expression = ref('0 9 * * 1-5')
</script>

<template>
  <CronAnt v-model="expression" />
</template>
```

[Component props](https://abichinger.github.io/vue-js-cron/typedoc/interfaces/_vue-js-cron_ant.CronAntProps.html)

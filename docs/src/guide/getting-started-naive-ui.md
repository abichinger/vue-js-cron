# Getting Started with Naive UI

```sh
npm install @vue-js-cron/naive-ui naive-ui @vicons/ionicons5
```

Import `CronNaive` and its stylesheet in your component.

```vue
<script setup>
import { CronNaive } from '@vue-js-cron/naive-ui'
import '@vue-js-cron/naive-ui/dist/naive-ui.css'
import { ref } from 'vue'

const expression = ref('0 9 * * 1-5')
</script>

<template>
  <CronNaive v-model="expression" />
</template>
```

Use Naive UI's `NConfigProvider` around the editor to apply a theme.

[Component props](https://abichinger.github.io/vue-js-cron/typedoc/interfaces/_vue-js-cron_naive-ui.CronNaiveProps.html)

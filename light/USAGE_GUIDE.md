# Hướng dẫn sử dụng @dev-snake/vue-js-cron-light

Package này là phiên bản custom của vue-js-cron-light với các cải tiến giao diện.

## Cách 1: Sử dụng từ file tarball (Local)

### Cài đặt
```bash
npm install ./dev-snake-vue-js-cron-light-1.0.0.tgz
```

### Sử dụng trong Vue app
```js
// main.js
import '@dev-snake/vue-js-cron-light/dist/light.css'
import { CronLight } from '@dev-snake/vue-js-cron-light'

app.component('CronLight', CronLight)
```

### Hoặc sử dụng trong component
```vue
<template>
  <CronLight 
    v-model="cronValue" 
    :disabled="false"
    @error="handleError"
  />
</template>

<script setup>
import { ref } from 'vue'
import { CronLight } from '@dev-snake/vue-js-cron-light'
import '@dev-snake/vue-js-cron-light/dist/light.css'

const cronValue = ref('0 0 * * *')

const handleError = (error) => {
  console.error('Cron error:', error)
}
</script>
```

## Cách 2: Publish lên NPM (Public)

### Đăng nhập NPM
```bash
npm login
```

### Publish package
```bash
npm publish --access public
```

### Sau khi publish, người khác có thể cài đặt:
```bash
npm install @dev-snake/vue-js-cron-light
```

## API Documentation

Package này sử dụng cùng API với `@vue-js-cron/light` gốc, bao gồm:

- **Props**: `modelValue`, `disabled`, `cols`, v.v.
- **Events**: `update:model-value`, `update:period`, `error`
- **Slots**: Hỗ trợ các slot tùy chỉnh

## Các thay đổi so với phiên bản gốc

- Cải thiện giao diện với layout responsive
- Tối ưu CSS styling
- Cải thiện UX với spacing và typography

## Build lại package

Nếu cần thay đổi và build lại:

```bash
cd light
npm run build
npm pack
```

## Lưu ý

- Package này tương thích với Vue 3
- Yêu cầu Node.js version >= 16
- Hỗ trợ TypeScript

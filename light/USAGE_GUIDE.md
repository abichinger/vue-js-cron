# Hướng dẫn sử dụng vue-cron-light-devsnake

Package này là phiên bản custom của vue-js-cron-light với các cải tiến giao diện.

## ✅ Package đã được publish thành công!

### Cài đặt từ NPM

```bash
npm install vue-cron-light-devsnake
```

### Sử dụng trong Vue app

```js
// main.js
import 'vue-cron-light-devsnake/dist/light.css'
import { CronLight } from 'vue-cron-light-devsnake'

app.component('CronLight', CronLight)
```

### Sử dụng trong component

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
import { CronLight } from 'vue-cron-light-devsnake'
import 'vue-cron-light-devsnake/dist/light.css'

const cronValue = ref('0 0 * * *')

const handleError = (error) => {
  console.error('Cron error:', error)
}
</script>
```

## 🔗 NPM Package Link

https://www.npmjs.com/package/vue-cron-light-devsnake

## API Documentation

Package này sử dụng cùng API với `@vue-js-cron/light` gốc, bao gồm:

- **Props**: `modelValue`, `disabled`, `cols`, v.v.
- **Events**: `update:model-value`, `update:period`, `error`
- **Slots**: Hỗ trợ các slot tùy chỉnh

## Các thay đổi so với phiên bản gốc

- Cải thiện giao diện với layout responsive
- Tối ưu CSS styling
- Cải thiện UX với spacing và typography

## Cập nhật package

Nếu cần cập nhật phiên bản mới:

```bash
# Tăng version trong package.json
npm version patch  # hoặc minor, major

# Build lại
npm run build

# Publish phiên bản mới
npm publish
```

## Lưu ý

- Package này tương thích với Vue 3
- Yêu cầu Node.js version >= 16  
- Hỗ trợ TypeScript
- Các file chính: `vue-cron-light-devsnake.js`, `vue-cron-light-devsnake.umd.cjs`, `light.css`

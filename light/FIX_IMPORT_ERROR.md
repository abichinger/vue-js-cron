# 🔧 Fix Import Error - Updated Version 1.0.1

## Vấn đề đã được khắc phục!

Lỗi import đã được sửa trong phiên bản `1.0.1`. Vấn đề là do cấu hình `main`, `module`, và `exports` trong `package.json` không khớp với tên file thực tế được build.

## 📦 Cập nhật package

```bash
# Gỡ phiên bản cũ
npm uninstall vue-cron-light-devsnake

# Cài phiên bản mới
npm install vue-cron-light-devsnake@1.0.1
```

Hoặc nếu đã cài rồi:

```bash
npm update vue-cron-light-devsnake
```

## ✅ Cách sử dụng sau khi fix

### 1. Import cơ bản

```js
// main.js
import 'vue-cron-light-devsnake/dist/light.css'
import { CronLight } from 'vue-cron-light-devsnake'

app.component('CronLight', CronLight)
```

### 2. Import trong component

```vue
<template>
  <CronLight v-model="cronValue" />
</template>

<script setup>
import { ref } from 'vue'
import { CronLight } from 'vue-cron-light-devsnake'
import 'vue-cron-light-devsnake/dist/light.css'

const cronValue = ref('0 0 * * *')
</script>
```

### 3. TypeScript Support

```ts
import { CronLight } from 'vue-cron-light-devsnake'
import 'vue-cron-light-devsnake/dist/light.css'
// TypeScript definitions được tự động load từ dist/index.d.ts
```

## 🔍 Thay đổi trong v1.0.1

- ✅ Sửa cấu hình `main`: `dist/vue-cron-light-devsnake.umd.cjs`
- ✅ Sửa cấu hình `module`: `dist/vue-cron-light-devsnake.js`
- ✅ Thêm `exports` field để hỗ trợ ES modules và CommonJS
- ✅ Thêm export cho CSS file: `vue-cron-light-devsnake/dist/light.css`

## 🚀 Package Info

- **Name**: `vue-cron-light-devsnake`
- **Version**: `1.0.1` (Latest)
- **NPM**: https://www.npmjs.com/package/vue-cron-light-devsnake

## 🛠️ Troubleshooting

Nếu vẫn gặp lỗi:

1. **Clear node_modules và package-lock.json**:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Clear Vite cache**:
   ```bash
   npm run dev -- --force
   ```

3. **Kiểm tra version**:
   ```bash
   npm ls vue-cron-light-devsnake
   ```

Lỗi import đã được hoàn toàn khắc phục! 🎉

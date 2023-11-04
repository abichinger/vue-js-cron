import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

const flavor = process.env.VITE_FLAVOR

// https://vitejs.dev/config/
export default defineConfig({
  base: `vue-js-cron/demo/${flavor}`,
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    outDir: `../docs/src/.vuepress/public/demo/${flavor}`,
  },
})

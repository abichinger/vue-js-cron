import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: `/vue-js-cron/demo`,
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    // outDir: `./dist`,
    outDir: `../docs/src/.vuepress/public/demo`,
    rollupOptions: {
      input: {
        ant: resolve(__dirname, 'ant/index.html'),
        light: resolve(__dirname, 'light/index.html'),
        'element-plus': resolve(__dirname, 'element-plus/index.html'),
        quasar: resolve(__dirname, 'quasar/index.html'),
        vuetify: resolve(__dirname, 'vuetify/index.html'),
      },
    },
  },
})

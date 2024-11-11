import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import path from 'node:path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    dts({
      tsconfigPath: './tsconfig.app.json',
      rollupTypes: true,
      entryRoot: 'src',
    }),
  ],
  build: {
    sourcemap: true,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'CronPrime',
      formats: ['es', 'umd'],
    },
    rollupOptions: {
      external: ['vue', '@vue', /^primevue\/.*/gm, /^@primevue\/.*/gm, '@vue-js-cron/core'],
      output: {
        assetFileNames: 'prime.css',
        exports: 'named',
        globals: {
          vue: 'Vue',
          '@vue-js-cron/core': 'CronCore',
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})

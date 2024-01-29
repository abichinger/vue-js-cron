import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import path from 'node:path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
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
      name: 'CronQuasar',
      formats: ['es', 'umd'],
    },
    rollupOptions: {
      external: ['vue', '@vue-js-cron/core', 'quasar'],
      output: {
        assetFileNames: 'quasar.css',
        exports: 'named',
        globals: {
          vue: 'Vue',
          quasar: 'Quasar',
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

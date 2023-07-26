import vue from '@vitejs/plugin-vue';
import path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    sourcemap: true,
    lib: {
      entry: path.resolve(__dirname, 'src/index.js'),
      name: 'CronQuasar',
      fileName: (format) => `quasar.${format}.js`,
    },
    rollupOptions: {
      external: ['vue', '@vue-js-cron/core', 'quasar', '@quasar/extras'],
      output: {
        globals: {
          vue: 'Vue',
          quasar: 'Quasar',
          '@vue-js-cron/core': 'core',
        },
      },
    },
  },
  plugins: [
    vue(),
  ],
})

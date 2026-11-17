import { fileURLToPath } from 'node:url'
import { configDefaults, defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/*', 'src/__tests__/translations.spec.ts'],
      tags: [{ name: 'translations' }],
      root: fileURLToPath(new URL('./', import.meta.url)),
    },
  }),
)

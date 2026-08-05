import prettierConfig from '@vue/eslint-config-prettier'
import { vueTsConfigs, withVueTs } from '@vue/eslint-config-typescript'
import pluginVue from 'eslint-plugin-vue'

export default withVueTs(
  {
    ignores: [
      '**/node_modules',
      '**/dist',
      '**/bin',
      '**/.cache',
      '**/.temp',
      '**/public',
      'playground',
      'typedoc',
      // 'docs/src/api/types/*',
      // 'docs/src/api/default/*',
      'docs',
    ],
  },
  pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,
  prettierConfig,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-wrapper-object-types': 'off',
    },
  },
)

import pluginVue from 'eslint-plugin-vue'
import vueTsEslintConfig from '@vue/eslint-config-typescript'

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },
  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/node_modules/**', '**/components.d.ts', '**/auto-imports.d.ts', '**/typed-router.d.ts'],
  },
  ...pluginVue.configs['flat/recommended'],
  ...vueTsEslintConfig(),
]

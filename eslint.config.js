import antfu from '@antfu/eslint-config'
import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat({
  recommendedConfig: [
    'eslint:recommended',
    'plugin:markdown/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
  ],
})

export default antfu(
  {
    settings: {
      react: {
        version: 'detect',
      },

    },
    typescript: true,
    react: true,
  },
  ...compat.config({
    plugins: ['simple-import-sort'],
    env: { browser: true, es2020: true },
  }),
  {
    ignores: [
      '**/node_modules',
      '**/dist',
      '**/build',
      '**/package-lock.json',
    ],
    rules: {
      'sort-imports': 'off',
      'import/order': 'off',
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'warn',
      'unused-imports/no-unused-vars': ['warn', { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' }],
      'no-undef': 'off',
      'no-console': 'off',
      'no-dupe-class-members': 'off',
      'import/newline-after-import': 'off',
      'unicorn/prefer-number-properties': 'off',
      'new-cap': 'off',
      'node/prefer-global/process': 'off',
      'curly': 'off',
      'antfu/top-level-function': 'off',
      'prefer-arrow-callback': 'off',
      'no-alert': 'off',
      'unicorn/prefer-node-protocol': 'off',
      'jsdoc/require-returns-description': 'off',
      'ts/no-require-imports': 'off',
      'jsdoc/check-param-names': 'off',
      'no-throw-literal': 'off',
      'style/multiline-ternary': 'off',
      'node/prefer-global/buffer': 'off',
      'prefer-spread': 'off',
      'style/jsx-indent': ['error', 2],
      'style/indent': ['error', 2],
      'jsonc/sort-array-values': 'off',
      'array-callback-return': 'off',
    },
  },
)

/** @type {import('eslint').Linter.Config} */
module.exports = {
  plugins: [
    'import',
    'simple-import-sort',
    'react',
    '@typescript-eslint',
    'effector'
  ],
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/jsx-runtime',
    '@electron-toolkit/eslint-config-ts/recommended',
    '@electron-toolkit/eslint-config-prettier',
    'plugin:effector/recommended',
    'plugin:effector/scope'
  ],
  rules: {
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          ['^react', '^@react'],
          ['^@?\\w', '^components', '^utils'],
          ['^@/features'],
          ['^@/shared'],
          ['^@/widgets'],
          ['^@/pages'],
          ['^@/entities'],
          ['^[./]', '^[../]']
        ]
      }
    ],
    'simple-import-sort/exports': 'error',
    '@typescript-eslint/explicit-function-return-type': 'off',
    'react/react-in-jsx-scope': 'off',

    'effector/enforce-effect-naming-convention': 'error'
  },
  settings: {
    react: {
      version: 'detect'
    },
    'import/resolver': {
      alias: {
        map: [
          ['@/features', './src/features'],
          ['@/shared/components/ui', './src/shared/components/ui'],
          ['@/shared/hooks', './src/shared/hooks'],
          ['@/shared/lib/utils', './src/shared/lib/utils'],
          ['@/entities', './src/entities'],
          ['@/pages', './src/pages'],
          ['@/widgets', './src/widgets']
        ],
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    }
  }
}

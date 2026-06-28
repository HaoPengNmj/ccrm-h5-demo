module.exports = {
  root: true,
  env: {
    brower:true,
    node: true,
    es6:true
  },
  extends: [
    'plugin:vue/vue3-recommended',
    '@vue/standard',
    '@vue/typescript/recommended',
    './.eslintrc-auto-import.json',
    './.eslintrc-auto-import-types.json',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'prettier/prettier': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'prefer-const': 'off',
    'no-var': 'off',
    'vue/no-unused-components': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    'no-self-assign': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    'no-inferrable-types': 'off',
    'space-before-function-paren': 0,
    'comma-dangle': 0
  },
}

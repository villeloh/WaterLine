module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      tsx: true,
    },
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    '@react-native-community',
    'prettier',
  ],
  plugins: ['@typescript-eslint'],
  rules: {
    'linebreak-style': [2, 'unix'],
    semi: [2, 'never'],
    '@typescript-eslint/no-unused-vars': [1, {argsIgnorePattern: '^_'}],
  },
}

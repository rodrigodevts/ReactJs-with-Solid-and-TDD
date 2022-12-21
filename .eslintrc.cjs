module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'plugin:react/recommended',
    'standard-with-typescript',
    "prettier",
    "plugin:prettier/recommended",
    'plugin:react/jsx-runtime',
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json'
  },
  plugins: [
    'react',
    'prettier',
  ],
  rules: {
    "prettier/prettier": "error",
    '@typescript-eslint/triple-slash-reference': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/consistent-type-definitions': 'off',
  },
}

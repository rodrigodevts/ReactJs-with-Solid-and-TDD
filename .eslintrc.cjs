module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
    "cypress/globals": true,
  },
  extends: [
    'plugin:react/recommended',
    'standard-with-typescript',
    "prettier",
    "plugin:prettier/recommended",
    'plugin:react/jsx-runtime',
    "plugin:cypress/recommended"
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
    "cypress"
  ],
  rules: {
    "prettier/prettier": ["error", {
      'singleQuote': true,
      'semi': true,
    }],
    "@typescript-eslint/consistent-indexed-object-style": "off",
    '@typescript-eslint/triple-slash-reference': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/consistent-type-definitions': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/prefer-nullish-coalescing': 'off',
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/comma-spacing': 'off',
  },
  settings: {
    "react": {
      "version": "detect"
    }
  }
}

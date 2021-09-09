module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
  },
  extends: ['@nuxtjs', 'plugin:nuxt/recommended', 'prettier'],
  plugins: [],
  // add your custom rules here
  rules: {
    'no-unused-vars': 'off',
    'no-unused-expressions': 'off',
    'vue/no-unused-vars': 'off',
    'vue/no-unused-components': 'off',
    'no-sequences': 'off',
  },
}

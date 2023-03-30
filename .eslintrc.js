module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'standard'
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  plugins: [
    'vue'
  ],
  rules: {
    'space-before-function-paren': 0,
    'vue/multi-word-component-names': 'off'
  }
}

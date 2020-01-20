module.exports = {
  root: true,
  env: {
    node: true,
  },
  // plugins: ['vue', '@vue'],
  // REVIEW: 为何不需要在 plugins 声明就可以用？
  extends: ['eslint:recommended', 'plugin:vue/recommended', '@vue/prettier'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
}

module.exports = {
  publicPath:
    process.env.NODE_ENV === 'production' &&
    process.env.BUILD_FOR === 'github-pages'
      ? '/vue-diet/'
      : '/',
  transpileDependencies: ['vuetify'],
}

// vue.config.js
module.exports = {
  // in webpack config
  configureWebpack: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader',
        options: {
          compilerOptions: {
            isCustomElement: tag => tag.startsWith('amplify-')
          }
        }
      }
    ]
  }
}
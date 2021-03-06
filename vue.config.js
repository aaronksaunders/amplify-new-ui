// vue.config.js
/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */

module.exports = {
  chainWebpack: (config) => {
    config.module
      .rule("vue")
      .use("vue-loader")
      .tap((options) => {
        options = {
          ...options,
          compilerOptions: {
            isCustomElement: (tag) => tag.startsWith("amplify-"),
          },
        };
        console.log(options);
        return options;
      });
  },
};

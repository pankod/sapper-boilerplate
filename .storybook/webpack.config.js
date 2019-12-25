const merge = require("webpack-merge");

module.exports = ({ config }) => {
  let mergedConfig = merge.smart(config, {
    module: {
      rules: [
        {
          test: /\.(svelte|html)$/,
          loader: "svelte-loader",
          options: {
            preprocess: require("svelte-preprocess")({
              scss: true
            })
          }
        }
      ]
    }
  });
  mergedConfig.resolve.alias = { ...mergedConfig.resolve.alias };

  return mergedConfig;
};

const merge = require("webpack-merge");
const path = require("path");

const alias = {
    svelte: path.resolve("node_modules", "svelte"),
    '@Services': path.resolve(__dirname, '../src/services/'),
    '@Components': path.resolve(__dirname, '../src/components/'),
    '@Store':path.resolve(__dirname, '../src/store/')
};
const extensions = [".mjs", ".js", ".json", ".svelte", ".html"];
const mainFields = ["svelte", "module", "browser", "main"];

module.exports = ({ config }) => {
  let mergedConfig = merge.smart(config, {
    resolve: { alias, extensions, mainFields },
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

  return mergedConfig;
};

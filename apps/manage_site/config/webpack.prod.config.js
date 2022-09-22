const commonConfig = require("./webpack.base.config");
const { merge } = require("webpack-merge");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const devConfig = {
  mode: "production",
  output: {
    filename: "[name].[contenthash:8].js", // contenthash：只有模块的内容改变，才会改变hash值
    publicPath: "/",
  },
  plugins: [new BundleAnalyzerPlugin()],
};
// 调用smart方法进行合并
module.exports = merge(commonConfig, devConfig);

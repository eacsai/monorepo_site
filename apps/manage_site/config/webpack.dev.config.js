const commonConfig = require('./webpack.base.config')
const {merge} = require('webpack-merge');
const path = require("path");

const devConfig = {
  mode: 'development',
  optimization: {
    usedExports: true,
  },
  output: {
    filename: 'js/[name].[hash:8].js',
    publicPath: "/",
  },
  devtool: 'eval-cheap-module-source-map'
}
// 调用smart方法进行合并
module.exports = merge(commonConfig, devConfig)



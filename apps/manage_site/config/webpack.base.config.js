//webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const webpack = require("webpack");

const { DEV, DEBUG } = process.env;

process.env.BABEL_ENV = DEV ? "development" : "production";
process.env.NODE_ENV = DEV ? "development" : "production";

module.exports = {
  entry: "./src/index.tsx",
  output: {
    path: path.join(__dirname, "../dist"),
    clean: true,
  },
  target: "web",
  devServer: {
    port: 8080,
    historyApiFallback: true,
    hot: true,
    static: {
      directory: path.join(__dirname, "../dist"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(png|gif|jpe?g|svg)$/i,
        exclude: [path.resolve(process.cwd(), "src/assets/css")],
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192, // 图片限制
              name: "[hash:8].[ext]",
              useRelativePath: false,
              outputPath: function (fileName) {
                return "assets/images/" + fileName;
              },
            },
          },
          // 配置 image-webpack-loader (第一步)
          {
            loader: "image-webpack-loader",
            options: {
              // 只在 production 環境啟用壓縮 (第二步)
              disable: process.env.NODE_ENV === "production" ? false : true,
              mozjpeg: {
                progressive: true,
                quality: 65,
              },
              optipng: {
                enabled: false, // 表示不啟用這一個圖片優化器
              },
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
              webp: {
                quality: 75, // 配置選項表示啟用 WebP 優化器
              },
            },
          },
        ],
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        use: [
          "cache-loader",
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-typescript", "@babel/preset-react"],
              plugins: [
                [
                  "import",
                  {
                    libraryName: "antd",
                    style: true,
                  },
                ],
              ],
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          // less-loader
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                // 替换antd的变量，去掉 @ 符号即可
                // https://ant.design/docs/react/customize-theme-cn
                modifyVars: {
                  "primary-color": "#1DA57A",
                  "border-color-base": "#d9d9d9", // 边框色
                  "text-color": "#d9d9d9",
                },
                javascriptEnabled: true, // 支持js
              },
            },
          },
        ],
      },
      {
        test: /\.(sass|scss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
              sourceMap: !!DEV,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: !!DEV,
            },
          },
        ],
      },
      {
        test: /\.(csv|tsv)$/i,
        use: ["csv-loader"],
      },
      {
        test: /\.xml$/i,
        use: ["xml-loader"],
      },
    ],
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: false,
        terserOptions: {
          output: {
            comments: false,
          },
        },
      }),
      new CssMinimizerPlugin(),
    ],
    minimize: !DEV,
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'commons', // 设置模块名称，如果不设置就是commons_node_modules_jquery_jquery_src_common_js.js
          chunks: 'all',
          minChunks: 2,
        },
      },
    },
  },
  resolve: {
    modules: ["node_modules"],
    extensions: [".json", ".js", ".jsx", ".ts", ".tsx", ".less", "scss"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "../public/index.html"),
    }),
    new CleanWebpackPlugin(),
    new webpack.ProvidePlugin({
      //_: 'lodash'
      // 如果没注释的话，需要这样引用console.log(_.join(['hello', 'webpack'], ' '))
      join: ["lodash", "join"],
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[name].css",
    }),
    new ForkTsCheckerWebpackPlugin(),
  ],
};

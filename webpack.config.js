const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Autoprefixer = require("autoprefixer");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");

module.exports = (env, options) => {
  const isProduction = options.mode === "production";
  const publicDir = "/";

  return {
    entry: `${path.join(__dirname, "./src")}/js`,
    output: {
      filename: "js/[name].[hash].js",
      path: path.join(__dirname, "./dist"),
      publicPath: publicDir,
    },
    module: {
      rules: [
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            {
              loader: "css-loader",
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true,
                prependData: "@import './src/scss/variables';",
                sassOptions: {
                  includePaths: [path.join(__dirname, "src")],
                },
              },
            },
          ],
        },
        {
          test: /\.(png|jpg|gif|svg)$/,
          loader: "file-loader",
          exclude: [/node_modules/],
          options: {
            name: "./img/[name].[ext]",
            publicPath: "../",
          },
        },
        {
          test: /\.js$/,
          loader: "babel-loader",
          exclude: "/node_modules/",
        },
      ],
    },
    devServer: {
      contentBase: "./dist",
      port: 3000,
      overlay: {
        warnings: true,
        errors: true,
      },
      watchOptions: {
        ignored: /node_modules/,
      },
    },
    devtool: isProduction ? false : "eval-sourcemap",
    plugins: [
      Autoprefixer,

      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery",
      }),

      new MiniCssExtractPlugin({
        filename: "./css/[name].[hash].css",
      }),

      new HtmlWebpackPlugin({
        filename: "index.html",
        template: "./index.html",
      }),
    ],
  };
};
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const isDevelopment = process.env.NODE_ENV !== "production";

const config = {
  entry: [path.join(path.resolve(__dirname, "src"), "index.jsx")],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    chunkFilename: "[name].bundle.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(path.resolve(__dirname, "src"), "index.html"),
      filename: "index.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve("babel-loader"),
          },
        ],
      },
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
      { test: /\.(woff|woff2|eot|ttf)$/, type: "asset/resource" },
      { test: /\.(png|jpeg|jpg|svg)$/, type: "asset/resource" },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  devtool: "source-map",
  devServer: {
    historyApiFallback: true,
    port: process.env.DEV_PORT || 3000,
    hot: true,
    open: true,
  },
  mode: isDevelopment ? "development" : "production",
};

module.exports = config;

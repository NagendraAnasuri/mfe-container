const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const { DefinePlugin } = require("webpack");

const PRODUCTS_REMOTE_URL =
  process.env.PRODUCTS_REMOTE_URL ||
  "http://localhost:3001/remoteEntry.js";

const CART_REMOTE_URL =
  process.env.CART_REMOTE_URL ||
  "http://localhost:3002/remoteEntry.js";

const ACCOUNT_REMOTE_URL =
  process.env.ACCOUNT_REMOTE_URL ||
  "http://localhost:3003/remoteEntry.js";

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  output: {
    publicPath: "auto",
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    clean: true,
  },
  devServer: {
    port: 3000,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  plugins: [
  new ModuleFederationPlugin({
    name: "container",
    remotes: {
      products: `products@${PRODUCTS_REMOTE_URL}`,
      cart: `cart@${CART_REMOTE_URL}`,
      account: `account@${ACCOUNT_REMOTE_URL}`,
    },
  }),
  new DefinePlugin({
    "process.env.PRODUCTS_REMOTE_URL": JSON.stringify(PRODUCTS_REMOTE_URL),
    "process.env.CART_REMOTE_URL": JSON.stringify(CART_REMOTE_URL),
    "process.env.ACCOUNT_REMOTE_URL": JSON.stringify(ACCOUNT_REMOTE_URL),
  }),
  new HtmlWebpackPlugin({
    template: "./public/index.html",
  }),
],

};

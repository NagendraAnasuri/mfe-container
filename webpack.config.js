const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

const isProd = process.env.NODE_ENV === "production";

const PRODUCTS_REMOTE_URL = isProd
  ? "https://microfe-products.netlify.app/remoteEntry.js"
  : "http://localhost:3001/remoteEntry.js";

const CART_REMOTE_URL = isProd
  ? "https://microfe-cart.netlify.app/remoteEntry.js"
  : "http://localhost:3002/remoteEntry.js";

const ACCOUNT_REMOTE_URL = isProd
  ? "https://microfe-account.netlify.app/remoteEntry.js"
  : "http://localhost:3003/remoteEntry.js";

module.exports = {
  entry: "./src/index.js",
  mode: isProd ? "production" : "development",
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
  new HtmlWebpackPlugin({
    template: "./public/index.html",
  }),
],

};

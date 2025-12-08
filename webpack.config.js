const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

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
        products: "products@http://localhost:3001/remoteEntry.js",
        cart: "cart@http://localhost:3002/remoteEntry.js",
        account: "account@http://localhost:3003/remoteEntry.js",
      },
    //   shared: {
    //     react: { singleton: true, requiredVersion: false },
    //     "react-dom": { singleton: true, requiredVersion: false },
    //     "react-router-dom": { singleton: true, requiredVersion: false },
    //   },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};

const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  context: path.resolve(__dirname, "./src"),
  devServer: {
    contentBase: path.resolve(__dirname, "."),
  },
  devtool: "source-map",
  entry: ["babel-polyfill", "./index.js"],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [{
          loader: "babel-loader",
          options: { presets: ["es2015", "stage-0"] }
        }]
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          loader: "css-loader?importLoaders=1"
        })
      }
    ]
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "./build"),
    publicPath: ""
  },
  plugins: [
    new ExtractTextPlugin({
      filename: "[name].css",
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      title: "webpack es7 minimal template",
      hash: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      minChunks: function (module) {
        return module.context && module.context.indexOf("node_modules") !== -1;
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      // But since there are no more common modules between them we end up with just the runtime code included in the manifest file
      name: "manifest"
    })
  ]
};

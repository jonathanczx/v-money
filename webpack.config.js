var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  context: __dirname,
  devtool: debug ? "inline-sourcemap" : null,
  entry: "./src/index.js",
  output: {
    path: __dirname + "/dist",
    filename: "v-money.min.js"
  },
  module: {
    rules: [{
      test: /\.vue$/,
      use: 'vue-loader'
    }]
  },
  plugins: [
    new VueLoaderPlugin(),
  ],
};
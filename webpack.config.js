var path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

var config = {
  // TODO: Add common Configuration
  module: {},
};

const contentConfig = Object.assign({}, config, {
  // Change to your "entry-point".
  entry: "./src/content",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "content.bundle.js",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
  },
  module: {
    rules: [
      {
        // Include ts, tsx, js, and jsx files.
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { context: "src/", from: "*.json" },
        { context: "src/", from: "*.png" },
      ],
    }),
  ],
});

const backgroundConfig = Object.assign({}, config, {
  entry: "./src/background",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "background.bundle.js",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
  },
  module: {
    rules: [
      {
        // Include ts, tsx, js, and jsx files.
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
    ],
  },
});

module.exports = [contentConfig, backgroundConfig];

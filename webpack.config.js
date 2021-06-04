var path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

var config = {
  module: {},
  plugins: [new CleanWebpackPlugin()],
  devtool: "source-map",
};

const contentConfig = Object.assign({}, config, {
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
        { context: "src/", from: "*.html" },
        {
          from: "src/third-party/**/*",
          to: "third-party/[name][ext]",
        },
      ],
    }),
  ],
});

// const backgroundConfig = Object.assign({}, config, {
//   entry: "./src/background",
//   output: {
//     path: path.resolve(__dirname, "dist"),
//     filename: "background.bundle.js",
//   },
//   resolve: {
//     extensions: [".ts", ".tsx", ".js", ".json"],
//   },
//   module: {
//     rules: [
//       {
//         test: /\.(ts|js)x?$/,
//         exclude: /node_modules/,
//         loader: "babel-loader",
//       },
//     ],
//   },
// });

const popupConfig = Object.assign({}, config, {
  entry: "./src/popup",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "popup.bundle.js",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
    ],
  },
});

module.exports = [contentConfig, popupConfig];

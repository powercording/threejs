const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/App2.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "App2.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html", // HTML 파일 경로
      filename: "index.html", // 생성될 HTML 파일 이름
    }),
  ],
};

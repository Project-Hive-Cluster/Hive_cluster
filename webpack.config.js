// const path = require("path")
// const { IgnorePlugin } = require("webpack")

// module.exports = {
//   mode: "production",
//   entry: ["regenerator-runtime/runtime", "./src/server.js"],
//   target: "node",
//   devtool: "source-map",
//   output: {
//     path: path.resolve(__dirname, "build"),
//     filename: "bundle.js",
//     publicPath: "build/",
//   },
//   module: {
//     rules: [
//       {
//         use: "babel-loader",
//         exclude: /(node_modules)/,
//         test: /\.js$/,
//       },
//     ],
//   },
//   plugins: [
//     new IgnorePlugin({
//       resourceRegExp: /^pg-native$/,
//     }),
//   ],
// }

// module.exports = {
//     module: {
//         rules: [
//             {
//                 test: /\.css/,
//                 use: [ 'style-loader', 'postcss-loader' ]
//             }
//         ]
//     }
// }

module.exports = {
  plugins: [
    require("postcss-cssnext")()
  ]
}

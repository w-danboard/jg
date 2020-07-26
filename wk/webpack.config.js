const path = require('path')  // 处理路径
// 自动生成HTML文件的
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development', // development不压缩代码 production会进行压缩
  devtool: 'node', // 不需要开发的source-map文件
  entry: './src/index.js', // 入口模块
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {},
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
}
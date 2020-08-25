const path  = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const ary = ['index', 'other']
function htmlP (ary = []) {
  return ary.map(item => {
    return new HtmlWebpackPlugin({
      template: `./public/${item}.html`,
      filename: `${item}.html`,
      hash: true,
      chunks: [item]
    })
  })
}

function entryFn (ary = []) {
  let obj = {}
  ary.forEach(item => {
    obj[item] = `./src/${item}.js`
  })
  return obj
}

module.exports = {
  mode: 'development',  // 默认 production
  // entry: './src/index.js',
  // entry: {
  //   index: './src/index.js',
  //   other: './src/other.js'
  // },
  entry: entryFn(ary),
  output: {
    // filename: 'index.[hase:6].js',
    filename: '[name].[hash:6].js',
    path: path.resolve(__dirname, 'dist')

  },
  plugins: [
    new CleanWebpackPlugin(),
    ...htmlP(ary)
    // new HtmlWebpackPlugin({
    //   template: './public/index.html',
    //   filename: 'index.html',
    //   hash: true,
    //   chunks: ['index', 'other']  // 也就是index.html中要引入other.js
    // }),
    // new HtmlWebpackPlugin({
    //   template: './public/other.html',
    //   filename: 'other.html',
    //   hash: true,
    //   chunks: ['other']
    // })
  ],
  module: {
    rules: [
      // 存放了各种loader
      {
        test: /\.css$/, // 匹配哪些文件 （加载CSS文件 至少需要css-loader 和style-loader）
        // 先用css-loader加载CSS文件 然后用style-loader扔到页面上
        // loader的加载顺序是相反的 是从右向左的
        use: ['style-loader', 'css-loader']   // 使用什么loader 1、直接写字符串(适用于只需要一个loader) 2、数组 多个loader 3、{需要单独配置一个属性时}
      }
    ]
  },
  devServer: {
    // hot: true 它是热更新 只更新改变的组件或者模块 不是整体更新
  } 
}
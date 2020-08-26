const path  = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

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
    ...htmlP(ary),
    new MiniCssExtractPlugin({
      filename: 'css/main.[hash:5].css'
    })
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
      // 工作中 我们的CSS一般都是单独合拼出一个css文件的 需要使用 mini-css-extract-plugin
      {
        test: /\.css$/, // 匹配哪些文件 （加载CSS文件 至少需要css-loader 和style-loader）
        // 先用css-loader加载CSS文件 然后用style-loader扔到页面上
        // loader的加载顺序是相反的 是从右向左的
        use: [{
          loader: MiniCssExtractPlugin.loader
        }, {
          loader: 'css-loader',
          options: {
            importLoaders: 2 // 先去使用后边的加载器加载
          }
        }, 'postcss-loader', 'less-loader']   // 使用什么loader 1、直接写字符串(适用于只需要一个loader) 2、数组 多个loader 3、{需要单独配置一个属性时}
      },
      // 我们写一些css高级属性时 比如css3 想要兼容不同的浏览器 需要使用postcss-loader这个加载器
      // 使用postcss-loader 需要配置postcss.config.js这个配置文件
      // 还需要告诉webpack要兼容那些浏览器 .browserslistrc 写入cover 99.9% 或则如下：
      /**
       * 在package.json中配置
       * browserslist: {
       *  production: [
       *    >0.2%,
       *    not dead,
       *    not op_mini all
       *  ],
       *  development: [
       *    last 1 chrome version,
       *    last 1 firefox version,
       *    last 1 safari version
       *  ]
       * }
       */
      {
        test: /\.less$/,
        // less首先要编译成css 还需要走css编译的那套
        use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader'],
        exclude: '/node_modules/' // 不会去加载node_modules中的less文件 也就是不会去编译
      }
    ]
  },
  devServer: {
    // hot: true 它是热更新 只更新改变的组件或者模块 不是整体更新
  } 
}
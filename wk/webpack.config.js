const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  // 因为开发环境下和生产环境下的webpack配置有很多不一样的地方
  mode: 'development', // production none
  devtool: 'eval',  // 会把源代码放eval执行 会把打包的文件跟源文件映射起来 方便调试
  // entry如果是一个文件的话 那就是单入口 chunk的名字就叫main 每个chunk一般都会生成一个文件
  // Multiple chunks emit assets to the same filename bundle.js (chunks index and login)
  entry: {
    index: './src/index.js', // chunk index
    login: './src/login.js', // chunk login
  },
  output: {
    path: path.join(__dirname, 'dist'), // 输出目录 只能是绝对目录
    // [name] 来自于entry中的key
    // hash (防止缓存) chunkHash contentHash
    filename: '[name].[hash:8].js'
  },
  // 如果你使用了devServer 那么所有的产出文件都写在内存里 而不是硬盘上 （第一为了速度）
  devServer: {
    contentBase: path.join(__dirname, 'dist') // 产出文件的根目录
    // port: 8081,
    // host: 'localhost',
    // comporess: true
  },
  module: {
    rules: [
      {
        test: /\.css$/, // 如果要加载require或import的文件是css文件的话
        // 从右向左处理CSS文件 loader是函数
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    // 这个插件是产出html文件 在编译的时候 会读取模板文件
    new HtmlWebpackPlugin({
      template: './src/index.html', // 指定模板文件
      filename: 'index.html', // 产出后的文件名
      hash: true, // 为了避免缓存 可以再产出的文件后面添加hash值
      // chunks: []
      // chunkSoftMode: 'manula' // 对引入代码块进行排序的模式
    })
  ]
}
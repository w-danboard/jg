const path = require('path');
module.exports = {
  // 因为开发环境下和生产环境下的webpack配置有很多不一样的地方
  mode: 'development', // production none
  devtool: 'eval',  // 会把源代码放eval执行 会把打包的文件跟源文件映射起来 方便调试
  entry: './src/index.js', // 入口文件
  output: {
    path: path.join(__dirname, 'dist'), // 输出目录 只能是绝对目录
    filename: 'bundle.js'
  },
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
  }
}
// webpack的配置文件 【webpack是基于node写的】
const path = require('path')  // node的内置模块
const { CleanWebpackPlugin } = require('clean-webpack-plugin') // 用来清空之前打包生成的文件
const HtmlWebpackPlugin = require('html-webpack-plugin') // 用来自动根据对应的html模板生成新的html
module.exports = {
  mode: 'development',  // 指定环境的 development [默认是 production]
  entry: './src/index.js', // 告诉webpack打包的主入口文件
  output: {
    // 打包之后的输出文件
    filename: 'aaa.[hash:6].js', // 指定打包之后的文件的名字 [hash]是为了防止缓存的 【:6 指定哈希长度】
    // 还需要告诉webpack打包之后的文件需要放到哪个位置
    path: path.resolve(__dirname, 'dist'), // path对应的值需要是一个绝对路径 [__dirname是node每个模块中的自带变量 指的是当前文件夹的绝对路径 | __filename是当前文件的绝对路径]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: '啦啦啦',
      template: './index.html',
      minify: true, // 压缩生成的html
      filename: 'newIndex.html' // 生成HTML的名字 不写的话 默认是模板的名字
    })
  ]
}
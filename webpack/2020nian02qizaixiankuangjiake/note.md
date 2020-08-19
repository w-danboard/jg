## webpack 打包工具
> 在没有流行webpack之前一般使用grunt、gulp, 为了就是压缩代码。

- 代码转换: less/sass转成浏览器认识的css | ts转成js | es6/es8转成es5
- 压缩文件: 可以压缩JS CSS 小图片转换base64 (其实都是为了减少HTTP请求，还有一点就是代码分割，可以把公用的抽取出来，比如一个CSS文件很多个页面都在使用)
- 代码分割: 提取公用代码
- 模块合并: 把多个模块合并
- 自动刷新: 热更新 (代码改变，自动刷新页面)
- 代码校验: eslint

## 模块化开发
- 单例模式 [高级单例模式: 就是一个闭包，返回一个对象]: 就是一个命名空间 (function() {}())
- commonJS规范: （node环境下运行，浏览器不支持）每一个文件都是一个单独的模块 导入require 导出exports module.exports
- esModul: 浏览器遵循的规范，每一个文件都是一个单独的模块。导入import 导出export export defualt

## webpack 是基于node开发的 所以它的配置文件 都是遵循commonJS规范
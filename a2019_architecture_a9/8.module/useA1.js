let str = require('./a');

// 1.调试的适用场景 命令调试  在浏览器中调试
// webpack源代码


// commonjs 规范 1.如过需要让别人使用 使用module.exports 来导出这个变量
// 2.如果想使用这个模块需要使用require语法
// 3.每个文件都是一个模块


// 1.使用模块上定义的require方法 Module.prototype.require
// 2.Module._load 模块的加载方法
// 3.Module._resolveFilename 把文件路径转成成绝对路径 会尝试添加.js/.json文件
// 4.Module._cache[filename] 判断当前这个路径有没有在缓存中,如果在缓存中就结束了
// 5.new Module 创建一个模块  id 当前的文件名 exports 当前模块的导出对象
// 6.把当前模块放到缓存中
// 7.tryModuleLoad 尝试加载这个模块
// 8.module.load 模块的加载
// 9.先找到文件的扩展名 不同的扩展名处理方式不相同 .js  json 
// 10.通过扩展名调用不同的方法 Module._extensions[extension]
// 11. 如果是js 读取文件的内容
// 12. 将读取到的内容 Module.wrap进行包裹 Module.wrapper[0] + script + Module.wrapper[1]
// const wrapper = [
//     '(function (exports, require, module, __filename, __dirname) { ',
//     '\n});'
// ];
// 将字符串使用 runInThisContext 进行执行 ,改变this 将参数传入，用户会给参数赋值
// 会给module.exports 赋值
// 最终require方法返回的是module.exports;


// mjs -> import 用babel 


// amd requirejs 依赖前置 cmd seajs
// node commonjs 动态  es6Module(静态) umd

// 第一次执行阻塞也没有关系 pm2 日志
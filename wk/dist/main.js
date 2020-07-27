 (function(modules) {
   // The module cache
   // 模块缓存是一个对象
 	var installedModules = {};

   // The require function
   // 在浏览器里 自己实现了一套common.js require方法
 	function require(moduleId) {

     // Check if module is in cache
     // 检查模块 是否在缓存中存在 如果存在 则直接 返回缓存中的模块
 		if(installedModules[moduleId]) {
 			return installedModules[moduleId].exports;
 		}
     // Create a new module (and put it into the cache)
     // 为此模块id 创建一个新的模块 并且放到缓存中
 		var module = installedModules[moduleId] = {
 			i: moduleId, // identify 模块id 模块的标识符
 			l: false, // loaded 是否已经加载成功或者说初始化成功
 			exports: {} // 此模块的导出对象
 		};

     // Execute the module function
     // 执行模块函数 this=module.exports
 		modules[moduleId].call(module.exports, module, module.exports, require);

     // Flag the module as loaded
     // 把此模块设置为已经加载成功
 		module.l = true;

     // Return the exports of the module
     // 返回此模块的导出对象
 		return module.exports;
 	}


   // Load entry module and return exports
   // 加载入口模块 并且返回exports
   debugger
 	return require(s = "./src/index.js");
 })
 ({

  "./src/index.js":
  (function(module, exports, require) {
    let title = require(/*! ./title */ "./src/title.js")
    console.log(title)
  }),

  "./src/title.js":
  (function(module, exports) {
    module.exports = 'title'
  })

 });

 /**
  * 参数是一个对象
  * key是模块ID [其实就是一个相对于项目根目录的相对路径 ./src]
  * 值是一个函数 是一个common.js的模块定义
  *   [你写的模块代码将会成为common.js模块的函数体]
  */
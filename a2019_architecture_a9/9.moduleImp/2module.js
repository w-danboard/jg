// 模块的总结

// 1. 模块分为三类 核心模块 不要安装也不需要自己写 require('fs/path')
// 2.文件模块特点 必须路径是相对路径、绝对路径 './xxxx' require(path.resolve(__dirname,'a.js'))
// 3. 第三方模块 和核心模块一样 但是需要安装 


// 文件的引用规则 每个版本都不太一样

// 新版本中会先查找文件 在查找文件夹 
// 如果没有匹配文件 会找文件夹 如果文件夹下有package.json,找main入口，如果有引入main 否则找index.js
// let str = require('./a');
// console.log(str);


// 第三方的查找路径  this.paths 先找当前目录下的node_modules 找不到则向上查找
// let r = require('a');
// console.log(r,module.paths);

// 第三方查找如果都找不到则报错
// 第三方需要安装 不能使用全局模块 因为全局模块只能在命令行中使用

// 11.13.0

let str = require('./a');
console.log(str);



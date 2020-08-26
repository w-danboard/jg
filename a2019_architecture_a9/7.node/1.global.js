// 全局对象 global  只要不声明可以直接使用的就是全局对象

// 1.最常见的全局对象的 如果变量放到了global上 那这个值肯定是一个全局对象 

// process 进程对象
// Buffer 读出来的肯定是二进制的 表示内存
// clearInterval
// clearTimeout
// setImmediate IE node中自己实现了一个setImmediate
// setInterval
// console.dir(global,{showHidden:true})
// this默认在文件中并不是global  
// node模块化的概念 模块化如何实现？ 函数他里面的this 被更改了 module.exports

// require module exports __dirname __filename 文件中可以直接使用以上五个参数 ，他是文件外套的函数的参数 并没有挂载在global上

// console.log(arguments[0] === exports,arguments[1]=== require ,arguments[2] === module)


// process进程 node干什么 写插件 webpack 实现前后端分离 （解决跨域）
// webpack --config  --port
// webpack --mode production  development

// 怎么获取执行时传递的参数
// console.log(process.argv.slice(2)); // 需要拿到用户传入的参数 从第二个参数之后才是结果

// let options = process.argv.slice(2).reduce((memo,current,index,arr)=>{
//     if (current.startsWith('--')) {
//         memo[current.slice(2)] = arr[index+1];
//     }
//     return memo
// },{})
// console.log(options);

// tj commander 命令工具专用包 解析参数 并且提供命令行帮助文档 vue-cli 


// let config = {
//     'create'(){
//         console.log('创建文件')
//     },
//     'install'(){
//         console.log('install')
//     }
// }
// const program = require('commander');
// program.name('node')
// program.usage("1.global.js [options]")
// program.option('-p,--port <n>', 'set you port');
// program.option('-o,--out <n>', 'set output directory')
// program.command('rmdir').action(function () {
//       console.log('执行删除命令')
// })
// program.command('mkdir').action(function () {
//     console.log('添加命令')
// })
// program.on('--help',function () {
//     console.log('\r\n  run command -------------------')
// })
// let result = program.parse(process.argv);
// console.log(result)


// env process 中的属性 我再执行命令的时候 如何传递参数

// windows 可以通过set命令来设置
// mac 可以通过export 来设置  cross-env
console.log(process.env); // 可以设置全局环境

// node中的事件环

// 实现了一个模块化 commonjs规范 产生一个函数将代码放到函数中 保证每个文件功能独立互不影响
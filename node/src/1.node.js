// 服务器和浏览器的区别 this
// 代码运行的时候 全局执行上下文 VO对象 variable object global属性
// this = vo = window
// this = vo = global

// console.log(this);  // {} 默认情况node在执行的时候 在文件中执行的 内部会给这个文件加一个自执行函数 会把this指向更改掉

// 变量不会被直接声明在global上

// node 文件的执行方式 node + 文件名
// console.log(Object.keys(global))

// -----------------------------------------------------

// buffer
// setInterval / settimeout / setImmediate

// console.log('eval', eval); // v8引擎上的方法 都有 只是被隐藏掉了
// console.dir(global, {showHidde: true});
// console.log(global.process) //全局对象中的进程

// --------------------------------------------------------

// node执行的时候可以带参数
// process.env   执行的环境
// process.argv  执行环境参数
// process.cwd() 当前的执行目录 可变的 比如webpack中使用的

// console.log(process.cwd())

// ----------------------------------------------------------

// 区分环境变量
// let url = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'http://www.wanglin.com';
// console.log(url)
/** 相当于在NODE_ENV添加了development (一下在 iterm2中执行的)
 * 注意：mac用export NODE_ENV=XXX windows set NODE_ENV=XXX (cross-env)
 * wanglin@wanglin src % export NODE_ENV=development
 * wanglin@wanglin src % node 1.node.js
 * http://localhost:3000
 */

 // -------------------------------------------------------------

 console.log(process.argv)


 // commander yargs 都是这样处理的
 let obj = process.argv.slice(2).reduce((a, b, i, arr) => { // --port
    if (b.includes('--')) {
      console.log('我是b', b)
      a[b.slice(2)] = arr[i + 1];
    }
    return a;
 }, {});

 console.log(obj);


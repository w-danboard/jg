// promise 是一个类 new Promiser 天生自带的 （需要注意的是：IE低版本不支持）
// promise 含义：承诺 promise中有三个状态，分别为成功态、失败态、等待态
// promise中会存放两个变量 分别value和reason
// promise实例上会存放一个then方法

// 当创建一个promise的时候，需要提供一个执行器函数 此函数会立即执行
// 默认是等待态 可以转化成成功或者失败，状态更改后不能修改状态

let Promise = require('./promise');

let promise = new Promise(function(resolve, reject) {
  throw new Error('错误'); // 执行时可能会发生异常，那就内部将错误异常作为原因，让promise变成失败态
  resolve(123)
});

promise.then(function(value) {
  console.log(value)
}, function(reason) {
  console.log(reason)
})

// 一个 promise实例 可以then多次 分别绑定成功和失败 当触发resolve和reject的时候 触发对应的成功和失败


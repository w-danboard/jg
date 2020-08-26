// promise 解决异步编程的方法
// 1）多个异步方法串行问题  链式调用 （还是基于回调的）
// 2) 多个异步并发的问题   同时拿到 两个异步的执行结果 Promise.all

// promise 代表的是承诺 我答应你...
// 我答应给我媳妇买个包 1.买了 成功态  2.不买 失败态  3. 等待态
// 只有等待态 才可以将状态变成 成功/失败 不能将已经成了在转换成其他状态 ，失败也不能转化成功

// es6规范中提供的一个类  Q库 bluebird 
// 1.每个promise需要提供一个执行器函数（这个函数 会立即执行）
// 2.new Promise之后会产生一个promise实例，这个实例上存在一个then方法
// 3.executor中需要提供一个成功的方法和一个失败的方法
let Promise = require('./promise'); // 同步的
let p = new Promise((resolve, reject) => { // thenbale对象
    console.log(1)
    throw new Error('忘记了 ')
    reject('钱丢了');
    resolve('发工资了');
});
p.then((data) => {
    console.log(data);
}, (err) => {
    console.log(err);
})
console.log(2);
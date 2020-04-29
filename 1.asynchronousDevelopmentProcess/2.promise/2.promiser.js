let fs = require('fs');
let path = require('path');
let Promise = require('./1.promise');

let namePath = path.resolve(__dirname, 'name.txt');
let eagPath = path.resolve(__dirname, 'age.txt')

function read(url) {
  return new Promise((resolve, reject) => {
    fs.readFile(url, 'utf8', (err, data) => {
      if (err) reject(err)
      resolve(data)
    })
  })
}

// 如果then方法返回的是一个常量 包括undefined 会把这个结果传递给外层的then的成功结果
// 如果then方法中抛出异常 会走到下一次then的失败结果
// 穿透 如果没有处理错误 会继续向下找, 会就近查找错误 如果没好到会一直找 一般情况会写catch方法
// catch是不会中断运行的
// then方法执行后可能会返回一个promise 会采用这个promise的返回结果作为成功或者失败作为下一个then的成功或者失败
// 走失败 两种可能 第一种发生了错误 第二种就是返回一个失败的promise
// finally方法 es9 不会中断执行 只是传递一个一定会执行的函数而已
read(namePath).then(data => {
  console.log(data)
}).then(data => {
  
})

// then jq链式调用 promise一旦成功就不能失败
// promise需要每次调用then后都返回一个新的promise 可以实现状态的切换
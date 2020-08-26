let Promise = require('./promise');

// let p = new Promise((resolve,reject)=>{
//     setTimeout(() => {
//         resolve(new Promise((resolve,reject)=>{ // 如果一个promise resolve了一个新的promise，那么会等待这个promise执行完成在走外层的then方法
//             setTimeout(() => {
//                 resolve('ok');
//             }, 1000);
//         }))
//     }, 1000);
// });

// p.then(data=>{
//     console.log(data);
// })

let p = new Promise((resolve,reject)=>{
    setTimeout(() => {
        reject(1000)
    }, 1000);
})
Promise.reject(p).catch(err=>{
    console.log(err);
})
// let fs = require('fs');
// // Promise的特点是？ 解决嵌套问题
// function read(...args){
//     let dfd = Promise.defer();
//     fs.readFile(...args, function (err, data) {
//         if (err) {
//             dfd.reject(err);
//         }
//         dfd.resolve(data);
//     })
//     return dfd.promise
// }

// read('promise.js','utf8').then(data=>{
//     console.log(data);
// }); 
// 面试时 写一个延迟方法
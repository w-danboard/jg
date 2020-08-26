// promise中的链式调用

let fs = require('fs');
let {promisify} = require('util')
let read = promisify(fs.readFile);

// promise 特性  then方法中传递的函数 成功 、 失败 这两个函数的返回值可以返回一个promise
// 如果返回的是一个promoise的化 会用这个promise的状态作为下一次then的结果
// 如果自己有捕获错误 他就不会找catch
// 这个函数还可以返回普通值 只要不是error，不是promise 都叫普通值 会将这个值作为下一次then的结果

// 1) 返回的是promise 2。跑出错误 3.返回的是普通值
read('./content1.txt', 'utf8').then(data => { // name.txt
    return read(data+'1','utf8');
},err=>{
    console.log('inner');
    throw new Error('error');
}).then((data)=>{
    console.log(data);
}).catch(err=>{
    console.log('err',err); // 专门用来捕获错误的
}).then(data=>{
    console.log(data);
})
// 链式调用的实现 是每一次都返回一个新的promise jquery返回this

// 1) 先将代码包装成promise的
// let promisify = (fn)=>{ // fs.readFile
//     return (...args)=>{ // read
//         return new Promise((resolve,reject)=>{
//             fn(...args,function (err,data) { // 只能格式化node的api方法
//                 if(err) reject(err);
//                 resolve(data);
//             })
//         })
//     }
// }
// function read(...args){
//     return new Promise((resolve,reject)=>{
//         fs.readFile(...args,function (err,data) {
//             if(err) reject(err);
//             resolve(data);
//         })
//     })
// }

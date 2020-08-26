let Promise = require('./promise');
// 1) 普通值的情况

// let promise = new Promise((resolve,reject)=>{
//     resolve();
// })

// let promise2 = promise.then(()=>{
//     return 1000
// })
// promise2.then((data)=>{
//     console.log(data);
// })

let promise = new Promise((resolve)=>{
    resolve()
})

let promise2 = promise.then(()=>{ // then中的成功函数是异步执行这时候promise2已经产生了
    return new Promise((resolve,reject)=>{
        resolve(1000)
    })
})
promise2.then((data)=>{
    console.log('成功',data)
},err=>{
    console.log(err);
})


// let idx = 0;
// Object.defineProperty('x', 'then', {
//     get() {
//         if (++idx == 2) {
//             throw new Error();
//         }
//     }
// })

// 1.finally es9语法 只能在高版本node中使用
// Promise.prototype.finally = function (callback) {
//     // finally他就是一个then方法
//     return this.then((data) => {
//         // 调用Promise.resolve确保callback中的promise执行完成
//         return Promise.resolve(callback()).then(() => data);
//     }, err => {
//         return Promise.resolve(callback()).then(() => { throw err });
//     })
// }


// Promise.prototype.finally = function (callback) {
//     return this.then(data => Promise.resolve(callback()).then(() => data), err => Promise.resolve(callback()).then(()=> { throw err }))
// }
// Promise.reject(100).finally(() => {
//     console.log('成功'); // 如果finallly 返回一个promise 那么会等待这个promise执行完成
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve('123')
//         }, 5000);
//     })
// }).then(data => {
//     console.log('s:' + data);
// }).catch(err => {
//     console.log('f:' + err);
// });
// 面试必问


// 2.Promise.all 全部成功才成功 如果有任何一个失败了就会执行失败的逻辑 Promise.race
const fs = require('fs').promises;
// [10,'珠峰']
const isPromise = (value)=>{
    return typeof value.then === 'function'
}
Promise.all = function (promises) {
    return new Promise((resolve,reject)=>{
        let resultArr = [];
        let idx = 0;
        const processData = (data,index)=>{
            resultArr[index] = data;
            if(++idx === promises.length){
                resolve(resultArr);
            }   
        }
        for(let i = 0;i < promises.length;i++){
            let currentValue = promises[i];
            if(isPromise(currentValue)){
                currentValue.then(data=>{
                    processData(data,i)
                }, reject)
            }else{
                processData(currentValue, i)
            }
        }
    })
}
Promise.race([]); // 赛跑谁最快就用谁的结果 可以做promise中断处理
Promise.all([fs.readFile('./age.txt', 'utf8'), fs.readFile('./name.txt', 'utf8'),2]).then(data=>{
    console.log(data);
},err=>{
    console.log(err)
})

// 我们希望同时读取多个文件内容 将内容组成一个数组

let fs = require('fs'); // filesystem


// 串行 并行  异步问题通过回调
// function out(){
//     if(arr.length === 5){
//         console.log(arr);
//     }
// }
function after(callback,times){
    let arr = []; // 多个异步的结果会被保存到数组中 
    return function (data) { // out
        arr.push(data);
        if(--times === 0){ // 如果调用次数达到
            callback(arr); // 将储存的结果传递出去
        }
    }
}
function fn(arr){
    console.log(arr);
}
let out = after(fn,2);
fs.readFile('./age.txt','utf8',function (err,data) {
    out(data);
})
fs.readFile('./name.txt', 'utf8', function (err, data) {
    out(data);
})


// 发布订阅 发布 arr.forEach 订阅[fn,fn,fn]
let fs = require('fs');
let path = require('path')
// 返回的是可写流对象
let WriteStream = require('./WriteStream')
let ws = new WriteStream(path.resolve(__dirname,'2.txt'),{
// let ws = fs.createWriteStream(path.resolve(__dirname,'2.txt'),{
    flags:'w',
    autoClose:true,
    start:0,
    encoding:'utf8',
    highWaterMark:3 // 期望的个数 默认写入 是16k  16*1024
});
let index = 0;
function write(){ // 写入的方法
    let flag = true;
    while (index < 10 && flag) {
        flag = ws.write(index++ +'','utf8',()=>{
            console.log('完毕')
        });
    }
    if(index === 10){
        ws.end(); // 如果最终调用了end 这次drain也不会触发
    }
}
write();
ws.on('drain',function () {
     // drain事件触发条件 达到了期望值 ,并且当前写入的内容 全部清空会触发drain事件
     console.log('drain')
     write();
})
// 有0 - 9 10个数
// for(let i = 0 ; i < 10;i++){ // 希望占用更少的内容 0
//     ws.write(i+'');
// }

// 多个异步并发 如何处理成串行执行
// on('data') on('end') 可读流 pause resume
// write end  可写流   on('drain')
// 双工流 可读可写
let ReadStream  = require('./ReadStream');
let WriteStream = require('./WriteStream'); // Readable

let fs = require('fs');
// fs.createReadStream('./1.txt').pipe(fs.createWriteStream('./2.txt'));


let rs = new ReadStream('./1.txt',{
    highWaterMark:4, // 64k
});
let ws = new WriteStream('./2.txt',{
    highWaterMark:1 // 16k
});
// 先读取 将读取到的结果写入进去
rs.pipe(ws); // 可读流.pipe(可写流) =》 默认会调用可写流的write 和 end方法
// rs.on('data',function (data) {
//     let flag = ws.write(data);
//     if(!flag){
//         // 已经超过预期 如果在读取 会导致当前读取到的内容 放到了可用内存中
//         rs.pause();
//     }
// });
// ws.on('drain',function () {
//     console.log('drain')
//     rs.resume();
// })
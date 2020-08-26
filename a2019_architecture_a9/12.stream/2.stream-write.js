let fs = require('fs');
let path = require('path')
// 返回的是可写流对象
let ws = fs.createWriteStream(path.resolve(__dirname,'2.txt'));

// 只能写入 string / buffer
ws.write('hello'); // fs.write
ws.write('world'); // fs.write  -> 会给异步任务进行排序
ws.write('zf'); 

// 异步并发 -》 异步串行

ws.end('world'); // 关闭文件  fs.close  => wirte + close
ws.end('world'); // write after end  不能在end之后 在调用write


// 有0 - 9 10个数
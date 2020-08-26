// file system 可以操作文件 和 文件夹 

// let fs = require('fs'); // fs中的方法很多都是有同步和异步两种
// readFile  readFileSync 异步方法回调函数的参数第一个是错误参数

// 1)读取
// 默认读取采用的是buffer
// 如果文件不存在 默认会报错 读文件必须要保证文件存在

// 2) 写入时默认会将内容转化成utf8格式 toString('utf8')
// 读取的时候不能读取过大的文件，可能会导致淹没用户的可用内存
// 如果文件不存在会创建文件,如果文件存在则会将文件清空
// fs.readFile('./1.txt',function (err,data) { 
//     if(err){
//         return console.log(err);
//     }
//     fs.writeFile('./2.txt', data, function (err) {
        
//     })
// });

// 问题就是如果文件很大则无法写入（小于64k可以直接使用readFile）。先读取一点 在写入一点

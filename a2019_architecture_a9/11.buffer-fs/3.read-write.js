// 先读取文件 读取一点 写一点

// 在代码运行时 如果代码在运行的时候 尽量采用异步的方式不会阻塞主线程 如果当前程序刚开始运行时可以采用同步的方式 


let fs = require('fs'); // fs.readFile 不能控制读取的速度 也不能控制读取的部分

// 手动打开文件 自己读取 
// flags  r 读取  w 写入 w+ 以写为准 r+ 已读为准
// chmod 改变电脑权限  rwx  rwx  rwx  777   
// fs.open('./1.txt','r',function (err,fd) { // number
//     // fd 文件描述符 
//     //console.log(fd); // 默认windows 系统 0 1 2 被占用了
//     // 0标准输入 1标准输出 2 错误输出
//     let buffer = Buffer.alloc(3); // i/o相反的
//     // fd表示文件描述符 buffer 表示将读取的内容写入到buffer中
//     // 0表示从buffer的第0个开始写入
//     // 3表示写入的个数
//     // 0表示从文件中的哪个位置开始读取
//     fs.read(fd, buffer, 0, 3, 0, function (err, bytesRead) { // bytesRead真正读取的个数
//         console.log(bytesRead, buffer)
//     })
// })


// fs.open('./2.txt','w',function (err,fd) {
//     let buffer = Buffer.from('珠峰');
//     // fd 写入的标识符
//     // 从buffer的第0个位置开始读取 读取3个
//     // 写入到 文件的第0个位置 
//     fs.write(fd, buffer,0,3,0,function (err,written) {

//     })
// })

fs.open('./1.txt', 'r', function (err, fd) {
    if (err) {
        return console.log(err);
    }
    fs.open('./2.txt', 'w', function (err, wfd) {
        let BUFFER_SIZE = 3;
        let buffer = Buffer.alloc(BUFFER_SIZE);
        let readOffset = 0;
        let writeOffset = 0;
        function next() {
            fs.read(fd, buffer, 0, BUFFER_SIZE, readOffset, function (err, bytesRead) {
                readOffset += bytesRead;
              
                if(bytesRead === 0){
                    fs.close(fd,()=>{});
                    fs.close(wfd,()=>{})
                }else{
                    fs.write(wfd, buffer, 0, bytesRead, writeOffset, function (err, written) {
                        writeOffset += written;
                        next();
                    })
                }
            })
        }
        next();
    })
});
// 解耦  发布订阅

// fs流的原理
// 流 fs剩下的应用 目录操作 递归使用...
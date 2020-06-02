let fs = require('fs');

// r 读的意思
// w 写的意思
// a 追加的意思
// r+ 可读可写 表示文件不存在就报错
// w+ 可写可读 表示文件不存在会创建

// fd  文件描述符

// 0o666 2 读取 4 写入 1 执行
let buf = Buffer.alloc(3);
fs.open('./name.txt', 'r', (err, fd) => {
    console.log(fd)
    // fd 文件描述符
    // buf 要读取到哪个buffer中
    // offset 指代的是从buffer的哪个位置开始写
    // length 向buffer中写入多少个
    // position 从文件的哪个位置读取
    fs.read(fd, buf, 0, 3, 0, (err, bytesRead) => {
        // bytesRead 实际读到的个数
        console.log(bytesRead)
        console.log(buf)
    })
})
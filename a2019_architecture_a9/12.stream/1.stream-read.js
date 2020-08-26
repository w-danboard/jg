// 1.拷贝功能 读取一点 写入一点 控制用户的可用内存

// 我可以指定读取的个数 自动将数据读出来， 将读出来的数据自己调用写的方法

// 核心模块 stream  文件流 fs模块 继承stream模块

let fs = require('fs');
let path = require('path');
// rs是可读流对象 可用用基于事件的方式来得到数据  异步解决方案 回调函数
// 参数一般不用设置
// let rs = fs.createReadStream(path.resolve(__dirname,'1.txt'),{
let ReadStream  = require('./ReadStream');
let rs = new ReadStream(path.resolve(__dirname,'1.txt'),{
    flags:'r', // r代表的是读取 fs.open()
    highWaterMark: 2, // 以字节为单位的  64k 64*1024
    start:0,
    // end: 5, // 包前包后
    autoClose:true
    // fs.read(fd,buffer,0,length,offset)  emit('data')
    // fs.close()  emit('end')
});

// 每次读取到的结果
// Buffer.concat
let arr = [];
rs.on('open',function (fd) { // 读预读取 第一次的数据 
    console.log('open',fd);
})
rs.on('data',function (data) { //考虑数据是二进制文件 图片
    arr.push(data);
    console.log('----data');
    rs.pause(); // 暂停触发data事件
});

setInterval(() => {
    rs.resume(); // 恢复的是data事件的触发
}, 1000);
rs.on('end',function () {
    console.log(Buffer.concat(arr).toString())
})
rs.on('close',function () {
    console.log('文件关闭')
});
rs.on('error',function (error) {
    console.log(error)
});
// 控制文件流的速率
// on('data') on('end')
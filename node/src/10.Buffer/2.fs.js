let fs = require('fs');

// fs 所有的方法 都有两个 同步和异步的
// 读取的时候 不加编码 默认是utf8类型
// let b = fs.readFileSync('./name.txt');

// readFile 只能读取比较小的文件 如果文件特别大 可能会导致内存溢出 直接报错
// 64k以下的文件 都可以使用 readFile  读特别大的文件就用流的操作 流就是读一点消耗一点
// 如果文件不存在 会创建文件 写的时候 会默认清空文件
fs.readFile('./name1.txt', 'utf8', (err, data) => {
    if (err) return console.log(err)
    fs.writeFile('./name1.txt', data, function(err) {
      console.log('拷贝成功')  
    })
});

// 读取一点 暂停 接着读取
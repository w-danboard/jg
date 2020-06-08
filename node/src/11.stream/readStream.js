// 为了实现文件的操作 fs

// fs 它内部实现了流
let fs = require('fs');
let rs = fs.createReadStream('./name.txt');
console.log(rs)

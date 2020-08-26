let str = require('./a'); // 同步方法

// 使用require语法默认会读取a.js文件


let fs = require('fs');
let path = require('path');
// 1.fs  fileSystem 文件读取
// 2.path 路径处理
// __dirname文件外函数的参数 当前的文件所在目录

// 如果带/ 的 直接使用join 如果用resolve来解析带/的 会回到根路径
let absPath = path.resolve(__dirname,'a.js','/');
let join = path.join(__dirname, 'a.js','/');

// 这里可以采用绝对路径 来读取文件 
let str = fs.readFileSync(path.resolve(__dirname,'a.js'),'utf8');
 console.log(str);

 // fs中的方法一般都是同步方法和异步方法同事存在 existsSync exits
let flag = fs.existsSync(path.resolve(__dirname, 'a.js'));
console.log(flag)

console.log(path.extname('a.js'));
console.log(path.basename('a.js','.js'))


// 让一个字符串执行 new Function eval  vm 虚拟机模块 

let vm = require('vm');
// 沙箱环境 干净的执行环境 让字符串执行
let a = 1;
vm.runInThisContext('console.log(a)')

// path join resolve basename extname
// fs readFileSync fs.exits
// vm runInThisContext
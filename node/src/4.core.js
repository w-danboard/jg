// fs path vm 这些模块都是node中的核心模块
// vscode中 run code 读的永远是跟目录的文件

let fs = require('fs');
let path = require('path');

// 解析 给一个相对路径 解析成一个绝对路径 /Users/wanglin/Desktop/jg/node/src/name.txt
// __dirname 当前的路径
console.log(path.resolve(__dirname, './name.txt'))
// 如果想后面加/要使用join
console.log(path.join(__dirname, './name.txt', '/'))

let r = fs.readFileSync('./name.txt', 'utf8');
console.log(r);

// path 还有取扩展名 或出掉某些字符的剩余字符
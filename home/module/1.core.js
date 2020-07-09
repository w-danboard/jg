const fs = require('fs')
const path = require('path')

// 所有的方法基本上都是同步方法或者一部方法
// 如果刚刚运行程序，此时我们希望很快拿到结果，可以去使用同步的
// 开启一个服务，监听客户端访问，就需要使用异步了（为啥用异步，如果100个人访问这个服务器，第一个人要一个a文件，你去读，什么时候读完什么时候反回去，再处理第二个人的 就阻塞了）

// console.log(fs.readFileSync('./name.txt', 'utf8')) // utf8中文编码

// 操作文件时，尽量使用绝对路径来进行操作
// 绝对路径能确定文件位子
// 获取当前的目录 process.cwd() 是可变的，在哪执行就是哪
// __dirname 不变的 当前文件所在的文件夹
// console.log(fs.readFileSync(path.resolve(__dirname, './name.txt')))

fs.existsSync(path.resolve(__dirname, './name.txt')) // 当前文件是否存在 异步废弃了
// console.log(path.extname('a.main.js')) // 取扩展名

// 虚拟机模块 (沙箱) 干净的环境 测试用例 每条用例测试的时候 都不受其他的影响
// 内部一般情况下 操作的都是字符串逻辑，如何让一个字符创来运行

// eval默认会取当前的作用域下的变量，不干净的环境
const a = 100;
// eval('console.log(a)')
let fn = new Function('console.log(a)') // 可以使用new Function()创建一个沙箱环境，让字符串执行
fn()

// 模板引擎的实现原理  with语法 +  字符串拼接 + new Function来实现
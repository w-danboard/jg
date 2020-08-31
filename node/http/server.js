// node中的核心模块 http可以快速的创建一个web服务

const http = require('http')
const url = require('url')

// req => request 客户端的所有信息
// res => response 可以给客户端写入数据
const server = http.createServer((req, res) => {
  // 请求的方法
  // console.log(req.method) // 方法名字

  // requst 是一个可读流
  const arr = []
  req.on('data', function (chunk) { // 必须有请求体 内部才会解析触发data事件
    arr.push(chunk)
    console.log('chunk:', chunk )
  })
  req.on('end', function () { // 请求发送过来后 一定会触发end事件
    let str = Buffer.concat(arr).toString() // 图片不可以这样用
    console.log(str, 'str')
    console.log('end')
  })

  // 进行处理url pathname query
  let { pathname, query } = url.parse(req.url, true)
  // console.log(pathname, query)
  // console.log(url.parse(req.url, true))    // 请求路径 【true是把query变成一个对象】
  // console.log(req.httpVersion)
  // console.log(req.headers) // 获取时，所有的headers都是小写的

  // 可写流 write end 可写流的方法
  res.statusCode = '222' // 设置状态码
  res.statusMessage = 'my known' // 设置消息

  res.setHeader('a', 1) // 给浏览器设置自定义响应头
  res.setHeader('Content-Type', 'text/html;charset=utf8') // 设置响应头 是html 编码是utf8

  res.end('你好')
  // res.write('ok') // write after end 表示文件已经关闭 但是又进行了写入操作
})

// listen是一个订阅模式，等会开启后会粗发对应的回调
let port = 3000
server.listen(port, () => {
  console.log('server start', port)
})

// events模块 node中基本上所有的模块都继承与eventEmitter
server.on('error', err => {
  if (err.errno === 'EADDRINUSE') {
    server.listen(++port) // 端口号被占用自动重启
  }
})
// nodemon node monitor 可以监视自动重启 自动打包 [pm2]
// 需要实现文件变化后自动重新运行
const http = require('http')
const url = require('url')
const path = require('path')
const fs = require('fs')

class Server {
  // node不支持es7语法 比如箭头函数 如果非要使用可以使用babel-node进行转义
  handleRequest (req, res) {
    // 如果不使用bind，this就是当前http.createServer的实例，所以需要bind一下
    console.log(this, 'this====>')
  }
  start (...args) {
    // 尽量代码不要嵌套 bind原理就是产生一个新的函数
    const server = http.createServer(this.handleRequest.bind(this))
    server.listen(...args)
  }
}

const port = 3000
const server = new Server()

server.start(port, () => {
  console.log('server start' + port)
})
const http = require('http')
const url = require('url')
const path = require('path')
const fs = require('fs')

// 创建一个服务
const server = http.createServer((req, res) => {
  const { pathname } = url.parse(req.url)
  console.log(pathname)
})

const port = 3000
server.listen(port, () => {
  console.log('启动服务:', port)
})
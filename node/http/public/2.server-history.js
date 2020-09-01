const http = require('http')
const url = require('url')
const path = require('path')
const fs = require('fs')

// 创建一个服务
const server = http.createServer((req, res) => {
  const { pathname } = url.parse(req.url)
  // 有路径 / 需要用到join
  const filePath = path.join(__dirname, pathname)

  // 处理请求是单线程 [代码尽量采用异步的 否则会阻塞主线程]
  // 先判断文件是否存在 fs.access fs.stat

  // 默认情况下 我希望 如果直接访问public路径 可以访问index.html文件
  fs.stat(filePath, (err, statObj) => {
    if (err) {
      res.end('Not Found')
    } else {
      // 判断是否是文件
      if (statObj.isFile()) {
        fs.createReadStream(filePath).pipe(res)
      } else {
        let file = path.join(filePath, 'index.html')
        fs.stat(file, (err, statObj) => {
          if (err) {
            res.end('Not Found')
          } else {
            fs.createReadStream(file).pipe(res)
          }
        })
      }
    }
  })
  
  // fs.readFile(filePath, (err, data) => {
  //   console.log(err, 'err')
  //   res.end(data)
  // })
})

const port = 3000
server.listen(port, () => {
  console.log('启动服务:', port)
})
// --------------core--------------
const http = require('http')
const fs = require('fs').promises
const { createReadStream, createWriteStream, readFileSync } = require('fs')
const path = require('path')
const url = require('url')

// --------------------------------
const ejs = require('ejs') // 服务端读取目录进行渲染
const debug = require('debug')('server')
const mime = require('mime')
const chalk = require('chalk')

const template = readFileSync(path.resolve(__dirname, 'template.ejs'), 'utf8')

debug(chalk.blackBright('-----------------------hello')) // 根据环境变量来进行打印 process.env.DEBUG

class Server {
  constructor (config) {
    this.port = config.port
    this.directory = config.directory
    this.host = config.host
    this.template = template
  }
  async handleRequest (req, res) {
    // 让this指向server实例
    let { pathname } = url.parse(req.url) // 不考虑传递参数问题
    pathname = decodeURIComponent(pathname) // 将中文进行依次转义

    // 通过路径找到这个文件返回
    const filePath = path.join(this.directory, pathname)
    
    // 判断文件是否存在
    try {
      let statObj = await fs.stat(filePath)
      if (statObj.isFile()) {
        // 如果是文件
        this.sendFile(req, res, filePath, statObj)
      } else {
        // 如果是文件夹，文件夹会先尝试找index.html
        let concatFilePath = path.join(filePath, 'index1.html')
        // 再次判断文件是否存在
        try {
          // 如果存在html
          let statObj = await fs.stat(concatFilePath)
          this.sendFile(req, res, concatFilePath, statObj)
        } catch (e) {
          // 不存在html 需列出目录结构
          this.showList(req, res, filePath, statObj, pathname)
        }
      }
    } catch (e) {
      this.sendError(req, res, e)
    }

  }
  async showList (req, res, filePath, statObj, pathname) {
    // 读取目录包含的信息
    let dirs = await fs.readdir(filePath)
    debug(chalk.red(dirs, '需要渲染的列表'))
    // 渲染列表
    try {
      // 异步渲染
      const parseObj = dirs.map(item => {
        return {
          dir: item,
          href: path.join(pathname, item) // 路径是用自己的路径 拼接当前url的
        }
      })
      const r = await ejs.render(this.template, { dirs: parseObj }, { async: true })
      res.setHeader('Content-Type', 'text/html;charset=utf-8')
      res.end(r)
    } catch (e) {
      this.sendError(req, res)
    }
  }
  sendFile (req, res, filePath, statObj) {
    /**
     * createReadStream
     * 创建一个可读流(返回的是可读流对象)，这个方法默认并不会读取内容
     * 
     * filePath: 参数 [指的是要读取的是哪个文件]
     * 第二个参数是一个对象: 做一些配置相关的东西
     */
    /**
     * pipe
     * 可读流.pipe(可写流)
     * 1. 异步
     * 2. 可以实现 读一点写一点
     */
    // 读取文件 进行响应
    res.setHeader('Content-Type', mime.getType(filePath)+';charset=utf-8')
    createReadStream(filePath).pipe(res)
  }
  // 用来处理错误信息
  sendError (req, res, e) {
    debug(e)
    res.statusCode = 404
    res.end('Not Foud')
  }
  start () {
    const server = http.createServer(this.handleRequest.bind(this))
    server.listen(this.port, this.host, () => {
      console.log(chalk.yellow(`Starting up danboard-http-server, serving ${this.directory}\r\n`))
      console.log(chalk.green(`http://${this.host}:${this.port}`))
    })
  }
}

module.exports = Server
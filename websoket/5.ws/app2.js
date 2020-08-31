/**
 * 请求头
 * GET ws://localhost:9999/ HTTP/1.1
 * Host: localhost: 9999
 * Connection: Upgrade  【升级】
 * Sec-WebSocket-Version: 13 [版本]
 * Sec-WebSocket-Key: O/SidTn2Th7GfsD07IxrwQ==  【key】
 */

 /**
  * 响应头
  * HTTP/1.1 101 Switching Protocols
  * Upgrade: websocket
  * Connection: Upgrade
  * Sec-WebSocket-Accept: eUk7JFP/uuM/FTI51JQx2Eb3HaE=
  */

 let express = require('express')
 let app = express()
 // http://localhost:8000
 app.use(express.static(__dirname))
 app.listen(8000)

  let net = require('net')
  let server = net.createServer(function (socket) {
    // once 来自于EventEmitter on once  【执行一次就销毁了】
    socket.once('data', function (data) {
      data = data.toString()
      if (data.match(/Connection: Upgrade/)) {
        let rows = data.split('\r\n')
        rows = rows.slice(1, -2)
        let headers = {}
        headers = rows.reduce((memo, item) => {
          let [key, value] = item.split(': ')
          memo[key] = value
        },headers)
        console.log(headers)
      }
    })
  })

  server.listen(9999)
const net = require('net')

let server = net.createServer((socket) => { // socket是一个输入流 也是一个输出流
  socket.on('data', function(data) {
    console.log(data)
  })
})

server.listen({
  host: 'localhost',
  port: 8360
})
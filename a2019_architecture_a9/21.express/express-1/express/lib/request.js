const http = require('http');
var req = Object.create(http.IncomingMessage.prototype)
// 导出是客户端请求的一个流  push


// 这里只能扩展方法 
module.exports = req;

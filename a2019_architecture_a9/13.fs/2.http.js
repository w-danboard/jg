// tcp/ip协议族 整个的所有协议

// 协议会分层 iso 七层模型
// tcp特点 安全 可靠（三次握手 4次断开） 不会丢数据 如果数据丢失   分段
// 应用层  http、ftp、dns 基于传输层 新增了 很多报文

// http报文分类 请求行 报文  请求头报文  请求体报文

// 服务器收到客户端发来的请求，会根据当前的请求信息 返回最终的结果

// curl -V http://www.baidu.com

// /user  get  /user?id=1 get
// /user  post  
// /user  put
// /user  delete
// Restful风格 对接口操作的一种风格
// 请求方法 get(获取资源) post(新增资源) put(上传文件) delete options(跨域请求的时候 非简单请求时才会出现 (get和post 都是简单请求 + 自定的头信息))
// 状态码: 1xx 2xx 3xx 4xx 5xx  
    // 1xx websocket
    // 2xx 200 (成功 ) 204 (没有响应体) 206(分段传输)
    // 3xx 301 永久重定向  302临时重定向 304 （缓存服务端）  （306 307)
    // 4xx 400 参数错误 401 没权限 403没有权限访问 404 找不到 405方法不允许 
    // 500 服务端错误 502 负载均衡问题

const http = require('http');
const url = require('url'); // 专门用来解析url路径的
// 使用http模块 1.创建请求 2.接受请求
const querystring = require('querystring');


// url路径 几部分组成？
let str = 'http://username:password@www.baiud.com:80/source?query=1#app';
console.log(url.parse(str,true)); // pathname query

let server = http.createServer(function(req,res) { // 当请求到来时会执行此方法
    // node中http 单线程 尽量采用异步,否则会阻塞运行，尽量不要使用cpu密集型操作
    // req客户端
    // res服务端
    // 很多数据 get请求 带参数 /a?a=1
    let {pathname,query} = url.parse(req.url,true);
    let httpVersion = req.httpVersion;
    let method = req.method.toLowerCase();
    // 请求行-----------------------------------
    let headers = req.headers; // 所有的header信息都是小写的 对象类型

    // -------请求体 --- 可读流
    // curl -X POST  / POSTMAN
    let arr = [];
    req.on('data',function (chunk) { // tcp 分段 保证有请求数据 才能获取
        arr.push(chunk);
    });
    req.on('end',function () { // this.push(null)
        console.log(req.headers);
        // 'content-type': 'application/x-www-form-urlencoded' 如果你发的数据 a=1&b=2 表单
        // 'content-type': 'application/json' 
        let content = Buffer.concat(arr).toString();  // a=1&b=2 
        if(req.headers['content-type'] === 'application/x-www-form-urlencoded'){
            content = querystring.parse(content);
        }else if(req.headers['content-type'] === 'application/json'){
            content = JSON.parse(content);
        }
        res.statusCode = 404; // 但是必须要合法
        res.setHeader('a','1');
        res.setHeader('b','2');
        res.setHeader('Content-Type','text/plain;charset=utf-8'); // 实体头
        res.end('结束');
    })
});
let port = 3000;
server.listen(port,function () {
    console.log('server start ' + port)
});
server.on('error',function (err) {
    if(err.errno === 'EADDRINUSE'){ // 如果端口号被占用了 直接重新报监听新的端口号即可
        server.listen(++port)
    }
});
// 一个服务器 只能有一个对应的使用的端口   address already in use :::3000

// 每次更改服务端代码都需要重新启动服务器
// nodemon 可以实现代码重启功能 。可以指定 哪个文件变化了 可以自动重启
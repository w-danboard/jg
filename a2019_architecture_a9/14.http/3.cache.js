// 缓存 后端设置前端缓存 和缓存的有效期

const http = require('http');
const url = require('url'); // {pathname,query}
const fs = require('fs').promises;
const {createReadStream} = require('fs')
const path = require('path');
const mime=  require('mime');

// 我希望可以通过async  + await 来处理请求
// es7 

class Server {
    async handleRequest(req,res){ // 主要保证方法中的this 永远指向server
        let {pathname,query} = url.parse(req.url,true);
        let absPath = path.join(__dirname,pathname);
        try{
            let statObj = await fs.stat(absPath);
            if(statObj.isDirectory()){
                absPath = path.join(absPath,'index.html');
                await fs.access(absPath)
            }
            this.sendFile(req,res,absPath,statObj);
        }catch(e){
            this.sendError(req,res);
        }
    }
    sendFile(req,res,absPath,statObj){
        // 多次访问服务器 会不停的读取文件返回, 如果 连续访问我 可以做缓存
        // 1.强制缓存 像max-age 多少秒内不要在访问我了  200, 只对当前文件引用的资源生效，不对首页生效
        // 10s内 访问相同的资源不要在访问我了
        //res.setHeader('Expires',new Date(Date.now() + 10000).toGMTString());
        // 设置缓存时间10s
        //res.setHeader('Cache-Control','max-age=10'); // 状态码还是200
        res.setHeader('Cache-Control','no-cache'); // 每次都像服务端发起请求
        // res.setHeader('Cache-Control','no-store'); // 不缓存

 
        // 设置对比缓存  最后的修改时间
        let lastModified = statObj.ctime.toGMTString();
        console.log(req.headers)
        let ifModifiedSince = req.headers['if-modified-since'];
        res.setHeader('Last-Modified',lastModified)

        if(ifModifiedSince == lastModified){ // 可能以秒为单位不够准确 ，最后修改时间变了 但是文件没变
            res.statusCode = 304;
            res.end(); // 走缓存
            return
        }
        // 根据文件内容 做对比缓存
        // 服务端会先根据文件内容 产生一个唯一的标识 ，下次访问时代上标识来比对

        res.setHeader('Content-Type',mime.getType(absPath)+';charset=utf8');
        createReadStream(absPath).pipe(res);

        // disk cache memory-cache
    }
    sendError(req,res){
        res.statusCode = 404;
        res.end(`Not Found`)
    }
    start(){
        // 1.解决this可以通过箭头函数的方式
        // 2.可以绑定this指向 返回一个绑定后的函数，参数会传递给真正的函数
        const server = http.createServer(this.handleRequest.bind(this));
        server.listen(...arguments)
    }
}
let server = new Server();
server.start(3000,function () {
    console.log('server start 3000')
});





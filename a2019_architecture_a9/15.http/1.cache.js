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
    async sendFile(req,res,absPath,statObj){
      
        res.setHeader('Cache-Control','no-cache');


        // etag要根据文件内容生成 
        let data = await fs.readFile(absPath);
        let crypto = require('crypto');
        let Etag =crypto.createHash('md5').update(data).digest('base64'); // 一个文件的简称  摘要



        res.setHeader('Etag',Etag);
        let ifNoneMatch = req.headers['if-none-match'];

        if(ifNoneMatch==Etag){
            res.statusCode = 304;
            res.end();
        }
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


// 304 last-modified if-modified-since
//     etag          if-none-match
// 打包 <!--make by 2019 12 26-->

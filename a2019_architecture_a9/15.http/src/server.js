// 缓存 后端设置前端缓存 和缓存的有效期

const http = require('http');
const url = require('url'); // {pathname,query}
const fs = require('fs').promises;
const {createReadStream,readFileSync} = require('fs')
const path = require('path');
const mime=  require('mime');
const ejs = require('ejs');

// 我希望可以通过async  + await 来处理请求
// es7 
let template = readFileSync(path.resolve(__dirname,'template.html'),'utf8');
class Server {
    constructor(config){
        this.config = config;
        this.template = template;
    }
    async handleRequest(req,res){ // 主要保证方法中的this 永远指向server
        

        let {pathname,query} = url.parse(req.url,true);
        let absPath = path.join(this.config.directory,decodeURIComponent(pathname));
        console.log(absPath)
        try{
            let statObj = await fs.stat(absPath);
            if(statObj.isDirectory()){
                let home = 'index.html';
                absPath = path.join(absPath,home);
                // 如果absPath不存在 需要列出当前的文件夹下的目录
                try{
                    await fs.access(absPath)
                }catch{
                    // 读取文件夹中的目录 显示给客户端
                    let currentDir = absPath.slice(0,-home.length); // 处理目录 减去html
                    let dirs = await fs.readdir(currentDir); //读取当前目录下的内容

                    // ssr 模板引擎  ejs <%=%> <%%>  include ...
                    let processPathName = pathname === '/'?'':pathname
                    let templateStr = ejs.render(this.template,{dirs,parent:processPathName});
                    res.setHeader('Content-Type','text/html;charset=utf8');
                    return res.end(templateStr);
                }
            }
            this.sendFile(req,res,absPath,statObj);
        }catch(e){
            this.sendError(req,res);
        }
    }
    cache(req,res,absPath,statObj){
        // 1.设置强制缓存 和对比缓存
        res.setHeader('Expires',new Date(Date.now() + 10000).toGMTString());
        res.setHeader('Cache-Control','max-age=10');
        let etag = statObj.size + '';
        let ctime = statObj.ctime.toGMTString();
        res.setHeader('Etag',etag);
        res.setHeader('Last-Modified',ctime);
        
        let clientIfNoneMatch = req.headers['if-none-match'];
        let clientIfModifiedSince = req.headers['if-modified-since'];
        let flag = true;
        // etag 每个koa express 生成的方式都不一样
        if(clientIfNoneMatch !== etag ){
            return false;
        }
        if(clientIfModifiedSince !== ctime){
            return false;
        }
        return flag;
    }
    gzip(req,res,absPath,statObj){ 
        // Accept-Encoding: gzip, deflate, br
        let encoding = req.headers['accept-encoding'];
        let zlib = require('zlib');
        if(encoding.includes('gzip')){
            res.setHeader('Content-Encoding','gzip');
            console.log('gzip')
            return zlib.createGzip()
        }else if(encoding.includes('deflate')){
            res.setHeader('Content-Encoding','deflate')
            return zlib.createDeflate()
        }
        return false;
    }
    async sendFile(req,res,absPath,statObj){
        // 制作缓存  http 压缩
        if(this.cache(req,res,absPath,statObj)){
            res.statusCode = 304
           return res.end();
        }
        // 如果没缓存 希望将文件压缩后返回
        res.setHeader('Content-Type',mime.getType(absPath)+';charset=utf8');
        let zip = this.gzip(req,res,absPath,statObj);
        if(zip){ // 如果支持默认返回就是一个压缩流
            return  createReadStream(absPath).pipe(zip).pipe(res);
        }
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



// 304 last-modified if-modified-since
//     etag          if-none-match
// 打包 <!--make by 2019 12 26-->

module.exports = Server


// 302 临时重定向


// 服务器 Content-Encoding: gzip
// 客户端 Accept-Encoding: gzip, deflate, br

// 压缩 转化流 回调的写法


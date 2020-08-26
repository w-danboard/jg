const http = require('http');
const url = require('url'); // {pathname,query}
const fs = require('fs');
const path = require('path');
const mime=  require('mime');

let server = http.createServer();

server.on('request',function (req,res) {
    // 路由的概念 根据不同的路径 返回不同的结果
    let {pathname,query} = url.parse(req.url,true);
    // 实现一个静态服务 http://localhost:8080/
    let absFilePath = path.join(__dirname,pathname);

    fs.stat(absFilePath,function (err,statObj) {
        if(err){ // 文件不存在
            res.statusCode = 404;
            return res.end('Not Found');
        }
        // 直接访问的是一个文件 ，还有可能访问的是一个目录 ，如果是目录 我需要找到目录下index.html
        if(statObj.isDirectory()){ // localhost：8080/   index.html
            absFilePath = path.join(absFilePath,'index.html');
            fs.access(absFilePath,function (err) {
                if(err){
                    res.statusCode = 404;
                    return res.end('Not Found');
                }else{
                    res.setHeader('Content-Type','text/html;charset=utf8')
                    fs.createReadStream(absFilePath).pipe(res);
                }
            })
        }else{
            // webpack getType  lookup
            res.setHeader('Content-Type',mime.getType(absFilePath)+';charset=utf8');
            fs.createReadStream(absFilePath).pipe(res);
            // fs.readFile(absFilePath,function(err,data){
            //     res.end(data)
            // })
        }
    });
    // async + await 
});

server.listen(8080,function () {
    console.log('server start 8080');
})
const http = require('http');
const path = require('path');
const fs = require('fs');
const url = require('url');
const whiteList = [
    'b.zf.cn:3000'
]
const server = http.createServer((req, res) => {
    // 只针对图片类型进行单独防盗链处理
    console.log(req.headers.referer)
    const {
        pathname,
        query
    } = url.parse(req.url, true);
    const absPath = path.join(__dirname, pathname);
    console.log(absPath);
    fs.stat(absPath,function(err, statObj) {
        if (err) {
            console.log(err);
            res.statusCode = 404;
            res.end('Not found');
            return
        }
        if (statObj.isFile()) {
            // 图片肯定有后缀名 png jpg
            
            if(/(\.png)|(\.jpg)/.test(absPath)){
                // 先看有没有referer
                // Referrer 还是 Referer
                let referer = req.headers['referrer'] ||req.headers['referer'];
                console.log(referer,29)
                if(referer){
                    // 需要获取到用户的referer 和 当前自己的host域名 比对
                    let hostname = req.headers.host;
                    referer = url.parse(referer).host; // 爬虫 refer + user-agent
                    if(hostname !== referer && !whiteList.includes(referer)){ // 如果不一样应该是盗用了本服务下的图片
                        let errorFile = path.join(__dirname,'images/error.jpg') 
                        return fs.createReadStream(errorFile).pipe(res);
                    }
                }
            }
            fs.createReadStream(absPath).pipe(res);
        } else {
            res.statusCode = 404;
            res.end('Not found');
            return
        }
    })
});

server.listen(3000);
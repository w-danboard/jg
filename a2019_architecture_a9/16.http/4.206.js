const http = require('http');
const fs = require('fs');
const path = require('path');
let file = path.resolve(__dirname,'test.txt')
let total = fs.statSync(file).size;
console.log(total)
http.createServer((req,res)=>{
    // 获取他有没有range字段   Range:bytes=0-3
    // Content-Range: bytes 0-3/2381
    let range = req.headers['range'];
    console.log(range)
    if(range){
        let [,start=0,end=total] = range.match(/(\d*)-(\d*)/);
        res.setHeader('Content-Range',`bytes ${start}-${end}/${total}`);
        fs.createReadStream(file,{
            start:Number(start),
            end:Number(end)
        }).pipe(res);
    }else{
        fs.createReadStream(file).pipe(res);
    }
}).listen(3000);

// 希望自己写一个客户端 (记录下载的位置) 每次哪3个字节 把文件下载下来
// 用我们自己的客户端来发请求
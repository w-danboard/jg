const http = require('http');
const fs = require('fs');
// 爬虫  post 请求体
// 监听用户输入 p 暂停 
let flowing = true;

process.stdin.on('data',function (chunk) {
    if(chunk.toString().includes('p')){
        flowing  = false;
    }else{
        if(!flowing){
            flowing = true;
            download()
        }
    }
})
let ws = fs.createWriteStream('./download.txt')
// get方法只能发送get请求 
// request 可以发送任何类型的请求
let start = 0;
function download(){
    let end = start + 5;
    http.get({
        host:'localhost',
        port:3000,
        method:'get',
        headers:{
            Range: `bytes=${start}-${end-1}`
        }
    },function (res) {
        let total = res.headers['content-range'].split('/')[1]
        res.on('data',function (chunk) {
            ws.write(chunk);
            if(total > end  && flowing){
                setTimeout(() => {
                    start += 5;
                    download()
                }, 1000);
            }else{
                ws.end(); //把文件关闭掉
            }
        })
    });
}
download();
// client.end()

// 头 
// 1.内容类型 content-type application/json application/x-www-form-urlencoded
// 2.ajax跨域头 Access-Control-Allow
// 3.304缓存 Cache-Control/expires  last-modified if-modified-since if-none-match etag
// 4.压缩 Accept-encoding  
// 5.语言头 Accept-language
// 6.referer host Location
// 7.下载头 附件  Content-Disposition:attachment;filename=测试.xlsx"
// 8.405 方法不允许
// 9.User-Agent

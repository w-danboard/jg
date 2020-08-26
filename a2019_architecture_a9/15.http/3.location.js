const http = require('http');

const server = http.createServer((req,res)=>{
    // 我想判断当前浏览器内核 如果是手机端 我就跳转到zf
    if(req.headers['user-agent'].includes('iPhone')){
        res.setHeader('Location','http://www.zhufengpeixun.cn');
    }else{
        res.setHeader('Location','http://www.baidu.com');
    }
    console.log(req.headers['user-agent'])
    res.statusCode = 302;
    res.end();
    // pc 就去百度
});
// redirect

server.listen(8000);
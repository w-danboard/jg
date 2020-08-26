let http = require('http');
let fs = require('fs');
// puppeteer
http.get({
    host:'a.zf.cn',
    path:'/images/1.jpg',
    port:3000,
    headers:{ // referer是可以篡改的
        'referer':'http://a.zf.cn:3000'
    }
},function (res) { // res是服务端响应的结果

    res.pipe(fs.createWriteStream('2.jpg'))
    // let arr = [];
    // res.on('data',function (chunk) {
    //     console.log(chunk.toString())
    //     arr.push(chunk);
    // });
    // res.on('end',function () {
    //     let buffer = Buffer.concat(arr);
    //     fs.writeFileSync('2.jpg',buffer);
    // })
})
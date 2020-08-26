const http = require('http');
// 服务器 得有一个名字 作为cookie的名字  set(key,value)
const querystring = require('querystring');
const uuid = require('uuid');
let cardName = `connect.sid`;
let session = {}; // session 就是一个普通对象
http.createServer(function (req,res) {
    if(req.url === '/visit'){
        let cookieObj = querystring.parse(req.headers.cookie,'; ','=');
        // cookie对象 用户的所有的cookie
        let cardId = cookieObj[cardName]
        if(cardId && session[cardId]){ // 有卡 并且当前也能查找到记录
            session[cardId].money -= 10;
            res.end(`money ${session[cardId].money}`);
        }else{
            let cardId = uuid.v4(); // 产生唯一的当前的卡号
            res.setHeader('Set-Cookie',`${cardName}=${cardId}`); // 卡号应该签名 防止客户端篡改
            session[cardId] = {money:500}
            res.end('money 500');
        }
        // setCookie getCookie
    }else{
        res.end(`Not found`);
    }
    // 如果浏览器不支持cookie 隐藏表单 url来做
}).listen(3000);
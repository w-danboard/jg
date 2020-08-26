// localStorage,sessionStorage,session,cookie
// 存储滚动条位置 localStorage大小5M

// cookie 用来做凭证信息 http 无状态的

const http = require('http');
const querystring = require('querystring');
const crypto = require('crypto');
const sign = (value) =>{
    const secret = 'hello zf'
    return  crypto.createHmac('sha256',secret).update(value+'').digest('base64').replace(/\+|\=|\//g,'')
}
http.createServer((req, res) => {
    req.getCookie = function (key,options={}) {
        
        let queryObj = querystring.parse(req.headers['cookie'], '; ');
        if(!queryObj[key]){
            return null;
        }
        let [value,s] = queryObj[key].split('.')
        console.log(options)
        if(options.signd){ // 要校验签名
            if(sign(value) === s){
                return value
            }else{
                return null;
            }
        }
        return value
    }
    let arr = [];
    res.setCookie = function (key, value, options = {}) {
        let args = [];
        if (options.domain) {
            args.push(`domain=${options.domain}`);
        }
        if(options.path){
            args.push(`path=${path}`);
        }
        if(options.httpOnly){
            args.push(`httpOnly=${options.httpOnly}`);
        }
        if(options.maxAge){
            args.push(`max-age=${options.maxAge}`);
        }
        if(options.signd){
            // 需要增加签名
            value = value + '.' +sign(value);
            console.log(value)
        }
        arr.push(`${key}=${value}; ${args.join('; ')}`)
        res.setHeader('Set-Cookie', arr);
    }

    if (req.url === '/read') {
        // name=zf; age=9  => name=zf&age=9
        res.end(req.getCookie('age',{signd:true}))
    }
    if (req.url === '/write') {
        // domain 域名设置 cookie也是不能跨域的 父子共享 www.baidu.com music
        // domain 
        // path  目的减少请求时所带的信息    header 不能超过4k cookie的大小不能超过4k
        // expires max-age
        // http-only
        res.setCookie('name', 'zf', { domain: 'a.zf.cn' });
        res.setCookie('age', 9, { httpOnly: true, maxAge: 100 });
        // res.setHeader('Set-Cookie',['name=zf; domain=a.zf.cn; max-age=5','age=9; domain=a.zf.cn; path=/; httpOnly=true']);
        res.end();
    }
    if(req.url.includes('/visit')){
        console.log(req.url)
        let cookie = req.getCookie('visit',{signd:true});
        if(!cookie){
            res.setCookie('visit',1,{signd:true});// 增加签名
            res.end('first visit')
        }else{
            res.setCookie('visit',cookie-0+1,{signd:true});
            res.end(`${cookie-0+1}`+' visit')
        }

    }
}).listen(3000);

// cookie签名 =》 jwt 主要依赖的也是签名  koa-router koa-views koa2 -e 生成脚手架
// express

// /visit/%E4%BD%A0%E5%88%B0%E5%A5%BD
console.log(Buffer.from('你好'))
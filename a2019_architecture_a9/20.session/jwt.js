const Koa = require('koa');

const app = new Koa();
const jwt = require('jwt-simple');
const bodyparser = require('koa-bodyparser');
const Router = require('koa-router');
const secret = 'zfpx'
const router = new Router();
// base64 crpto
// 写登录 给用户派发一个token
let myjwt = {
    escape(content){
        return content.replace(/\=/g,'').replace(/\+/g,'-').replace(/\//g,'_')
    },
    toBase64Url(content){
        let base64 = this.escape(Buffer.from(content).toString('base64'));
        return base64
    },
    sign(content,secret){
        let hmac = require('crypto').createHmac('sha256',secret).update(content).digest('base64');

       return this.escape(hmac)
    },
    encode(content,secret){
        let header = this.toBase64Url(JSON.stringify({ "typ": "JWT", "alg": "HS256" }))
        content = this.toBase64Url(JSON.stringify(content));
        let sign = this.sign(header+'.'+content,secret); // 加盐算法 crpto

        return header+'.' + content+'.' + sign
    },
    unscape(str){// 3* 8 = > 6 * 4
        str += new Array(5 - str.length % 4).join('=');
        return str.replace(/\-/g, '+').replace(/_/g, '/');
    },
    decode(token,secret){
        let [header,content,sign] = token.split('.');

        let newSign = this.sign(header+'.'+content,secret);
        if(sign !== newSign){ // 你的签名是可以的 否则说明信息被改过 
            throw new Error('签名被篡改了')
        }else{
            let r = JSON.parse(Buffer.from(this.unscape(content),'base64').toString())
            if(r.expires === '当前时间'){

            }
        }
    }   
}
//  + /= eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InpmcHgifQ.ArRYOcStjJRbrc3y4M8FHHUrXwucxloVOx05ROKsrnU

// eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InpmcHgifQ.ArRYOcStjJRbrc3y4M8FHHUrXwucxloVOx05ROKsrnU
app.use(bodyparser())
router.post('/login',async (ctx,next)=>{
    let {username,password} = ctx.request.body;
    if(username === password){
        let token = myjwt.encode({username,expire:new Date(Date.now() + 10000).toGMTString()},secret);
        ctx.body = {
            data:{
                username
            },
            token
        }
    }else{
        ctx.body = {
            data:'登录异常',
            err:1
        }
    }
});
// localStorage.setItem('token')
router.get('/validate',async (ctx,next)=>{
    let token = ctx.get('authorization');
    try{
        // r = content
       let r =  myjwt.decode(token,secret);

       ctx.body = {
           data:r,
           token:'' // 续命  新token 在重新延长过期时间
       } 
    }catch(e){  
        ctx.body = {
            data:'秘钥不正确',
            err:1
        }
    }
})

app.use(router.routes());

app.listen(3000);
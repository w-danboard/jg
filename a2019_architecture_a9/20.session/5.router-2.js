const Koa = require('koa');
const Router = require('koa-router');
let app = new Koa();
let user = new Router();
let article = new Router();
let all = new Router();
user.get('/add',(ctx,next)=>{
    ctx.body = 'add'
})
user.get('/remove',(ctx,next)=>{
    ctx.body = 'remove';
    throw new Error('err');
})
article.get('/add',(ctx,next)=>{
    ctx.body = 'art add'
})
article.get('/remove',(ctx,next)=>{
    ctx.body = 'art remove'
})
all.use('/user',user.routes());
all.use('/article',article.routes());
app.use(all.routes());
app.listen(3000);
app.on('error',function (err,ctx) {
    ctx.res.end('error'); // 只能自己重新定义错误 不能通过ctx.body 去更改错误
    // console.log('err','------------------')
})

// npm install koa-generator
// koa2 -e 
// 二级路由 路由拆分

const Koa = require('koa');
const Router = require('koa-router');
let app = new Koa();
let user = new Router();
let article = new Router();
// /user/add   /user/remove
// /article/add  /article/remove
//  前缀的方式来增加 命名空间
user.prefix('/user');
user.get('/add',(ctx,next)=>{
    ctx.body = 'add'
})
user.get('/remove',(ctx,next)=>{
    ctx.body = 'remove'
})

article.get('/add',(ctx,next)=>{
    ctx.body = 'art add'
})
article.get('/remove',(ctx,next)=>{
    ctx.body = 'art remove'
})
app.use(user.routes());
app.use(article.routes());
app.listen(3000);

// koa @koa/multer koa-bodyparser 

const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();

app.use(async (ctx,next)=>{
    ctx.body = 'hello';
    await next();
})
app.use(async ctx=>{
    await new Promise((resolve,reject)=>{
        setTimeout(() => {
            resolve();
        }, 1000);
    })
    ctx.body = 'end'
})
// 路由 映射关系 接口 访问不同的路径返回不同的资源 方法 restful 风格
app.listen(3000);
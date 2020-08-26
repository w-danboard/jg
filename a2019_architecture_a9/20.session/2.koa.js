// koa @koa/multer koa-bodyparser 

const Koa = require('koa');
const Router = require('./koa-router');
const app = new Koa();
// 管理系统 ssr ejs + 服务端数据渲染 
const router = new Router();
router.get('/',async (ctx,next)=>{
    ctx.body = 'home1'
    await next();
})
router.get('/',async (ctx,next)=>{
    ctx.body = 'home2';
    await next();
})
router.get('/page',async (ctx,next)=>{
    ctx.body = 'page';
    await next();
})
app.use(router.routes());
app.use(async ctx=>{
    ctx.body = 'end'
})
// 路由 映射关系 接口 访问不同的路径返回不同的资源 方法 restful 风格
app.listen(3000);
const Koa = require('koa');
const fs = require('fs');
const path = require('path');
// 当用户访问 /form 显示一个html   get
// 在输入框中可以提交数据 /form    post
const static = require('./plugins/koa-static')
const bodyparser = require('./plugins/bodyparser'); // 第三方插件 都是一个函数，返回的是一个中间件
let app = new Koa();
app.use(bodyparser()); // 插件的特点 可以给ctx 增加一些属性 ctx.xx next()
app.use(static(__dirname));
app.use(static(path.resolve(__dirname,'../')));
// 中间可以做权限校验，可以绝对是否向下执行
app.use(async (ctx, next) => {
    if (ctx.path === '/form' && ctx.method === 'GET') {
        ctx.set('Content-Type', 'text/html;charset=utf-8')
        ctx.body = fs.createReadStream(path.resolve(__dirname, 'index.html'))
    } else {
       await next();
    }
})
// koa里面所有的异步逻辑都要变成promise的形式
app.use(async (ctx, next) => {
    if (ctx.path === '/form' && ctx.method === 'POST') {
        ctx.body = ctx.request.body
    }
});
// 静态文件服务中间件
app.listen(3000);
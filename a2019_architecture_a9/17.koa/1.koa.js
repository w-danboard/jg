const Koa = require('./koa');
const fs = require('fs');
// 需要先实例化一个Koa的实例
const app = new Koa();
// middleware 中间件  
// context 上下文  (req,res原生的,request,response koa自己封装的对象基于req,res来封装的) => context
app.use(function (ctx) { // 请求到来时执行的函数
    console.log(ctx.req.url); // pathname
    console.log(ctx.request.req.url);
    // 中转 通过自己的request上的req属性，可以重新扩展属性

    console.log(ctx.request.url);
    console.log(ctx.path,'---'); // ctx.url = ctx.request.url
    //throw new Error('error')

    //ctx.body = 'hello world'
    // 返回字符串 数字 流 对象
    // ctx.body = 'hello world1';
    // ctx.body = 'hello world2';
    // ctx.body = 'hello world3';
    // ctx.body = 'hello world4';
    ctx.body = undefined
    console.log(ctx.response.body)
});
// vm.xxxx  => vm.$data.xxxx

app.listen(3000,function () {
    console.log('server start 3000');
});
// 监控错误
app.on('error',function (err) {
    console.log(err,'------------');
});
// koa的核心 有 use方法 ctx方法核心
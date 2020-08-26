const Koa = require('./koa');
const sleep = (time)=>{
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            console.log('睡觉')
            resolve();
        }, time);
    })
}
const app = new Koa();
// koa 中需要等待 一定要加await  next前一定要加await
app.use(async function (ctx,next) { // 中间件如果不是promise 最终内部也会包装成promise
    console.log(1)
    let start = Date.now();
    await next(); // 只是执行函数 函数是同步执行的
    let end = Date.now() - start;
    console.log('time:'+end);
    console.log(2)
})
app.use(function (ctx,next) { // 此函数是同步执行 如果执行出错直接抛出异常即可
    console.log(3)
    // throw new Error('err'); 
    return next(); // 
    console.log(4)
})
app.use(async function (ctx,next) {
    console.log(5)
    await sleep(2000);
    next();
    console.log(6);
})
app.on('error',function (e) {
    console.log(e)
})
app.listen(3000);




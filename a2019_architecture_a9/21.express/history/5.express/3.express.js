// 可以使用别人的插件 
const express = require('./express');
let app = express();
// cookie path 路径以他为开头就可以匹配到
app.use('/',function (req,res,next) {
    console.log(1);
    // next()
    next('中间件'); // 如果回调函数如何处理错误 fs.readFile  function(err)
})
app.use(function (req,res,next) {
    console.log(2);
    next()
})
app.use('/a',function (req,res,next) {
    console.log(3);
    next()
});
app.get('/',function (req,res,next) {
    // next('出错--路由')
})
app.get('/',function (req,res,next) { // 中间件一般放在路由的前面 方便扩展属性,可以做权限处理
    res.end('home')
}) 
app.use(function(err,req,res,next){
    console.log(err)
})
app.listen(3000);
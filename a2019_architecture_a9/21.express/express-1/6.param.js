const express = require('./express');

const app = express();

// express 内置了模板引擎



// 静态文件中间件 
app.use(express.static(__dirname))
app.use(express.static(require('path').resolve(__dirname,'../')))
// 发布订阅

// {id:[fn,fn],name:[fn,fn]}
app.param('id',function (req,res,next,value,key) {// value永远是 200
    setTimeout(() => {
        console.log('id1');
        next()
    }, 1000);
})
app.param('id',function (req,res,next,value,key) { // value永远是 200
    console.log('id2');
    next()
})
app.param('name',function (req,res,next,value,key) {
    console.log('name1');
    next()
})
app.param('name',function (req,res,next,value,key) {
    console.log('nam2');
    next();
}); 
app.get('/user/:id/:name',function (req,res,next) {
    // koa返回文件 流
    // 中间件
    res.send('hello');
   console.log(req.path,req.query)
})

app.listen(3000);
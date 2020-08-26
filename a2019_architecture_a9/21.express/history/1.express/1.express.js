const express = require('express');
// express 是一个函数

let app = express(); // createApplication

// koa koa-router 根据不同的方法 返回不同的内容结构

app.get('/',function (req,res) {
    res.end('home');
});


// app.all('*',function (req,res) {
//     res.end('*');
// })
app.listen(3000);
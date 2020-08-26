const express = require('express');
const app = express();
// express 内置了模板引擎
app.set('view engine','html'); // 会自动ejs后缀
app.set('views','views1')
app.engine('html',require('ejs').__express); // ejs.renderFile
app.get('/',function (req,res,next) { // 和koa 一模一样
    res.render('index',{name:'zf'});
})

app.listen(3000);

// 默认支持cookie的设置 res.setCookie()


// vue + koa
// react + express
// http
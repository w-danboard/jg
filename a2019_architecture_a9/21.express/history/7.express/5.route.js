// 实现路由划分 根据模块来划分路由  prefix

const express = require('./express');

const app = express();



app.get('/',function (req,res,next) {
    res.end('ok')
})
// const user = require('./routes/user')
// const article = require('./routes/article')

// app.use('/user',user)
// app.use('/user',article)

app.listen(3000);

// 路径参数 express的中间件
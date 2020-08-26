const express = require('./express');

const app = express();

app.post('/',function (req,res,next) {
    console.log(1);
    next(); // express 内部 要提供一个next函数
},function (req,res,next) {
    console.log(11);
    next(); // express 内部 要提供一个next函数
},function (req,res,next) {
    console.log(111);
    next(); // express 内部 要提供一个next函数
})
app.get('/',function (req,res,next) {
   res.end('haha')
})
app.post('/a',function (req,res,next) {
    res.end('ok111')
})
app.listen(3000);



// app.route('/xxx').get(function () {
    
// }).post(function (params) {
    
// }).delete(function (params) {
    
// }).put(function (params) {
    
// })
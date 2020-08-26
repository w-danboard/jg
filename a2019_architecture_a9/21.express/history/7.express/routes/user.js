let express = require('express')

let user = express.Router(); // 将构造函数 当成类 和 函数去使用

user.get('/add',function (req,res) {
    console.log(req.url);

    res.end('user add');
})

user.get('/remove',function (req,res) {
    res.end('user remove');
})

module.exports = user;
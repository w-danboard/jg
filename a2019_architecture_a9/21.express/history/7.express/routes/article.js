let express = require('express')
let article = express.Router(); // 将构造函数 当成类 和 函数去使用

article.get('/add',function (req,res) {
    res.end('article add');
})
article.get('/remove',function (req,res) {
    res.end('article remove');
})
article.get('/test',function (req,res) {
    res.end('article test');
})

module.exports = article;



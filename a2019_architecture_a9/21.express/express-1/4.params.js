// vue react angular  /user/:id/:name  => /user/1/2
// => {id:1,name:2}


const express = require('./express');

const app = express();

app.get('/user/:id/:name',function (req,res) {
    res.end(JSON.stringify(req.params))
})

app.listen(3000);
//  ?: 匹er\/ ([^配不捕获
// /^\/us\/]+?)    \/(?:([^\/]+?))\/a\/?$/i
// 将配置的字符串 转化成正则
// const pathToRegExp = require('path-to-regexp');
// let configUrl = '/user/:id/:name/a';  
// let realPath = '/user/1/2/a'
// let keys = [];
// let reg = pathToRegExp(configUrl,keys);

// let [,...others] = realPath.match(reg)
// console.log(others,keys);



// source
// let configUrl = '/user/:id/:name/a';  
// let realPath = '/user/1/2/a'
// // [id,name]
// let obj = {}
// let keys = [];
// let regStr = configUrl.replace(/:([^\/]+)/g,function () {
//     keys.push(arguments[1]);
//     return '([^\/]+)'
// })
// let [,...others] = realPath.match(new RegExp(regStr))
// console.log(others)
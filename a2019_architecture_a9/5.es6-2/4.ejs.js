// 模板引擎 ejs handlerbar nunjunks unsderscore jade

let ejs = require('ejs');
let fs = require('fs');
let html = fs.readFileSync('./index.html','utf8');


function render(html,obj){
    return html.replace(/<%=(.+?)%>/g,function () {
        return obj[arguments[1]]
    })
}
let r = ejs.render(html,{arr:[1,2,3]});

 console.log(r);


// 实现一个es6 模板字符
// 原生字符串拼接 问题：不能换行
// let name = 'zf';
// let age = 10
// // let str = name+'今年'+age+'岁了'；
// let str = "${name}今年岁了}";
// // ([^}]+)
// str = str.replace(/\$\{([^{]+)\}/g,function () {
//     return eval(arguments[1])
// })
// console.log(str);
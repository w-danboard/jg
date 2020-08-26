let fs = require('fs');

let template = fs.readFileSync('./index.html','utf8');

function render(template,renderObj){
    let head = "let str ='' \r\n with(obj){ \r\nstr =`"
    template = template.replace(/<%=(.+?)%>/g,function () {
        return '${'+arguments[1]+'}'
    })
    let content = template.replace(/<%(.+?)%>/g,function () {
        return '`\r\n'+arguments[1] +'\r\nstr+=`';
    });
    let tail = '`\r\n} \r\n return str'
    return new Function('obj',head + content + tail)(renderObj);
}
let r = render(template,{arr:[1,2,3]});
console.log(r);

// reduce 方法
// call bind apply原理
// 函数柯里化 
// arrow fn
// 浏览器的事件环
// node 核心 核心应用 node中的模块 自己实现一个commonjs规范
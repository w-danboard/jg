// 实现自定义的模板引擎
const path = require('path');
const fs = require('fs');


const renderFile = (filepath, obj, cb) => {
  fs.readFile(filepath, 'utf8', (err, html) => {
    if (err) {
      return cb(err, html)
    }
    // html = html.replace(/\{\{([^}]+)\}\}/g, function() {
    //   let key = arguments[1].trim()
    //   return obj[key]
    // })
    let head = `let str = '';\r\n with(obj){\r\n`;
    head += 'str+=`'
    html = html.replace(/\{\%([^%]+)\%\}/g, function() {
      return '`\r\n'+arguments[1]+'\r\nstr+=`\r\n'
    })
    let tail = '`}\r\n return str;'
    let fn = new Function('obj', head + html + tail)
    console.log(fn({arr: [1,2,3]}))
    cb(null, head + html + tail)
  })
}

renderFile(path.resolve(__dirname, 'template.html'), {name: 'zf', age: '12', arr: [1, 2, 3]}, (err, data) => {
  console.log(err, data)
})
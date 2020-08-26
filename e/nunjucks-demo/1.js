let nunjucks = require('nunjucks')
nunjucks.configure({ autoescape: true }) // 自动转义
let result = nunjucks.renderString(
  `hello {{name}}`, {name: 'wanglin'}
)
console.log(result)
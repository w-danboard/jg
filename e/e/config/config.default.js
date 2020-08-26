// cookie session 加密cookie 服务器把cookie发送给客户端之后，为了防止客户端篡改，就需要是指一个密码，
// exports.keys = 'danboard'
/**
 * 中间件和插件的区别是什么？
 *  中间件是什么时候用的？ 是在请求到来的时候 在真正处理之前执行一段逻辑
 *  插件 是扩展了egg.js的一些功能 比如能让egg.js渲染nunjucks模板
 */

module.exports = app => {
  let config = {}
  // 配置加密的key 用来加密cookie
  config.keys = app.name+'danboard' // 或者加时间戳
  // 配置视图的 view
  config.view = {
    // 默认的扩展名 当你渲染一个文件 但是没有指定扩展名 而又找不到这个文件，就会尝试添加.html
    defaultExtension: '.html',
    // 如果某个扩展名的模板文件没有在mapping里配置，那么就会用这个默认的模板引擎进行渲染
    defaultViewEngine: 'nunjucks',
    // 如果要渲染的模板是以.html结尾的话，就会用nunjucks模板引擎渲染
    mapping: {
      '.html': 'nunjucks'
    }
  }
  return config
}
// let app = express(); let app = new Koa();
// 在express里有静态文件中间件的概念
/**
 * 
 * @param {Object} app 应用本身 
 */
module.exports = (app) => {
  /**
   * 1. 从app中结构路由和控制器 new Router()的实例 [controller = { news: new NewsController }]
   * 2. 定义一个路由规则，当客户端通过get方式访问/news的时候，会由index函数来返回
   */
  const { router, controller } = app;
  router.get('/news', controller.news.index)
}
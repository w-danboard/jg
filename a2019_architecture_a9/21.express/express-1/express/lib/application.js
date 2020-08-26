// 创建应用 和 应用的分离
// 实现路由和应用的分离
let Router = require('./router');
let http = require('http');
let methods = require('methods');
let init = require('./middlewares/init');
let query = require('./middlewares/query');
let request = require('./request');
let response = require('./response');
function Application(){
    this.request = request;
    this.response = response; // 当前应用上 有request、response
}
Application.prototype.lazy_route = function () {
    if(!this._router){
        this._router = new Router();
        //  内部初始化一个中间件
        this._router.use(init(this)); // 初始化中间件 并且把app传入
        this._router.use(query(this));
    }
}
methods.forEach(method=>{
    Application.prototype[method] = function (path,...handlers) {
        this.lazy_route();
        this._router[method](path,handlers)
    }
})
Application.prototype.use = function (path,handler) {
    this.lazy_route();
    this._router.use(path,handler); // 应用让路由去处理中间件逻辑
}
Application.prototype.listen = function () {
    let server = http.createServer((req,res)=>{
        this.lazy_route();
        function done(){
            res.end(`Cannot ${req.method} ${req.url}`)
        }   
        this._router.handle(req,res,done);
    });
    server.listen(...arguments);
}
Application.prototype.param = function (key,callback) {
    this.lazy_route();
    this._router.param(key,callback); // 让路由实现订阅的操作
}

module.exports = Application
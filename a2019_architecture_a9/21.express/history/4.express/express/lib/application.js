// 创建应用 和 应用的分离
// 实现路由和应用的分离
let Router = require('./router');
let http = require('http');
let methods = require('methods');

function Application(){
   
}
Application.prototype.lazy_route = function () {
    if(!this._router){
        this._router = new Router();
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

module.exports = Application
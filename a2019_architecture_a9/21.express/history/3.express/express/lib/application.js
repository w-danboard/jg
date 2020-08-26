// 创建应用 和 应用的分离
// 实现路由和应用的分离
let Router = require('./router');
let http = require('http');
// express 中使用了一个模块 ,methods
let methods = require('methods');
function Application(){
    this._router = new Router
    // [
    //     {path:'*',method:'all',handler:(req,res)=>{
    //         res.end(`Cannot ${req.method} ${req.url}`)
    //     }}
    // ]; // 路由系统 维护路径和处理函数的映射表
}
methods.forEach(method=>{
    Application.prototype[method] = function (path,...handlers) {
        this._router[method](path,handlers)
        // this._router.push({
        //     method:'get',
        //     path,
        //     handler
        // })
    }
})

Application.prototype.listen = function () {
    let server = http.createServer((req,res)=>{
        function done(){
            res.end(`Cannot ${req.method} ${req.url}`)
        }   
        this._router.handle(req,res,done);// 让路由处理匹配
        // 获取用户请求的路径
        // let {pathname} = url.parse(req.url,true);
        // let requestMethod = req.method.toLowerCase();
        // for(let i = 1; i < this._router.length; i++){
        //     let {method,path,handler} = this._router[i];
        //     if(pathname === path && requestMethod === method){
        //         return handler(req,res); // 找到后就停止执行
        //     }
        // }
        // // 执行默认的 逻辑 找不到
        // return this._router[0].handler(req,res);
    });
    server.listen(...arguments);
}

module.exports = Application
const url = require('url');
const Layer = require('./layer');
const Route = require('./route');
const methods = require('methods')
function Router() {
    this.stack = [];
}
Router.prototype.route = function (path) {
    let route = new Route();
    let layer = new Layer(path,route.dispatch.bind(route)); // 保证dispatch中的this永远指向route
    // 外层layer 里存的是dispatch 内层里存的不是dispatch 是用户的函数 ，为了保持一致
    layer.route = route; // 每个路由都有一个route属性
    this.stack.push(layer);
    return route;
}

Router.prototype.use = function (path,handler){
    if(typeof path == 'function'){ // 默认设置 中间件的path属性
        handler = path;
        path = '/';
    }
    let layer = new Layer(path,handler);
    layer.route = undefined; // 如何区分中间件还是路由 通过route属性
    this.stack.push(layer);
}
methods.forEach(method=>{
    Router.prototype[method] = function (path, handlers) {
        // 1.我需要先产生一个route
        // 2.产生一个layer layer上要有一个route属性  new Layer(path,route.dispatch)
        // 3.将用户的传递的函数 交给route来处理
        let route = this.route(path);
        route[method](handlers); // 将用户写的handler 传递给route 让route放到自己的stack中 
        // this.stack.push({
        //     path,
        //     handler,
        //     method: 'get'
        // })
    }
})

Router.prototype.handle = function (req, res,done) {
    let {
        pathname
    } = url.parse(req.url);
    let requestMethod = req.method.toLowerCase();

    // this.stack = []; 迭代栈中的每一层
    let idx = 0
    let next = ()=>{
        if(this.stack.length === idx) return done();
        let layer = this.stack[idx++];


        // 需要针对中间件 和 路由做出不同的处理 
        if(layer.match(pathname)){ // 无论中间件还是路由都要匹配路径
            if(layer.route){ // 并且是路由
                if( layer.route.handle_method(requestMethod)){ // 而且方法也ok 就执行
                    layer.handle_request(req,res,next);
                }else{ // 方法不存在则继续迭代
                    next();
                }
            }else{ // 中间件直接执行
                layer.handle_request(req,res,next);
            }
        }else{
            next();
        }


        // 如果是路由除了判断路径 还是需要判断方法的
        // if(layer.match(pathname) && layer.route.handle_method(requestMethod)){
        //     // 路径匹配到后 交给当前route来处理，route内部会默认执行第一个，就是用户定义的函数
        //     layer.handle_request(req,res,next);
        //     // layer.handler(req,res,next); // 这个handler 就是dispatch
        // }else{
        //     next();
        // }
    };
    next();
}


module.exports = Router;
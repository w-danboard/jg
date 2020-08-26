const url = require('url');
const Layer = require('./layer');
const Route = require('./route');
const methods = require('methods')
// 一个类如果返回一个对象 或者函数

function Router() {
    // 继承this指向问题
    let router =  (req,res,next)=>{ // 请求到来时会执行此函数
        router.handle(req,res,next); // 内部会从当前层中依次取出
    }
    // this谁调用this就是谁 和定义的地方没关系 
    router.stack = []; // stack  我定义给了 router 
    router.__proto__ = proto; // 通过链的方式连接到原来的方法
    return router
}
let proto = {}
proto.route = function (path) {
    let route = new Route();
    let layer = new Layer(path, route.dispatch.bind(route)); // 保证dispatch中的this永远指向route
    // 外层layer 里存的是dispatch 内层里存的不是dispatch 是用户的函数 ，为了保持一致
    layer.route = route; // 每个路由都有一个route属性
    this.stack.push(layer);
    return route;
}

proto.use = function (path, handler) {
    if (typeof path == 'function') { // 默认设置 中间件的path属性
        handler = path;
        path = '/';
    }
    let layer = new Layer(path, handler);
    // layer.route = undefined; // 如何区分中间件还是路由 通过route属性
    this.stack.push(layer);
}
methods.forEach(method => {
    proto[method] = function (path, handlers) {
        if(!Array.isArray(handlers)) handlers = Array.from(arguments).slice(1);
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

proto.handle = function (req, res, done) {
    let {
        pathname
    } = url.parse(req.url);
    let requestMethod = req.method.toLowerCase();

    // this.stack = []; 迭代栈中的每一层
    let idx = 0
    let removed = ''
    let next = (err) => { // 这里来统一处理错误
        if (this.stack.length === idx) return done();
        let layer = this.stack[idx++];
        if(removed.length){ // n级路由
            req.url = removed+req.url;
            removed =''
        }
        if (err) { // 需要找错误处理中间件
            
            if (layer.match(pathname) ) { // 先要判断路径是否匹配
                if(!layer.route && layer.handler.length === 4){ // 错误中间件
                    layer.handler(err,req,res,next);
                }else{
                    next(err)
                }
            }else{
                next(err);
            }
        } else {
            // 需要针对中间件 和 路由做出不同的处理 
            // /user/1/2  layer.reg
            if (layer.match(pathname)) { // 无论中间件还是路由都要匹配路径
                if (layer.route) { // 并且是路由
                    if (layer.route.handle_method(requestMethod)) { // 而且方法也ok 就执行
                        req.params = layer.params
                        layer.handle_request(req, res, next);
                    } else { // 方法不存在则继续迭代
                        next();
                    }
                } else { // 中间件直接执行
                    if(layer.handler.length != 4){
                         // 错误中间件 这场情况下 不需要错误
                         // 如果是中间件 需要把中间件的路径 从url上移除掉
                         // /user/add   /
                         if(layer.path !== '/'){ // 如果中间件不是/的话 进到内部时 需要减掉中间件的路径
                            removed = layer.path;
                            req.url = req.url.slice(removed.length);
                         }
                         layer.handle_request(req, res, next);
                    }else{
                        next();
                    }
                }
            } else {
                next();
            }
        }


    };
    next();
}


module.exports = Router;
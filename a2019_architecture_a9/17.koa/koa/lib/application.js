console.log('my')
const EventEmitter = require('events');
const http = require('http');
const request = require('./request'); // koa自己封装的请求相关的属性/方法 
const Stream = require('stream')
const response = require('./response'); // koa自己封装的响应相关的
const context = require('./context'); // 上下文对象
// 当前 Application 就是我们Koa的类
module.exports = class Application extends EventEmitter {
    constructor() {
        super();
        this.middlewares = [];
        // 创建一个实例 这个实例指向request的原型 让this.request.__proto__ = 创建一个实例
        this.request = Object.create(request);
        this.response = Object.create(response);
        this.context = Object.create(context);
    }
    use(middleware) { // 把n个函数组合起来  compose []
        this.middlewares.push(middleware)
    }
    createContext(req, res) {
        // 创建上下文的关系了
        // 这里创建上下文  需要每一次请求都是独立的
        let request = Object.create(this.request);
        let response = Object.create(this.response);
        let context = Object.create(this.context);
        // ctx.request.req.url
        context.request = request; // 自己封装的request
        context.response = response;
        context.res = response.res = res;
        context.req = request.req = req; // 原生的req
        return context;
    }
    compose(ctx){ // 要组合当前所有的中间件 
        // 异步逻辑迭代
        // let i = 0;
        let index = -1
        const dispatch = (i) =>{
            if (i <= index) return Promise.reject(new Error('next() called multiple times'))
            index = i
            if(i === this.middlewares.length){
                return Promise.resolve();
            }
            let middleware = this.middlewares[i];
            try{ // 函数同步执行 需要加 try catch捕获
                return Promise.resolve(middleware(ctx,()=>dispatch(i+1)));
            }catch(e){ // 如果直接报错 需要返回一个失败的promise
                return Promise.reject(e);
            }
        }
        return dispatch(0);
    }
    handleRequest(req, res) { // 此方法 用来处理请求
        // 我需要将req 和 res 生成一个新的对象 叫context,在扩展两个属性 request,response
        let ctx = this.createContext(req, res);
        res.statusCode = 404; // 默认是404

        // 组合 将数组中的方法都组合起来 组合成一个promise
        this.compose(ctx).then(() => {
            //this.middleware(ctx); // 这个函数执行完毕用户默认会给body赋值,赋值后会将404 变成200
            let body = ctx.body; // 取到最终的结果响应给客户端
            if (typeof body === 'string' || Buffer.isBuffer(body)) {
                res.end(body);
                // fs.createReadStream()  Stream
            } else if (body instanceof Stream) {
                body.pipe(res);
            } else if (typeof body === 'object') {
                res.end(JSON.stringify(body))
            } else if (typeof body === 'number') {
                res.end(body + '');
            } else if (body == null && res.statusCode !== 404 ) {
                res.end('404')
            } else {
                res.end(`Not Found`);
            }
        }).catch((e)=> {
            this.emit('error',e);
            res.statusCode = 500;
            res.end('internal server error')
        })


    }
    listen() {
        let server = http.createServer(this.handleRequest.bind(this));

        server.listen(...arguments)
    }
}
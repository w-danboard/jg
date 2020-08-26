const http = require('http');
const url = require('url');

function createApplication(){
    let _router = [
        {path:'*',method:'all',handler:(req,res)=>{
            res.end(`Cannot ${req.method} ${req.url}`)
        }}
    ]; // 路由系统 维护路径和处理函数的映射表
    return {
        get(path,handler){
            _router.push({
                method:'get',
                path,
                handler
            })
        },  
        listen(){
            let server = http.createServer((req,res)=>{
                // 获取用户请求的路径
                let {pathname} = url.parse(req.url,true);
                let requestMethod = req.method.toLowerCase();
                for(let i = 1; i < _router.length; i++){
                    let {method,path,handler} = _router[i];
                    if(pathname === path && requestMethod === method){
                        return handler(req,res); // 找到后就停止执行
                    }
                }
                // 执行默认的 逻辑 找不到
                return _router[0].handler(req,res);
            });
            server.listen(...arguments);
        }
    }
}
// express函数
module.exports = createApplication;
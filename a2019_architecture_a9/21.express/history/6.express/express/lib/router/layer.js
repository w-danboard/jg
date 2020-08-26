const pathToRegExp = require('path-to-regexp')

function Layer(path, handler) {
    this.path = path;
    this.handler = handler;
    this.keys = [];
    this.reg = pathToRegExp(this.path,this.keys);
}
Layer.prototype.match = function (pathname) {
    let match = pathname.match(this.reg); // [源字符串,1,2]
    if(match){ // 请求路径 和 配置的参数路径 是可以匹配到的
        let [,...others] = match;
        this.params = {}; // req.params
        this.keys.forEach((key,index)=>{ // [{name:id},{name:'name'}]
            this.params[key.name] = others[index];
        })
        return true;
    }
    if (!this.route) { // 中间件
        if (this.path === '/') { // 路径以/开头 严格相等 以路径相同开头也是ok的
            return true;
        }
        // /user/a   /user/a
        return pathname.startsWith(this.path + '/')
    }
    return pathname === this.path
}
Layer.prototype.handle_request = function (req, res, next) {
    this.handler(req, res, next);
}
module.exports = Layer;

// 二级路由

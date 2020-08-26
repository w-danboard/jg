function Layer(path,handler){
    this.path = path;
    this.handler = handler
}
Layer.prototype.match = function (pathname) {
    if(!this.route){ // 中间件
        if(this.path === '/'){ // 路径以/开头 严格相等 以路径相同开头也是ok的
            return true;
        }
        // /user/a   /user/a
        return pathname.startsWith(this.path+'/')
    }
    return pathname === this.path
}
Layer.prototype.handle_request = function (req,res,next) {
    this.handler(req,res,next);
}
module.exports = Layer;
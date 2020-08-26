const url = require('url');
let request = {
    get url(){
        // ctx.request
        return this.req.url
    },
    get path(){
        return url.parse(this.req.url).pathname
    }
}
module.exports = request

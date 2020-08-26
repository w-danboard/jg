const url = require('url');
module.exports = function (app) {
    return function (req,res,next) {
        let {pathname,query } = url.parse(req.url,true);
        req.query = query;
        req.path = pathname;
        next();
    }
}
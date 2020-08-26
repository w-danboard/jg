const http = require('http');
const path = require('path');
const fs = require('fs');
var res = Object.create(http.ServerResponse.prototype)
// proto = {}
// router.__proto__ = proto
res.send = function (value) {
    if(typeof value === 'object'){
        this.end(JSON.stringify(value));
    }else {
        this.end(value);
    }
}
res.sendFile = function (filename,{root}) {
    let currentPath  =root+filename;
    fs.readFile(path.join(root,filename), (err,data)=> {
        this.end(data);
    })
}
module.exports = res
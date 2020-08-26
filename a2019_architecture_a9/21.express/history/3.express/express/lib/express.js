const http = require('http');
const url = require('url');
const Application = require('./application')
// 分配职责 类的方式 来分开管理 高内聚 低耦合
// 1.createApplication 创建应用
// 2.路由系统
// 3.应用系统
function createApplication(){ // 创建应用
    return new Application; // 创建应用的实例
}
// express函数
module.exports = createApplication;

// 构造函数优点
// 用起来和原生的语法一模一样

// 字符串 哈希值
// const redis = require('redis');
// 默认端口号是6379 可以直接操作数据库
// let conn = redis.createClient({port:6379});



// redis.print = function(err,result){console.log(result)}

// 字符串
// conn.set('name','zfpx', redis.print);
// conn.get('name',redis.print);

// 对象
// conn.hset('person','name1','zfpx',redis.print);
// conn.hset('person','age1','10',redis.print);

// conn.hkeys('person',function (err,keys) {
//     console.log(keys);
//     keys.forEach(key=>{
//         conn.hget('person',key,redis.print);
//     })
// })

// zadd sadd

// redis 支持批量操作 如果内部有失败 不影响 其他结果
// conn.multi().set('x',1).set('y',1).exec(redis.print)

// 发布订阅
// 第一个人
// conn.on('message',function (channel,data) {
//     conn.del(data,redis.print)
// })
// conn.subscribe('a');

// 第二个人
// let conn2 = redis.createClient({port:6379});
// conn2.publish('a','name');


var redis = require("redis");
var sub = redis.createClient()

sub.on("message", function (channel, message) {
    console.log("sub channel " + channel + ": " + message);
});
sub.subscribe("a nice channel");

// redis  mongo 
// pm2 webpack vue
// 2周 vue 源码剖析 -> 完整版本的vue  vuex vue-router vue3 
// compositonAPI TS + VUE
// react 

// 组件库 文档部分 树 表格 穿梭框 滚动插件 ... 发布 文档 轮播图 日历
// vue项目 koa+mongo + vue全家桶
// uni-app   electron


// 设置权限
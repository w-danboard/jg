// node 核心模块 crypto  功能是用来摘要 加密的

const crypto  = require('crypto');
const fs = require('fs');
// 摘要算法 不叫加密 md5 不可逆
// 根据文件内容 摘要对应的结果 ，每次内容不一样摘要出来的结果完全不一样

// 不管内容有少 ，摘要出的结果 永远长度相同,相同的内容多次摘要的结果肯定相同


let r = crypto.createHash('md5').update('123456').digest('base64');
r = crypto.createHash('md5').update('123456').digest('base64');

let data1 = fs.readFileSync('index.html').slice(0,50);
let data2 = fs.readFileSync('index.html').slice(50);
let result = crypto.createHash('md5').update(data1).update(data2).digest('base64');
// 可以进行指纹认证
console.log(result);

// 如果密码用md5 存储 可能会导致 加（盐）算法

// 登录校验  http是无状态的  // jwt传递给客户端的值是可靠的
let r1 = crypto.createHmac('sha256','zf1').update('1234').digest('base64');
console.log(r1);
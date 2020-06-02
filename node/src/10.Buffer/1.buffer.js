// buffer 代表的是内存
// buffer一旦声明后 不能随便更改大小
// buffer 比较像数组里 存放着很多个16进制

// let buffer = Buffer.alloc(5); // 在node中最小单位 字节 安全的 默认会清空
// buffer = Buffer.allocUnsafe(5);  // 一般不会用 这样声明的Buffer是随机的
// console.log(buffer);

// -------------------------------------------------

// Buffer可以和字符串相互转换

// let buf = Buffer.from('珠峰'); // node中只认utf8  不是这个格式的话 可以使用其他的编码库进行转码

// console.log(Buffer.isBuffer(buf))

/**
 * alloc 根据长度声明buffer
 * from 可以用字符串来声明buffer
 * isBuffer 是不是buffer
 * 具备着数组的常用方法 forEach
 * toString()
 * concat
 * 前端给服务器端发数据 分片 分段 把很多数据拼在一起
 */

//  let r = Buffer.from([22]); // 可以通过数组方式声明

// ----------------------------------------------------------

let buf1 = Buffer.from('珠');
let buf2 = Buffer.from('峰');

// let bigBuffer = Buffer.alloc(6); // 数据合拼
console.log(Buffer.concat([buf1, buf1, buf2, buf2], 6).toString())

/**
 * @param targetBuffer 目标buffer 
 * @param targetStart  目标的开始 
 * @param sourceStart
 * @param sourceEnd
 */

 // copyd的原理
// Buffer.prototype.copy = function(targetBuffer, targetStart, sourceStart = 0, sourceEnd = this.length) {
//   for(let i = 0; i < sourceEnd - sourceStart; i++) {
//     targetBuffer[targetStart + i] = this[i]
//   }
// }

// buf1.copy(bigBuffer, 0, 0, 3)
// buf2.copy(bigBuffer, buf1.length, 0, 3) // copy 特点就是把当前的buffer一次循环到目标上

// console.log(bigBuffer.toString())


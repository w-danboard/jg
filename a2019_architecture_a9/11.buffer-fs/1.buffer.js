// 存储二进制文件  0 1 最大每个位中不能超过1
// 一个字节几个位 8个bit位组成

// 汉字 几个字节组成  gbk 2个字节 node默认不支持gbk编码 
// utf8 一个汉字 3个字节

// 一个汉字 3个字节 24个位  buffer 是将2进制转换成16进制 只是短而已

// 进制转化 2进制 8进制 16进制 10进制

// 2进制转成10进制
let sum = 0;
for(let i = 0 ; i< 8;i++){
    sum +=  Math.pow(2, i)
}
console.log(sum); // 我们可以把任意进制转换成十进制  当前位的值 * 当前进制^所在的第几位 累加

// 255  对应的 16进制 ff  规则就是当前要转换的进制取余

// 默认我们不需要自己转换

// 将任意进制转换成10进制
console.log(parseInt('111', 2));
// 将任意进制转换成任意进制 转换出来的是字符串

console.log((0x16).toString(10)); // base64编码

// buffer中存的是16进制 内存 内存在声明的时候要指定长度 单位中数字 都是字节单位
// 1数字  2字符串  3数组的方式来声明

let buffer = Buffer.alloc(10);
console.log(buffer); // 长得像数组

let buffer1 = Buffer.from('珠峰'); // node utf8  toString()
console.log(buffer1);

let buffer2 = Buffer.from([0xe7,0x8f,0xa0]);
console.log(buffer2);

console.log(buffer2.toString('utf8')); // 可以和字符串任意转换

// 读取文件 可能要操作内存 http


// 进制转换实现的 base64  加密算法  汉字举例 3 * 8 = 4 * 6
let buf = Buffer.from('珠');
console.log(buf.toString('base64'))
console.log(0xe7.toString(2));
console.log(0x8f.toString(2));
console.log(0xa0.toString(2));
// 00111001   00111000  00111110  00100000   一般转换成base64后会比原内容 大1/3 
// 小图标 icon 可以替换所有的url  不需要发送http请求


console.log(parseInt('00111001',2))
console.log(parseInt('00111000',2))
console.log(parseInt('00111110',2))
console.log(parseInt('00100000',2))
// 57 56 62 32

// base64的编码是公开课
let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
str += str.toLocaleLowerCase();
str+= '0123456789+/';
console.log(str[57] + str[56] + str[62] + str[32]); // cookie

// 通过编码可以解决问题 



// 1.buffer的声明方式 3种 长度 数字 数组  buffer不能增大
// 数组 索引 循环  slice

let buffer = Buffer.from('珠峰');
// buffer.forEach(item=>console.log(item));
let newBuffer = buffer.slice(0,3);
newBuffer[0] = 100;
console.log(buffer.length);
console.log(Buffer.isBuffer(buffer));

// toString 可以将buffer转换成字符串  length 可以获取字节的个数  Buffer.isBuffer
let buf1 = Buffer.from('珠');
let buf2 = Buffer.from('峰');
Buffer.prototype.copy = function (target,targetStart,sourceStart=0,sourceEnd=this.length) {
    for (let i = sourceStart; i < sourceEnd ;i++){
        target[targetStart + i] = this[i]
    }
}
let buff3 =Buffer.from('珠峰培训');
buf1.copy(buff3,3);
buf2.copy(buff3,6);
console.log(buff3.toString());

Buffer.concat = function (bufferList,bufferLength=bufferList.reduce((a,b)=>a+b.length,0)) {
    let buffer = Buffer.alloc(bufferLength);
    let offset = 0;
    bufferList.forEach(item=>{
        item.copy(buffer, offset);
        offset += item.length
    });
    return buffer;
}
console.log(Buffer.concat([buf1, buf2]).toString())
// concat http请求 上传图标


// length toString Buffer.isBuffer slice() concat()
// indexOf => 字符串indexOf

let buffer = Buffer.from('我爱a你a爱你');
// 编码 ASCII 美国 字母 符号都占用1个字节
// gb2312 两个字节连起来 算一个中文  第一个字节如果超过127  下一个字节 组成一个汉字  (255-164) (127 -255)
// gb18030  127 * 255  = 36400
// unicode 编码
// utf8 基于unicode 编码 实现可变编码
Buffer.prototype.split = function (sep) {
    let len = Buffer.from(sep).length;
    let offset = 0;
    let arr = [];
    let current = 0;
    while (-1 != (current = this.indexOf(sep, offset))) {
        arr.push(this.slice(offset, current));
        offset = current + len;
    }
    arr.push(this.slice(offset))
    return arr;
}
console.log(buffer.split('爱'));
// console.log(buffer.indexOf('爱',6)); // 实现buffer的分割

// length toString Buffer.isBuffer slice
// concat indexOf -> split


// 编码问题 buffer 不支持gbk的
// 爬虫 爬别人dom元素
let fs = require('fs');
// utf8-> gb2312 多BOM头
let iconv = require('iconv-lite')
let buffer = fs.readFileSync('./1.txt');
let str = iconv.decode(buffer,'gbk')
// iconv-lite
console.log(str); // 编码的过程


// 读取文件的时候 utf8编码 重新保存成了gbk  BOM头

// 联通不如移动
let fs = require('fs');
// ef bb bf
function stripBom(buffer){
    if (buffer[0] === 0xef && buffer[1] == 0xbb && buffer[2] === 0xbf ){
        return buffer.slice(3);
    }else{
        return buffer;
    }
}
let buffer = fs.readFileSync('./1.txt');
console.log(stripBom(buffer), buffer.length); // 去bom头
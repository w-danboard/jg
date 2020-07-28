// console.log(Object.keys(global))
// Buffer  为了node能处理二进制 buffer可以和字符串任意转换

// 进制转化的问题
/**
 * 编码 1个汉字 有几个字节 
 *  utf8 3个字节
 *  gbk 2个字节
 */

 // ASCII 1个字符表示 字母 127个字符来表示出了 美国人所有的内容 它是二进制
 // 1个字节 是由8个位组成
 // 十进制和二进制的转化 01010101  二进制中最大的位的值就是1 一个字母 只战友一个字节

 // GB2312 2个字节 超过127 我就认为是汉字 （247-127）* （254-161）=(7998)

 // GB18030 编码 （247-161）*255

 // unicode 编码 可变的 没推行

 // utf8; 3个字节表示

 // 2进制转化成16进制 作为Buffer
 let buf = Buffer.from('一二三')
//  console.log(buf)

 // 怎么把 16进制转化成 十进制

 // 把任意进制转化成10进制
console.log((123).toString(16))
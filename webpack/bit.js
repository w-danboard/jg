/**
 * 按位与(&)
 * 比特就是bit，二进制数系统中，每个0或1就是一个位(bit), 它位数数据存储的最小单位
 * 其中8个bit就称为一个字节(Byte)
 * 按位与(&)两个输入数的统一位都为1才为1
 * js中0为false
 * 计算机里只能存010101010
 */

 // 在js里，0b开头是二进制，不加前缀是10进制，0开头是0进制，0x开头是16进制
 let a = 0b1000
 let b = 0b1111
 let c = 06

 console.log(011) // 8

 /**
  * 一直纠结，为啥console.log(011)的结果是8
  * 参考: https://stackoverflow.com/questions/42571758/console-log-output-in-javascript
  *      https://zhidao.baidu.com/question/30957316.html
  * 答案: 在一些javascript版本以0开头，则将数字解析为八进制，打印的结果就是8进制转换为十进制后的结果，所以是结果是8
  */
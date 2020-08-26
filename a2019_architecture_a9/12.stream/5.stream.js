// 1.可读流的源码实现

// let fs = require('fs');
// let rs = fs.createReadStream('./1.stream-read.js');
// rs.on('error',function (err) {
//     console.log(err);
// })
// rs.on('data',function (chunk) {
//         console.log(chunk)
// })
// rs.on('end',function () {
//     console.log('xxx')
//     console.log('xxx')
// })

// 父类Readable   read()
// createReadStream _read();  fs.read() => data this.push(data)  => this.emit(data)

// 自定义的可读流 _read()
// let {Readable} = require('stream');
// class MyReadStream extends Readable{
//     constructor() {
//         super();
//         this.index = 0;
//     }
//     _read(){
//         if(this.index <=5){
//             this.push(this.index++ + '');
//         }else{
//             this.push(null);
//         }
//     }
// }
// let my = new MyReadStream();
// my.on('data',function (data) {
//     console.log(data,'data');
// })
// my.on('end',function () {
//     console.log('end')
// })

let {Readable,Writable,Duplex,Transform} = require('stream');
// let fs = require('fs');
// let ws = fs.createWriteStream('./3.txt');
// class MyWriteStream extends Writable{
//     _write(chunk,encoding,clearBuffer){ // 用户调用  ws.write(chunk,encoding,callback)
//         fs.appendFileSync('3.txt',chunk); // flag:'a'
//         clearBuffer();
//     }
// }
// let ms = new MyWriteStream();
// ms.write('ok');
// ms.write('ok'); // 第二次调用不会调用_write方法
// ms.end();

// 双工流 能读写  res
// class MyDuplex extends Duplex{
//     _read(){
//         console.log('xxx')
//     }
//     _write(){

//     }
// }
// let md = new MyDuplex();
// md.on('data',function () {
    
// })
// md.on('data') 
// md.write()


// 压缩  加密


// 压缩文件
class MyTransform extends Transform{
    _transform(chunk,encoding,clearBuffer){ // 双工流 是读和写 可以有关可以没关
        // 转化流 两个有关系 上一个人的输出是下一个的输入
        this.push(chunk.toString().toUpperCase());
        clearBuffer();
    }
}   
let myTransform  = new MyTransform
// fd 从3开始  0 标准输入  1 标准输出  2 错误输出
// process.stdin.on('data',function (data) {
//     process.stdout.write(data); // console.log()
// })
process.stdin.pipe(myTransform).pipe(process.stdout);
// 四种流 读 on('data') on('end') 写  write end  双工两者都有  转化流 在读取和写入中间的部分

class Parent{
    read(){
        this._read()
    }
}
class A extends Parent{
    _read(){
        console.log('_read');
    }
}   
let a = new A();
a.read();
// 不需要过度理解
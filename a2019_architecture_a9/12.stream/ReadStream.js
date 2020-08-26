let EventEmitter  = require('events');
let fs = require('fs');
class ReadStream extends EventEmitter{
    constructor(path,options={}){
        super();
        // 初始化默认值 
        this.path = path;
        this.flags = options.flags || 'r';
        this.highWaterMark = options.highWaterMark || 64*1024;
        this.start = options.start || 0;
        this.end = options.end || undefined;
        this.autoClose = options.autoClose || true;
        // 状态 是否需要继续读取 flowing
        this.flowing = false; // 默认flowing为false
        this.offset = this.start;  // 可变的
        // 1.默认先会打开文件 触发open事件
        this.open();
        // 2.监控用户有没有监听data事件 如果有开始读取 emit('data')
        this.on('newListener', (type) => {
            if(type === 'data'){ // 用户监听了data事件
                this.flowing = true; // 如果监听了data事件需要将标识改成true
                this.read(); //读取用的
            }
        })
        // 3.如果当前flowing为true  继续读取
        // 4.如果读取不到内容 触发end事件和close事件
    }
    destroy(err){ // 主要负责销毁当前可读流
        if(err){ // 如果有错误触发错误
            this.emit('error',err);
        }
        if(this.autoClose){
            if(typeof this.fd == 'number'){
                fs.close(this.fd,()=>{
                    this.emit('close');
                })
            }
        }
    }
    // 通过发布订阅来解耦合
    read(){ // 需要等待文件打开后才能读取
        if(typeof this.fd !== 'number'){
            // 等待当前文件打开
            return this.once('open',this.read)
        }
        // 读取操作, 这里不能用同一个buffer 如果第二次读取改了原来的buffer，用户拿到的buffer都是最后面的
        let buffer = Buffer.alloc(this.highWaterMark); // 申请highWaterMark长的buffer
        fs.read(this.fd,buffer,0,this.highWaterMark,this.offset,(err,byteRead)=>{
            if(err){
                return this.destroy();
            }
            this.offset += byteRead
            if(byteRead < this.highWaterMark ){ // 如果读取不到数据了
                return this.emit('end');
            }else{
                this.emit('data',buffer.slice(0,byteRead)); // 截取读取到的有效个数 将其发射出来
            }   
            if(this.flowing){ // 如果是流动模式 就继续读取
                this.read();
            }
        }) ; // [1,2,3,4,5,6]
    }
    pipe(ws){
        this.on('data', (chunk)=> {
            let flag = ws.write(chunk);
            if(!flag){
                this.pause();
            }
        });
        ws.on('drain', () => {
            this.resume();
        })
    }
    pause(){
        this.flowing = false;
    }
    resume(){
        if(!this.flowing) {
            this.flowing = true;
            this.read();
        }
    }
    open(){
       fs.open(this.path,this.flags,(err,fd)=>{
            if(err){
               return this.destroy(err)
            }
            this.fd = fd; // 文件打开 
            this.emit('open',this.fd);
       })
    }

}
module.exports = ReadStream;
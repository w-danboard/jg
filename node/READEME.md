## node 并不是一个语言 而是一个执行环境 是让JS可以运行在服务端的 runtime

> js里面包含着三部分 DOM BOM ECMAScript (没有系统的api fileReader）

> node只有 ECMAScript (前端支持 es6写法 import export 但node不支持 node只支持commonjs) 封装了很多内置模块 fs http... 这些内部提供的模块 就可以让我们来后端开发

## node版本
- 不同版本之间是有差异的 比如eventLoop

## node是一个运行的进程
- 每个软件启动的时候 都会开一个进程 计算机的分配 或者调度任务的单位 都是进程(应该最小单位了)
- 进程中包括线程 在js中 进程中包含一条主线程
- 多进程 tomcat （线程池 复用线程）多线程适合cpu密集 （多个人操作同一个资源 会有锁的问题）
- js的单线程的特性：为了保证线程之间不干扰 所以是单线程 (i/o密集)

## 异步非阻塞 基于事件回调的机制
- 异步
- 非阻塞、阻塞

- 同步 非阻塞
let r = fs.readFileSync()

## node中实现了一个 libuv库 这个库就是用多线程来模拟异步

## 子进程 集群 自动重启

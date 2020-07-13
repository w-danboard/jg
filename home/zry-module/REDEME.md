### node中的模块

> 最早的模块
- 0. 命名空间
- 1. 闭包 自执行函数 (像jquery里就是这么干的)
```
(function (window) {})(window)
```
- 2. require.js AMD  [2 & 3 基本被淘汰了]
- 3. sea.js CMD
- 4. node.js common.js [主流 4 & 6]
- 6. es6 es module
- 7. umd amd + cmd + common.js + es + module

（一、开场）
> 今天分享的内容是，node中的模块，然后简单说一下模块的发展始，最早的模块就是命名空间，我理解的就是咱们现在说的工厂模式。就是下面这样。
```
let productRender = (function () {
  return {}
})()
```
> 但其实这样还是会存在一些问题，比如说我写了个productRender,然后别人也写了个productRender，就是说还是会有冲突。

> 在看这个闭包 自执行函数，这个的话像jquery里面就是这么干的
```
(function (window) {})(window)
```

> 再就是这个AMD和CMD, 这个的话现在基本上是被淘汰了的，

> 再就是今天要讲的node中的模块化 common.js，它是node自己实现的

> 然后还有咱们项目中经常使用的es6的module

> 然后umd 统一模块规范 它是amd + cmd + common.js + es + module 但这个具体的我也还不是很了解，可以看下刚哥之前分享的前端模块。

### CommonJS规范

- 封装功能
- 封闭作用比
- 可以解决依赖问题
- 提高工作效率，重构方便

（二、开始讲commonJS）

> 然后，看一下node.js的Common.js是怎么做的，
1. 就是在nodeJS里面，每一个单独的文件都是一个单独的模块，就是一个文件就是一个模块，里面的变量啊都是私有的
2. 通过require方法，实现了模块间的依赖管理
```
/**
 * 比如我们创建一个A文件
 * 在node.js里通过require方法加载其它模块
 * 这个加载是同步的，但同步这么慢为什么用同步呢？
 * - 
 */
 let name = 'wl' // 这个变量是私有的
 let age = 18

 /**
  * 从源码看 这个模块是如何执行的？
  * 1. 找到这个文件
  * 2. 读取此文件模块的内容
  * 3. 把它封装在一个函数里立刻执行
  * 4. 执行后把模块的moudule.exports对象赋值给引用它的
  */
  !function (exports, require, module, __filename, __dirname) {
    // 文件内容
    let name = 'wl'
    let age = 18
    module.exports = { name, age }
    return module.exports
  }
```

(三、开始讲为什么require是同步的)
> 同步的性能比较低，要读文件，又要执行它，但node为什么还要这么干呢？因为有缓存
- 因为模块实现了缓存，当第一次加载了这个模块之后，会缓存这个模块的exports对象。以后如果再次加载这个模块的话，则直接从缓存中取，不需要再次加载了.同一个模块不会加载两次
> 缓存的key是什么？

(四、模块分类)
> 原生模块
- http path fs util events 编译成二进制加载速度最快 原来模块通过名称来加载 因为不用东奔西走 自己身上取就行
- node亲生的模块 内置的模块放在了node.exe里
> 文件模块
- 在硬盘的某个位置，加载速度非常慢，文件模块通过名称或路径来加载 文件模块的后缀有三种类型
- 存放和加载的位置又分为两种
- 第一种是自己写的，要通过相对路径或绝对路径加载
- 第二种是别人写的，要通过名字来调用，会去node_modules里去找
  - 后缀名为js的javascript脚本文件，需要先读入内存再运行
  - 后缀名为json的JSON文件，fs读入内存，转换成JSON对象
  - 后缀名为node的经过编译后的二进制C/C++扩展模块文件，可以直接使用
> 第三方模块
- 如果require函数只指定名称则为从node_modules下面加载文件，这样的话你可以移动模块而不需要修改引用的模块路径
- 第三方模块的查询路径包括module.paths和全局目录

> 什么是全局目录
- window如果在环境变量中设置了NODE_PATH变量，并将变量设置为一个有效的磁盘目录，require在本地找不到此模块时向在此目录下找这个模块。UNIX操作系统会从$HOME/node_modules $HOME/node_libranies目录下寻找
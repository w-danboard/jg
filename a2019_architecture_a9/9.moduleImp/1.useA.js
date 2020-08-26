let fs = require('fs');
let path = require('path');
let vm = require('vm');
function Module(filename) {
    this.id = filename;
    this.exports = {};
}
Module.wrapper = [
    '(function (exports, require, module, __filename, __dirname) { ',
    '\n});'
];
Module._extensions = {
    '.js'(module){ // 处理js
        let content = fs.readFileSync(module.id,'utf8'); // 读取文件内容
        content = Module.wrapper[0] + content + Module.wrapper[1];
        let fn = vm.runInThisContext(content);
        let exports = module.exports;
        fn.call(exports, exports, req, module, module.id, path.dirname(module.id)); // module.exports = 'hello'
    },
    '.json'(module){
        let content = fs.readFileSync(module.id, 'utf8'); // 读取文件内容
        module.exports = JSON.parse(content);
    }
}
Module._resolveFilename = function (filename) {
    let absPath = path.resolve(__dirname, filename); // 算出一个绝对路径
    let isExists = fs.existsSync(absPath) // 判断这个路径是否存在
    if(isExists){
        return absPath;
    }else{
        let keys = Object.keys(Module._extensions);
        for(let i = 0; i < keys.length;i++){
            let newPath = absPath + keys[i];
            let flag = fs.existsSync(newPath); // 拼接路径存在直接返回即可
            if(flag){
                return newPath;
            }
        }
        throw new Error('module not found')
    }
}
Module._cache = {}
Module.prototype.load = function () {
    // 核心加载方法
    let extname = path.extname(this.id); // .js
    Module._extensions[extname](this)
}
function req(filename) {
    filename = Module._resolveFilename(filename); // 会把文件名 转化出一个绝对路径
    let cacheModule = Module._cache[filename]
    if (cacheModule) {
        return cacheModule.exports; // 做了一层缓存 不必在读取文件了
    }
    // module.exports = {}
    let module = new Module(filename); // 创建一个模块 （模块中两个属性 exports id）
    Module._cache[filename] = module; // 缓存模块
    module.load(); // 要加载模块 -> 用户会给module.exports='hello'
    return module.exports;
}
let a = req('./b');
console.log(a);

// 作业：尝试断点调试 一行行 

// 1.使用模块上定义的require方法 Module.prototype.require
// 2.Module._load 模块的加载方法
// 3.Module._resolveFilename 把文件路径转成成绝对路径 会尝试添加.js/.json文件
// 4.Module._cache[filename] 判断当前这个路径有没有在缓存中,如果在缓存中就结束了
// 5.new Module 创建一个模块  id 当前的文件名 exports 当前模块的导出对象
// 6.把当前模块放到缓存中
// 7.tryModuleLoad 尝试加载这个模块
// 8.module.load 模块的加载
// 9.先找到文件的扩展名 不同的扩展名处理方式不相同 .js  json 
// 10.通过扩展名调用不同的方法 Module._extensions[extension]
// 11. 如果是js 读取文件的内容
// 12. 将读取到的内容 Module.wrap进行包裹 Module.wrapper[0] + script + Module.wrapper[1]
// const wrapper = [
//     '(function (exports, require, module, __filename, __dirname) { ',
//     '\n});'
// ];
// 将字符串使用 runInThisContext 进行执行 ,改变this 将参数传入，用户会给参数赋值
// 会给module.exports 赋值
// 最终require方法返回的是module.exports;
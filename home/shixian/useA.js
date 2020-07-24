// let r = require('./Aa')
// console.log(r)

// let r = (function(exports, require, module, __filename, __dirname) {
//   let name = 'wl'
//   let age = 18
//   module.exports = { name, age }

//   return module.exports
// })



// 分析node源码
/**
 * 1. 会默认调用require方法
 * return mod.require(path); 
 *  const Module = mod.constructor; 你可以看到，它拿到的是当前模块的构造函数，也就是说mod就是一个实例
 */

 /**
  * 2. 模块原型上有require方法
  * Module.prototype.require
  *   进入require语法，它在Module的原型上
  * 
  * validateString(id, 'id'); id就是当前的路径，它会校验下当前的路径是不是字符串，不是的话直接抛出异常了
  * 
  * if (id === '') { // 路径为空的话，会告诉你路径不能为空
  *  throw new ERR_INVALID_ARG_VALUE('id', id,
  *                                  'must be a non-empty string');
  *  }  
  * 
  * requireDepth++; 它记录了require引了多少层，每次引用++，每次完成--
  */

  /**
   * 3. Module._load 调用模块的加载方法
   *  return Module._load(id, this, /* isMain *\/ false);
   *  它最终返回的是module.exports
   */

   /**
    * 4. Module._resolveFilename 解析文件名 会把当前路径解析成绝对路径，默认尝试添加后缀，.js .json .node(这种文件是二进制的，一般用不到，不会C++的写不了)
    *   const filename = Module._resolveFilename(request, parent, isMain);
    */

  /**
   * 5. 缓存机制，默认会先看下当前模块是否存在缓存里，如果存在的话，直接返回
   *   const cachedModule = Module._cache[filename];
   *   if (cachedModule !== undefined) {
   *      updateChildren(parent, cachedModule, true);
   *      return cachedModule.exports;
   *    }
   */

  /**
   * 6. 创建模块 new Module(filename, parent); [模块其实就是对象]
   * 
   * = 会看下是不是原生模块
   *   const mod = loadNativeModule(filename, request, experimentalModules);
   *   if (mod && mod.canBeRequiredByUsers) return mod.exports;
   * 
   * = 没有这个模块，要创建模块
   *   const module = new Module(filename, parent);
   * 
   * = 主要看这个id唯一标识 和 exports 导出结果
   * function Module(id = '', parent) {
        this.id = id;   // id 自己的名字 
        this.path = path.dirname(id);
        this.exports = {};  // 重要
        this.parent = parent; // 我的爸爸是谁
        updateChildren(parent, this, false); // 记上我的儿子是谁
        this.filename = null;  // 文件名
        this.loaded = false; // 是否加载完毕
        this.children = []; // 孩子是谁
      }

      = 当前是否是主模块 [肯定不是，因为我是在useA中引用的a。a肯定不是住模块]
      if (isMain) { 
        process.mainModule = module;
        module.id = '.';
      }

   */

   /**
    * 7. 把模块缓存起来，方便下次使用
      Module._cache[filename] = module;
      if (parent !== undefined) {
        relativeResolveCache[relResolveCacheIdentifier] = filename;
      }

      == 前面做的就是 根据文件名(绝对路径) 创建一个模块
    */

   /**
    * 8. 尝试模块加载
    * let threw = true;
      try {
        // Intercept exceptions that occur during the first tick and rekey them
        // on error instance rather than module instance (which will immediately be
        // garbage collected).
        if (enableSourceMaps) {
          try {
            module.load(filename);
          } catch (err) {
            rekeySourceMap(Module._cache[filename], err);
            throw err; /* node-do-not-add-exception-line 
          }
              } else {
                module.load(filename);
              }
              threw = false;
            } finally {
              if (threw) {
                delete Module._cache[filename];
                if (parent !== undefined) {
                  delete relativeResolveCache[relResolveCacheIdentifier];
                }
              }
            }
    */

    /**
     * 9. this.paths 
     *  第三方模块查找路径
     */

  /**
   * 10. 获取当前模块的扩展名，根据扩展名调用对应的方法去加载这个模块 策略模式
   *  Module._extensions[extension](this, filename);
   */

  /**
   * 11. 读取你文件的内容
   * const content = fs.readFileSync(filename, 'utf8');
   */

   /**
    * 12. 调用module._compile方法
    *   module._compile(content, filename);
    */

/**
 * 13. 将用户的内容包裹在一个函数中
 * 
    let wrap = function(script) {
        return Module.wrapper[0] + script + Module.wrapper[1];
      };

      const wrapper = [
        '(function (exports, require, module, __filename, __dirname) { ',
        '\n});'
      ];
 */

 /**
  * 14. 使用vm.runInThisContext 运行当前模块脚本
  * if (patched) {
      const wrapper = Module.wrap(content);
      return vm.runInThisContext(wrapper, {
        filename,
        lineOffset: 0,
        displayErrors: true,
        importModuleDynamically: experimentalModules ? async (specifier) => {
          const loader = asyncESM.ESMLoader;
          return loader.import(specifier, normalizeReferrerURL(filename));
        } : undefined,
      });
    }


    ===
    const dirname = path.dirname(filename); // 当前文件所在的文件夹
    const require = makeRequireFunction(this, redirects); // require函数 内部的require
    let result;
    const exports = this.exports; // 和module.exports相等
    const thisValue = exports;
    const module = this; // 

    ===
    thisValue
    exports
    require 内部的require
    module 就是当前的this
    filename 当前文件名
    dirname  当前文件夹
    result = compiledWrapper.call(thisValue, exports, require, module,
                                  filename, dirname);
  */
// -----------------------------------------------------------------------

// 简易版
const path = require('path')
const fs = require('fs')
const vm = require('vm')

function Module (id = '') {
  this.id = id
  this.exports = {}
}

Module.warp = function (script) {
  const arr = [
    '(function (exports, require, module, __filename, __dirname) { ',
    script,
    '\n});'
  ];
  return arr.join('')
}

Module._extensions = {
  '.js': function (module) {
    let content = fs.readFileSync(module.id, 'utf8') // 读取出的是字符串
    let fnStr = Module.warp(content)
    let fn = vm.runInNewContext(fnStr)
    let exports = module.exports
    let require = myRequire
    let __filename = module.id
    let __dirname = path.dirname(module.id)
    // 这里的this 就是exports对象
    fn.call(exports, exports, require, module, __filename, __dirname)
    // 用户会给module.exports赋值
  },
  '.json': function (module) {
    let content = fs.readFileSync(module.id, 'utf8') // 读取出的是字符串
    module.exports = JSON.parse(content)
  },
  '.node': function () {}
}

Module._resolveFilename = function (filepath) {
  // 根据当前路径实现解析
  let filePath = path.resolve(__dirname, filepath)
  // 判断当前文件是否存在
  let exists = fs.existsSync(filePath)
  if (exists) return filePath // 如果存在直接返回路径

  // 尝试添加后缀
  let keys = Object.keys(Module._extensions)
  for (let i = 0; i < keys.length; i++) {
    let currentPath = filePath + keys[i]
    if(fs.existsSync(currentPath)) return currentPath // 尝试添加后缀查找
  }
  throw new Error('模块不存在')
}

Module.prototype.load = function(filename) {
  // 获取文件的后缀来进行加载
  let extname = path.extname(filename) // 获取扩展名
  Module._extensions[extname](this) // 根据对应的后缀名进行加载
}

Module.cache = {}

Module._load = function (filepath) {
  // 将路径转换成绝对路径
  let filename = Module._resolveFilename(filepath)

  // 获取路径后不要立即创建模块，先看一眼能否找到以前加载过的模块
  let cacheModule = Module.cache[filename]
  if (cacheModule) return Module.cache[filename].exports // 直接返回上一次require的结果

  // 保证每个模块的唯一性，需要通过唯一路径进行查找 创建模块
  let module = new Module(filename); // id当前文件绝对路径, exports对应的当前模块的结果

  Module.cache[filename] = module

  module.load(filename) // 加载模块

  return module.exports
}

function myRequire (filepath) {
  // 根据路径加载这个模块
  return Module._load(filepath)
}

let myModule = myRequire('./a')
console.log(`名字：${myModule.name}, 年龄：${myModule.age}`)



/**
 * 1. require语法是同步的，fs.readeFileSync
 * 2. 最终require语法返回的是module.exports
 * 3. 模块的exports 和 module.exports 引用的是同一个空间
 * 4. 模块是冬天加载的，每次require都会获取最新的导出结果，可以将require写到条件中
 * 5. 更改exports的引用，不会导致module.exports的变化
 * 6. 循环引用，一般不会出现，如果出现只能加载部分数据
 */

//  console.log(exports, module.children[0])

// console.log(require.cache)
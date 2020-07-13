console.log(Object.keys(require.cache))
let test = require('./b')
console.log(Object.keys(require.cache))
let test1 = require('./b')
console.log(Object.keys(require.cache))
// console.log(test)

/**
 Module {
  id: '.', // 模块ID 入口模块的ID永远为.
  path: '/Users/wanglin/Desktop/jg/home/zry-module', // 所在文件夹的绝对路径
  exports: {},  // 导出对象，默认是一个空对象
  parent: null, // 父模块 此模块是哪个模块来加载的
  filename: '/Users/wanglin/Desktop/jg/home/zry-module/a.js', // 当前文件的绝对路径
  loaded: false, // 是否加载完成
  children: [ // 当前模块所引用的模块
    Module {
      id: '/Users/wanglin/Desktop/jg/home/zry-module/b.js',
      path: '/Users/wanglin/Desktop/jg/home/zry-module',
      exports: [Object],
      parent: [Circular],
      filename: '/Users/wanglin/Desktop/jg/home/zry-module/b.js',
      loaded: true,
      children: [],
      paths: [Array]
    }
  ],
  paths: [ // 第三方模块的查找路径
    '/Users/wanglin/Desktop/jg/home/zry-module/node_modules',
    '/Users/wanglin/Desktop/jg/home/node_modules',
    '/Users/wanglin/Desktop/jg/node_modules',
    '/Users/wanglin/Desktop/node_modules',
    '/Users/wanglin/node_modules',
    '/Users/node_modules',
    '/node_modules'
  ]
}
 */

 /** 关于require
 *  只想知道模块的绝对路径，但用不想加载这个模块
 *  console.log(require.resolve('./b'))
 * 
 *  main主要的，其实指的就是入口模块
 *  console.log(require.mani)
 * 
 * extensions扩展
 * 在node里模块的类型有三种
 * 1. JS模块
 * 2. json模块 =》先找到文件，读取文件内容，用JSON.parse转成对象返回
 * 3. node模块 C++扩展二进制模块 =》这属于二进制模块 可以拿来就用 执行最快的 不会C++写不了
 * 
 * 当require加载一个模块的时候，会先找user.如果找不到，再找user.js，如果还找不到，会找user.json.如果找不到会找user.node
 * 
  resolve: [Function: resolve] { paths: [Function: paths] },
  main: Module {
    id: '.',
    path: '/Users/wanglin/Desktop/jg/home/zry-module',
    exports: {},
    parent: null,
    filename: '/Users/wanglin/Desktop/jg/home/zry-module/a.js',
    loaded: false,
    children: [],
    paths: [
      '/Users/wanglin/Desktop/jg/home/zry-module/node_modules',
      '/Users/wanglin/Desktop/jg/home/node_modules',
      '/Users/wanglin/Desktop/jg/node_modules',
      '/Users/wanglin/Desktop/node_modules',
      '/Users/wanglin/node_modules',
      '/Users/node_modules',
      '/node_modules'
    ]
  },
  extensions: [Object: null prototype] {
    '.js': [Function],
    '.json': [Function],
    '.node': [Function]
  },
  cache: [Object: null prototype] {
    '/Users/wanglin/Desktop/jg/home/zry-module/a.js': Module {
      id: '.',
      path: '/Users/wanglin/Desktop/jg/home/zry-module',
      exports: {},
      parent: null,
      filename: '/Users/wanglin/Desktop/jg/home/zry-module/a.js',
      loaded: false,
      children: [],
      paths: [Array]
    }
  }
}
 */
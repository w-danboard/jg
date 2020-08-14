// 如果是esModule
require.r = function (exports) {
  if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
    Object.defineProperty(exports, Symbol.toStringTag, {
      value: 'Module'
    })
  }
  Object.defineProperty(exports, '__esModule', {
    value: true
  })
}

// --------------- 伪代码
// 其实就是把一个exports对象声明未一个es6模块
require.r2 = function (exports) {
  exports[Symbol.toStringTag] = 'Module'
  exports.__esModule=true
}

let obj = { name: 'danboard' }
console.log(Object.prototype.toString.call(obj)) // [object Object]

require.r2(obj)
console.log(Object.prototype.toString.call(obj)) // [object Module]
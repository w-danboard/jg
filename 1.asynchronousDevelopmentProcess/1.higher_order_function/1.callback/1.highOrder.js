// 判断类型 Object.prototype.toString.call();
function _isType(type) {
  return function(obj) {
    return Object.prototype.toString.call(obj) === '[object ' + type + ']'
  }
}

// 包装成一个高阶函数 批量生成函数
let types = ['String', 'Object', 'Array', 'Boolean', 'Null', 'Undefind'];
let fns = {};
types.forEach(type => { // 批量生成方法
  fns['is' + type] = _isType(type)
})

console.log(fns.isObject({}))
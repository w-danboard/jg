/**
 * Object.prototype.hasOwnProperty的简写
 * @param {*} object 
 * @param {*} property 
 */
require.o = function (object, property) {
  // 判断object身上有没有property属性
  return Object.prototype.hasOwnProperty.call(object, property)
  // return object.hasOwnProperty(property) 是一样的，但没有用这种方式估计是因为怕这个方法被重写过
}


/**
 * 给exports上面挂一个name属性，getter是获取值的方式
 * 说白了，就是给exports添加一个属性，属性的取值方式就是getter
 * @param {*} exports 导入函数
 * @param {*} name    变量名
 * @param {*} getter  getter函数
 */
require.d = function (exports, name, getter) {
  if (!require.o(exports, name)) {
    Object.defineProperty(exports, name, {
      enumerable: true, // 可枚举
      get: getter,      // get方法
    })
  }
}

let obj = { name: 'danboard' }
require.d(obj, 'age', function () {
  return 18
})
console.log(obj.age) // 18

// -------------------------- 实现
function require () {}





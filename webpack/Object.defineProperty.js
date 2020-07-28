// Object.denfineProperty方法可以在对象上定义一个新的属性，或者修改一个对象的现有属性，并返回这个对象。
// Object.defineProperty(obj, key, {})

let obj = {}
let ageVlaue = 18
/**
 * TypeError: Invalid property descriptor. Cannot both specify accessors and a value or writable attribute, #<Object>
 * 类型错误：非法的属性描述器，不能同时指定属性描述器和value值 [不能同时给value和set]
 */
Object.defineProperty(obj, 'age', {
  // value: 20,        // 直接指定value值
  // writable: true,   // 表示可以修改value的值
  get () {
    // getter 获取器函数
    return ageVlaue
  },
  set (newVale) {
    ageVlaue = newVale
  },
  enumerable: true,   // 可枚举，for in循环的时候或者console.log的时候能看见这个属性
  configurable: true, // 此属性是否可以删除
})

console.log(obj.age)
obj.age = 180
console.log(obj.age)
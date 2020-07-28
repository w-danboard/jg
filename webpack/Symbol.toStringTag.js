// toStringFlag
// 具体参考：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag
//         https://www.cnblogs.com/fe-cherrydlh/p/11124261.html
// console.log(Object.prototype.toString.call('wanlgin')) // [object String]

/**
 * 如果我们想更进一步的区分类型的话
 */
let obj = {}
Object.defineProperty(obj, Symbol.toStringTag, { value: 'Module' }) // 与obj[Symbol.toStringTag] = 'Module'是一样的
obj[Symbol.toStringTag] = 'Module'
console.log(obj) // Object [Module] {}
console.log(typeof obj) // object
console.log(Object.prototype.toString.call(obj)) // [object Module]
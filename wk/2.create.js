let ns1 = {}
console.log(ns1, Object.getPrototypeOf(ns1)) // Object.prototype

// 使用Object.create(null)创建的对象，没有任何属性，可以当做一个非常干净的map来用
let ns2 = Object.create(null)
console.log(ns2, Object.getPrototypeOf(ns2))

// 实现原理
Object.create = function (proto) {
  function F() {
    F.prototype = proto
    return new F()
  }
}
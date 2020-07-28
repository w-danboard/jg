let wl1 = {}
for (let key in wl1) {
  if (wl1.hasOwnProperty(key)) { // 要判断属性是否是自己的 是自己的就打印出来
    console.log(key)
  }
}

// 使用Object.create(null)创建的对象，没有任何属性，因为它没有原型。可以当做一个非常干净的map来用
let wl2 = Object.create(null) // 创建一个新的对象 它的原型等于null
for (let key in wl2) {
  // if (wl2.hasOwnProperty(key)) { // 不需要做这层判断 因为wl2根本没有原型
    console.log(key)
  // }
}

console.log('wl1', wl1) // {} : 它是有原型的
console.log('wl2', wl2) // [Object: null prototype] {} : 它的原型指向了null

// Object.getPrototypeOf()方法返回的是指定对象的原型 [也就是__proto__的指向]
console.log('wl1', Object.getPrototypeOf(wl1)) // {}
console.log('wl2', Object.getPrototypeOf(wl2)) // null

// Object.create() 实现原理
Object.create = function (proto) {
  function F() {}
  F.prototype = proto
  return new F()
}
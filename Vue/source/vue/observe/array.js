// 主要要做的事就是拦截用户调用的push shift unshift pop reverse sort splice (为什么要监听这几个方法？因为这些方法会导致原数组发生变化)

import { observe } from "./index";

// concat... 不会改变原数组 所以不需要监听他们

// 先获取老的数组方法 之改写这7个方法
let oldArrayProtoMethods = Array.prototype; // 不可以直接改这个方法 因为直接改回导致其他调这些方法都会用改写之后的

// 拷贝的一个新的对象 可以直接查找到 老的方法
export let arrayMethods = Object.create(oldArrayProtoMethods);

// 原型链 prototype __proto__
let methods = [
  'push',
  'shift',
  'pop',
  'unshift',
  'reverse',
  'sort',
  'splice'
];

export function observeArray(inserted) { // 要循环数组 依次对数组中每一项进行观察
  for(let i = 0; i < inserted.length; i++) {
    observe(inserted[i]);
  }
}

methods.forEach(method => {
  arrayMethods[method] = function(...args) {
    let r = oldArrayProtoMethods[method].apply(this, args);
    // todo
    let inserted;
    switch(method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break;
      case 'splice':
        inserted = args.slice(2); // 获取splice 新增的内容
      default:
        break;
    }
    if(inserted) observeArray(inserted);
    return r;
  }
})
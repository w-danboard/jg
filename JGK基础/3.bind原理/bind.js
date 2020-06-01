let obj = {
  name: 'jw'
}

function fn(name, age) {
  this.say = '说话'
  console.log('this===>', this)
  console.log(this.name + '养了一只' + name + age + '岁了')
}

// 1. bind方法可以绑定this指向
// 2. bind方法返回一个绑定后的函数 (高阶函数)
// 3. 如果绑定的函数被new了 当前函数的this就是当前的实例
// 4. new出来的结果可以找到原有类的原型
Function.prototype.bind = function(context) {
  let that = this;
  let bindArgs = Array.prototype.slice.call(arguments, 1)  // ['狗']
  // function Fn() {} // Object.create原理
  function fBound() {
    let args = Array.prototype.slice.call(arguments)
    return that.apply(this instanceof fBound ? this : context, bindArgs.concat(args))
  }
  fBound.prototype = Object.create(this.prototype)
  return fBound
}
fn.prototype.flag = '哺乳类'
let bindFn = fn.bind(obj, '狗', 18)
let instance = new bindFn(9);
console.log(instance.flag)
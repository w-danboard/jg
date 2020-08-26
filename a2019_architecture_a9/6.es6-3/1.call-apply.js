function fn(...args) {
    console.log(this, args);
}
// 类的 new xxx   xxx.fn   1.fn()

// 1.call的特点 改变this指向 2.可以让函数执行
Function.prototype.call = function (thisValue, ...args) {
    // this = fn;
    if (typeof thisValue !== 'object') {
        thisValue = new Object(thisValue);
    }
    
    let context = this; // context 就是fn
    thisValue.f = context
    Object.defineProperty(thisValue, 'f', { // 可以通过defineProperty 设置属性为不可枚举的
        enumerable:false,
        get(){
            return context;
        }
    })
    // thisValue.f = context;
    thisValue.f(...args); // 就是将当前的this 挂载到需要改变的this指向上
    delete thisValue.f
}
fn.call(1, 3, 4, 5, 6);
// function fn2(){
//     console.log('fn2')
// }
// // call方法.call(this)
// fn.call.call.call.call(fn2);


Function.prototype.apply = function (thisValue, args) {
    // this = fn;
    if (typeof thisValue !== 'object') {
        thisValue = new Object(thisValue);
    }
    let context = this; // context 就是fn
    thisValue.f = context
    Object.defineProperty(thisValue, 'f', { // 可以通过defineProperty 设置属性为不可枚举的
        enumerable: false,
        get() {
            return context;
        }
    })
    // thisValue.f = context;
    thisValue.f(...args); // 就是将当前的this 挂载到需要改变的this指向上
    delete thisValue.f
}
function fn() {
    console.log(this,arguments)
}
fn.apply = function () {
    console.log('inner apply')
}
// apply 和 call的区别主要是在参数上 apply 可以传递数组
// Function.prototype.apply.call();
Reflect.apply(fn, 3, [2, 3, 4])
// 我们希望在原有的功能上增加一些方法
// Vue.mixin

function say(who) {
    console.log(who+'说话')
}
Function.prototype.before = function (callback) {
    // this = say
    return (...args) => { // 箭头函数没有arguments 剩余运算符
        callback();
        this(...args); // 把数组展开 依次传入到say方法中
    }
}
let fn = say.before(function () { // AOP 面向切片
    console.log('before say')
})
fn('小狗');
// vue中的数组的方法重写 函数劫持

// AOP切片

// 当我调用数组的push方法的时候 先打印打印调用了push方法

let arr = [1,2,3];
let oldPush = Array.prototype.push;
function push (arr,...args) { // 调用了push方法
    console.log('调用了push方法')
    oldPush.call( ...args); // arr.push(1,2,3,4) 又调用了push
}
push(arr,4);
console.log(arr);
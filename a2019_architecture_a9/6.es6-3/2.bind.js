
// bind的作用 返回一个新的函数并且可以改变this指向
function fn(...args){
    console.log(this, args);
}
Function.prototype.bind = function (thisValue,...args) {
    if (typeof thisValue !== 'object'){
        thisValue = new Object(thisValue)
    }
    thisValue.f = this;
    return function (...values) {
        thisValue.f(...args,...values);
    }
}
let bindFunc = fn.bind(1,2,3);
bindFunc = bindFunc.bind(5);
bindFunc(3);



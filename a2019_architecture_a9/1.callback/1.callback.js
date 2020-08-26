// js 里最核心的技能回调函数

// 高阶函数 （函数当做参数传递给另一个函数） 一个函数返还另一函数

// 检测数据类型 typeof object/array/null Object.prototype.toString.call()
// instanceof constructor

function isType(content,type) {
    return Object.prototype.toString.call(content) === `[object ${type}]`
}
// 属性私有化
// 闭包 1函数执行的时候 会有一个不销毁的内存空中
// function isType(type){ // type会保留在当前的上下文中
//     return  function (content) {
//         return Object.prototype.toString.call(content) === `[object ${type}]`
//     }
// }
let util = {};
['String','Boolean','Undefined'].forEach((type)=>{
    util['is' + type] = isType(type)
})
// 柯里化
// let isString = isType('String');
// let isBoolean = isType('Boolean');
console.log(util.isString('hello'))
console.log(util.isBoolean(true))

//  留个作业 函数柯里化 (写成一个通用格式)  函数的反柯里化
let isString = currying(isType,'String')
function add(a,b,c,d){
    return a+b+c+d
}
currying(add)(1)(2,3)(4);
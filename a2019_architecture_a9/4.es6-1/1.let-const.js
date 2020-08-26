// es6规范 尽量不要是用var

// var 导致的问题
// 1.重复声明的问题   Identifier 'a' has already been declared
// 2.变量提升的问题 在js中会导致变量提升的有哪几种方式 var function import  let(a is not defined)
// 3.var 默认会把变量声明到全局上   let 不会被声明到window 可以和{}代码块组合成一个作用域
// 4.我们var 是没用作用域的概念的
// 5.我们声明的变量有些不需要更改的但是可以随意更改

// let a = 100;
// {
//     console.log(a); // 暂存死区
//     let a = 1;
// }
// console.log(a);
for(let i = 0 ; i < 3;i++){ // 0 1 2 
    setTimeout(() => {
        console.log(i);
    }, 0); // 在浏览器默认0 代表不少于4ms执行
}

const PI = { // 如果是引用空间 可以修改空间里的内容
    r: 3.14
};
PI.r = 100; //  Assignment to constant variable. 不能深度改变

// 只要不变就全部用const 只要改变就用let
// reduce 收敛函数  [1,2,3,4,5] 


// let r = [].reduce(function (previousValue, currentValue,currentIndex,arr) {
//     return previousValue + currentValue
// }, 1); // reduce的初始值 会把这个值 传递给previousValue 但是如果空数组，则直接将结果返回

// let r = [
//     {score:1},
//     {score:2},
//     {score:3},
//     {score:4}
// ].reduce((previousValue, currentValue, currentIndex, arr)=>{
//     if(arr.length-1 === currentIndex){
//         return (previousValue + currentValue.score )/ arr.length
//     }
//     return previousValue + currentValue.score
// },0);

// console.log(r);
// console.log([1, [2, [3, [4, [5]]]]].flat(2))
// [1,2,3,4,5]
// function flatten(arr) {
//     return arr.reduce((previousValue, currentValue, currentIndex, arr) => {
//         if(Array.isArray(currentValue)){
//             return previousValue.concat(flatten(currentValue));
//         }else{  
//             previousValue.push(currentValue);
//         }
//         return previousValue
//     }, [])
// }
// console.log(flatten([1, [2, [3, [4, [5]]]]]))

// [name,age] [zf,10] = {name:zf,age:10}

// let keys= ['name','age'];
// let values =['zf',10];
// let obj = keys.reduce((memo,current,index)=>(
//     memo[current] = values[index]
//     , memo
// ), {})

// console.log(obj);

// compose redux 中间件 将多个函数 组合成一个函数

function sum(a,b,c){
    return a+b+c;
}
function addCurrency(value){
    return '$' + value;
}

function len(value){
    return value.length
}
// function compose(...fns){
//     return function(...values){
//         let lastFn = fns.pop(); // [len,addCurrency]
//         return fns.reduceRight((prev,current)=>{
//             return current(prev)
//         }, lastFn(...values))
//     }
// }
// const compose = (...fns) =>(...values) => fns.reduceRight((prev, current) => current(prev), fns.pop()(...values))

// function compose(...fns){
//     return fns.reduce(function(prev,next){
//         return function (...values) { // compose(len,addCurrency,sum)
//             return prev(next(...values))
//         }
//     })
// }
// let compose = (...fns) => fns.reduce((a,b)=>(...values)=>a(b(...values)));

// let result = compose(len,addCurrency,sum)('a','b','c')
// // addCurrency(sum('a', 'b', 'c'))
// console.log(result);

// 核心就是收敛 


// 箭头函数的特点是？ 没有this 没有arguments 没有原型

// var a = 1;
// let obj = {
//     a:100,
//     fn:()=>{
//         // this => obj
//        setTimeout(()=>{
//             console.log(this.a);  
//        });
//     }
// }
// obj.fn();
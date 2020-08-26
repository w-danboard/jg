// 柯里化 让函数变得更具体一些
// isType context type   => isString isBoolean


function add(a,b,c,d){ // add.length 参数个数
    return a+b+c+d
}
function curring(fn,...args){
    if(fn.length === args.length){
        return fn(...args)
    }else{
        return function(...values){
            let newArgs = [...args, ...values];
            return curring(fn, ...newArgs); // fn, 1,2,3,4
        }
    }
}
let fn = curring(add,1,2);
// let newFn = fn(3);

// console.log(newFn(4))


// 反柯里化  让一个函数的应用范围 变得更广一些

function unCurrying(fn){
    return function (thisValue,...args) {
        return Function.prototype.apply.call(fn, thisValue, args)
        // return fn.apply(args.shift(),args)
    }
}
let toString = unCurrying(Object.prototype.toString);
console.log(toString('hello'));

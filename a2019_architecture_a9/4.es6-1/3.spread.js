// 展开运算 [...[1,2,3]]

// let obj = {name:'zf',age:{val:10}}

// 拷贝

// let newObj = {...obj}

// 拷贝前前的和拷贝后的没有关系的话 就是深拷贝

// 浅拷贝 表示拷贝后的结果 还有引用以前的引用空间
// newObj.age.val = 190;

// let arr = [1, 2, 3, [4]]; // 数组里如果放的是对象 slice 方法做到的是浅拷贝
// let newArr = arr.slice(0);
// newArr[3][0]= 100;
// console.log(arr);

// 如何实现深拷贝  特点1：考察当前数据类型校验 2：循环饮用问题
// typeof Object.prototype.toString.call instanceof  constructor
function deepClone(value,hash = new WeakMap) {
    if (value == undefined) return value;
    // typeof 不是对象就是 string number boolean function 
    if(typeof value !== 'object') return value;
    if (value instanceof RegExp) return new RegExp(value);
    if (value instanceof Date) return new Date(value);
    let v = hash.get(value);
    if (v) { // 如果映射表中有 直接返回拷贝后的结果
        return v
    }
    // 对象 数组 拷贝 {} [] 
    // 这个instance 就是拷贝后的结果 我希望将它先存起来，下次如果在拷贝直接返回就好了
    let instance = new value.constructor; // new Object / new Array
    hash.set(value, instance); // 将拷贝前的和拷贝后的做一个映射表
    for(let key in value){ // 将当前对象中的数据拷贝到新的对象中
        if (value.hasOwnProperty(key)){ // 不拷贝原型链上的属性
           instance[key] = deepClone(value[key], hash);
        }
    }
    return instance;
}
// 循环饮用问题 如果当前这个对象已经被拷贝过了 就不要拷贝了 
var b = {}
var a = {b:b}
b.a = a
let newObj = deepClone(a);
console.log(newObj)



// newObj.a.a.a =100;
// console.log(obj); // string number 基础类型 function函数 拷贝的是对象(正则 日期。。。)或者数组 undefined null
// 解构赋值 结构相同可以把解构中的数据获取到
// 剩余运算符, 只能用到最后一个参数中
let [, ...args] = [1, 2, 3]; // Rest element must be last element
// es6语法中默认值就是 =  通过：来改名字 
let {name,age1=0,age:age2} = {name:'zf',age:10};
console.log(name, age1, age2)

let {b,...obj} = {a:1,b:2,c:3}
console.log(obj);

// 数据结构 链表 队列 栈 集合 hash表 图 树
// set 集合 和 map 映射表

let arr1 = [1,1,1,2,6]; // [1,2,6]
let arr2 = [1,2,3,4]; // 数组求交集 差集 并集
let set = new Set(arr1); // 集合不能重复的项

// 把两个数组变成 concat 展开运算符 [1,1,1,2,1,2,3,4]
let union = new Set([...arr1,...arr2]);
console.log(union);

function intersection(a,b){
    let s1 = new Set(a);
    let s2 = new Set(b); // set 可以判断是否存在 用get,set,has方法
    return [...s1].filter(item=>{ // 过滤出如果返回true 表示保留起来
        return s2.has(item)
    })
    // 类数组 有索引 有长度 数组能迭代 
}
console.log(intersection(arr1, arr2));

// map vue3 里面的数据结构 arr {}  set/map 
 
// 不能对象套对象 map他的key 可以使任何值  不能放重复项目
let map = new Map([['a',1],['a',1],[{a:1},{b:1}],[{a:1},{b:1}]]);
console.log(map);
map.set('b',1);
console.log(map.get('b'))
// map.forEach ... set get  forEach


// WeakMap 不会导致内存泄漏
let a = {b:1};
let m = new WeakMap(); // WeakMap WeakSet 表示都是弱引用 （key只能是个对象）
m.set(a,100);
a = null;
console.log(m);


// {...{}} // 这个语法是es7 不是es6
// Array.from 不借助自身的迭代器的 ...能展开的内容必须要有迭代器
// console.log([...{ // 生成器可以产生迭代器
//     0: 1,
//     1: 2,
//     length: 2,
//     [Symbol.iterator]:function*(){
//         let idx = 0;
//         while(idx !== this.length){
//             yield this[idx++];
//         }
//     }
// }])
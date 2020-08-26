// defineProperty(修改原对象) proxy(代理) 数据劫持 
// let el = {
//     _content: '',
//     get html() {
//         return this._content;
//     },
//     set html(value) {
//         this._content = value;
//     }
// }

// el.html = '123'
// console.log(el.html);

// let obj = {}
// let newA = 123;
// Object.defineProperty(obj,'a',{ // 当前定义属性时可以自己增加一些配置
//     enumerable:false, //如果用es5 来模拟es6的类 需要使用此方法
//     configurable:false, // 能不能被配置 来判断是否能被重新定义
//     get(){
//         return newA;
//     },
//     set(value){
//         newA = value
//     }
// });
//  obj.a = 345
// console.log(obj.a)

// Object.freeze 性能优化 

// let obj1 = Object.freeze({ a: 1}); // 当前被冻结后的对象 不能再次被改写了
// Object.defineProperty(obj1,'qqq',{
//     get(){},
//     set(){}
// })


// 数据劫持 vue 要监控 数据的变化 数据变化后 需要更新视图
let data ={ // 给所有属性 都重新定义 增加get和set
    a:1,
    b:2,
    obj:{}
}
const update =()=>{
    console.log('update view'); //模拟更新视图 
}
// 不支持数组 Array.push shifit unshift pop reverse splice slice
function defineReactive(target,key,value){
    observer(value); // 如果是深层次 需要递归处理
    // 内部源码中会判断 如果不能修改直接不会重新定义属性
    if (!Object.getOwnPropertyDescriptor(target, key).configurable) return
    Object.defineProperty(target,key,{
        get(){
            return value;
        },
        set(newValue){
            if (value !== newValue) {
                value = newValue;
                update();
            }
        }
    })
}
function observer(data) {
    if(typeof data !== 'object'){
        return data
    }
    for(let key in data){
        defineReactive(data,key,data[key]);
    }
}
observer(data);
data.a = 100;
console.log(data);
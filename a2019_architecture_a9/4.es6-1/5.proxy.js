// proxy 代理 + reflect 反射 es6语法


let obj = [1,2,3]
const update = () => {
    console.log('更新')
}
let handler = {
    get(target, key) { // Reflect能反射13种
        // return target[key];
        if (typeof target[key] === 'object') {
            // 映射表
            return new Proxy(target[key], handler)
        }
        return Reflect.get(target, key)
    },
    set(target, key, value) {
        // target[key] = value;
        // return true;
        let oldValue = target[key];
        if (oldValue !== value) {
            update();
            return Reflect.set(target, key, value);
        }
        return true;
    }
}
let proxy = new Proxy(obj, handler);
// 不需要掌握更新值的api
// proxy.push('123');
// proxy.length = 100;

proxy.d = 100;
console.log(proxy);
// 以后所有对象Object的新方法都会放到 Reflect上 原有的方法也会迁移到reflect上

// let obj = Object.freeze({a:1})

// let flag = Reflect.defineProperty(obj,'c',{
//     get(){
//         return 100
//     }
// });
// console.log(flag);


// es class import 语法 数组的其他方法  
// 面向对象 __proto__ prototype
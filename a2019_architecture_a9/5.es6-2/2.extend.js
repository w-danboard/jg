// es3 -> es6
// js中 封装的功能 类 方便扩展 封装 继承 多态

function Animal(name) {
    this.name = name;
    // 判断当前这个animal 是如何调用的
    if(new.target === Animal){
        throw new Error('这是一个抽象类 not new')
    }
}
Animal.prototype.eat = function () {
    console.log('吃肉')
}

function Tiger(name){ // this
    Animal.call(this,name);
    
}
// Tiger.prototype = Animal.prototype  错误的这叫混合 
// Tiger.prototype.__proto__ = Animal.prototype;
// Object.setPrototypeOf(Tiger.prototype,Animal.prototype)

function create(parentPrototype){
    function Fn(){}
    Fn.prototype = parentPrototype
    let instance = new Fn();
    instance.constructor = Tiger;
    return instance
}


Tiger.prototype = Object.create(Animal.prototype,{constructor:{value:Tiger}});
let tiger = new Tiger('老虎');
console.log(tiger.name); // 继承了实例属性
console.log(tiger.eat()); // 公共方法
console.log(tiger.constructor)


// 继承实例属性 .call
// 继承公有属性 Child.prototype.__proto = Parent.prototype
//             Object.create() es5的方法
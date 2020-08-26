class Animal{ // Object.defineProperty
    // 静态方法 Promise.all es6不支持静态属性
    static get a(){ // 静态方法也是可以被继承的
        return 100;
    }
    constructor(name){
        this.name = name;
    }
    eat(){ // Animal.prototype.eat
        console.log('吃肉')
    }
    get a(){ // Animal.prototype.a = 100;
        return 100;
    }
}

class Tiger extends Animal{ // 会继承实例 + 公共属性
    constructor(name){ // 写了constrcutor继承必须要写super 
        super(name); // super就是父类  Animal.call(this,name)
    }
    eat(){ // Animal.prototype
        super.eat();
        console.log('吃菜')
    }
}
// Tiger.__proto__ = Animal
let tiger = new Tiger('老虎');
console.log(Tiger.a,tiger.eat());
//实例属性 公共属性 静态方法 属性访问器

// 装饰器 肯定会被废弃  es7语法


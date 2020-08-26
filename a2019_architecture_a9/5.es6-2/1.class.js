// es3 -> es6
// js中 封装的功能 类 方便扩展 封装 继承 多态

function Animal(name) {
    this.name = name;
}
Animal.prototype.eat = function () {
    console.log('吃肉')
}
let animal = new Animal('老虎1');
let animal1 = new Animal('老虎2');
// 1.类中的属性 实例属性  公有属性
// 每个实例查找时 都会通过__proto__ 属性 所属类的原型
console.log(Animal.prototype === animal.__proto__)
console.log(animal.__proto__.constructor === Animal);
console.log(Animal.__proto__ === Function.prototype);
console.log(Animal.prototype.__proto__ == Object.prototype )
console.log(Object.prototype.__proto__ == null);
console.log(Function.prototype.__proto__ == Object.prototype)


// 实现继承
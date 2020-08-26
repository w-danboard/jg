## 一.简答题

### 1.说一下promise底层实现机制?

### 2.说一下es6的新特性，箭头函数的特点？

### 3.当执行 new Foo() 后，发生了什么? 

### 4.什么是 JavaScript 原型和原型链?有什么特点?

### 5.继承的几种方式

### 6.AMD CMD require规范的区别

### 7.说一下深拷贝和浅拷贝 （实现机制）

### 8.说一说事件循环（event loop）？

### 9.什么是前后端分离

### 10.js垃圾回收机制

### 11.函数柯里化和反柯里化

### 12.函数节流和函数防抖

### 13.发布订阅者模式和观察者模式

###  14.Promise.finally实现原理? 

### 15.请写出ES6中Array.isArray的代码实现

(什么是事件冒泡,什么是事件代理)

## 二.JS基础

```javascript
console.log(typeof {} === 'object');
console.log(typeof [] === 'object');
console.log(typeof {} === typeof []);
console.log([5, 9, 1] === [5, 9, 1])
console.log({} === {}) ;
console.log({a: 1} == {a: 1}) ;
console.log(-1 == '')
```

```javascript
const a = [];
for (var i = 0; i < 10; i++) {
  a.push(function () {
     return console.log(i)
  })
};
a[0]();
a[1]();
```

```javascript
var a=1;
Var obj ={
   "name":"tom"
}
function fn(){
   var a2 = a,
   obj2 = obj,
   a2 =a,
   obj2.name =”jack”
}
fn();
console.log(a);
console.log(obj);
```

```javascript
function Foo() {
    getName = function () {
        console.log(1);
    };
    return this;
}
Foo.getName = function () {
    console.log(2);
}
Foo.prototype.getName = function () {
    console.log(3);
}
var getName = function () {
    console.log(4);
};
function getName() {
    console.log(5);
};
Foo.getName();  
getName();  
Foo().getName(); 
getName(); 
new Foo.getName()
new Foo().getName();
new new Foo().getName()
```

```javascript
var a = {
    name: '小明'
};
var b = a;
a = {
    name: '小王'
};
console.log(a.name);
console.log(b.name);
```

```javascript
function test() {
    return 12;
}
function test1() {
    return "test"
}
function test2(a, b) {
    return a + b
}
function main() {
    var temp = test;
    var temp1 = test1();
    console.log(test2(temp(), temp1))
}
main()
```

```javascript
if(!("a" in window)){
	var a = 1;
}
console.log(a)
```

```javascript
function MyObj(){
    this.p.pid++;
}
MyObj.prototype.p = {pid:0}
MyObj.prototype.getNum = function (num) {
    return this.p.pid + num;
}

var _obj1 = new MyObj();
var _obj2 = new MyObj();
console.log(_obj1.getNum(1) + _obj2.getNum(2));
```

```javascript
var func  = (function(a){
    this.a = a;
    return function (a){
        a+= this.a;
        return a;
    }
})(function(a,b){
    return a
}(1,2));

func(4);
```

### 三.事件环

```javascript
var m = true;
setTimeout(function () {
  m = false;
}, 3000);
while (m) {}
console.log('OK');
```

```javascript
const p =Promise.resolve();
;(()=>{
    const implicit_promise = new Promise(resolve =>{
        const promise = new Promise(res=>res(p)); 
        promise.then(()=>{
            console.log('after:await');
            resolve()
        })
    });
    return implicit_promise
})();
p.then(()=>{ 
    console.log('tick:a');
}).then(()=>{
    console.log('tick:b');
}).then(()=>{
    console.log('tick:c');
});
```

```javascript
setTimeout(function () {
    console.log('setTimeout')
}, 0)
async function asyncFunc1 () {
    console.log('asyncFunc1 start')
    await asyncFunc2()
    console.log('asyncFunc1 end')
}

async function asyncFunc2 () {
    console.log('asyncFunc2')
}

console.log('script start')
asyncFunc1()
new Promise(function (resolve) {
    console.log('promise1')
    resolve()
}).then(function () {
    console.log('promise2')
})
console.log('script end')
```






// 我要监控我家小宝宝的状态 心情很美丽  -> 不美丽
// 发布订阅 就有了关系

class Subject {
    constructor(name) {
        this.name = name;
        this.state = '心情很美丽';
        this.arr = []
    }
    attach(o) {
        this.arr.push(o);
    }
    setState(newState) {
        if (this.state !== newState) {
            this.state = newState;
            this.arr.forEach(o => o.update(newState))
        }
    }
}
class Observer {
    constructor(name) {
        this.name = name;
    }
    update(newState) {
        console.log(this.name + '收到了小宝的最先状态是' + newState)
    }
}
let s = new Subject('小宝宝');
let o = new Observer('我');
let o1 = new Observer('我妈');
s.attach(o);
s.attach(o1);
s.setState('心情不美丽'); // vue 发基于的就是观察者模式（包含发布订阅的）  watch{}
 /**
  * 观察者模式(vue是典型的观察者模式) 发布订阅
  *   两者不同：观察者模式是包括发布订阅的
  *   观察者有观察者和被观察者，如果被观察者数据变化了 会通知观察者 (是有关系的)
  */

  // 被观察者 [被观察者中 要包括观察者]
  // 我家小宝宝 心情好不好 (心情好、心情不好)
  class Subject {
    constructor(name) {
      this.name = name;
      this.observers = [];  // 被观察者 要存放在观察者中
      this.state = '心情很美丽'
    }
    // 被观察者要提供一个接受观察者的方法
    attach(observer) {
      this.observers.push(observer);  // 存放所有的观察者
    }
    setState(newState) {  // 更改被观察者的状态
      this.state = newState;
      this.observers.forEach(v => v.update(newState))
    }
  }

  // 观察者 (需要把观察者注册到被观察者中)
  class Observer {
    constructor(name) {
      this.name = name;
    }
      update(newState) {  // 用来通知所有的观察者状态更新了
        console.log(`${this.name}说: 宝宝${newState}`)
      }
  }

  let sub = new Subject('小宝宝');
  let o1 = new Observer('爸爸');
  let o2 = new Observer('妈妈');

  sub.attach(o1);
  sub.attach(o2);
  sub.setState('心情不好了');
  sub.setState('心情不好了, 呜呜~~~');
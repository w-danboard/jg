import { observe } from './index';
import { arrayMethods, observeArray } from './array';
export function defineReactive(data, key, value) {  // 定义响应式的数据变化
  // vue 不支持ie8 及 ie8 以下的浏览器
  // 如果value依旧是一个对象的话 需要深度观察
  observe(value)  // 递归观察 {} arr[1, 2, 3]
  Object.defineProperty(data, key, {
    get() {
      return value;
    },
    set(newValue) {
      observe(newValue) // 如果你设置的值是一个对象，那应该对这个对象进行监控
      if (newValue !== value) {
        value = newValue;
      }
    }
  })
};

class Observer {
  constructor (data) {  // data 就是我们刚才定义的vm._data
    // 将用户的数据使用 defineProperty重新定义
    if (Array.isArray(data)) {  // 我需要重写push方法等
      // 只能拦截数组的方法 数组里的每一项 还需要去观测一下
      data.__proto__ = arrayMethods;  // 让数组 通过链来查找我们自己编写的原型
      observeArray(data); // 观测数据中的每一项
    } else {
      this.walk(data);
    }
  }
  walk(data) {
    let keys = Object.keys(data);
    for (let i = 0; i < keys.length; i++) {
      let key = keys[i];  // 用户传入的key
      let value = data[key]; // 用户传入的值
      defineReactive(data, key, value);
    }
  }
}

export default Observer;
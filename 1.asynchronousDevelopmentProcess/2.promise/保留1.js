class Promise {
  constructor(executor) {
    this.status = 'pending'; // 默认当前状态是等待态
    this.value; // 为什么成功
    this.reason;  // 为什么失败
    this.resolveCallback = []; // 当then是pending时，我希望把成功的方法都放到数组中
    this.rejectCallback = []; // 当then是pending时，我希望把失败的方法都放到数组中
    // 表示成功的函数
    let resolve = (value) => {
      // 只有是等待态的时候 才能更改状态
      if (this.status === 'pending') {
        this.status = 'fulfilled';
        this.value = value;
        this.resolveCallback.forEach(fn => fn())  // 发布
      }
    }
    // 表示失败的函数
    let reject = (reason) => {
      // 只有是等待态的时候 才能更改状态
      if (this.status === 'pending') {
        this.status = 'rejected';
        this.reason = reason;
        this.rejectCallback.forEach(fn => fn())  // 发布
      }
    }
    try {
      // 默认会调用执行函数
      executor(resolve, reject)
    } catch(e) {
      reject(e)
    }
  }
  then(onfulfilled, onrejected) { // 成功的回调和失败的回调
    // 如果状态是成功的时候
    if(this.status === 'fulfilled') {
      onfulfilled(this.value);
    }
    // 如果装填是失败的时候
    if(this.status === 'rejected') {
      onrejected(this.reason);
    }
    // 先把成功的回调和失败的回调分开存放 (订阅)
    if(this.status === 'pending') {
      this.resolveCallback.push(() => {
        onfulfilled(this.value)
      });
      this.rejectCallback.push(() => {
        onrejected(this.value)
      });
    }
  }
}

module.exports = Promise;
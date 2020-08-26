function EventEmitter(){
    this._events = Object.create(null);
}
// {key:[fn,fns]}
EventEmitter.prototype.on = function (eventName,callback) {
    // 有可能这个名字是newListener
    // 只要绑定了名字就需要找newListener中对应的方法依次执行
    if (!this._events) this._events = Object.create(null);
    this.emit('newListener',eventName); // 如果绑定了事件就触发一下newListener方法 
    // 默认先去已经订阅好的结果中拿到callbacks 如果没有默认是[]
    let callbacks = this._events[eventName] || [];
    callbacks.push(callback); // 把当前的callback放到数组中 
    this._events[eventName] = callbacks
}
// [fn,fn]
EventEmitter.prototype.emit = function (eventName,...args) {
    let callbacks = this._events[eventName] || [];
    callbacks.forEach(fn => {
        fn(...args);
    });
}
EventEmitter.prototype.off = function (eventName,callback) {
    let callbacks = this._events[eventName] || [];

     this._events[eventName] = callbacks.filter((cb) => {
         // one callback  one.callback == callback
        return cb !== callback && cb.callback !== callback;
    });
    // let index = callbacks.indexOf(callback);
    // callbacks.splice(index,1);
}
EventEmitter.prototype.once = function (eventName, callback) {
    const one = (...args)=>{
        callback(...args); // 执行原函数
        this.off(eventName, one); // 关闭one事件
    }
    one.callback = callback; // 自定义事件
    this.on(eventName, one); // 先绑定
}   
module.exports = EventEmitter


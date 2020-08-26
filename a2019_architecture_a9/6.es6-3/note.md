- call、bind、apply原理  fn.call(this,[a,b,c])
- 函数柯里化和反柯里化
- 常用数据结构
- 数组的compose方法 reduce

- 箭头函数
- 浏览器事件环 https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/


## 宏任务微任务
- 微任务： promise.then ，MutationObserver，(process.nextTick Node)

- 宏任务：script ，ajax ， 事件，requestFrameAnimation， setTimeout ，setInterval ，setImmediate （ie下），MessageChannel ，(I/O) ，UI rendering。
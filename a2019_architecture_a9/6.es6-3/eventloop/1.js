setTimeout(() => {
    console.log('timeout');
    Promise.resolve().then(data => {
        console.log('then1');
    }).then(data => {
        console.log('then4');
    })
    Promise.resolve().then(data => {
        console.log('then2');
    })
    Promise.resolve().then(data => {
        console.log('then3');
    })
}, 0);
Promise.resolve().then(data => {
    console.log('then');
    setTimeout(() => {
        console.log('timeout1')
    }, 0);
})
// then timeout then1 then2 then3 then4 timeout1

// 默认会执行当前脚本 先把脚本执行完毕后 取出所有的微任务进行处理，处理完毕后,从宏任务 获取第一个任务执行，第一个宏任务执行完毕 ，会再次清空微任务 。 在依次去取宏任务

// Vue.nextTick() 延迟执行某个函数 (异步api 可以等待同步代码都执行完毕 后再去执行这里的回调)
// vue的特点 异步更新数据 会在当前代码执行完毕后 把更新（异步）操作 放到队列中


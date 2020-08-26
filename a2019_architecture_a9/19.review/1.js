
setTimeout(function () {
    console.log('setTimeout')
}, 0)
async function asyncFunc1 () {
    console.log('asyncFunc1 start')
     await asyncFunc2()
     Promise.resolve(asyncFunc2()).then()
    // new Promise(res=>res(asyncFunc2())).then(()=>{
       console.log('asyncFunc1 end'); //  微任务 ?
    // })
   
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
    console.log('promise2') // 不是马上走的
})
console.log('script end')

// script start  
// asyncFunc1 start
// asyncFunc2
// promise1
// script end
// promise2
// asyncFunc1 end
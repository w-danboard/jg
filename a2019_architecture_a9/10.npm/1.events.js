// node 核心异步非阻塞  监听，异步完成之后去处理 
// 发布订阅模式 先做好监听，异步成功后通知我
let EventEmitter = require('events'); // on/emit/off /once/newListener
let util = require('util'); // promisify inherits 判断类型  util.types.类型校验
// $on $emit   {a:[fn,fn2],b:[fc,fc]}
/* <my-component @a="fn"  @a="fn2" @b="fc" @b="fc"></my-component> */

// Object.setPrototypeOf __proto__
function Girl (){
}
util.inherits(Girl, EventEmitter); // 实现继承公共属性
let girl = new Girl();
girl.on('newListener',function (type) { // 每次我调用on方法的时候 就会触发此函数
    console.log('type',type)
    process.nextTick(()=>{  
         girl.emit(type);
    })
})
girl.on('newListener', function (type) { // 每次我调用on方法的时候 就会触发此函数
    // console.log('type', type)
    process.nextTick(() => {
        girl.emit(type);
    })
})
// girl.once('女生失恋', function (who) { // 1绑定的时候 触发了 newListener
//     console.log('哭' + who)
// })

// addListener
// girl.once('女生失恋', listener); // // 1绑定的时候 触发了 newListener
// removeListener
// girl.off('女生失恋', listener)

// girl.emit('女生失恋','因为xxx');
// girl.emit('女生失恋', '因为xxx');
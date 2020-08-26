let proto = {

}
function defineGetter(target,property){
    proto.__defineGetter__(property,function () {
        // 这里的this指代的不是proto 而是 用户调用获取url时，那个代理对象 context
        return this[target][property]
    });
}
function defineSetter(target,property){
    proto.__defineSetter__(property,function (value) {
        this[target][property] = value;
    })
}
// ctx.url = > ctx.request.url
defineGetter('request','url');
defineGetter('request','path');

// ctx.body = ctx.response.body;
// ctx.body=; ctx.response.bod=
defineGetter('response','body')
defineSetter('response','body'); 
module.exports = proto;


// let obj = {
//     a:{
//         b:1
//     }
// }
// // obj.b
// obj.__defineGetter__('b',function () {
//     return obj.a.b
// })
// console.log(obj.b);
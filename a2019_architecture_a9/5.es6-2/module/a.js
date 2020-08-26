

// export 语法默认不能导出一个具体的内容
// “接口” 我可以通过某个接口拿到这个属性

// export default 可以导出一个具体的值
// 等价于 默认把结果放到了default属性上
 let str1 = 1;
 let str2 = 1;
 let str3 = 'hello';


setInterval(()=>{
    str1++;
},1000)

export {
    str1,
    str2,
    str3
    //str2 as default // 导出的时候 重命名叫做default
}
//  export default 'world'
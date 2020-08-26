// es6中的模块
// esModule  node模块 require module.exports
// 静态导入  （最外层作用域下使用）  动态导入

// 模块的概念 多个模块之间相互独立  解决变量冲突问题 单例模式  可以方便维护

// 模块的核心 就是当前的内容 放到一个函数 
// import /  export (es6中每个文件就是一个模块)

// 1。我们可以一一列举获取 2.可以用 * as  3.给接口取别名
// 3.我们可以每次通过 接口名 获取最新接口对应的值

// import {default as str} from './a'; // 如果一个个导出的 我可以一个个的拿出来用
// import * as obj from './a';
// import xxx,{str1 as str3} from './a';
// setInterval(()=>{
//     console.log(str3);
// },1000);

// export 导出一个接口 export default 导出的是一个具体的值 
// export {xxx}  /  import {xxx} from './xx'
//                  import * as obj from './xxx';
// export default / import xxx from './xxx';
//                  import {default as xxx} from './xxx'

console.log(all)
import * as all from  './all'; // 具备变量提升的功能
setInterval(()=>{
    console.log(all);
},1000);

// 草案语法 可以写到 代码块中
if(true){
    import('./video').then(data=>{
        console.log(data.default,'---'); // * as data
    }); // import()是返回的promise，动态导入某个文件
}

// vue 代码除了入口文件 其他的都是export function(){}

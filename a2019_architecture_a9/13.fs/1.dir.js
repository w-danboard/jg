// fs文件操作 
    // fs.readFile fs.writeFile
    // fs.createReadStream  fs.writeStream 
    // fs.appendFile
    // mkdir 创建目录(目录不能存在) rmdir删除目录 rename 重命名
    // unlink 删除文件
    // stat文件的状态 exists是否存在 
// 目录操作

// 目录 像树 树的遍历
// 同步创建目录
// function mkdirSync(dirs){
//     dirs = dirs.split('/');
//     for(let i =0 ; i < dirs.length;i++){
//         let currentDir = dirs.slice(0,i+1).join('/');
//         try{
//             let statObj = fs.statSync(currentDir); // isFile isDirectory
//         }catch(e){ // 没有这个目录才创建目录
//             fs.mkdirSync(currentDir);
//         }
//     }
// }
// mkdirSync('q/e/b/c/d/e/qqq/xxx/ooo')

// 异步创建目录

// function mkdir(dirs,callback){
//     dirs = dirs.split('/');
//     let index = 0; // 异步方法迭代 使用next函数 替换for循环
//     function next(){
//         if(dirs.length === index){
//             return callback();
//         }
//         let current = dirs.slice(0,++index).join('/');
//         fs.stat(current,function (err,statObj) {
//             if(!err){ // 没错误说明文件存在了
//                return next();
//             }
//             fs.mkdir(current,next);
//         });
//     }
//     next();
// }
// mkdir('m/x/y/z',function () {
//     console.log('创建成果')
// });


// 同步删除目录 
// let fs = require('fs');
// let path = require('path')
// let baseDir = './a'
// let statObj = fs.statSync(baseDir);

// let dirs = fs.readdirSync(baseDir); // 只能读取儿子级别

// dirs = dirs.map(dir=>{
//     return path.join(baseDir,dir)
// })

// for(let i = 0 ; i< dirs.length;i++){
//     let current = dirs[i];
//     let statObj = fs.statSync(current);
//     if(statObj.isFile()){
//         fs.unlinkSync(current);
//     }else{
//         fs.rmdirSync(current)
//     }
// }
// console.log(dirs);

// let fs = require('fs');
// let path = require('path')
// function rmdirSync(url){ // 写递归 考虑两级
//     let statObj = fs.statSync(url);
//     if(statObj.isDirectory()){
//         let dirs = fs.readdirSync(url);
//         dirs = dirs.map(dir=>path.join(url,dir)); // 
//         dirs.forEach(dir=>rmdirSync(dir));
//         fs.rmdirSync(url); 
//     }else{
//         fs.unlinkSync(url);
//     }
// }
// rmdirSync('q');


// 异步"串行"删除  
// let fs = require('fs');
// let path = require('path')
// function rmdir(url,callback){
//     fs.stat(url,function (err,statObj) {
//          if(statObj.isDirectory()){
//             fs.readdir(url,function (err,dirs) {
//                 dirs = dirs.map(dir=>path.join(url,dir));
//                 let index = 0;
//                 function next(){ // 用来迭代异步
//                     if(dirs.length == index) return fs.rmdir(url,callback); // 终止条件
//                     let dir = dirs[index++]; // 获取到第一个路径时 需要将其删掉
//                     rmdir(dir,next)
//                 }
//                 next();
//             })
//          }else{
//             fs.unlink(url,callback)
//          }
//     });
// }
// rmdir('s',function () {
//     console.log('删除成功')
// })

// 异步并行 Promise.all原理是一样的
// let fs = require('fs');
// let path = require('path')
// function rmdir(url,callback){
//     fs.stat(url,function (err,statObj) {
//          if(statObj.isDirectory()){
//             fs.readdir(url,function (err,dirs) {
//                 dirs = dirs.map(dir=>path.join(url,dir));
//                 let index = 0;
//                 if(dirs.length === 0){return fs.rmdir(url,callback)}
//                 function done(){ // 删除完毕后需要调用done方法，这个时候回就计数，如果当前删除的儿子个数和目录个数相同 则将自己删掉
//                     if(++index == dirs.length){ 
//                         fs.rmdir(url,callback)
//                     }
//                 }
//                 dirs.forEach(dir => {
//                     rmdir(dir,done)
//                 });
//             })
//          }else{
//             fs.unlink(url,callback)
//          }
//     });
// }
// rmdir('a',function () {
//     console.log('删除成功')
// })


// promise版本的
// let fs = require('fs');
// let path = require('path')
// function rmdir(url){
//     return new Promise((resolve,reject)=>{
//         fs.stat(url,function (err,statObj) {
//             if(statObj.isFile()){
//                 fs.unlink(url,resolve)
//             }else{
//                 fs.readdir(url,function (err,dirs) {
//                     dirs = dirs.map(dir=>path.join(url,dir));
//                     Promise.all(dirs.map(dir=>rmdir(dir))).then(()=>{
//                         fs.rmdir(url,resolve);
//                     })
//                 });
//             }
//         })
//     })
// }
// rmdir('a').then(function () {
//     console.log('删除成功')
// })

let fs = require('fs');
let path = require('path')
// async function rmdir(url){ // async 返回的就是一个promise
//     let statObj = await fs.stat(url);
//     if(statObj.isFile()){
//         await fs.unlink(url)
//     }else{
//         let dirs = await fs.readdir(url);
//         dirs = dirs.map(dir=>rmdir(path.join(url,dir)));
//         await Promise.all(dirs)
//         await fs.rmdir(url);
//     }
// }
// rmdir('a').then(function () {
//     console.log('删除成功');
// });
// 广度遍历  + http 开头 

// 可以直接使用linux命令 rm -rf


// 广度遍历 异步并行
// 写递归 栈执行过多  -> 栈行结果  数组 来取代 创建函数


let wideSync = (root)=>{
    let arr = [root];
    let index = 0;
    let current;
    while(current = arr[index++]){// current的返回值会作为while循环的结果
        let stateObj = fs.statSync(current);
        if(stateObj.isDirectory()){
            let dirs = fs.readdirSync(current);
            arr = arr.concat(dirs.map(dir=>path.join(current,dir)));
        }else{ // 如果是文件删除即可 并且将当前项 置成undefined 
            arr[index] = undefined; // 这一项不要了
            fs.unlinkSync(current); // 遍历树的时候 直接将文件节点删除
        }
    }
    while (--index >= 0) { // 倒序删除
        if(arr[index]){
            fs.rmdirSync(arr[index]);
        }
    }
}
wideSync('a');
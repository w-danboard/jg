// 广度 深度

// 文件

let fs = require('fs');

// fs.mkdir 也分同步和异步

// 1） --------------------------- 同步
// function mkdirSync(path) {
//   let arr = path.split('/');
//   for (let i = 0; i < arr.length; i++) {
//       let p = arr.slice(0, i + 1).join('/');
//       try {
//         fs.accessSync(p)    // 判断文件夹存不存在
//       } catch (e) {
//         fs.mkdirSync(p)     // 不存在就会报错 走到创建文件这里
//       }
//   }
// }

// mkdirSync('q/a/c/d/e/g');


// 2）--------------------------- 异步
//  异步都有callback参数
// function mkdir(path, callback) {
//     let arr = path.split('/'); // ['a','v','b','n','d']
//     // 异步不支持for循环 所以自己写了一个next()函数代替for循环
//     let index = 0;
//     function next() {
//         // 递归必须要有终止条件
//         if (index >= arr.length) return callback();
//         let p = arr.slice(0, index + 1).join('/');
//         // 每次取当前的路径看是否存在
//         fs.access(p, err => {
//             if (err) { // 不存在就创建
//                 index++;
//                 fs.mkdir(p, next);
//             } else {
//                 index++;
//                 next(); // 如果文件夹存在 就去创建下一个
//             }
//         })
//     }
//     next();
// }
// mkdir('a/v/b/n/d', () => {
//     console.log('停止');
// })

// 3）--------------------------------- 如何删除目录 同步
// fs.unlinkSync('./name1.txt'); // 删除文件




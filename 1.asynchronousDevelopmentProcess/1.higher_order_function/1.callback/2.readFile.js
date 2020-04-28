let fs = require('fs');
let path = require('path');

let namePath = path.resolve(__dirname, 'name.txt');
let eagPath = path.resolve(__dirname, 'age.txt')

function after(items, ck) { // 用after函数 可以简化异步操作
  let arr = [];
  return function(err, data) {
    if(err) {
      throw new Error(err);
    }
    arr.push(data); // 把结果传递到对应的callback中
    if(--items === 0) {
      ck(arr);
    }
  }
}

let newFn = after(2, function(arr) {
  console.log(arr); // 当异步完成后触发
})

/**
 * 注意事项:
 *  1.异步不能使用try catch
 */
fs.readFile(namePath, 'utf8', function(err, data) {
  newFn(err, data)
})

fs.readFile(eagPath, 'utf8', function(err, data) {
  newFn(err, data)
})
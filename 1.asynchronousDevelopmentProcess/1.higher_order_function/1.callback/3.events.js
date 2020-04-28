let fs = require('fs');
let path = require('path');

let namePath = path.resolve(__dirname, 'name.txt');
let eagPath = path.resolve(__dirname, 'age.txt')

/**
 * 发布 -》 [中间代理] 《- 订阅
 *  发布和订阅两者之间没有任何关系，通过的都是中间代理。比如你想订一份麻辣烫，你不会去跟店家说，你会找外卖平台，跟外卖平台说我要订一碗麻辣烫。然后店家麻辣烫做好了，会通知外卖平台做好了，你可以送餐了。
 */

 function Events() {
    this.callbacks = [];
    this.results = [];
 }

 // 订阅
 Events.prototype.on = function(callback) {
   this.callbacks.push(callback);
 }

 // 发布
 Events.prototype.emit = function(data) {
   this.results.push(data);
   this.callbacks.forEach(v => v(this.results));
 }

 let e = new Events()

 e.on(function(arr) {
   if(arr.length === 2) {
    console.log(arr)
   }
 })


/**
 * 注意事项:
 *  1.异步不能使用try catch
 */
fs.readFile(namePath, 'utf8', function(err, data) {
  e.emit(data)
})

fs.readFile(eagPath, 'utf8', function(err, data) {
  e.emit(data)
})
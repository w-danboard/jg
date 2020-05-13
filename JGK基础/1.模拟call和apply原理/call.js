function fn1() {
  console.log(this, arguments)
}
function fn2() {
  console.log(this, arguments)
}

// call的特点
// 1. 可以改变我们当前函数的this指向
// 2. 还会让当前函数执行

// Function.prototype.call = function(context) {
//   this();  // fn2()
// }

Function.prototype.call = function(context) {
  context = context ? Object(context) : window;
  context.fn = this;
  let args = [];
  // console.log('arguments===>', context, arguments)
  for(let i = 1; i < arguments.length; i++) {
    args.push('arguments['+ i +']')
  }
  // 利用数组的toString的特性
  let r = eval('context.fn('+ args +')');
  delete context.fn;
  // console.log('===>', r)
}

fn1.call(fn2, 1, 3, 4)
// 如果多个call 会让call方法执行 并把call中的this改变成fn2
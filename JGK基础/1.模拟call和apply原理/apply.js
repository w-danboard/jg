Function.prototype.apply = function(context, args) {
  context = context ? Object(context) : window;
  context.fn = this;
  if (!args) {
    return context.fn()
  }
  let r = eval('context.fn('+ args +')')
  delete context.fn
}

fn1.apply(fn2, [1, 2, 3, 4, 5, 6])
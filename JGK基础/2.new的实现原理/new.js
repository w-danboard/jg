function Animal(type) {
  this.type = type;
  // 
  return
}
Animal.prototype.say = function() {
  console.log('say');
}
function mockNew() {
  // Constructor =》 animal 剩余的arguments就是其他的参数
  let Constructor = [].shift.call(arguments);
  let obj = {}; // 返回的结果
  obj.__proto__ = Constructor.prototype;
  Constructor.apply(obj, arguments);
  return obj;
}
let animal = mockNew(Animal, '哺乳类');

console.log(animal.type);
animal.say()
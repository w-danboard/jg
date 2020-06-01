import { initState } from './observe';
import Watcher from './observe/watcher';

function Vue(options) { // vue中原始用户传入的数据
  this._init(options);  // 初始化vue 并且将用户选项传入
};

Vue.prototype._init = function(options) {
  // vue中的初始化 this.$options  表示的是vue中参数
  let vm = this;
  vm.$options = options;

  // MVVM原理 需要数据重新初始化
  // 拦截数组的方法和对象的属性
  initState(vm); // data computed watch
  // ...

  // 初始化工作  vue1.0 =>
  if(vm.$options.el) {
    vm.$mount();
  }
}

// 渲染页面 将组件进行挂载
function query(el) {
  if(typeof el === 'string') {
    return document.querySelector(el);
  }
  return el;
}
// ?: 匹配不捕获 不捕获当前的分组
// + 至少一个
// ? 尽可能少匹配
// 源码里的模板编译 也是基于正则的
const defaultRE = /\{\{((?:.|\r?\n)+?)\}\}/g;
const util = {
  getValue(vm, expr) {  // scholl.name
    let keys = expr.split('.');
    return keys.reduce((memo, current) => {
      memo = memo[current];
      console.log('memo---', memo)
      return memo;
    }, vm)
  },
  compilerText(node, vm) {  // 编译文本 替换{{}}
    node.textContent = node.textContent.replace(defaultRE, function(...args) {
      console.log('util.getValue(vm, args[1])', util.getValue(vm, args[1]))
      return util.getValue(vm, args[1])
    })
  }
}
function compiler(node, vm) { // node是文档碎片
  let childNodes = node.childNodes; // 只有第一层 只有儿子 没有孙子
  // 将类数组转化成数组
  [...childNodes].forEach(child => {  // 一种元素 一种文本
    if(child.nodeType == 1) { // 1元素 3文本
      compiler(child, vm); // 编译当前元素的孩子节点
    } else if(child.nodeType == 3) {
      util.compilerText(child, vm);
    }
  })
}
Vue.prototype._update = function() {
  //用户传入的数据 去更新视图
  let vm = this;
  let el = vm.$el;
  
  // ---------------- 以下逻辑 讲完会用虚拟DOM重新写
  // 要循环这个元素 将里面的内容 换成我们的数据

  let node = document.createDocumentFragment();
  let firstChild;
  while(firstChild = el.firstChild) { // 每次拿到第一个元素 就将这个元素放入到文档锁片中
    node.appendChild(firstChild)  // appendChild 是具有移动的功能
  }
  compiler(node, vm);
  el.appendChild(node);
  // 需要匹配{{}}的方式来进行替换
  
  // 依赖收集 属性变化了 需要重新渲染
}
Vue.prototype.$mount = function() {
  let vm = this;
  let el = vm.$options.el; // 获取元素  #app
  el = vm.$el =  query(el); // 获取当前挂载的节点 vm.$el就是我要挂载的一个元素

  // 渲染是通过watcher来渲染的
  // 渲染watcher 用于渲染的watcher
  // vue2.0 组件级别更新  new Vue 产生一个组件

  let updateComponent = () => { // 更新组件、渲染的逻辑
    vm._update(); // 更新组件
  }
  new Watcher(vm, updateComponent); // 渲染watcher 默认会调用updateComponent这个方法
  
}
export default Vue;
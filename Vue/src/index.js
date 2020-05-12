import Vue from 'vue';  // 会默认先查找source 目录下的vue文件夹

// es6类 构造函数 es5的类 (源码里用了es5的构造函数)
// 为什么用es5的构造函数

let vm = new Vue({
  el: '#app', // 表示要渲染的元素是app
  data() {
    return {
      msg: 'hello',
      school: {
        name: 'zf',
        age: 18
      },
      arr: [{a: 1}, 1, 2, 3]
    }
  },
  computed: {

  },
  watch: {

  }
})
// vm.msg = vm._data.msg  // 代理

// 怎么能监听到数组? 答: 就是对原生的方法进行劫持
// 如果新增的属性 也是对象类型 我们要对新增的对象也进行观察
console.log(vm.arr[0]['a'] = 100)

// 什么样的数组会被观测 [0, 1, 2] observe 不能直接改变索引 不能被检测到
// [1, 2, 3].length-- 因为数组的长度变化 我们没有检测
// [{a: 1}] 内部会对数组里的对象进行观察

// [].push shift unshift 这些方法可以被监控 vm.$set 内铺调用的就是数组的splice方法
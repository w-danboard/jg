// js中的数据结构 队列 栈 hash表 key=>value  图 树 链表 集合

// 队列 先进的先出 数组 .push  .shift()

// 栈 .push .pop js函数的执行 典型的栈结构 (执行上下的创建和销毁的过程)
// js叫 静态作用域
function a(){ // 销毁的属性
    function b() {
        function c() {
            debugger;
        }
        c();
    }
    b();
}
a();

// map es6 可以有一个key 查找快
// set 可以放不重复的项 
// 图 邻接表 来表示

// 树 二叉树 
// 链表 比队列 栈更方便 45继续
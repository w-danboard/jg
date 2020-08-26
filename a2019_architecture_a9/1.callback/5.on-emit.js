
let fs = require('fs'); 

let events = {
    dataSource:[],
    arr:[],
    on(callback){
        this.arr.push(callback);
    },
    emit(data){
        this.dataSource.push(data);
        this.arr.forEach(fn => fn(this.dataSource));
    }
}

// events.on(function (result) { // 发布订阅可以实现解耦合
//     if(result.length === 2){
//         console.log('订阅', result)
//     }
// });
fs.readFile('./age.txt', 'utf8', function (err, data) {
    events.emit(data);
})
fs.readFile('./name.txt', 'utf8', function (err, data) {
    events.emit(data);
})

// 发布订阅 和 观察者模式的区别 有关系的
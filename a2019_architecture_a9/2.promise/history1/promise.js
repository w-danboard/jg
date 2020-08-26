// promise 代表的是承诺 我答应你...
// 我答应给我媳妇买个包 1.买了 成功态  2.不买 失败态  3. 等待态
// 只有等待态 才可以将状态变成 成功/失败 不能将已经成了在转换成其他状态 ，失败也不能转化成功
// 1.每个promise需要提供一个执行器函数（这个函数 会立即执行）
// 2.new Promise之后会产生一个promise实例，这个实例上存在一个then方法
// 3.executor中需要提供一个成功的方法和一个失败的方法
const PENDING = 'PENDING'; // 等待
const RESOLVED = 'RESOLVED'; // 成功
const REJECTED = 'REJECTED' // 失败
class Promise{
    constructor(executor){
        this.stauts = PENDING;
        this.value = undefined; // 成功的原因
        this.reason = undefined; // 失败的原因
        let resolve = (value)=>{ // 成功的函数
            if(this.stauts === PENDING){
                this.stauts = RESOLVED;
                this.value = value;
            }
        }
        let reject = (reason)=>{ // 失败的函数
            if (this.stauts === PENDING){
                this.stauts = REJECTED; // 改变状态
                this.reason = reason // 和原因
            }
        }
        try{
            executor(resolve, reject);
        }catch(e){
            reject(e);
        }
    }
    then(onFulfilled, onRejected){
        if (this.stauts === RESOLVED ){
            onFulfilled(this.value)
        }
        if (this.stauts === REJECTED ){
            onRejected(this.reason);
        }
    }
}
module.exports = Promise; // 将Promise类暴露出去
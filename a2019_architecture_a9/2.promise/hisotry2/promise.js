
const PENDING = 'PENDING'; // 等待
const RESOLVED = 'RESOLVED'; // 成功
const REJECTED = 'REJECTED' // 失败
class Promise{
    constructor(executor){
        this.stauts = PENDING;
        this.value = undefined; // 成功的原因
        this.reason = undefined; // 失败的原因
        // --------------------------
        this.onResolvedCallbacks = []; // 存储成功的回调
        this.onRejectedCallbacks = [];
        let resolve = (value)=>{ // 成功的函数
            if(this.stauts === PENDING){
                this.stauts = RESOLVED;
                this.value = value;
                this.onResolvedCallbacks.forEach(fn=>fn());
            }
        }
        let reject = (reason)=>{ // 失败的函数
            if (this.stauts === PENDING){
                this.stauts = REJECTED; // 改变状态
                this.reason = reason // 和原因
                this.onRejectedCallbacks.forEach(fn=>fn());
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
        // 有可能 我调用then的时候 当前promise 没有成功也没有失败
        if(this.stauts === PENDING){
            // 如果是等待状态我需要将 onFulfilled 和 onRejected  分别存放起来
            this.onResolvedCallbacks.push(()=>{
                // todo....
                onFulfilled(this.value); // AOP
            })
            this.onRejectedCallbacks.push(()=>{
                onRejected(this.reason)
            })
        }
    }
}
module.exports = Promise; // 将Promise类暴露出去
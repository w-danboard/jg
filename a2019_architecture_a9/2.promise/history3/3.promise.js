let Promise = require('./promise');

let promise = new Promise((resolve,reject) => {
    reject(100)
})

// 穿透
promise.then(null,err=>{
    throw err;
}).then(null,(err)=>{
    throw err
}).then(data=>{
    console.log(data);
},err=>{
    console.log(err,'err')
})
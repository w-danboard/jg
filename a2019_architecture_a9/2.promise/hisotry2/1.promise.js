let Promise = require('./promise'); 
let p = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject('没钱了')
    }, 1000);
});
p.then((data) => { 
    console.log(data);
}, (err) => {
    console.log(err);
})
p.then((data) => {
    console.log(data);
}, (err) => {
    console.log(err);
})
console.log(2);
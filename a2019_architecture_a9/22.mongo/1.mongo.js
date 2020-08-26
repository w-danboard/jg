const mongoose = require('mongoose');
const moment = require('moment')
// conn 表示连接后的对象
const conn = mongoose.createConnection('mongodb://username:password@localhost:27017/school',{
    useNewUrlParser:true,
    useUnifiedTopology:true
});
// 商品为例
let ProductSchema = new mongoose.Schema({
    productName:String,
    productPrice:Number,
    createAt:{
        type:Date,
        default:Date.now // 默认值 东八区 少八个小时
    } // 多了不管 少了就少存
});
let Product = conn.model('Product',ProductSchema);

// 回调的方式 
// Product.create({productName:'hello',productPrice:10},function (err,doc) {
//     console.log(doc)
// })
// (async()=>{ // 创建
//    let r =  await Product.create({productPrice:100,age:10});
//    console.log(r);
// })();

// 可以通过集合去更改数据
Product.updateOne({productName:'zf'},{productPrice:20},function (err,doc) {
    console.log(doc);
})
// (async ()=>{
//     let product =await Product.findById("5e148e7e9cd00b38903c3f9f"); // doc
//     product.productName = 'zf';
//     let r = await product.save();
//     console.log(r);
// })();

// 增删改查  限制数据的固定格式 
// 数据库  限制集合中的数据格式 骨架

// conn.on('open',function () {
//     // 当前连接成功了 
//     console.log('连接成功')
// })

// conn.on('error',function (err) {
//     console.log(err);
// })

Product.findOne({}).then(data=>{
    let r = moment(data.createAt).format('YYYY-MM-DD hh:mm:ss');
    console.log(r);
})


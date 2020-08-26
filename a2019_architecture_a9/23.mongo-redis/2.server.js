const mongoose = require('mongoose');
// conn 就是连接对象
const conn = mongoose.createConnection('mongodb://localhost:27017/db',{
    useUnifiedTopology:true,
    useNewUrlParser:true
});
// 数据库   (集合   文档)
// 集合要根据我们的字段来创建  骨架

// 用户表
let UserSchema = new mongoose.Schema({
    username:{
        required:true,
        type:String
    },
    password:String,
    age:Number
},{collection:'user'}); 
let User = conn.model('User',UserSchema);
// 建立的集合是有关系的 用户发表文章  用户和文章有关系
// (通过骨架来建立)  

let ArticleSchema = new mongoose.Schema({
    title:String,
    content:String,
    createAt:{
        type:Date,
        default:Date.now
    },
    user:{
        ref:'User', // 引用的集合是谁
        type:mongoose.SchemaTypes.ObjectId,
    }
});
let Article = conn.model('Article',ArticleSchema);

(async()=>{
    // let user = await User.create({username:'zs',password:'zs',age:3});
    // let article = await new Article({title:'保养',content:'如何保养',user:user._id}).save();
    // console.log(article);


    // 5e1720be8148bf33b0fd5d05
    let result = await Article.findById("5e1720be8148bf33b0fd5d05").populate('user',{username:1,age:1,_id:0});
    console.log(result);
})();

// 多表查询  分组需要聚合   unique:true 唯一值


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
function plugin(schema,options){ // 将方法进行了封装

    // 扩展 statics  methods 
    
    schema.virtual('usernameAndAge').get(function () {
        return this.username + ":" + this.password
    }); // 提取公共逻辑
    schema.pre('save',function (next) { // 在操作之前 githook
        // this 可以直接调用findOne 可以认为就是User
        // this.findOne({username:/zf/},function (err,data) {
        //     console.log(err)
        //     console.log(data);
        //     next();
        // })
        // 如果有密码属性 变成md5
        console.log(options);
        next(); // 之前 格式化数据  之后 一般都是存储日志 后续操作
    });
}
UserSchema.plugin(plugin,{a:1}); 
// UserSchema.post('save',function () {
//     console.log('保存完毕')
// }); // 钩子函数
let User = conn.model('User',UserSchema);
// 虚拟属性 vue计算属性
(async()=>{
    let r = await User.findOne({username:/zs/});
    console.log( r.usernameAndAge);
})();

// Nosql 不适合 多关联 存储量大


// redis 内存型数据库 速度快 开源
// 希望加快ssr 服务端返回页面的速度
// 存储回话 {expires,xxxx}  =>  string

// 最常用的类型 就是字符串 （列表 集合 有序集合 hash）
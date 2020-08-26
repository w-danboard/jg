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
},{collection:'user'}); // 默认集合名字 采用User 改成首字母小写加s
// 主要看你要操作的是什么 某一条
UserSchema.statics.findByName = function (username) { // 相当于在模型上直接扩展方法
    return this.findOne({username})
}
UserSchema.methods.findByName = function () {
    // this指代的是文档  new User({username})
    // 通过实例来获取User集合
    return this.model('User').findOne({username:this.username})
}
UserSchema.methods.saveMd5 = function () {
    this.password = require('crypto').createHash('md5').update(this.password).digest('base64');
    return this.save();
}
let User = conn.model('User',UserSchema);

// 模型 、 集合 来操作数据库  增删改查
// promise 回调的方式 第一个参数是error

(async()=>{
    // 插入的内容 骨架中必须要声明,可以比骨架中的属性少 

    // 一。插入
    // let user = await User.create({username:'zhangsan',password:'zs'});
    // console.log(user);

    // conn.close(); // 关闭数据库连接
    // find 查询所有 多条 findOne 单条 findById


    // 二。查询
    // 扩展自己的方法  原型   1) 通过集合来操作
    // let result = await User.findByName("zhangsan"); // findById id不重复 名字不重复
    // console.log(result);
    // conn.close();

    // 2) 通过文档查询
    // let result = await new User({username:'zhangsan'}).findByName();
    // console.log(result);

    // 区分 statics （通过集合来操作） 和 methods 通过某一个具体的人来操作
    // let result = await new User({username:'wangwu',password:'ww'}).save();

    // let result = await new User({username:'lisi',password:'ls'}).saveMd5()
    // console.log(result)
    
    // 分页 limit skip sort
    // let arr = []
    // for(let i = 0; i < 10;i++){
    //     arr.push({username:'zf'+i,password:'admin',age:i})
    // }
    // let r = await User.create(arr)
    // console.log(r);

    // $or $gt $lt
    // User.find({}).limit(2).skip(2).sort({age:-1}).exec(function (err,docs) {
    //     console.log(docs);
    //     conn.close();
    // })
    // await  User.find({}).limit(2).skip(2).sort({age:-1})
    // 三.修改 updateOne updateMany
    // let r = await User.updateMany({username:/zf/},{$inc:{age:5}})
    // console.log(r);

    // 四。删除 remove deleteOne deleteMany

    await User.deleteMany({})
    conn.close();   
    // 链表查询
})()



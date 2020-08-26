var db = connect('school');
// 索引 提升查询速度 可以给你要查询的内容 增加唯一标识
db.user.ensureIndex({age:-1}); // 大量的量入
// 插入的特点 
var timeStart = Date.now();
// 游标
var u = db.user.find({age:99999});
 print(u.next())
// var arr = []
// for(var i = 10; i < 100000;i++){
//     arr.push({name:'zf',age:i})
// }
// db.user.insert(arr); // 尽量减少调用语句
// while (u.hasNext()) {
//     printjson(u.next())
// }
var timeEnd = Date.now() - timeStart;
print(timeEnd)

// 驱动包 mongoose

// 备份数据 还原数据库  导入表 导出表 设置mongo权限
// 权限

// mongo + node = mongoose 提供了快捷的查询方法 和 操作数据 很多的语法 nosql  格式化存储的数据  
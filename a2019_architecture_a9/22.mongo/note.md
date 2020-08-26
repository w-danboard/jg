- 关系型数据库中 多个数据库  多个表  行和列
- 多个数据库  集合文件  文档 json

掌握了 mongo的语法 就可以更好的使用mongoose orm管理工具

- show dbs 显示所有的数据库
- db 显示当前数据库
- use school 使用其他数据库
- db.createCollection('') 创建集合
- show collections 显示所有集合
- db.集合名.insert() 直接向集合中插入数据 默认创建集合
- db.集合名.drop 删除集合
- db.dropDatabase() 删除当前数据库


### 插入数据 
- db.user.insert({name:'zfpx',age:10})

### 查询数据
- db.user.findOne()可以查询一条数据
- db.user.findOne({_id:ObjectId("5e148264af81b77fbf31168c")})
- 模糊查询 //
- 范围查询 $ne
- 默认 {}写入的是并且调教 或的条件  可以使用$or:[]
- db.user.find({})
- db.user.find({条件},{显示哪些字段 0/1}) 0表示不显示 1表示显示 但是不能公用 _id 特殊
- $ne 查询条件不等于   $lt $gt $gte $lte $not $in
- 分页查询
- find().count().sort().skip().limit().count()

### 修改数据
- db.user.update 默认修改是覆盖型 修改 而且只能修改一条
- {multi:true}  $set/$unset $inc(1,-1)  
- 数组 添加 修改 删除 ($pop $each $push $addToSet )

### 删除
- db.user.remove({查询条件},{justOne})

修改数据
- 改字段中内容 改数组
- 增删改查


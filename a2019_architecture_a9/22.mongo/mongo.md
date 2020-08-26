## 什么是MongoDB
MongoDB是一个基于分布式文件存储的数据库系统

MongoDB 将数据存储为一个文档，数据结构由键值(key=>value)对组成。MongoDB 文档类似于 JSON 对象。字段值可以包含其他文档，数组及文档数组。

总结： 
开源，高性能的NoSQL数据库；支持索引、集群、复制和故障转移、各种语言的驱动程序；高伸缩性

## mongo安装
### windows安装
- MongoDB64位绿色版 链接: https://pan.baidu.com/s/1EkAB2SrcU1mfMfff_WDxtA 密码: w913

#### 可执行文件作用
- mongotop.exe 跟踪MongDB实例读写时间工具
- mongostat.exe 实时性能监控工具
- mongorestore.exe 恢复工具
- mongoimport.exe 导入工具
- mongofiles.exe mongo中文件操作
- mongoexport.exe 导出工具
- mongodump.exe  备份工具
- mongod.exe 服务端
- mongo.exe 客户端

- 启动服务端
```bash
mongod --dbpath=./data
```

- 安装mongo服务端到电脑服务中
在此目录下新建一个`mongo.config`文件

如果希望可以在全局下执行，需要在全局下配置环境变量

```bash
##数据库目录
dbpath=D:\mongodb\bin\data
##日志输出文件
logpath=D:\mongodb\bin\logmongo.log
```

```bash
mongod --config "D:\mongodb\bin\mongo.conf" --install --serviceName "MongoDB"
```

查看端口号
```bash
netstat -anto | findStr 27017
```

### mac安装
https://github.com/mongodb/homebrew-brew


## mongo客户端可视化工具
- [Robo 3T](https://robomongo.org/download)


## MongoDB基本概念
- 数据库 MongoDB的单个实例可以容纳多个独立的数据库，比如一个学生管理系统就可以对应一个数据库实例
- 集合 数据库是由集合组成的,一个集合用来表示一个实体,如学生集合
- 文档 集合是由文档组成的，一个文档表示一条记录,比如一位同学张三就是一个文档

![](http://img.zhufengpeixun.cn/mongostat.jpg)

## 基本操作
- `show dbs` 显示所有数据库 
- `use school` 可以直接使用数据库
- `db` 显示当前是哪个数据库
- `db.createCollection('user')` 创建集合
- `show collections` 查看集合
- `db.user.drop()` 删除当前数据集下的`user`集合
- `db.user.insert()`直接像集合中插入内容,会自动增加`_id`属性,如果指定`_id`则用指定的结果,如果文档存在则报错
- `db.user.save()` 如果文档存在则修改，否则插入

### ObjectId构成
之前我们使用MySQL等关系型数据库时，主键都是设置成自增的。但在分布式环境下，这种方法就不可行了，会产生冲突。为此，MongoDB采用了一个称之为ObjectId的类型来做主键。ObjectId是一个12字节的 BSON 类型字符串。按照字节顺序，一次代表：
总共有24位16进制数构成,也就是12个字节
- 4字节：UNIX时间戳
- 3字节：表示运行MongoDB的机器
- 2字节：表示生成此_id的进程
- 3字节：由一个随机数开始的计数器生成的值 1 2 3 4

## 修改操作
修改操作默认只更新一条，想更新多条需要增加`multi`,必须使用`$`操作符合  
不存在则实现插入功能 `upsert` 
- 第一个参数:查询条件 
- 第二个参数修改内容,默认是覆盖模式
- 第三个参数：配置项
**对象修改**      
- $set 新增字段
- $unset 移除字段
- $inc 自增，如果字段不存在可以增加字段

**数组修改**
- hobby.0 修改索引,通过索引修改属性
- $push 追加
- $pop 删除最后一项/ 第一项
- $addToSet 添加不重复项
- $ne 判断是否存在

## 删除操作
默认删除全部，只删除一条需要使用 `justOne`
```bash
db.user.remove({})
```

## 查询
默认显示全部字段，可以控制显示哪些字段
第一个查询条件
第二个查询参数
- $in/$nin
- $not
- $lt $gt $lte $gte
- $all
- $where 性能低 
- 游标 cursor
- 分页查询 limit skip count sort
- 通过id查询

### 在文件中运行`mongo命令`
批量插入速度快
- 索引 字段唯一，二分查找 (不适合频繁更新的字段中使用)

```javascript
var db = connect('school');
```

- 运行文件
```bash
mongo  文件名
```

- 创建索引，字段唯一，采用二分查找方式 (不适合频繁更新的字段中使用)
```javascript
db.user.ensureIndex({age:-1})
```

## 备份
```bash
mongodump --db school --collection user --out backup
mongorestore ./backup
```


## 权限`mongo`
- 添加权限
```
use admin
db.createUser({user:'jw',pwd:'123',roles:[{role:'readWrite',db:'school]}})
```

- 开启权限
```bash
mongod --auth
```

- 登录到`admin`中登录权限
登录时可以指定用户名密码 -u jw -p 123 127.0.0.1/27017
```bash
use admin
db.auth('账号','密码')  
```


## mongoose的使用
- 增加，修改，删除,查询(find,findOne,findById)
- 连表查询
- UserSchema.statics 模型调用 
- UserSchema.methods 实例调用
- virtual().get() 计算属性
- pre/post钩子
- plugin 的用法
- redis

## mongoose的使用
- 增加，修改，删除,查询(find,findOne,findById) $or $in
- 插入数据 create 实例的保存方法
- 多表查询 populate
- UserSchema.statics 模型调用
- UserSchema.methods 实例调用
- virtual().get() 计算属性
- pre/post钩子
- plugin 的用法

## redis的使用
- redis 下载最新版本
https://github.com/ServiceStack/redis-windows/raw/master/downloads/redis-latest.zip

## 安装redis 到服务中
- redis-server --service-install redis.windows.conf --loglevel verbose

## redis 可视化工具
https://github.com/uglide/RedisDesktopManager

免费下载
链接: https://pan.baidu.com/s/1Ov6M_kOOclATfY4Hak1V4Q 提取码: xxhw

## redis基本使用
`keys *`查看所有数据 
`type` 判断类型
`expire` 设置过期时间  
- 字符串  `set` `get` `getrange` `del` `incr`  `decr` 
- 哈希表  `hset` `hget` `hmget` `hgetall` `hdel` `hkeys`
- 链表 `lpush` `lpop` `lrange` `lrem` (两个属性 删除几个 删除像的值) `lindex`
- 集合 `sadd` `smembers` `srem` `sunion` `sdiff`
- 有序列表 `zadd` `zrem` `zange` `withScores` `zcard`


## redis模块的使用
- 发布订阅 subscribe publish  on('message')
- multi exec 批量执行
- 权限





字符串操作(最常用的) set get getrange incr decr del expire ttl exists
哈希值(对象) hset hget hgetall hdel hkeys 
列表（数组） lpush lrange lpop lindex lrem
集合 （set） sadd smembers scard srem sinter sunion sdiff
有序集合 zadd zrange zcard withscores zrem 重复改序号


// node中如何使用redis

![](../img/python-interview.jpg)
<hr>

#### Redis面试题
<hr>

##### 1. Redis和Memcached的比较
redis不仅支持简单的k/v类型的数据，同时还提供list，set，hash等数据结构的存储；memcached不支持主从，redis支持主从，可用于数据的备份，即master-slave模式的数据备份；Redis支持数据的持久化，可以将内存中的数据保持在磁盘中，重启的时候可以再次加载进行使用。

<hr>

##### 2. redis中数据库默认有多少个数据库及作用
16个数据库；所有数据库保存到结构 redisServer 的一个成员 redisServer.db 数组中。当我们选择数据库 select number 时，程序直接通过 redisServer.db[number] 来切换数据库。有时候当程序需要知道自己是在哪个数据库时，直接读取 redisDb.id 即可。

<hr>

##### 3. python如何操作redis模块
安装redis模块(或库)，然后使用redis模块与redis服务端创建连接之后，进行一系列redis的操作

<hr>

##### 4. 如何循环显示redis中某个列表比较大的数据量的每一个值
可以尝试将对象分拆成几个key-value， 使用multiGet获取值，这样分拆的意义在于分拆单次操作的压力，将操作压力平摊到多个redis实例中，降低对单个redis的io影响

<hr>

##### 5. redis如何实现主从复制和数据同步机制
在从redis数据库(slave)配置文件中添加replicaof参数用于绑定主库(master)的ip和端口；在slave启动时，会向其master发送一条SYNC消息，master收到slave的这条消息之后，将可能启动后台进程进行备份，备份完成之后就将备份的数据发送给slave。

<hr>

##### 6. Redis中的sentinel的作用：
sentinel是一个独立运行的进程，用于监控master-slave集群，一旦发现master宕机，会进行自动切换到slave。[用于监控redis集群中Master状态的工具]

<hr>

##### 7. 如何实现redis集群
采用主从模式，通过增加slave来增加并发读的能力，master的写能力是个瓶颈；还有hash slot的模式，将Redis的写操作分摊到了多个节点上，提高写的并发能力，扩容简单。

<hr>

##### 8. Redis中默认有多少个哈希槽
16384个哈希槽

<hr>

##### 9. 简述redis的有哪几种持久化策略及比较
redis有RDB和AOF两种持久化策略，RDF相当于快照，保存数据块，还原数据快，适合灾难恢复。但是RDB只要符合要求就会照快照，会占用一部分系统资源，适用于内存比充足的机器。AOF是持续化占用极少的内存资源，采用日志记录redis操作。但是日志文件会特别大，不适用于灾难恢复，恢复效率远远低于RDB。适用于内存较小的机器。[简单回答：RDF是快照形式的，直接把内存中的数据保存到一个dump文件中；AOF是把所有的对redis的服务器进行修改的命令都存到一个文件里]

<hr>

##### 10. 列举redis支持的过期策略
定期删除和惰性删除策略，定期删除指的是每隔一定时间就抽取一些设置了过期时间的key，检查是否过期，如果过期了就把删除。惰性策略是在获取key的时候，如果此时的key已经过期，就会直接删除，不会返回任何东西。当然，内存中这还会存大量过期的的key，我们还可以使用内存淘汰机制。

<hr>

##### 11.列举内存淘汰机制
```py
volatile-lru 				从已设置过期时间的数据集中挑选最近最少使用的数据淘汰(默认)
volatile-ttl					从已设置过期时间的数据集中挑选将要过期的数据淘汰
volatile-random 		从已设置过期时间的数据集中任意选择数据淘汰
allkeys-lru					从数据集中挑选最近最少使用的数据淘汰(最常用的)
allkeys-random		从数据集中任意选择数据淘汰
no-enviction				禁止驱逐数据
```
##### 12. mysql里有两千万数据，redis中只存二十万的数据，如何保证 Redis 中都是热点数据
redis 内存数据集大小上升到一定大小的时候，就会实施数据淘汰策略。可参考上一题理解着回答。

<hr>

##### 13. 写代码，基于redis的列表实现先进先出、后进先出队列和优先级队列
```py
# 先进先出
import redis
'''
可以使用lpush和rpop或rpush和lpop
'''
pool = redis.ConnectionPool(host='106.12.115.136', port=6390, password='redis6390')
conn = redis.Redis(connection_pool=pool)
conn.lpush('employees', 'thanlon')
conn.lpush('employees', 'kiku')
conn.lpush('employees', 'maria')
conn.lpush('employees', 'jack')
conn.lpush('employees', 'michael')
conn.lpush('employees', 'angle')
print(conn.lrange('employees', 0, -1))
print(conn.rpop('employees'))
print(conn.rpop('employees'))
print(conn.rpop('employees'))
print(conn.rpop('employees'))
print(conn.rpop('employees'))
print(conn.rpop('employees'))
'''
[b'angle', b'michael', b'jack', b'maria', b'kiku', b'thanlon']
b'thanlon'
b'kiku'
b'maria'
b'jack'
b'michael'
b'angle'
'''
```
```py
# 后进先出
import redis

pool = redis.ConnectionPool(host='106.12.115.136', port=6390, password='redis6390')
conn = redis.Redis(connection_pool=pool)
conn.lpush('employees', 'thanlon')
conn.lpush('employees', 'kiku')
conn.lpush('employees', 'maria')
conn.lpush('employees', 'jack')
conn.lpush('employees', 'michael')
conn.lpush('employees', 'angle')
print(conn.lrange('employees', 0, -1))
print(conn.lpop('employees'))
print(conn.lpop('employees'))
print(conn.lpop('employees'))
print(conn.lpop('employees'))
print(conn.lpop('employees'))
print(conn.lpop('employees'))
'''
[b'angle', b'michael', b'jack', b'maria', b'kiku', b'thanlon']
b'angle'
b'michael'
b'jack'
b'maria'
b'kiku'
b'thanlon'
'''
```
```py
# 优先级队列，采用任务入队的时候设置权值
import redis

pool = redis.ConnectionPool(host='106.12.115.136', port=6390, password='redis6390')
conn = redis.Redis(connection_pool=pool)
'''
只执行一次添加元素
'''
# conn.lpush('bosses', 'thanlon')
# conn.set('bosses_score_thanlon', 2)
# conn.lpush('bosses', 'kiku')
# conn.set('bosses_score_kiku', 3)
# conn.lpush('bosses', 'tom')
# conn.set('bosses_score_tom', -1)

# 原来的队列
print(conn.lrange('bosses', 0, -1))  # [b'tom', b'kiku', b'thanlon']
# 排序后的任务队列
print(conn.sort('bosses', by='bosses_score_*'))  # [b'tom', b'thanlon', b'kiku']
# 取出优先级最高的任务
high_work = conn.sort('bosses', start=0, num=1, by='bosses_score_*', desc=True)
print(high_work)  # [b'kiku']
# 移除这个任务
conn.lrem('bosses', 0, high_work[0].decode('utf-8'))
'''
# 第一次
[b'tom', b'kiku', b'thanlon']
[b'tom', b'thanlon', b'kiku']
[b'kiku']第一优先级任务
# 第二次
[b'tom', b'thanlon']
[b'tom', b'thanlon']
[b'thanlon']第二优先级任务
[b'tom']
[b'tom']
[b'tom']第三优先级任务
'''
```
##### 14. 如何基于redis实现消息队列
使用lpush向list的左端推送数据(发送消息)，使用rpop从list的右端接收数据(接收消息)。

<hr>

##### 15. 如何基于redis实现发布和订阅
使用publish来发布消息，使用subscribe来接收订阅，获取订阅消息。

<hr>

##### 16. 消息队列和发布订阅的区别
“发布/订阅”模式包含两种角色，分别是发布者和订阅者。订阅者可以订阅一个或若干个频道（channel），而发布者可以向指定的频道发送消息，所有订阅此频道的订阅者都会收到此消息。【
区别一：前者通过key队列方式实现，取出就删掉了，其他进程也取不到，阻塞进程。订阅发布可以支持多客户端获取同一个频道发布的消息。区别二：前者消息不处理会缓存在列表，后者不处理的话消息就丢失了。】

<hr>

##### 17. 什么是codis及其作用
codis是一个分布式redis解决方案，可以用于redis的扩容、支持在线数据迁移，可以自动进行数据分配。codis比较适合那种数据库比较大，但并发量不是特别高的系统。

<hr>

##### 18. 什么是twemproxy及其作用]
twemproxy是一种代理分片机制，可接受来自多个程序的访问，按照路由规则，转发给后台的各个Redis服务器，再原路返回。可以解决了单个Redis实例承载能力的问题，可用来扩张redis，Twemproxy需要更多的硬件资源和在redis性能有一定的损失(twitter测试约20%)，但是能够提高整个系统的高可用(HA)也还是不错的。回答的时候说类似于nginx，是一种代理的存在。[twemproxy是 Twtter 开源的一个 Redis 和 Memcache 代理服务器，主要用于管理 Redis 和 Memcached 集群，减少与Cache 服务器直接连接的数量。]

<hr>

##### 19. 写代码实现redis事务操作
```py
import redis

pool = redis.ConnectionPool(host='106.12.115.136', port=6390, password='redis6390')
conn = redis.Redis(connection_pool=pool)
pipe = conn.pipeline(transaction=True)
pipe.set('name', 'thanlon')
pipe.set('age', 23)
pipe.execute()
```
##### 20. Redis中的watch命令的作用
watch( watch key[key...])命令用于在进行事务操作的最后一步(也就是在执行exec 之前)对某个key进行监视。如果这个被监视的key被改动，那么事务就被取消，否则事务正常执行。一般在mulit 命令前就用watch命令对某个key进行监控，如果想让key取消被监控，可以用unwatch命令。【当某个事务需要按条件执行时，就要使用这个命令将给定的键设置为受监控的】

<hr>

##### 21. 基于Redis如何实现商城商品数量计数器
使用redis的Incr自增和desr自减命令可以实现商城商品数量计数器。

<hr>

##### 22. 简述redis分布式锁redlock的实现机制
互斥，任何时刻只能有一个client获取锁。释放死锁，即使锁定资源的服务崩溃或者分区，仍然能释放锁。容错性，只要多数redis节点（一半以上）在使用，client就可以获取和释放锁。

<hr>

##### 23. 什么是一致性哈希，Python中是否有相应模块
一致性哈希简而言之就是不仅仅数据做哈希，机器也做哈希；python中有相应的模块，即：hashlib模块。

<hr>

##### 24. 如何高效的找到Redis中所有以某某开头的key
使用keys命令的话，如果数据量比较大，可能会卡顿，不适用于生产环境，应该使用基于游标的迭代器来做。

<hr>
<!--回到顶部 start-->
<div style="width: 60px;height: auto;z-index: 99;bottom: 30%;position: fixed;right: 0" id="plug-ins">
    <div style="position: relative;float: right">
        <a target="" href="javascript:;" id="weibo"
           style="display: block;width: 40px;height: 40px;background-color: #c4351b;margin-top: 1px;">
            <img width="22" height="20" src="../img/weibo.png" alt=""
                 style="margin-top: 10px;margin-left: 9px">
        </a>
        <a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=3330447288&site=qq&menu=yes" id="qq" style="display: block;width: 40px;height: 40px;background-color:#0e91e8;margin-top: 1px">
            <img width="20" height="20" src="../img/qq.png" 
                 style="margin-top: 10px;margin-left: 10px" alt="点击这里给我发消息" title="点击这里给我发消息">
        </a>
        <a href="javascript:" id="wechat"
           style="display: block;width: 40px;height: 40px;background-color:#01b901;margin-top:1px">
            <img width="22" height="20" src="../img/wechat.png"
                 style="margin-top: 10px;margin-left: 9px">
        </a>
        <a href="javascript:" id="go_top"
           style="display: none;width: 40px;height: 40px;background-color: #b5b5b5;margin-top: 1px">
            <img width="22" height="20" src="../img/top.png" alt=""
                 style="margin-top: 10px;margin-left: 9px">
        </a>
    </div>
</div>
<!--回到顶部 stop-->
<!--左侧广告 start-->
<div style="width: auto;height: auto;z-index: 99;position: fixed;left: 0;top: 70px;" id="google_ads">
        <div>
            <div style="width: 180px;height: auto"></div>
            <!-- Vertical -->
            <ins class="adsbygoogle"
                 style="display:block"
                 data-ad-client="ca-pub-6937898095875663"
                 data-ad-slot="2927491642"
                 data-ad-format="auto"
                 data-full-width-responsive="true"></ins>
        </div>
</div>
<!--左侧广告 stop-->
<!--右侧广告 start-->
<div style="width: auto;height: auto;z-index: 99;position: fixed;right: 0;top: 70px;" id="google_ads">
        <div>
            <div style="width: 180px;height: auto"></div>
            <!-- Vertical -->
            <ins class="adsbygoogle"
                 style="display:block"
                 data-ad-client="ca-pub-6937898095875663"
                 data-ad-slot="2927491642"
                 data-ad-format="auto"
                 data-full-width-responsive="true"></ins>
        </div>
</div>
<!--右侧广告 stop-->
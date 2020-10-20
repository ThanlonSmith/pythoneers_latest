![](../img/python-interview.jpg)
#### MySQL面试题

<hr>

##### 1. 列举常见的关系型数据库和非关系型数据库
常见的关系型数据库有mysql、sqlserver、oracle、sqlite，非关系型数据库有mongoDB、redis。关系型数据库是由二维表及其之间的关系组成，优点是进行数据的增删该查很方便，有事务操作，保证数据的完整性。缺点是海量数据的读写效率低，只能使用硬盘作为存储存储数据，并且是二进制不安全的。非关系型数据库严格意义上讲不是一种数据库，应该是一种数据结构化存储的方法，可以是文档或者键值对。优点是很轻松地对海量数据的增删该查以及维护操作。支持硬盘存储和随即存储器存储，二进制安全。缺点是没有事务处理，不能使用sql。真实项目中的数据应分批保存，重要的数据放在关系型数据中，不重要的海量操作的数据放在非关系型数据中。

<hr>

##### 2. mysql常见数据库引擎及比较
InnoDB：支持事务处理，支持外键，支持崩溃修复能力和并发控制。如果需要对事务的完整性要求比较高（比如银行），要求实现并发控制（比如售票），那选择InnoDB有很大的优势。如果需要频繁的更新、删除操作的数据库，也可以选择InnoDB，因为支持事务的提交（commit）和回滚（rollback）。 

MyISAM：插入数据快，空间和内存使用比较低。如果表主要是用于插入新记录和读出记录，那么选择MyISAM能实现处理高效率。如果应用的完整性、并发性要求比较低，也可以使用。

MEMORY：所有的数据都在内存中，数据的处理速度快，但是安全性不高。如果需要很快的读写速度，对数据的安全性要求较低，可以选择MEMOEY。它对表的大小有要求，不能建立太大的表。所以，这类数据库只使用在相对较小的数据库表。

同一个数据库也可以使用多种存储引擎的表。如果一个表要求比较高的事务处理，可以选择InnoDB。这个数据库中可以将查询要求比较高的表选择MyISAM存储。如果该数据库需要一个用于查询的临时表，可以选择MEMORY存储引擎。

<hr>

##### 3. 简述数据三大范式
第一范式：当关系模式R的所有属性都不能在分解为更基本的数据单位时，称R是满足第一范式的，简记为1NF。满足第一范式是关系模式规范化的最低要求，否则，将有很多基本操作在这样的关系模式中实现不了。

第二范式：如果关系模式R满足第一范式，并且R得所有非主属性都完全依赖于R的每一个候选关键属性，称R满足第二范式，简记为2NF。

第三范式：设R是一个满足第一范式条件的关系模式，X是R的任意属性集，如果X非传递依赖于R的任意一个候选关键字，称R满足第三范式，简记为3NF。

关系实质上是一张二维表，其中每一行是一个元组，每一列是一个属性。

<hr>

##### 4. 什么是事务，mysql如何支持事务
事务（Transaction)是由一系列对系统中数据进行访问与更新的操作所组成的一个程序，执行逻辑单元。

事务具有四个特征，分别足原子性（Atomicity )、一致性（Consistency )、隔离性（Isolation) 和持久性（Durability),简称为事务的ACID特性。事务的原子性是指事务必须是一个原子的操作序列单元。事务中包含的各项操作在一次执行过程中，只允许出现以下两种状态之一。全部成功执行，全部不执行。事务的一致性是指事务的执行不能破坏数据库数据的完整性和一致性，一个事务在执行之前和执行之后，数据库都必须处于一致性状态。也就是说，事务执行的结果必须是使数据库从一个一致性状态转变到另一个一致性状态，因此当数据库只包含成功事务提交 的结果时，就能说数据库处于一致性状态。而如果数据库系统在运行过程中发生故障， 有些事务尚未完成就被迫中断，这些未完成的事务对数据库所做的修改有一部分已写入物理数据库，这时数据库就处于一种不正确的状态，或者说是不一致的状态。事务的隔离性是指在并发环境中，并发的事务是相互隔离的，一个事务的执行不能被其他事务干扰。也就是说，不同的事务并发操纵相同的数据时，每个事务都有各自完整的数据空间，即一个事务内部的操作及使用的数据对其他并发事务是隔离的，并发执行的 各个事务之间不能互相干扰。事务的持久性也被称为永久性，是指一个事务一旦提交，它对数据库中对应数据的状态变更就应该是永久性的。换句话说，一旦某个事务成功结束，那么它对数据库所做的更新就必须被永久保存下来——即使发生系统崩溃或机器宕机等故障，只要数据库能够重新启动，那么一定能够将其恢复到事务成功结束时的状态。【注意简要回答核心思想】

在mysql中用的最多的存储引擎有：innodb，bdb，myisam ,memory 等。其中innodb和bdb支持事务而myisam等不支持事务。

<hr>

##### 5. 简述数据库设计中一对多和多对多的应用场景
一对多：一个班级有多个学生，一个学生只属于一个班级。

多对多：一个学生可以选多门课程，一个课程可以被多个学生选择。

<hr>

##### 6. 如何基于数据库实现商城商品计数器
如果是在非常高的并发之下，还是建议用内存数据库redis去实现计数的功能。如果不是那么高的并发，用表实现就可以。

<hr>

##### 7. 简述触发器、函数、视图、存储过程
做数据库操作的时候，还希望相关的数据同步操作就用触发器，比如想要向A表插入数据的时候，同时向B表插入，这样写过触发器每次向A表插入数据之后就会自动向B表插入。是一个表数据的变更后通过触发器来修改与之相关联的其他表的数据，保证数据的一致性。

函数针对某个特定功能进行编程，针对性较强。有且只有一个返回值。参数也是可以有，可以没有。

视图是一个虚拟表，其内容由查询定义。同真实的表一样，视图包含一系列带有名称的列和行数据。但是，视图并不在数据库中以存储的数据值集形式存在。行和列数据来自由定义视图的查询所引用的表，并且在引用视图时动态生成。对其中所引用的基础表来说，视图的作用类似于筛选。定义视图的筛选可以来自当前或其它数据库的一个或多个表，或者其它视图。分布式查询也可用于定义使用多个异类源数据的视图。【提高数据的安全性；视图与真实的表一样具有行和列；视图可以理解为一种虚拟的表。简化对数据的操作，经常使用的查询可以被定义为视图，使用户不用指定全部的查询条件。通过视图，用户可以查看和修改用户所能看到的字段。对于其它字段，用户是看不到也不能修改的。】

存储过程（Stored Procedure）是一组为了完成特定功能的SQL语句集，经编译后存储在数据库中。用户通过指定存储过程的名字并给出参数（如果该存储过程带有参数）来执行它。存储过程是数据库中的一个重要对象，任何一个设计良好的数据库应用程序都应该用到存储过程。存储过程是一组操作的过程的集合，可以很复杂，可以有参数或者没有参数，可以零个或多个返回值。

<hr>

##### 8. mysql索引种类
普通索引，唯一索引(主键索引、唯一索引)，单列索引，组合索引，空间索引，全文索引。

<hr>

##### 9. 索引在什么情况下遵循最左前缀的规则
最左前缀原理的一部分，索引index1:(a,b,c)，只会走a、a,b、a,b,c 三种类型的查询，其实这里说的有一点问题，a,c也走，但是只走a字段索引，不会走c字段。索引是有序的，index1索引在索引文件中的排列是有序的，首先根据a来排序，然后才是根据b来排序，最后是根据c来排序。

<hr>

##### 10. 	主键和外键的区别
【主键是关系表的唯一标识，唯一标识一条记录，不能有重复的，不允许为空。】表中一个列或者列的组合，其值能够唯一的标识表中的每一个行。这样的一列或者多列成为表的主键，通过它可以强制表的实体完整性。当创建或者更改表时可以通过定义PRIMARY KEY约束来创建主键，一个表只能有一个主键约束，而且主键约束中的列不能是空值，由于主键约束确保唯一数据，所一经常来定义标识列。

外键是建立于表与表之间的联系。外键保证了数据的完整性，使用外键，简单直观，可以直接在数据模型中体现，无论是设计、维护等。外键是另一个表(关联表)的主键，可以重复，可以是空值。

<hr>

##### 11. mysql常见的函数
sum函数、abs函数、floor函数等

<hr>

##### 12. 列举创建索引但无法命中索引的8种情况
查询条件中有or、not in、not exist等

小表查询

like查询是以%开头

如果列类型是字符串，那一定要在条件中将数据使用引号引用起来，否则不使用索引

没有使用索引字段查询

对索引列进行运算，需要建立函数索引

单独引用联合索引中的非第一位置的索引

没有查询条件

<hr>

##### 13. 如何开启慢日志查询
配置以下参数可以开启mysql慢日志查询：
```py
1、low_query_log     			    慢查询开启状态
2、slow_query_log_file		慢查询日志存放的位置（这个目录需要MySQL的运行帐号的可写权限，一般设置为MySQL的数据存放目录）
3、long_query_time				查询超过多少秒才记录
```
开启慢日志查询方法一：全局变量设置：
```py
1、将 slow_query_log 全局变量设置为“ON”状态：	set global slow_query_log='ON';
2、设置慢查询日志存放的位置：											set global slow_query_log_file='/usr/local/mysql/data/slow.log';
3、查询超过1秒就记录：															set global long_query_time=1;
```
开启慢日志查询方法二： 配置文件设置
```py
修改配置文件my.cnf，在[mysqld]下的下方加入：
[mysqld]
slow_query_log = ON
slow_query_log_file = /usr/local/mysql/data/slow.log
long_query_time = 1    
```

<hr>

##### 14. 数据库导入导出命令
```py
1、导出数据库结构和数据：mysqldump -u用户名 -p密码 数据库名> 路径+导出的文件名.sql
2、导出数据库所有表结构：mysqldump -u用户名 -p密码 -d 数据库名>路径+文件名.sql
3、导出数据表结构和数据：mysqldump -u用户名 -p密码 数据库名 表名>路径+文件名.sql
4、导出数据表结构：mysqldump -u用户名 -p密码 -d 数据库名 表名>路径+文件名.sql
```

<hr>

##### 15. 数据库优化方案
SQL语句优化：应尽量避免在 where 子句中使用!=或<>操作符，否则将引擎放弃使用索引而进行全表扫描；应尽量避免在 where 子句中对字段进行 null 值判断，否则将导致引擎放弃使用索引而进行全表扫描，如：select id from t where num is null。可以在num上设置默认值0，确保表中num列没有null值，然后使用select id from t where num=0查询；很多时候用 exists 代替 in 是一个好的选择；用Where子句替换HAVING子句因为HAVING 只会在检索出所有记录之后才对结果集进行过滤。

索引优化：合理使用普通索引、唯一索引、联合索引、全文索引、空间索引

数据库结构优化：范式优化，比如消除冗余，节省空间；反范式优化，比如适当加冗余；拆分表，分区将数据在物理上分隔开，不同分区的数据可以制定保存在处于不同磁盘上的数据文件里。这样，当对这个表进行查询时，只需要在表分区中进行扫描，而不必进行全表扫描，明显缩短了查询时间，另外处于不同磁盘的分区也将对这个表的数据传输分散在不同的磁盘I/O，一个精心设置的分区可以将数据传输对磁盘I/O竞争均匀地分散开。对数据量大的时时表可采取此方法。可按月自动建表分区。

<hr>

##### 16. char和varchar的区别
char的长度是不可变的，而varchar的长度是可变的。char的存取速度还是要比varchar快得多，因为其长度固定，方便程序的存储与查找。但是char也为此付出的是空间的代价，因为其长度固定，所以难免会有多余的空格占位符占据空间，是以空间换取时间效率，而varchar是以空间效率为首位的。char的存储方式是，对一个英文字符(ASCII)占用1个字节，对一个汉字占用2个字节，而varchar的存储方式是，对每个英文字符占用2个字节，汉字也占用2个字节。

<hr>

##### 17. 简述mysql的执行计划
在工作过程中，有时候会对慢查询进行调优。对于MySQL的SQL语句调优，MySQL本身提供了强大的explain关键字用于查询分析执行计划。从语法角度explain和describe或者desc是相同的，只是一般更常用desc看表结构，explain来看查询计划。

<hr>

##### 18. 在对name做了唯一索引前提下

<hr>

##### 19. 1000w条数据，使用limit offset 分页时，为什么越往后翻越慢？如何解决
因为越是向后翻页，扫描的数据也就越多。可以使用limit限制优化法把limit偏移量限制低于某个数，存储本页数据两端的主键，按主键查找后向前或向后取多少条。

<hr>

##### 20. 什么是索引合并
&nbp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;把几个索引的范围扫描合并成一个索引。索引合并的时候，会对索引进行并集，交集或者先交集再并集操作，以便合并成一个索引。这些需要合并的索引只能是一个表的。不能对多表进行索引合并。

<hr>

##### 21. 什么是覆盖索引
mysql可以利用索引返回SELECT 列表中的字段，而不必根据索引再次读取数据文件。 包含所有满足查询需要的数据的索引成为覆盖索引。

<hr>

##### 22. 简述数据库读写分离
读写分离为了确保数据库产品的稳数据定性，很多数据库拥有双机热备功能。也就是，第一台数据库服务器，是对外提供增删改业务的生产服务器；第二台数据库服务器，主要进行读的操作。

<hr>

##### 23. 简述数据库分库分表
垂直分库：就是按照功能的不同，把没有关联的数据放到不同的数据库和服务器中。

水平分表：根据一定的规则将一个表的数据划分到不同的数据库中，两个数据库的表结构一样。

<hr>

##### 24. left join和right join以及inner join的区别
left join：左关联，主表在左边，从表在右边。如果左边的主表中没有关联字段会用null 填满。

right join：右关联 主表在右边，从表在左边，letf join相反，如果右边的主表没有关联的自断会用null填满

inner join 内关联只会显示主表和从表相关联的字段，不会出现null。

<hr>

##### 25. 写出一条sql语句用来取出表A中第31到第40记录
select *from A limit 31,10;

<hr>

##### 26. 什么是数据库约束，常见的约束有哪几种
数据库约束用于保证数据库、表数据的完整性（正确性和一致性）。可以通过定义约束\索引\触发器来保证数据的完整性。总体来讲,约束可以分为:
```py
1、主键约束			primary key
2、外键约束			foreign key
3、唯一约束			unique
4、检查约束			check
5、空值约束			not null
6、默认值约束		default
```

<hr>

##### 27. 从数据库中随机取50条数据
select *from 表名 order by rand() limit50;

<hr>

##### 28. 什么是sql注入
sql注入攻击指的是通过构建特殊的输入作为参数传入Web应用程序，而这些输入大都是SQL语法里的一些组合，通过执行SQL语句进而执行攻击者所要的操作，其主要原因是程序没有细致地过滤用户输入的数据，致使非法数据侵入系统。

<hr>

##### 29. 关于sql语句应该考虑哪些安全性
(1) 防止sql注入，对特殊字符进行转义，过滤或者使用预编译的sql语句绑定变量。

(2) 最小权限原则，特别是不要用root账户，为不同的类型的动作或者组建使用不同的账户。

(3) 当sql运行出错时，不要把数据库返回的错误信息全部显示给用户，以防止泄漏服务器和数据库相关信息。

<hr>

##### 30. 一张表有id自增主键，当insert了17条记录之后，删除了第15、16、17条记录，再把Mysql重启，再insert一条记录,这条记录的ID是18还是15 
如果表的类型是MyISAM，那么是18。因为MyISAM表会把自增主键的最大id记录到数据文件里，重启MySQL自增主键的最大id也不会丢失。

如果表的类型是InnoDB，那么是15。InnoDB表只是把自增主键的最大id记录到内存中，所以重启数据库或者是对表进行OPTIMIZE操作，都会导致最大id丢失。

<hr>

##### 31. 怎么把下面这一个数据库表
```py
year	month	amount
1996	  1		 1.1
1996	  2		 1.2
1997 	  3		 1.3
1997      4		 1.4
```
通过怎样的sql语句得到下面的结果：
```py
year	 m1	 m2
1996	1.1	 1.2
1997	1.3	 1.4
```

<hr>

##### 32. mysql测试题
表关系如下：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20191117002736166.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RoYW5sb24=,size_16,color_FFFFFF,t_70)
1、自行建表和约束以及测试数据
```sql
# 创建班级表
CREATE TABLE class(
cid int(11) NOT NULL AUTO_INCREMENT,
caption varchar(4) NOT NULL,
PRIMARY KEY (cid),
UNIQUE KEY (caption)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
# 向班级表添加数据
insert into class(caption) values('三年二班');
insert into class(caption) values('一年三班');
insert into class(caption) values('三年一班');
# 创建学生表student
create table student( 
sid int auto_increment, 
sname varchar(4) unique,  
gender enum('男','女') not null, 
clss_id int not null,
primary key(sid)
)engine=innodb default charset utf8;
# 向学生表插入数据
insert into student(sname,gender,clss_id) values('钢蛋','女',1);
insert into student(sname,gender,clss_id) values('铁锤','女',1);
insert into student(sname,gender,clss_id) values('山炮','男',2);
# 创建教师表
create table teacher( tid int auto_increment, tname varchar(4),primary key(tid))engine=innodb default charset utf8;
# 向教师表添加数据
insert into teacher(tname) values('波多');
insert into teacher(tname) values('苍空');
insert into teacher(tname) values('饭岛');
# 创建课程表
create table course( cid int auto_increment, cname varchar(2) not null unique, teacher_id int not null,primary key(cid))engine=innodb default charset utf8;
# 向课程表添加数据
insert into course(cname,teacher_id) values('生物',1);
insert into course(cname,teacher_id) values('体育',1);
insert into course(cname,teacher_id) values('物理',2);
# 创建成绩表
create table score( sid int auto_increment, student_id int not null, course_id int not null, number int not null,primary key(sid))engine = innodb default charset utf8;
# 向成绩表中插入数据
insert into score(student_id,course_id,number) values(1,1,60);
insert into score(student_id,course_id,number) values(1,2,59);
insert into score(student_id,course_id,number) values(2,2,100);
# 为学生表添加外键约束，注意外键的类型要与参照列(父表)的类型一致
# 外键列必须创建索引，如果外键列不创建索引，mysql将自动创建索引
alter table student add foreign key(class_id) references class(cid);
# 为课程表添加外键约束
alter table course add foreign key(teacher_id) references teacher(tid);
# 为成绩表添加外键约束
alter table score add foreign key(student_id) references student(sid);
alter table score add foreign key(course_id) references course(cid);
```
2、查询“生物”课程比“物理”课程成绩高的所有学生的学号
```sql

```
3、查询平均成绩大于60分的同学的学号和平均成绩
```sql
select student_id,avg(number) from score group by student_id having avg(number)>60;
```
4、查询所有同学的学号、姓名、选课数、总成绩
```sql

```
5、查询姓“李”的老师的个数
```sql

```
6、查询没学过“叶平”老师课的同学的学号、姓名
```sql

```
7、查询学过“001”并且也学过编号“002”课程的同学的学号、姓名
```sql

```
8、查询学过“叶平”老师所教的所有课的同学的学号、姓名
```sql

```
9、查询课程编号“002”的成绩比课程编号“001”课程低的所有同学的学号、姓名
```sql

```
10、查询有课程成绩小于60分的同学的学号、姓名
```sql

```
11、查询没有学全所有课的同学的学号、姓名
```sql

```
12、查询至少有一门课与学号为“001”的同学所学相同的同学的学号和姓名
```sql

```
13、查询至少学过学号为“001”同学所选课程中任意一门课的其他同学学号和姓名
```sql

```
14、查询和“002”号的同学学习的课程完全相同的其他同学学号和姓名
```sql

```
15、删除学习“叶平”老师课的SC表记录
```sql

```
16、向SC表中插入一些记录，这些记录要求符合以下条件：①没有上过编号“002”课程的同学学号；②插入“002”号课程的平均成绩
```sql

```
17、按平均成绩从低到高显示所有学生的“语文”、“数学”、“英语”三门的课程成绩，按如下形式显示： 学生ID,语文,数学,英语,有效课程数,有效平均分
```sql

```
18、查询各科成绩最高和最低的分：以如下形式显示：课程ID，最高分，最低分
```sql

```
19、按各科平均成绩从低到高和及格率的百分数从高到低顺序
```sql

```
20、课程平均分从高到低显示（现实任课老师）
```sql

```
21、查询各科成绩前三名的记录:(不考虑成绩并列情况)
```sql

```
22、查询每门课程被选修的学生数
```sql

```
23、查询出只选修了一门课程的全部学生的学号和姓名
```sql

```
24、查询男生、女生的人数
```sql

```
25、查询姓“张”的学生名单
```sql

```
26、查询同名同姓学生名单，并统计同名人数
```sql

```
27、查询每门课程的平均成绩，结果按平均成绩升序排列，平均成绩相同时，按课程号降序排列
```sql

```
28、查询平均成绩大于85的所有学生的学号、姓名和平均成绩
```sql

```
29、查询课程名称为“数学”，且分数低于60的学生姓名和分数
```sql

```
30、查询课程编号为003且课程成绩在80分以上的学生的学号和姓名
```sql

```
31、求选了课程的学生人数
```sql

```
32、查询选修“杨艳”老师所授课程的学生中，成绩最高的学生姓名及其成绩
```sql

```
33、查询各个课程及相应的选修人数
```sql

```
34、查询不同课程但成绩相同的学生的学号、课程号、学生成绩
```sql

```
35、查询每门课程成绩最好的前两名
```sql

```
36、检索至少选修两门课程的学生学号
```sql

```
37、查询全部学生都选修的课程的课程号和课程名
```sql

```
38、查询没学过“叶平”老师讲授的任一门课程的学生姓名
```sql

```
39、查询两门以上不及格课程的同学的学号及其平均成绩
```sql

```
40、检索“004”课程分数小于60，按分数降序排列的同学学号
```sql

```
41、删除“002”同学的“001”课程的成绩
```sql

```
<hr>
<div style="width: 60px;height: auto;z-index: 99;bottom: 30%;position: fixed;right: 0px" id="plug-ins">
    <div style="position: relative;float: right">
        <a target="" href="javascript:;" id="weibo"
           style="display: block;width: 40px;height: 40px;background-color: #c4351b;margin-top: 1px;">
            <img width="22" height="20" src="../img/weibo.png" alt=""
                 style="margin-top: 10px;margin-left: 9px">
        </a>
         <a target="_blank" href="http://sighttp.qq.com/authd?IDKEY=5838160dbeb2a49f264d5e2d13d6336248d74a60cf56ecad" id="qq" style="display: block;width: 40px;height: 40px;background-color:#0e91e8;margin-top: 1px">
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
<!--双11 start-->
<div style="z-index: 100;position: fixed;left: 0;bottom: 0;" id="ads" hidden="hidden">
        <div>
            <button type="button" class="close" style="position: absolute;right: 5px;top: 0;font-size: 28px;opacity: 1;color: white"><span aria-hidden="true">&times;</span></button>
             <a target="_blank" href="https://s.click.taobao.com/1pElJvu">
                <img style="margin: 0;border-radius: unset" class="img-responsive" width="400" height="" src="img/ads/tianmap-800x450-1.jpg"
                    alt="2020天猫双11—联盟主会场（带超级红包）" title="2020天猫双11—联盟主会场（带超级红包）">
            </a><br>
            <a target="_blank" href="https://s.click.taobao.com/5EtkJvu">
                <img style="margin: 0;border-radius: unset" class="img-responsive" width="400" height="" src="img/ads/tianmap-800x450-2.jpg"
                    alt="2020天猫双11—联盟主会场（带超级红包）" title="2020天猫双11—联盟主会场（带超级红包）">
            </a>
        </div>
</div>
<!--双11 stop-->
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
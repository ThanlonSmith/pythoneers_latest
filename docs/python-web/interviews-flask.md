![](../img/python-interview.jpg)
<hr>

#### Flask 面试题
<hr>

##### 1. Flask 框架的优势
Flask 是一个短小精悍、可扩展性强的 web 框架。

<hr>

##### 2. Flask 框架依赖组件
Flask 依赖于 werkzurg 组件，实现 wsgi 使用的就是 werkzurg。

<hr>

##### 3. Flask 蓝图的作用
实际项目中，需要进行项目目录结构的划分，蓝图就是用来帮助开发者进行目录结构的划分。

<hr>

##### 4. 列举使用过的 Flask 第三方组件
jinjia2、wtforms、werkzurg、DBUtils、SQLAlchemy等……

<hr>

##### 5. 简述 Flask 上下文管理流程
( 1 ) 请求到来时，将 session 和 request 封装到 ctx 对象中

( 2 ) 对 session 做补充

( 3 ) 将包含了 request 和 session 的 ctx 对象放到一个容器中 ( 每个请求都会根据线程/协程加一个唯一标识 )

( 4 ) 视图函数使用的时候需要根据当前线程或协程的唯一标识获取 ctx 对象，再到 ctx 对象中获取取 request 和 session ( 视图函数使用的时候，需要根据当前线程获取数据 )

( 5 ) 请求结束时，根据当前线程/协程的唯一标记，将这个容器上的数据移除

<hr>

##### 6. Flask中的 g 的作用

<hr>

##### 7. Flask 上下文管理主要涉及到了哪些相关的类，这些类的主要作用
( 1 ) LocalStack 它帮助我们在 local 中把一个列表维护成一个栈，方便我们对列表中的数据进行添加和维护，有了 LocalStack 操作更加便捷

( 2 ) Local 帮助我们为每个线程/协程开辟空间

<hr>

##### 8. 为什么 Flask 要把 Local 对象中的值 stack 维护成一个列表

<hr>


##### 9. Flask 中多 app 应用是怎么完成
使用 Flask 类创建不同的 app 对象，然后借助 DispatcherMiddleware 类来实现。

<hr>

##### 10. 在 Flask 中实现 WebSocket 需要什么组件
<hr>

##### 11. wtforms 组件的作用
wtforms 组件有两个作用，

( 1 ) 自动生成 html 标签

( 2 ) 对用户请求的数据进行校验

<hr>

##### 12. Flask 框架默认 session 的处理机制
请求进来时，Flask 读取 cookie 中 session 对应的值，<font>将该值解密并反序列化为字典，放入内存以便视图函数使用</font>。 请求结束时，Flask 会读取内存中字典的值，进行序列化加密，写入到用户的 cookie 中。

<hr>

##### 13. 解释 Flask 框架中的 Local 对象和 threading.local 对象的区别
Local对象是根据 threading.local 做的。

<hr>

##### 14. Flask 中 blinker 是什么

<hr>

##### 15. SQLAlchemy 中的 session 和 scoped_session 的区别
scoped_session 是基于 Threading.Local 实现的，而 session 不是。

<hr>

##### 16. SQLAlchemy 如何执行原生 SQL
SQLAlchemy 可以执行原生 sql 的方式：

( 1 ) 通过 session 对象执行 execute 方法

( 2 ) 通过 cursor ( 游标 ) 对象执行execute方法

第一种：
```python
session = scoped_session(SessionFactory)
session.execute('insert users(name) values(:value)', params={'value': 'thanlon'})
```
第二种：
```python
conn = engine.raw_connection()
cursor = conn.cursor()
cursor.execute('select *from users')
```
<hr>

##### 17. DBUtils 模块的作用
DBUtils 模块的作用是实现数据库连接池，是为了解决 <font>“多线程情况下请求比较多时性能降低”</font> 的问题。

<hr>

##### 18. SQLAchemy 中如何为表设置引擎和字符编码

<hr>


##### 19. SQLAchemy 中如何设置联合唯一索引
首先在中间表 ( 关联表 ) 的类中加入 \_ \_ table_args \_ \_ 字段，然后实例化 UniqueConstraint 类并放入一个元组中，最后把这个元组赋值给 \_ \_ table_args \_ \_。
```python
from sqlalchemy import Column, Integer, String, Text, Date, DateTime, ForeignKey, UniqueConstraint, Index

class Student(Base):
    __tablename__ = 'student'
    id = Column(Integer, primary_key=True)
    name = Column(String(32), index=True, nullable=False)

class Course(Base):
    __tablename__ = 'course'
    id = Column(Integer, primary_key=True)
    title = Column(String(32), index=True, nullable=False)

class Student2Course(Base):
    __tablename__ = 'student2course'
    id = Column(Integer, primary_key=True, autoincrement=True)
    student_id = Column(Integer, ForeignKey('student.id'))
    course_id = Column(Integer, ForeignKey('course.id'))
    __table_args__ = (
        UniqueConstraint('student_id', 'course_id', name='uc_student_course'),  # 联合唯一索引
        # Index('i_student_course', 'student_id', 'course_id') # 联合索引
    )
```
<hr>

##### 20. Flask 请求相关的数据和 Django 的区别
Flask 是直接调用 request 对象来请求相关的数据，而 Django 是通过参数传递实现的。

<hr>

##### 21. Flask 和 Django 最大的区别
( 1 ) 对于 request 对象，flask 是导入进来的，而 Django 是参数传递的

( 2 ) 对于session，flask 也导入进来的，而 Django 是依附 request 对象传递过来的。

<hr>

##### 22. Flask 如果开了两个进程，有几个 local 对象

<hr>

##### 23. 画出 session 流程图

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
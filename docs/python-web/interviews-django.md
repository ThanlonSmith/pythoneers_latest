![](../img/python-interview.jpg)
<hr>

#### Django面试题
<hr>

##### 1. django/flask/tornado框架的比较
为了方便开发者开发web应用，web框架应用而生。有的web框架帮助开发者构建好了socket服务端，有的web框架帮助开发者写好了模板渲染。总之，借助web框架可以减轻了开发者的工作量。flask框架只有路由系统，没有socket服务端和模板引擎，socket服务端使用是python第三方模块，如wsgiref。模板引擎使用的也是第三方模块jinjia2。django框架有路由系统、模板引擎，但是没有socket服务端，socket服务端使用的是python的第三方内置模块wsgiref，wsgiref把请求交给django做处理。另外，还有一种叫Tornado的框架，Tornado框架包含socket服务端、路由系统、模板引擎。可以将web框架这样分类，django框架和其它框架。因为django框架提供了很多特殊的功能，如缓存、分布式。其它框架是轻量级的web框架。

<hr>

##### 2. 什么是wsgi
wsgi是服务网关接口 ( Web Server Gateway Interface )，是一个协议。实现该协议的模块有 werkzeug、wsgiref。wsgiref 是实现 wsgi 协议的一个模块，本质是一个 socket 服务端，但是性能低。线上用 uwsgi。flask
用的是 werkzeug 模块。tornado是自己写的socket，也可以使用 werkzeug、wsgi。实现该协议的模块本质上是 socket 服务端用于接收用户数据并处理，一般 web 框架基于wsgi
实现，这样可以实现关注点分离。

wsgiref：
```python
from wsgiref.simple_server import make_server

def run_server(environ, start_response):
    start_response('200 OK', [('Content-Type', 'text/html')])
    return [bytes('<h1>Hello Erics!</h1>', encoding='utf-8'), ]

if __name__ == '__main__':
    httpd = make_server('127.0.0.1', 8000, run_server)
    httpd.serve_forever()
```
werkzeug：
```python
from werkzeug.wrappers import Response
from werkzeug.serving import run_simple

class Flask:
    def __call__(self, environ, start_response):
        response = Response('Erics')
        return response(environ, start_response)

    def run(self):
        run_simple('127.0.0.1', 8000, self)

app = Flask()
if __name__ == '__main__':
    app.run()
```
<hr>

##### 3. Django请求的生命周期(包含Django rest framework)
PS：dispatch
<hr>

##### 4. 列举Django的内置组件

<hr>

##### 5. Django的缓存是否可以使用redis,如果可以的话该如何配置

<hr>

##### 6. django路由系统中name的作用

<hr>

##### 7. django的模板中filter和simple_tag的区别

<hr>

##### 8. django-debug-toolbar的作用

<hr>

##### 9. django中如何实现单元测试

<hr>

##### 10. 解释orm中db first和code first的含义

<hr>

##### 11. django中如何根据数据库表生成model中的类

<hr>

##### 12. 使用orm和原生sql的优缺点
orm不需要sql语句，一定程度上可以提高开发效率，但是执行sql语句的速度慢；很明显，原生sql执行速度快，但是要写大量的sql语句，开发效率就会低一些。

<hr>

##### 13. 简述MVC和MTV

<hr>

##### 14. django的contenttype组件的作用

<hr>

##### 15. 谈谈你对restfull 规范的认识
它本质上是一些规范，比如规范中的url，可以让我们在写API的时候更好做区分、更容易让后台处理，并且让前端容易记住这些url……谈谈自己的理解就可。[要对使用RESTful之前和使用RESTful之后的效果做对比，理解着去回答，我就是这样做的。]

<hr>

##### 16. 接口的幂等性是什么意思

<hr>

##### 17. 列举restful的10条规范

<hr>

##### 18. Django中间件有哪些方法(5种方法)

<hr>

##### 19. Django中间件的应用场景(Django中间件可以做什么)
权限、用户登录验证

用中间件做过什么：适用于对所有的请求做批量的操作件（个别的是装饰器），基于角色的用户权限系统（不要说权限管理）、用户认证登录、CSRF token、黑名单(IP)、日志记录（请求记录）
<hr>

##### 20. Django的csrf是怎么实现的
process_view方法

检查是否被免除认证@csrf_exempt

去请求体或者cookie中获取token

csrf：

基于中间件的process_view方法
	
装饰器给单独的函数进行设置

<hr>

##### 21. 写出DRF各个组件的执行流程和调用的类

<hr>

##### 22. 简述什么是FBV和CBV

<hr>

##### 23. Django的request对象是在什么时候创建的

<hr>

##### 24. 如何给CBV的程序添加装饰器

<hr>

##### 25. 列举Django ORM中所有的方法(QuerySet对象的所有方法)

<hr>

##### 26. only和defer的区别

<hr>

##### 27. select_related和prefetch_related的区别

<hr>

##### 28. filter和exclude的区别

<hr>

##### 29. 列举Django ORM中三种能写sql语句的方法

<hr>

##### 30. django orm 中如何设置读写分离

<hr>

##### 31. F和Q的作用

<hr>

##### 32. values和values_list的区别

<hr>

##### 33. 如何使用django orm批量创建数据

<hr>

##### 34. django的Form和ModeForm的作用

<hr>

##### 35. django的Form组件中，如果字段中包含choices参数，请使用两种方式实现数据源实时更新

<hr>

##### 36. django的Model中的ForeignKey字段中的on_delete参数有什么作用

<hr>

##### 37. django中csrf的实现机制

<hr>

##### 38. django如何实现websocket

<hr>

##### 39. 基于django使用ajax发送post请求时，都可以使用哪种方法携带csrf token

<hr>

##### 40. django中如何实现orm表中添加数据时创建一条日志记录

<hr>

##### 41. django缓存如何设置

<hr>

##### 42. django的缓存能使用redis吗？如果可以的话，如何配置

<hr>

##### 43. 什么是RPC

<hr>

##### 44. 解释orm中 db first 和 code first的含义

<hr>

##### 45. 为什么要使用django rest framework框架

<hr>

##### 46. django rest framework框架中都有那些组件

<hr>

##### 47. django rest framework框架中的视图都可以继承哪些类

<hr>

##### 48. 简述 django rest framework框架的认证流程
封装request不会被问道，但是被放到认证中

DRF如何验证（基于数据库实现用户认证）
<hr>

##### 49. django rest framework如何实现的用户访问频率控制

<hr>

##### 50. ORM的实现原理
把类和对象以及一些操作转换成sql语句，拿到sql语句通过pymysql执行，不负责连接数据库，sqlalchemy
转换不同的sql语句，sqlserver，oracle。兼容各种数据库。简单的例子：
```python
class User:
    def __init__(self):
        self.id = xxx
        self.name = xxx
        self.address = xxx
    def order_by(self):
        pass    
obj = User()
obj.__dict__ = {
    id:'',
    name:'',
    address:'',
}
select id,name,address from user order_by...
```
<hr>

##### 54. 简述 celery 是什么以及应用场景

<hr>


##### 55. 简述celery运行机制

<hr>


##### 56. celery如何实现定时任务

<hr>

##### 57. 简述 celery 多任务结构目录

<hr>

##### 58. celery 中装饰器 @app.task 和 @shared_task的区别

<hr>

##### 59. csrf原理

<hr>

##### DRF分页
规避性能问题，数据量大，1千万如何分页！覆盖缩阴是错误的（能稍微快一些）！

<hr>

##### ORM操作

<hr>

##### 视图继承了哪些类
3层类，功能最多的继承6个类，APIView订制越高，增伤爱查、局部更新、继承别人的

<hr>

##### 如果数据量比较大如何分页
如果数据量比较大，分页比较大：记住每页最大值，没有中间件的情况你怎么办。数据库性能相关，可以从drf带过来，索引。分页越来越大查询数据越来越慢，最大值和最小值分页，但是里面存在问题，url页码是第一页9999可能翻页特别多，速度可能会慢（对mysql压力大）。DRF源码对页码上一个和下一页加密挺好的。url页码不可以自己拼凑。
<hr>

##### 钩子函数

<hr>

##### Django中的中间件中有session，所以可以request.session

<hr>

##### diapatch->封装request(到ruquest中写了user)->认证(initialize)->权限->节流

<hr>
DRF可以获取所有的代理IP，需要特殊设置代0理在转发的时候带上原来的IP，不带上是获取不到的。唯一标识可以是IP也可以是带来（节流）、认证的方法什么的都要记住

##### as_view()
as_view()返回view函数（请求进来限制性view函数）再到dispatch

<hr>

##### 简述 django rest framework框架的权限流程
 （图示写出来、流程的方法、调用关系要写出来）
<hr>

##### 简述 django rest framework框架的节流流程
 （图示写出来、流程的方法、调用关系要写出来）
<hr>

##### dispach对原生的request进行加工（DRF）本质基于反射实现，流程路由->视图->dispatch(反射)->

<hr>

#####　cors：浏览器支持返回响应头，让其通过验证

##### 对面向对象
- 封装：体现在将相同的属性和方法封装到类中；通过构造方法将数据封装到对象中（request就是封装，把django远程的request封装，认证中）
- 继承：把多个类中相同的方法和属性提取基类中，只实现一次，让子类或者派生类去继承它。（继承Form，Form还继承BaseForm，多继承）
- 多态：体现在鸭子模型，

##### 


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
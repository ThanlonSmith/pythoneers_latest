![](../img/python-web/django.jpeg)
#### Python Web框架
<hr>

##### 1. http协议
http 协议是无状态，短连接的。客户端连接服务器，发送请求，服务器响应请求后断开连接。
<hr>

##### 2. socket是什么
所有的网络请求都是基于 socket，浏览器是 socket 客户端，网站是 socket 服务端。
<hr>

##### 3. socket服务端
根据 url 的不同返回给用户不同的内容，使用路由系统，路由系统是 url 与函数的对应关系。返回给用户的内容本质是字符串，基本上返回的内容是动态的，所以需要使用到模板渲染。模板渲染实际上是把 html 充当模板，自己创造任意数据替换模板中的特殊字符，比如替换特殊字符为数据库中的数据。
<hr>

##### 4. web框架的分类
为了方便开发者开发 web 应用，web 框架应用而生。有的 web 框架帮助开发者构建好了 socket 服务端，有的web框架帮助开发者写好了模板渲染。总之，借助web框架可以减轻了开发者的工作量。Flask 框架只有路由系统，没有 socket 服务端和模板引擎，socket 服务端使用是 Python 第三方模块 wsgiref，模板引擎使用的也是第三方模块 jinjia2。Django 框架有路由系统、模板引擎，但是没有 socket 服务端，socket 服务端使用的是 Python 的第三方内置模块如 wsgiref，wsgiref 把请求交给 django 做处理。另外，还有Tornado框架，Tornado 框架包含 socket 服务端、路由系统、模板引擎。可以将 web 框架这样分类，Django 框架和其它框架。因为 Django 框架提供了很多特殊的功能，如缓存、分布式。其它框架是轻量级的 web 框架。
<hr>

##### 5. 三大web框架的比较
Django、Flask 和 Tornado 框架都有路由、视图和模板，但是 Tornado 的模板是自己写的，Flask 的模板不是自己写的，采用的是第三方组件 Jinjia2。Django 自带 ORM，其它两个框架中没有。<font>Django 中在写 SQL 的时候不应该再使用 pymysql，而应该使用 ORM</font>。其实 ORM 只是做了类和对象的映射，类对应表，对象对应数据行。Django 中把类和对象转换成SQL语句，但是 <font>本质上还是需要 pymysql 去连接数据库</font>。对于 Flask 框架，可以使用 pymysql，也可以使用 SqlAchemy，Tornado 也是一样的。对于 Django，一般使用的是 ORM，但也可以使用 pymysql，但是这不是主流。<font>对于非常复杂的 sql 语句，ORM 完成不了，只能写原生 SQL</font>。Django 中 ORM 也支持原生 sql，所以没必要使用 pymysql。
<hr>

##### 6. 静态web框架
使用 Python 可以写一个静态的web框架，可以处理用户访问静态资源的请求。请求头：
```py
'''
GET / HTTP/1.1
Host: 127.0.0.1:8080
Connection: keep-alive
Upgrade-Insecure-Requests: 1\
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3
Accept-Encoding: gzip, deflate, 
Accept-Language: zh-CN,zh;q=0.9
'''
```
使用 socket 接收用户的请求，处理用户的请求：
```python
def f1(request):
    '''
    处理用户请求：直接返回字节类型数据数据
    '''
    # 返回字节类型的数据b'f1'
    return b'f1'

def f2(request):
    '''
    处理用户请求：返回文件中的内容
    '''
    # 打开文件
    f = open('index.html', 'rb')
    # 读取文件内容到内存中，赋值给data变量
    data = f.read()
    # 关闭文件
    f.close()
    # 返回数据
    return data
    
# 存放路由和对应函数到列表中
routers = [
    ('/user', f1),
    ('/', f2)
]

def run():
"""
处理用户请求
"""
	# 实例化socket对象
    sock = socket.socket()
    # 绑定ip地址和端口
    sock.bind(('127.0.0.1', 8080))
    # 设置允许排队的连接数，socket允许的连接数时排队的连接数加上线程数量
    sock.listen(5)
    # 循环等待
    while True:
    	# 获取连接对象和连接的来源
        conn, addr = sock.accept()
        # 接收数据
        data = conn.recv(8096)
        # 解析请求头，目的是获取请求头中的url，并根据url向服务端发送请求
        # 格式化为utf-8的字符串
        data = str(data, encoding='utf-8') 
        # 根据\r\n\r\n将字符串分割为请求头和主体部分
        headers, bodys = data.split('\r\n\r\n') 
        # 使用\r\n分割得到请求方法，请求的url等
        headers_list = headers.split('\r\n')
        # 以空字符分割请求头的第一行得到请求的方法、路由和协议
        methods, url, protocal = headers_list[0].split(' ')
        # 遍历routers列表，确定请求的路由，找到路由对应的函数名
        for item in routers:
        	# 如果获取的请求头中url和我们服务端的路由对应
            if item[0] == url:
                # 就找到了对应的函数
                func_name = item[1]
                break
        # 如果函数名不为空
        if func_name:
        	# 执行函数
            response = func_name(data)
        else:
        	# 为空则返回'404'
            response = '404'	
		# 如果路由时/user
     	if url == '/user':
             conn.send(b'user page')
         else:
         # 没有找到路由则返回404
         	conn.send(b'404 is not found!')
         	conn.send(b"HTTP/1.1 200 OK\r\n\r\n")  # 响应头
         	conn.send(b"hello thanlon!")  # 相应体
         conn.close()
```
<hr>

##### 7. 动态web框架
使用 Python 可以写一个动态的 web 框架，可以处理用户访问动态资源的请求。使用 socket 接收用户的请求，将请求的内容做简单的处理然后返回给用户：
```python
def f1(request):
    '''
    处理用户请求：将动态的时间加入到返回的内容中
    '''
    f = open('news.html', 'r', encoding='utf-8')
    data = f.read()
    f.close()
    import time
    ctime = time.time()
    data = data.replace('%', str(ctime))
    return bytes(data, encoding='utf-8')
    
# 同样的定义个路由，routers最好要全部大写
routers = [
    ('/user', f1),
]
def run():
    sock = socket.socket()
    sock.bind(('127.0.0.1', 8080))
    sock.listen(5)
    while True:
        conn, addr = sock.accept()
        data = conn.recv(8096)
        data = str(data, encoding='utf-8')
        headers, bodys = data.split('\r\n\r\n')
        headers_list = headers.split('\r\n')
        methods, url, protocal = headers_list[0].split(' ')
        func_name = None
        for item in routers:
            if item[0] == url:
                func_name = item[1]
                break
        if func_name:
            response = func_name(data)
        else:
            response = '404'
        conn.close()
```
下面这个例子同样是可以处理用户访问动态资源的请求，但是使用到了数据库：
```python
def f1(request):
    # 创建连接
    conn = pymysql.connect(host='127.0.0.1', port=3306, user='root', passwd='123456', db='test')
    # 创建游标
    cursor = conn.cursor(cursor=pymysql.cursors.DictCursor)
    # 执行sql语句，并返回受影响的行数
    cursor.execute("select id,name,passwd from userinfo")
    # 获取表中的所有数据
    user_list = cursor.fetchall()
    # 关闭游标
    cursor.close()
    # 关闭连接
    conn.close()
    content_list = []
    for row in user_list:
    	# 将每一行字段的值加上html标签组成字符串，然后放到列表中
        tp = '<tr>%s</tr><tr>%s</tr><tr>%s</tr>' % (row['id'], row['name'], row['passwd'],)
        content_list.append(tp)
    # 将列表中元素拼接为大的字符串
    content = ''.join(content_list)
    # userlist.html是个模板
    f = open('userlist.html', 'r', encoding='utf-8')
    template = f.read()
    f.close()
    # 替换模板的值：将{{content}}替换为从数据库中读取到的内容
    data = template.replace('{{content}}', content)
	# 返回替换为数据库中的数据
    return bytes(data, encoding='utf-8')
    
# 定义访问的路由
routers = [
    ('/user', f1),
]

def run():
"""
run函数主要是获取用户连接，接收用户发送的数据请求，把用户的请求交给路由对应的函数处理
"""
    sock = socket.socket()
    sock.bind(('127.0.0.1', 8080))
    sock.listen(5)
    while True:
        conn, addr = sock.accept()
        data = conn.recv(8096)
        data = str(data, encoding='utf-8')
        headers, bodys = data.split('\r\n\r\n')
        headers_list = headers.split('\r\n')
        methods, url, protocal = headers_list[0].split(' ')
        func_name = None
        for item in routers:
            if item[0] == url:
                func_name = item[1]
                break
        if func_name:
            response = func_name(data)
        else:
            response = b'404'
        conn.send(response)
        conn.close()
```
<hr>

#### Django初识
<hr>

##### 1. Django的安装
推荐使用 pip 方式安装：**`pip install django`**，推荐使用国内镜像源，如阿里的镜像源，指定阿里镜像源来安装 Django：
```python
pip3 install django -i https://mirrors.aliyun.com/pypi/simple
```
<hr>

##### 2. Django程序的创建与运行
创建 Django 程序只需要使用简单的命令：
```python
django-admin startproject pro_name
```
pro_name 是 Django 程序的名字。Django 程序的运行需要使用：
```python
python manager.py runserver 127.0.0.1:8080
```
如果不指定地址和端口，默认使用本地地址和 8000 端口。
<hr>

##### 3. Django程序的目录
**`manager.py`**：对当前Django程序所有的操作可以基于 python manage.py runserver。

**`settings.py`**：Django 配置文件

**`url.py`**：路由系统

**`wsgi.py`**：用于定义 Django 使用什么 socket 服务端，如是 wsgiref，还是 uwsgi。<font>wsgiref 的性能是比较低的！</font>
<hr>

##### 4. Django模板路径的配置
Django 程序默认的模板名称是 **`templates`**，在项目名称目录下。模板名称需要与配置文件中TEMPLATES参数中配置的一样，
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200511172445720.png)
<hr>

##### 5. Django静态文件路径的配置
可以在项目名称目录下创建静态文件目录，常用的静态文件存放的目录的名字是 **`static`**，创建之后还需要修改配置文件来指定这个静态文件目录。修改配置文件：
```py
# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.2/howto/static-files/
'''
只要是使用/static/的前缀，就会在这个目录(static目录)下找静态文件
'''
STATIC_URL = '/static/'
STATICFILES_DIRS = (
    os.path.join(BASE_DIR, 'static'),
)
```
<hr>

##### 6. Django额外配置
需要再配置文件中将 **`django.middleware.csrf.CsrfViewMiddleware`**注释起来，
```py
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    # 'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]
```
<hr>

##### 7.  HttpResponse与render
<kbd>HttpResponse()</kbd> 函数是可以用来返回字符串，<kbd>render()</kbd> 函数用来返回模板。返回字符串：
```python
return HttpResponse('login!')
return HttpResponse('< input type="text">')
```
返回模板：
```python
return render(request, 'xxx.html')
```
reder 函数本质上调用的就是 HttpResponse 函数。
<hr>

##### 8. GET和POST请求
相同点：POST请求的时候，<kbd>request.GET.get( )</kbd> 和 <kbd>request.POST.get( )</kbd> 都可以从请求头的 url 中获取值；

不同点：GET请求的时候，只有 <kbd>request.GET.get()</kbd> 可以获取值。值从请求地址 **`/login/?page=1`** 中获取page的值1。
<hr>

#### 简单用户登录案例
简单的例子：用户输入用户名和密码后登录系统，这里暂时不连接数据库。系统验证登录成功，直接跳转到百度的首页。登录失败，系统会将错误信息打印在页面上。
<hr>

##### 1. 登录模板
模板中需要写个简单的登录表单，如下面的：
```
<form action="/login/" method="POST" name="loginForm">
    <div class="form-group">
        <label for="name">用户名</label> <input type="text" class="form-control" name="username" placeholder="请输入用户名">
    </div>
    <div class="form-group">
        <label for="">密码</label> <input type="password" class="form-control" name="pwd" placeholder="请输入密码">
        <div style="color: red;font-weight: bold">{{ msg }}</div>
    </div>
    <button type="submit" class="btn btn-primary" onclick="return checkForm()">登录</button>
</form>
```
模板中的 **`{{ msg }}`**
<hr>

##### 2. 登录逻辑
```python
from django.urls import path
from django.shortcuts import HttpResponse, render, redirect

def login(request):  #
    '''
    处理用户请求，返回相响应结果
    :param request:用户请求的相关信息（不是字节，是对象）
    :return:
    '''
    if request.method == 'GET':
        return render(request, 'login.html')  # 本质上是调用HttpResponse，自动找到login.html文件，读取内容并返回给用户
    else:
        # print(request.POST)  # 用户POST提交的数据（请求体）<QueryDict: {'name': ['thanlon'], 'pwd': ['123']}>
        # user = request.POST['username']#直接索引，如果没有username会报错
        username = request.POST.get('username')  # 如果没有username不会报错，返回None
        pwd = request.POST.get('pwd')  # 如果没有username不会报错，返回None
        if username == 'thanlon' and pwd == '123456':
            return redirect('https://www.blueflags.cn')
        else:
            return render(request, 'login.html', {'msg': '用户名或密码错误！'})  # django内部做模板渲染
            
urlpatterns = [
    # path('admin/', admin.site.urls),
    path('login/', login),
]
```
<hr>

##### 3. 结论
用户名和密码输入正确后，则登录成功跳转百度首页。否则，登录失败系统会将错误信息放到登录模板，然后传给用户。表现上是刷新表单界面，显示提示信息：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200511175759701.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RoYW5sb24=,size_16,color_FFFFFF,t_70)
<hr>

#### Django模板语法
<hr>

##### 1. 取字符串的值
返回模板的时候，加上传入的字符串：
```py
def index(request):
    return render(request, 'index/index.html', {'username': 'thanlon'})
```
模板中解析传入的字符串：
```html
{{ username }}
```
<hr>

##### 2. 取列表的值
返回模板的时候，加上传入列表：
```py
def index(request):
    return render(request, 'index/index.html', {'username': ['thanlon','Kiku']})
```
模板中解析传入的列表，直接通过索引取：
```html
{{ username.0 }}
```
通过循环遍历：
```html
{% for item in username %}
    {{ item }}
{% endfor %}
```
<hr>

##### 3. 取字典的值
返回模板的时候，加上传入字典：
```py
def index(request):
    return render(request, 'index/index.html', {
        'user_dict': {'name': 'thanlon', 'age': 23}
    })
```
模板中解析传入的字典：
```html
{{ user_dict.name }}
{{ user_dict.age }}
```
<hr>

##### 4. 取嵌套在列表中的字典的值
返回模板的时候，加上传入嵌套在列表中的字典：
```python
def index(request):
    return render(request, 'index/index.html', {
        'user_list_dict': [
            {'id': 1, 'name': 'thanlon'},
            {'id': 2, 'name': 'kuku'},
        ]
    })
```
模板中解析传入的嵌套在列表中的字典，通过索引取值：
```python
{{ user_list_dict.0.id}}        
{{ user_list_dict.0.name}}
{{ user_list_dict.1.id}}        
{{ user_list_dict.0.name}}
```
模板中解析传入的嵌套在列表中的字典，通过通过循环取值：
```python
{% for row in user_list_dict %}
    {{ row.id }}
    {{ row.name }}
{% endfor %}
```
<hr>

##### 5. 母板
把模板上公共的部分放到到母板中，可以减少代码量，如把模板头部的导航栏和尾部版权部分放入母板中。子板使用 **`{% extends "xxx.html" %}`** 来继承母板中的代码，extends 是 Django 内置的模板函数。但是，<font>一个子板只能继承一个母板 </font>。简而言之，母板是用来继承的。
<hr>

##### 6. include
include 也是 Django 内置的模板函数，使用的方式是：**`{% include "xxx.html" %}`**。include 是包含的意思，它的作用是把其它模板引入到自己的模板中。不限制 include 的使用次数，可以引入多个模板，但一般都是小的模板组件。模板渲染之前，会找到组件的内容替换掉 **`{% include "xxx.html" %}`** 合并后渲染。因此，如果组件中有需要传值部分，只需通过合并后的模板函数传值。
<hr>

##### 7. 模板的内置函数
模板的内置函数在模板中 <font>不需要加括号就可以自动执行</font>，
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
{{ 'thanlon'|upper }}
</body>
</html>
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200615174101704.png)
<hr>

##### 8. 模板自定义函数
自定义模板函数需要以下操作：

( 1 ) 在应用目录下创建 templatetags 文件夹

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200615174851934.png)

( 2 ) 在 templatetags 下创建一个 py 文件，文件名自定义：
```python
from django import template

# 名称必须是register
register = template.Library()

@register.filter
def my_lower(value):
    return value.lower()
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200615174922172.png)

( 3 ) 在模板中导入创建的 py 文件：

**`index.html:`**
```html
{% load templates_func %}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
</body>
</html>
```
( 4 ) 应用模板自定义的函数：

**`index.html:`**
```html
{% load templates_func %}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
{{ 'thanlon'|my_lower }}
</body>
</html>
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200615175844793.png)

( 5 ) 在settings中配置当前app，否则django无法找到自定的模板函数。当然这里使用pycahrm软件直接就创建好了：

**`settings.py:`**
```py
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'app01.apps.App01Config',
]
```
这里读取的是 app.py 文件中的 App01Config 类的类变量：

**`apps.py:`**
```py
from django.apps import AppConfig

class App01Config(AppConfig):
    name = 'app01'
```
<hr>

##### 9. simple_filter和simple_tag
simple_filter <font>最多有两个参数</font>，格式是：<kbd>{{ 第一个参数|函数名称:"第二个参数" }}</kbd>，simple_filter 的使用：

**`templates_func.py:`**
```py
from django import template

# 名称必须是register
register = template.Library()


@register.filter
def func(value, arg):
    return value + arg
```
**`index.html:`**
```html
{% load templates_func %}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
{{ 1| func:1 }}
{{ 'Thanlon'| func:'!' }}
</body>
</html>
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200615182122166.png)

simple_tag 和 simple_filter 类似，但是 simple_tag 中设置函数的 <font>参数个数无限制</font>。使用格式：<kbd>{% 函数名 参数1 参数2 参数3 ... %}</kbd>，simple_tag 的使用：

**`templates_func.py:`**
```py
from django import template

# 名称必须是register
register = template.Library()

@register.simple_tag
def func(v1, v2, v3):
    return v1 + v2 + v3
```
**`index.html:`**
```html
{% load templates_func %}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
{% func 1 2 3 %}
{% func '1' '2' '3' %}
</body>
</html>
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/2020061518270876.png)

simple_filter 与 simple_simple_tag 的区别是，simple_filter 可以 <font>作为提条件语句放到判断语句后面</font>，使用方式：
**`templates_func.py:`**
```py
from django import template

# 名称必须是register
register = template.Library()

@register.filter
def func(v):
    return v
```
**`index.html:`**
```html
{% load templates_func %}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
{% if True|func %}
    <h4>Ture</h4>
{% else %}
    <h4>False</h4>
{% endif %}
</body>
</html>
```
<hr>

#### 学生信息管理系统
<hr>

##### 1. 数据库表的结构设计
```py
# 创建test数据库
create database test default character set utf8;
# 创建学生表
create table student(id int auto_increment primary key,name varchar(10) not null,class_id int not null);
# 创建班级表
create table class(id int auto_increment primary key, title varchar(20) not null);
# 创建教师表
create table teacher(id int auto_increment primary key,name varchar(10) not null);
# 创建教师班级表
create table teacher2class(id int primary key auto_increment,teacher_id int not null,class_id int not null);
```
<hr>

##### 2. 后台引入母板
把重复用到的html代码放到一个html文件中，**`这个html文件被称为母板`**，需要用到这些代码的模板可以直接继承这个母板。这个html文件使用的标签是：**`{% block xxx %} {% endblock %},{% extends '母板.html'%}`**。
<hr>

##### 3. 查询班级信息
首先要向班级表中插入一条测试数据：
```sql
insert class values(null,'软件工程'),(null,'计算机科学与技术');
```
可以在项目名所在的目录下创建一个名为 **`app01`** 的目录，并在该目录下创建 **`views.py`** 文件，下面开始在 **`urls.py`** 文件中加入查询班级的路由：
```py
from django.contrib import admin
from django.urls import path
from app01 import views

urlpatterns = [
    path('admin/', admin.site.urls),
    # 查询班级信息的路由以及对应的函数(对应views下的classes函数)
    path('classes/', views.classes),
]
```
在 **`views`** 下的 **`classes`** 函数写查询班级信息的逻辑代码：
```py
# 导入返回模板的函数render和重定向的redirect函数
from django.shortcuts import render, redirect
# 导入pymysql模块用来连接数据库，这里暂时使用pymysql
import pymysql

def classes(request):
    '''
    查询班级id、班级名称
    :param request:对象相关的数据
    :return:渲染后的模板
    '''
    # 创建连接
    conn = pymysql.connect(host='127.0.0.1', port=3306, user='root', passwd='123456', db='test')
    # 创建游标
    cursor = conn.cursor(cursor=pymysql.cursors.DictCursor)
    # 执行sql语句
    cursor.execute("select id,title from class")
    # 获取查询到的所有信息
    classes_list = cursor.fetchall()
    # 关闭游标
    cursor.close()
    # 关闭连接
    conn.close()
    # 返回模板和数据
    return render(request, 'classes.html', {'classes_list': classes_list})
```
在 **`templates`** 文件夹下新建 **`classes.html`** 文件，也就是我们的模板：
```py
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>班级信息</title>
</head>
<body>
<p><a href="/add-class/">添加</a></p>
{% for row in classes_list %}
    <tr>
        <td>{{ row.id }}</td>
        <td>{{ row.title }}</td>
    </tr>
    <br>
{% endfor %}
</body>
</html>
```
查询班级信息页面：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200613214216239.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RoYW5sb24=,size_16,color_FFFFFF,t_70)
<hr>

##### 4. 添加班级信息
添加“添加班级信息”的路由，
```py
from django.contrib import admin
from django.urls import path
from app01 import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('classes/', views.classes),
    path('add-class/', views.add_class),
]
```
在 **`templates`** 目录下新建名为 **`add_class.html`** 的模板：
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>添加班级信息</title>
</head>
<body>
<h1>添加班级</h1>
<form action="/add-class/" method="post">
    <label>班级名称：</label>
    <input type="text" name="class_title">
    <input type="submit" value="提交">
</form>
</body>
</html>
```
在 **`views.py`** 的 **`add_class`** 函数中写添加学生班级信息的逻辑代码：
```py
def add_class(request):
    # 如果是get请求就返回add_class.html模板就可以
    if request.method == 'GET':
        return render(request, 'add_class.html')
    # 如果是post请求则执行下面的代码
    else:
        # 获取班级的标题
        class_title = request.POST.get('class_title')
        # 创建数据库连接对象
        conn = pymysql.connect(host='127.0.0.1', port=3306, user='root', passwd='123456', db='test')
        # 创建游标
        cursor = conn.cursor(cursor=pymysql.cursors.DictCursor)
        # 将班级的名称传到sql语句中
        cursor.execute('insert into class(title) values(%s)', class_title)
        # cursor.execute("insert into class(title) values(%s)", [class_title, ])
        # 提交(查询不需要，其它如添加、修改、更新数据是需要执行commit方法才能将数据插入成功)
        conn.commit()
        # 关闭游标
        cursor.close()
        # 关闭连接
        conn.close()
        # 添加之后就会重定向到/classes/路由，会显示添加后的班级
        return redirect('/classes/')
```
在班级信息页面中点击添加按钮进入添加班级信息界面，添加班级信息后，页面会自动跳转到班级信息页面。

添加班级信息页面效果：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200613214306792.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RoYW5sb24=,size_16,color_FFFFFF,t_70)
<hr>

##### 5. 编辑班级信息
根据客户端传过来的班级id就可编辑班级信息，逻辑代码：
```py
def edit_class(request):
	# 如果是get请求，这里额外也需要查询下数据库，把原来的信息也展示出来
    if request.method == 'GET':
    	# 获取客户端传过来的班级id
        nid = request.GET.get('nid')
        # 创建数据库连接
        conn = pymysql.connect(host='127.0.0.1', port=3306, user='root', passwd='123456', db='test')
        # 执行游标
        cursor = conn.cursor(cursor=pymysql.cursors.DictCursor)
        # 执行sql语句
        cursor.execute('select id,title from class where id=%s', nid)
        # 获取查询到的所有数据
        result = cursor.fetchone()
        # 创建游标
        cursor.close()
        # 关闭连接
        conn.close()
        # 返回模板和数据
        return render(request, 'edit_class.html', {'result': result})
    # post请求用来修改班级信息
    else:
        # nid = request.POST.get('nid')  # 放到请求体
        nid = request.GET.get('nid')  # 放到请求头
        title = request.POST.get('title')
        # 创建数据库连接
        conn = pymysql.connect(host='127.0.0.1', port=3306, user='root', passwd='123456', db='test')
        # 创建游标
        cursor = conn.cursor(cursor=pymysql.cursors.DictCursor)
        # 执行sql语句
        cursor.execute('update class set title=%s where id = %s', [title, nid])
         # 提交事务
    	conn.commit()
    	# 关闭游标
    	cursor.close()
    	# 关闭连接
    	conn.close()
        return redirect('/classes/')
```
需要跳转到编辑信息的模板，将其命名为：**`edit_class.html`**：
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>修改班级信息</title>
</head>
<body>
<h3>编辑班级信息</h3>
<form action="/edit-class/?nid={{ result.id }}" method="post">
    <label>班级名称：</label>
    {#    <input type="text"style="display: none" value="{{ result.id }}">#}
    <input type="text" name="title" value="{{ result.title }}">
    <input type="submit" value="提交">
</form>
</body>
</html>
```
编辑班级信息页面：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200613214342969.png)
<hr>

###### 6. 删除班级信息
浏览器向服务端发送删除数据的请求，服务端接收请求删除数据后向浏览器发送响应，告诉浏览器重定向到 **`/classes/`**。服务端向浏览器发送响应的响应头中有 **`location:http://127.0.0.1:8000/classes/`**，即是：告诉浏览器向此链接发送一次请求。

直接删除就可以了，删除的逻辑是：
```py
def del_class(request):
    # 获取客户端传过来的nid，我们要个根据nid来删除数据
    nid = request.GET.get('nid')
    # 创建连接对象
    conn = pymysql.connect(host='127.0.0.1', port=3306, user='root', passwd='123456', db='test')
    # 创建游标
    cursor = conn.cursor(cursor=pymysql.cursors.DictCursor)
    # 执行sql语句
    cursor.execute('delete from class where id=%s', nid)
    # cursor.execute("insert into class(title) values(%s)", [class_title, ])
    # 提交事务
    conn.commit()
    # 关闭游标
    cursor.close()
    # 关闭连接
    conn.close()
    return redirect('/classes/')
```
<hr>

##### 7. 查询学生信息
首先向学生表中插入测试数据：
```sql
insert into student values(null,'thanlon',1);
insert into student values(null,'kiku',2);
```
查询学生信息的逻辑代码：
```py
def students(request):
    '''
    学生列表
    :param request:封装了请求相关的所有信息
    :return:返回模板和数据
    '''
    # 创建连接对象
    conn = pymysql.connect(host='127.0.0.1', port=3306, user='root', passwd='123456', db='test')
    # 创建游标
    cursor = conn.cursor(cursor=pymysql.cursors.DictCursor)
    # 执行sql语句
    cursor.execute(
        'select student.id,student.name,class.title from  student left join class on student.class_id=class.id')
    # 获取查询到的所有数据
    student_list = cursor.fetchall()
    # 关闭游标
    cursor.close()
    # 关闭连接
    conn.close()
    # 返回模板和数据
    return render(request, 'students.html', {'student_list': student_list})
```
新建显示学生信息的模板 **`students.html`**：
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>学生信息</title>
    <link rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css"
          integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
          crossorigin="anonymous">
</head>
<body>
<div class="container" style="margin-top: 20px">
    <div class="row">
        <div class="col-md-4">
            <a class="btn btn-default" href="">添加</a></p>
            <table class="table table-hover text-center">
                <tr>
                    <th class="text-center">ID</th>
                    <th class="text-center">学生姓名</th>
                    <th class="text-center">学生班级</th>
                    <th class="text-center">操作</th>
                </tr>
                {% for row in student_list %}
                    <tr>
                        <td>{{ row.id }}</td>
                        <td>{{ row.name }}</td>
                        <td>{{ row.title }}</td>
                        <td><a href="/">编辑</a> <a href="">删除</a>
                        </td>
                    </tr>
                {% endfor %}
            </table>
        </div>
    </div>
</div>
</body>
</html>
```
查询学生信息页面：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200613214424957.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RoYW5sb24=,size_16,color_FFFFFF,t_70)
<hr>

##### 8. 添加学生信息
和添加班级信息同样的逻辑：
```py
def add_student(request):
	# 如果是get请求
    if request.method == 'GET':
    	# 创建连接对象
        conn = pymysql.connect(host='127.0.0.1', port=3306, user='root', passwd='123456', db='test')
        # 创建游标
        cursor = conn.cursor(cursor=pymysql.cursors.DictCursor)
        # 执行查询的sql语句
        cursor.execute("select id,title from class")
        # 获取查询到的所有数据
        classe_list = cursor.fetchall()
        # 关闭游标
        cursor.close()
        # 关闭连接
        conn.close()
        # 返回模板和数据
        return render(request, 'add_student.html', {'class_list': classe_list})
    # 如果是post请求
    else:
    	# 获取学生的名字
        name = request.POST.get('name')
        # 获取学生的班级id
        class_id = request.POST.get('class_id')
        # 创建连接
        conn = pymysql.connect(host='127.0.0.1', port=3306, user='root', passwd='123456', db='test')
        # 创建游标
        cursor = conn.cursor(cursor=pymysql.cursors.DictCursor)
        # 将学生的名字和班级的id信息放到sql中
        cursor.execute("insert into student(name,class_id) values (%s,%s)", [name, class_id, ])
        # 执行事务
        conn.commit()
        # 关闭游标
        cursor.close()
        # 关闭连接
        conn.close()
        # 返回模板
        return redirect('/students/')
```
下面这部分是模板 **`add_student.html`**，注意模板语法的书写：
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>添加学生信息</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css"
          integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
</head>
<body>
<div class="container" style="margin-top: 20px">
    <div class="row">
        <div class="col-md-4 col-md-offset-4">
            <form action="/add-student/" method="post">    {#如果没有写，默热提交到当前url#}
                <div class="form-group">
                    <label>姓名：</label>
                    <input type="text" class="form-control" id="" placeholder="" name="name">
                </div>
                <div class="form-group">
                    <select class="form-control" name="class_id">
                        {% for row in class_list %}
                            <option value="{{ row.id }}">{{ row.title }}</option>
                        {% endfor %}
                    </select>
                </div>
                <button type="submit" class="btn btn-primary">添加</button>
            </form>
        </div>
    </div>
</div>
</body>
</html>
```
添加学生信息页面：

![在这里插入图片描述](https://img-blog.csdnimg.cn/2020061321505232.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RoYW5sb24=,size_16,color_FFFFFF,t_70)
<hr>

##### 9. 编辑学生信息
首先写将班级信息和当前学生信息渲染到编辑学生信息模板的逻辑，然后才是编辑学生信息的逻辑：
```py
def edit_student(request):
	"""
	编辑学生信息
	"""
	# get请求时
    if request.method == 'GET':
    	# 获取传过来的学生id
        nid = request.GET.get('nid')
        # 创建连接对象
        conn = pymysql.connect(host='127.0.0.1', port=3306, user='root', passwd='123456', db='test')
        # 创建游标
        cursor = conn.cursor(cursor=pymysql.cursors.DictCursor)
        # 执行查询班级信息的sql
        cursor.execute("select id,title from class")
        # 获取所有班级信息
        class_list = cursor.fetchall()
        # 执行查询当前学生编号、名字和班级id的sql
        cursor.execute("select id,name,class_id from student where id=%s", nid)
        # 获取查询到的数据。因为数据只有一条，所以这里使用fetchone()就可以了
        current_student_info = cursor.fetchone()
        # 关闭游标
        cursor.close()
        # 关闭连接
        conn.close()
        # 返回模板和数据
        return render(request, 'edit_student.html',
                      {'class_list': class_list, 'current_student_info': current_student_info})
    # post请求时
    else:
    	# 从url中获取学生的id
        nid = request.GET.get('nid')
        # 从请求体(form表单)中获取当前学生的姓名
        name = request.POST.get('name')
        # 从请求体中获取当前学生的班级id
        class_id = request.POST.get('class_id')
        # 创建练级
        conn = pymysql.connect(host='127.0.0.1', port=3306, user='root', passwd='123456', db='test')
        # 创建游标
        cursor = conn.cursor(cursor=pymysql.cursors.DictCursor)
        # 执行sql语句
        cursor.execute("update student set name=%s,class_id=%s where id = %s", [name, class_id, nid])
        # 提交事务
        conn.commit()
        # 关闭游标
        cursor.close()
        # 关闭连接
        conn.close()
        # 重定向到学生信息页面
        return redirect('/students/')
```
编辑学生信息的模板 **`edit_student.html`**：
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>添加学生信息</title>
</head>
<body>
<div class="container" style="margin-top: 20px">
    <div class="row">
        <div class="col-md-4 col-md-offset-4">
            <form action="/edit-student/?nid={{ current_student_info.id }}" method="post">
                {#            还可以设置input标签将其隐藏#}
                <div class="form-group">
                    <label>姓名：</label>
                    <input type="text" class="form-control" id="" placeholder="" name="name"
                           value="{{ current_student_info.name }}">
                </div>
                <div class="form-group">
                    <select class="form-control" name="class_id">
                        {% for row in class_list %}
                            {% if  row.id == current_student_info.class_id %}
                                <option selected="selected" value="{{ row.id }}">{{ row.title }}</option>
                            {% else %}
                                <option value="{{ row.id }}">{{ row.title }}</option>
                            {% endif %}
                        {% endfor %}
                    </select>
                </div>
                <button type="submit" class="btn btn-primary">更新</button>
            </form>
        </div>
    </div>
</div>
</body>
</html>
```
编辑学生信息页面：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200613215123950.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RoYW5sb24=,size_16,color_FFFFFF,t_70)
<hr>

##### 10. 删除学生信息
删除学生信息的逻辑，与删除班级相同，也是比较简单的：
```py
def del_student(request):
    '''
    删除学生信息
    '''
    # 获取学生编号
    nid = request.GET.get('nid')
    # 创建连接
    conn = pymysql.connect(host='127.0.0.1', port=3306, user='root', passwd='123456', db='test')
    # 创建游标
    cursor = conn.cursor(cursor=pymysql.cursors.DictCursor)
    # 执行sql
    cursor.execute('delete from student where id=%s', nid)
    # 提交事务
    conn.commit()
    # 关闭游标
    cursor.close()
    # 关闭连接
    conn.close()
    # 返回模板
    return redirect('/students/')
```
<hr>

##### 11. Bootstrap介绍
**`Bootstrap是一个包含css和js的代码库`**，有很多已经构建好的组件，模态对话框就是其中的一种，因为接下来要使用到模态对话框，我们直接用就可以这个组件就可以。**`Bootstrap还支持响应式布局`**，响应式都是基于css的media来实现的，下面是一个使用media实现响应式的例子：
```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<style>
    .page-header {
        height: 20px;
        background: rebeccapurple;
    }

    @media (max-width: 1200px) {
        .page-header {
            height: 20px;
            background: yellowgreen; 
        }
    }
    @media (max-width: 1000px) {
        .page-header {
            height: 20px;
            background: lightcoral;
        }
    }
    @media (max-width: 300px) {
        .page-header {
            height: 20px;
            background: saddlebrown;
        }
    }
</style>
<body>
<div class="page-header"></div>
</body>
</html>
```
当页面宽度大于等于是1200px的时候，显示yellowgreen的颜色，当页面宽度大于等于是1000px的时候，显示lightcoral的颜色，当页面宽度大于等于300px的时候，显示saddlebrown的颜色。
<hr>

##### 12.  AJAX添加班级信息
添加班级信息的逻辑：
```py
def add_class_modal(request):
	# 获取班级名称
    title = request.POST.get('title')
    # 输入的班级名称的长度需要大于0
    if len(title) > 0:
    	# 创建连接
        conn = pymysql.connect(host='127.0.0.1', port=3306, user='root', passwd='123456', db='test')
        # 创建游标
        cursor = conn.cursor(cursor=pymysql.cursors.DictCursor)
        # 执行sql
        cursor.execute('insert into class (title) values (%s)', title)
        # 提交事务
        conn.commit()
        # 关闭游标
        cursor.close()
        # 关闭连接
        conn.close()
        # 向前台返回ok
        return HttpResponse('ok')
    else:
    	# 如果提交过来的班级名称长度是小于0的,向前台返回不能为空，给前台提示信息
        return HttpResponse('班级不能为空！')
```
添加一个模态对话框用来添加班级信息，由于以Form表单的方式提交，**`不论班级信息填写正确还是错误都会提交到后台并刷新页面`**，这样模态框就会消失。所以，我们这里使用AJAX的方式来提交请求，**`AJAX可以在不刷新页面的情况下与后台交互`**：
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>班级信息</title>
    <link rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css"
          integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
          crossorigin="anonymous">
    <style>
        .hide {display: none;}
        .shadow {position: fixed; top: 0; bottom: 0; left: 0; right: 0; background-color: black; opacity: 0.4; z-index: 999; }
        .modal_layer { position: fixed; z-index: 1000; left: 50%; top: 50%; background-color: white; width: 400px; height: 150px; margin-top: -150px; margin-left: -200px;}
    </style>
</head>
<body>
<div class="container" style="margin-top: 20px">
    <div class="row">
        <div class="col-md-4 col-md-offset-4">
            {#            <a class="btn btn-default" href="/add-class/">添加</a>#}
            <a class="btn btn-default" id="addClasses">添加班级信息</a>
            <div class="shadow hide" id="shadow"></div>
            <div class="modal_layer hide" id="modal_layer">
                <div class="panel panel-primary">
                    <div class="panel-heading">添加班级信息</div>
                    <div class="panel-body">
                        <form action="/add-class-modal/" method="post">
                            <div class="form-group">
                                <label for="">班级名称</label>
                                <input type="text" name="title" class="form-control" id="title" placeholder=""
                                       autofocus>
                                <span id="error" style="color: red"></span>
                            </div>
                            <input type="button" class="btn btn-primary" value="确认添加" id="add_class">
                        </form>
                    </div>
                </div>
            </div>
            <table class="table table-hover text-center">
                <tr>
                    <th class="text-center">班级ID</th>
                    <th class="text-center">班级名称</th>
                    <th class="text-center">操作</th>
                </tr>
                {% for row in classes_list %}
                    <tr>
                        <td>{{ row.id }}</td>
                        <td>{{ row.title }}</td>
                        <td>
                            <a href="/edit-class/?nid={{ row.id }}">编辑</a> <a href="/del-class/?nid={{ row.id }}">删除</a>
                        </td>
                    </tr>
                {% endfor %}
            </table>
        </div>
    </div>
</div>
</body>
<script
        src="https://code.jquery.com/jquery-3.4.1.js"
        integrity="sha256-WpOohJOqMqqyKL9FccASB9O0KwACQJpFTUBLTYOVvVU="
        crossorigin="anonymous"></script>
<script
        src="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/js/bootstrap.min.js"
        integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa"
        crossorigin="anonymous">
</script>
<script>
    $(document).ready(function () {
        $('#addClasses').click(function () {
            $('#shadow').removeClass('hide');
            $('#modal_layer').removeClass('hide');
        });
        $('#add_class').click(function () {
            $.ajax({
                url: '/add-class-modal/',
                type: 'POST',
                data: {'title': $('#title').val()},
                success: function (data) {
                    //当服务端处理完，返回数据时，自动调用该函数
                    if (data == 'ok') {
                        alert('添加成功！');
                        location.href = '/classes/';
                    } else {
                        $('#error').text(data);
                    }
                }
            })
        });
         $('#shadow').click(function () {
            $('#shadow').addClass('hide');
            $('#modal_layer').addClass('hide');
        });
    })
</script>
</html>
```
模块对话框适用于 **`少量的输入标签和数据`** 的情况下，url适用于 **`操作多、对于大量的数据`** 的操作。

AJAX添加班级信息页面：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200613215229753.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RoYW5sb24=,size_16,color_FFFFFF,t_70)
<hr>

##### 13. AJAX编辑班级信息
还是使用之前编辑班级信息的逻辑代码，可以在原来的基础上可以加上一些表单字段的判断：
```py
def edit_class(request):
    '''
    编辑班级信息
    '''
    # 获取班级编号
    class_id = request.GET.get('class_id')
    # 获取班级名称
    class_title = request.GET.get('class_title')
    # 获取的名称长度要大于0
    if len(class_title) > 0:
    	# 创建连接
        conn = pymysql.connect(host='127.0.0.1', port=3306, user='root', passwd='123456', db='test')
        # 创建游标
        cursor = conn.cursor(cursor=pymysql.cursors.DictCursor)
        # 执行sql
        cursor.execute('update class set title=%s where id = %s', [class_title, class_id])
        # 提交事务
        conn.commit()
        # 关闭游标
        cursor.close()
        # 关闭连接
        conn.close()
        # 向前台返回的data，前台通过这里来判断编辑是否完成
        return HttpResponse('ok')
    else:
    	# 返回错误提示信息
        return HttpResponse('班级不能为空！')
```
使用AJAX发送请求和获取服务端传过来的数据：
```html
<script>

        $(document).ready(function () {
      		function edit_class_modal(ths) {
            	$('#shadow').removeClass('hide');
            	$('#modal_edit').removeClass('hide');
            	var row = $(ths).parent().prevAll();
            	{#console.log(v[0])#}
            	console.log($(row[0]).text());
            	content_title = $(row[0]).text();
            	content_id = $(row[1]).text();
            	$('#edit_title').val(content_title);
            	$('#edit_id').val(content_id);
        	}
            $('#edit_class').click(function () {
                $.ajax({
                    url: '/edit-class/',
                    type: 'GET',
                    data: {
                        'class_id': $('#edit_id').val(),
                        'class_title': $('#edit_title').val()
                    },
                    success: function (data) {
                        if (data == 'ok') {
                            location.href = '/classes/'
                        } else {
                            $('#edit_error').text(data);
                        }
                    }
                })
            })
            $('#close_edit_modal').click(function () {
                $('#shadow').addClass('hide');
                $('#modal_edit').addClass('hide');
            });
        });
    </script>
```
AJAX编辑班级信息页面：

![在这里插入图片描述](https://img-blog.csdnimg.cn/2020061321532451.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RoYW5sb24=,size_16,color_FFFFFF,t_70)
<hr>

##### 14. AJAX删除班级信息
删除班级的逻辑：
```py
def del_class(request):
    '''
    删除班级信息
    '''
    # 获取班级编号，需要通过编号删除班级信息
    class_id = request.GET.get('class_id')
    # 创建连接
    conn = pymysql.connect(host='127.0.0.1', port=3306, user='root', passwd='123456', db='test')
    # 创建游标
    cursor = conn.cursor(cursor=pymysql.cursors.DictCursor)
    # 将班级id传到sql豫剧中并执行sql
    cursor.execute('delete from class where id=%s', class_id)
    # 提交事务
    conn.commit()
    # 关闭游标
    cursor.close()
    # 关闭连接
    conn.close()
    # 返回操作成功的标识
    return HttpResponse('ok')
```
AJAX删除班级信息：
```html
<script>
    function del_class(ths) {
        var row = $(ths).parent().prevAll();
        class_id = $(row[1]).text();
        $.ajax({
            url: '/del-class/',
            type: 'get',
            data: {'class_id': class_id},
            success: function (data) {
                if (data == 'ok') {
                    location.href = '/classes/'
                } else {
                    alert('删除失败！')
                }
            }
        })
    }
 </script>
```
<hr>

##### 15. 数据库操作代码复用
视图函数操作数据库时有很多重复的操作步骤，可以把这些操作放到一个函数中，

**`sqlhelper.py`**：
```py
import pymysql

def get_list(sql, args):
    """
    返回查询到的所有结果
    :param sql:
    :param args:
    :return:
    """
    # 创建连接
    conn = pymysql.connect(host='127.0.0.1', port=3306, user='root', passwd='123456', db='test', charset='utf8')
    # 创建游标
    cursor = conn.cursor(cursor=pymysql.cursors.DictCursor)
    # 执行sql
    cursor.execute(sql, args)
    # 获取查询到的内容
    ret = cursor.fetchall()
    # 关闭游标
    cursor.close()
    # 关闭连接
    conn.close()
    return ret

def get_one(sql, args):
    """
    返回查询到的一条结果
    :param sql:
    :param args:
    :return:
    """
    # 创建连接
    conn = pymysql.connect(host='127.0.0.1', port=3306, user='root', passwd='123456', db='test', charset='utf8')
    # 创建游标
    cursor = conn.cursor(cursor=pymysql.cursors.DictCursor)
    # 执行sql
    cursor.execute(sql, args)
    # 获取查询到的内容
    ret = cursor.fetchone()
    # 关闭游标
    cursor.close()
    # 关闭连接
    conn.close()
    return ret

def modify(sql, args):
    """
    修改和删除操作
    :param sql:
    :param args:
    :return:
    """
    # 创建连接
    conn = pymysql.connect(host='127.0.0.1', port=3306, user='root', passwd='123456', db='test', charset='utf8')
    # 创建游标
    cursor = conn.cursor(cursor=pymysql.cursors.DictCursor)
    # 执行sql
    cursor.execute(sql, args)
    # 提交事务
    conn.commit()
    # 关闭游标
    cursor.close()
    # 关闭连接
    conn.close()
```
<hr>

##### 16. AJAX添加学生信息
添加学生信息的业务逻辑：
```py
def add_student_modal(request):
    """
    模态对话框的方式添加班级信息
    :param request:
    :return:
    """
    ret = {'status': True, 'msg': None}
    try:
        name = request.POST.get('name')
        class_id = request.POST.get('class_id')
        if len(name) <= 0 or len(class_id) <= 0:
            ret['status'] = False
            ret['msg'] = '学生姓名或班级不能为空'
            return HttpResponse(json.dumps(ret))
        sqlhelper.modify(sql='insert into student(name,class_id) values(%s,%s)', args=[name, class_id])
    except Exception as e:
        ret['status'] = False
        ret['msg'] = str(e)
    return HttpResponse(json.dumps(ret))
```
AJAX添加学生信息：
```js
$('#add_student').click(function () {
              $.ajax({
                  url: '/user/add_student_modal/',
                  type: 'POST',
                  data: {
                      'name': $('#name').val(),
                      'class_id': $('#class_id').val()
                  },
                  success: function (data) {
                      data = JSON.parse(data) //把后台传过来的字符串转换成js中的对象
                      if (data.status) {
                          location.href = '/user/student/'
                      } else {
                          $('#add_student_error').text(data.msg);
                      }
                  }
              });
          })
```
AJAX添加学生信息：

![在这里插入图片描述](https://img-blog.csdnimg.cn/2020061321541890.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RoYW5sb24=,size_16,color_FFFFFF,t_70)
<hr>

##### 17. AJAX编辑学生信息
编辑学生信息的业务逻辑：
```py
def edit_student_modal(request):
    """
    模态框编辑学生信息
    :param request: 
    :return: 
    """
    ret = {'status': True, 'msg': None}
    try:
        student_id = request.POST.get('student_id')
        class_id = request.POST.get('class_id_edit')
        student_name = request.POST.get('student_name')
        sqlhelper.modify('update student set name=%s,class_id=%s where id=%s',
                         [student_name, class_id, student_id])
    except Exception as e:
        ret['status'] = False
        ret['msg'] = str(e)
    return HttpResponse(json.dumps(ret))
```
AJAX编辑学生信息：
```js
function edit_student(ths) {
    //编辑学生信息前的操作
    $('#shadow').removeClass('hide');
    $('#modal_edit_student').removeClass('hide');
    var row = $(ths).parent().prevAll();
    //学生ID
    student_id = $(row[2]).text();
    //学生姓名
    student_name = $(row[1]).text();
    //班级id
    class_id_edit = $(row[0]).attr('cls_id');
    $('#student_name').val(student_name);
    //id不能重复，如果重复，哪个在前找哪个
    $('#class_id_edit').val(class_id_edit);
    $('#student_id').val(student_id);
}
```
```js
//修改班级信息
$('#edit_student').click(function () {
    $.ajax({
        url: '/user/edit_student_modal/',
        type: 'POST',
        data: {
            'student_id': $('#student_id').val(),
            'student_name': $('#student_name').val(),
            'class_id_edit': $('#class_id_edit').val(),
        },
        success: function (data) {
            data = JSON.parse(data);
            if (data.status) {
                location.reload()
            } else {
                $('#edit_error').text(data.msg);
            }
        }
    })
})
```
AJAX编辑学生信息页面：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200613215510933.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RoYW5sb24=,size_16,color_FFFFFF,t_70)
<hr>

###### 18. AJAX删除学生信息
删除学生信息的业务逻辑：
```py
def del_student_modal(request):
    """
    模态框删除学生信息
    :param request: 
    :return: 
    """
    ret = {'status': True, 'msg': None}
    try:
        student_id = request.GET.get('student_id')
        sqlhelper.modify('delete from student where id=%s', [student_id, ])
    except Exception as e:
        ret['status'] = False
        ret['msg'] = str(e)
    return HttpResponse(json.dumps(ret))
```
AJAX删除学生信息：
```js
function del_student(ths) {
    var row = $(ths).parent().prevAll();
    student_id = $(row[2]).text();
    $.ajax({
        url: '/user/del_student_modal/',
        type: 'GET',
        data: {
            'student_id': student_id
        },
        success: function (data) {
            data = JSON.parse(data);
            if (data.status) {
                location.reload()
            } else {
                alert('删除失败！');
            }
        }
    })
}
```
<hr>

##### 19. 分页展示学生表
分页后台逻辑：
```py
def student(request):
    '''
    学生信息列表
    :param request:封装了请求相关的所有信息
    :return:返回模板和数据
    '''
    # 创建连接对象
    conn = pymysql.connect(host='127.0.0.1', port=3306, user='root', passwd='123456', db='test')
    # 创建游标
    cursor = conn.cursor(cursor=pymysql.cursors.DictCursor)
    # 查询学生信息列表
    cursor.execute(
        'select student.id,student.name,class_id,class.title from  student left join class on student.class_id=class.id')
    # 获取查询到的所有数据
    student_list = cursor.fetchall()
    paginator = Paginator(student_list, 1)
    current_page = request.GET.get('page')
    try:
        posts = paginator.page(current_page)
    except PageNotAnInteger as e:
        posts = paginator.page(1)
    except EmptyPage as e:
        posts = paginator.page(1)
    # 查询班级信息
    cursor.execute('select id,title from class')
    # 获取查询到的所有班级列表
    class_list = cursor.fetchall()
    # 关闭游标
    cursor.close()
    # 关闭连接
    conn.close()
    # 返回模板和数据
    return render(request, 'student.html', {'student_list': student_list, 'class_list': class_list, 'posts': posts})
```
前台分页展示：
```html
<!--学生信息展示-->
<table class="table table-hover text-center" style="background: white;margin-bottom: 0">
    <tr>
        <th class="text-center">ID</th>
        <th class="text-center">学生姓名</th>
        <th class="text-center">学生班级</th>
        <th class="text-center">操作</th>
    </tr>
    {% for row in posts.object_list %}
        <tr>
            <td>{{ row.id }}</td>
            <td>{{ row.name }}</td>
            <td cls_id="{{ row.class_id }}">{{ row.title }}</td>
            {#<td>{{ row.class_id }}</td>#}
            <td>
                <a href="/user/edit_student/?nid={{ row.id }}">编辑(1)</a>
                <a href="javascript:;" onclick="edit_student(this)">编辑(2)</a>
                <a href="/user/del_student/?nid={{ row.id }}">删除(1)</a>
                <a href="javascript:;" onclick="del_student(this)">删除(2)</a>
            </td>
        </tr>
    {% endfor %}
</table>
<!--分页-->
<nav aria-label="Page navigation" class="text-left">
    <ul class="pagination">
        {% if posts.has_previous %}
            <li>
                {#<a href="/user/student?page={{ posts.previous_page_number }}">上一页</a>#}
                <a href="{% url 'student' %}?page={{ posts.previous_page_number }}">上一页</a>
            </li>
        {% endif %}
       
        {% if posts.has_next %}
            <li>
                {#<a href="/user/student?page={{ posts.next_page_number }}">下一页</a>#}
                <a href="{% url 'student' %}?page={{ posts.next_page_number }}">下一页</a>
            </li>
        {% endif %}
    </ul>
</nav>
<!--/学生信息展示-->
```
分页展示效果图：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200605132151941.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RoYW5sb24=,size_16,color_FFFFFF,t_70)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200605132220424.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RoYW5sb24=,size_16,color_FFFFFF,t_70)
<hr>

##### 20. 数据库操作封装
将数据库操作封装在类中，减少了重复的代码，使代码的非常友好的可读性和可维护性的同时，还提高了系统的执行效率：
```py
import pymysql

class SqlHelper:
    def __init__(self):
        self.conn()

    def conn(self):
        self.conn = pymysql.connect(host='127.0.0.1', port=3306, user='root', passwd='123456', db='test',
                                    charset='utf8')
        self.cursor = self.conn.cursor(cursor=pymysql.cursors.DictCursor)

    def get_list(self, sql, args):
        self.cursor.execute(sql, args)
        result = self.cursor.fetchall()
        return result

    def get_one(self, sql, args):
        self.cursor.execute(sql, args)
        result = self.cursor.fetchone()
        return result

    def modify(self, sql, args):
        self.cursor.execute(sql, args)
        self.conn.commit()

    def multiple_modify(self, sql, args):
        self.cursor.executemany(sql, args)
        self.conn.commit()

    def create(self, sql, args):
        self.cursor.execute(sql, args)
        self.conn.commit()
        return self.cursor.lastrowid

    def close(self):
        self.cursor.close()
        self.conn.close()
```
<hr>

##### 21. 添加教师信息
后台添加教师信息的业务逻辑：
```py
def add_teacher(request):
    """
    添加教师
    :param request: 
    :return: 
    """
    if request.method == 'GET':
        class_list = sqlhelper.get_list('select id,title from class', [])
        return render(request, 'add_teacher.html', {'class_list': class_list})
    else:
        name = request.POST.get('name')
        obj = sqlhelper.SqlHelper()
        teacher_id = obj.create('insert into teacher(name) values (%s)', [name, ])
        class_ids = request.POST.getlist('class_ids')  # ['1', '8', '9', '10']
        # 多次连接，多次提交
        """
        for class_id in class_ids:
            sqlhelper.modify('insert into teacher2class(teacher_id,class_id) values (%s,%s)', [teacher_id, class_id])        
        """
        # 一次连接，多次提交
        """
        for class_id in class_ids:
            obj.modify('insert into teacher2class(teacher_id,class_id) values (%s,%s)', [teacher_id, class_id])
        obj.close()
        """
        # 一次连接，一次提交
        data_list = []  # [(9, '8'), (9, '9'), (9, '10')]
        for class_id in class_ids:
            data_list.append((teacher_id, class_id))
        obj.multiple_modify('insert into teacher2class(teacher_id,class_id) values (%s,%s)', data_list)
        obj.close()
        return render(request, 'teacher.html')
```
前台添加教师信息:
```html
...
<form action="/user/add_teacher/" method="post">
    <div class="form-group">
        <label>教师姓名：</label>
        <input type="text" class="form-control" id="" placeholder="请输入教师的姓名" name="name">
    </div>
    <div class="form-group">
        <select multiple class="form-control" name="class_ids">
            {% for row in class_list %}
                <option value="{{ row.id }}">{{ row.title }}</option>
            {% endfor %}
        </select>
    </div>
    <button type="submit" class="btn btn-primary">添加</button>
</form>
...
```
添加教师信息页面效果：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200613101806392.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RoYW5sb24=,size_16,color_FFFFFF,t_70)
<hr>

##### 22. 查询教师和任课班级信息
查询教师和任课班级信息的业务逻辑：
```py
def teacher(request):
    """
    查询教师和任课班级信息
    :param request:
    :return:
    """
    obj = sqlhelper.SqlHelper()
    teacher_list = obj.get_list(
        'select teacher.id as tid,teacher.name,class.title from teacher left join teacher2class on teacher.id = teacher2class.teacher_id left join class on teacher2class.class_id = class.id ;',
        [])
    """
    print(teacher_list)
    [
    {'tid': 1, 'name': '李娇', 'title': '网络工程'}, 
    {'tid': 1, 'name': '李娇', 'title': '计算机科学与技术'},
    {'tid': 1, 'name': '李娇', 'title': '软件技术'},
    {'tid': 1, 'name': '李娇', 'title': '软件工程'},
    {'tid': 2, 'name': '李晓', 'title': '网络工程'},
    {'tid': 2, 'name': '李晓', 'title': '软件工程'}
    ]
    """
    result = {}
    for row in teacher_list:
        tid = row['tid']
        if tid in result:
            result[tid]['titles'].append(row['title'])
        else:
            result[tid] = {'tid': row['tid'], 'name': row['name'], 'titles': [row['title'], ]}
    """
    print(ret)
    {
        1: {'tid': 1, 'name': '李娇', 'titles': ['网络工程', '计算机科学与技术', '软件技术', '软件工程']}, 
        2: {'tid': 2, 'name': '李晓', 'titles': ['网络工程', '软件工程']}
    }
    """
    return render(request, 'teacher.html', {'teacher_list': result.values()})
```
前台查询教师和任课班级信息：
```html
...
<table class="table table-hover text-center" style="background: white;margin-bottom: 0">
    <tr>
        <th class="text-center">ID</th>
        <th class="text-center">教师姓名</th>
        <th class="text-center">任教班级</th>
        <th class="text-center">操作</th>
    </tr>
    {% for row in teacher_list %}
        <tr>
            <td>{{ row.tid }}</td>
            <td>{{ row.name }}</td>
            <td>
                {% for item in row.titles %}
                    <span>{{ item }}</span>
                {% endfor %}
            </td>
            <td>
                <a href="/user/edit_teacher/?nid={{ row.tid }}">编辑</a>
                <a href="/user/del_teacher/?nid={{ row.tid }}">删除</a>
            </td>
        </tr>
    {% endfor %}
</table>
...
```
前台查询教师和任课班级信息的页面效果：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200613123226394.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RoYW5sb24=,size_16,color_FFFFFF,t_70)
<hr>

##### 23. 编辑教师信息
后台编辑教师信息逻辑：
```py
def edit_teacher(request):
    if request.method == 'GET':
        nid = request.GET.get('nid')
        obj = sqlhelper.SqlHelper()
        # 当前教师的信息
        teacher_info = obj.get_one('select id,name from teacher where id = %s', [nid, ])
        # 当前教师的任教班级的id信息
        class_id_list = obj.get_list('select class_id from teacher2class where teacher_id=%s', [nid, ])
        # 所有的班级信息
        class_list = obj.get_list('select id,title from class', [])
        """
        print(teacher_list) # {'id': 2, 'name': '李晓'}
        print(class_list) # [{'id': 1, 'title': '软件工程'}, {'id': 8, 'title': '软件技术'}, {'id': 9, 'title': '计算机科学与技术'}, {'id': 10, 'title': '网络工程'}]
        print(class_id_list) # [{'class_id': 1}, {'class_id': 10}]
        """
        obj.close()
        temp = []
        for item in class_id_list:
            temp.append(item['class_id'])
        """
        print(temp)  # [1, 10]
        """
        return render(request, 'edit_teacher.html',
                      {'class_list': class_list, 'teacher_info': teacher_info, 'class_id_list': temp})
    else:
        # 获取post请求的url上的参数
        nid = request.GET.get('nid')
        print(nid)
        name = request.POST.get('name')
        class_ids = request.POST.getlist('class_ids')  # ['1', '8', '9', '10']
        obj = sqlhelper.SqlHelper()
        obj.modify('update teacher set name = %s where id = %s', [name, nid])
        obj.modify('delete from teacher2class where teacher_id = %s', [nid])
        data_list = []  # [('1', '1'), ('1', '8'), ('1', '9'), ('1', '10')]
        """
        for class_id in class_ids:
            temp = (nid, class_id,)
            data_list.append(temp)
        """
        # 使用lambda表达式
        func = lambda nid, class_id: data_list.append((nid, class_id))
        for class_id in class_ids:
            func(nid, class_id)
        obj.multiple_modify('insert into teacher2class(teacher_id,class_id) values (%s,%s)', data_list)
        return redirect('/user/teacher/')
```
前台编辑教师信息：
```html
...
<form action="/user/edit_teacher/?nid={{ teacher_info.id }}" method="post">
    <div class="form-group">
        <label>教师姓名：</label>
        <input type="text" class="form-control" id="" placeholder="" name="name"
               value="{{ teacher_info.name }}">
    </div>
    <div class="form-group">
        <select multiple class="form-control" name="class_ids">
            {% for item in class_list %}
                {% if item.id in class_id_list %}
                    <option selected value="{{ item.id }}">{{ item.title }}</option>
                {% else %}
                    <option value="{{ item.id }}">{{ item.title }}</option>
                {% endif %}
            {% endfor %}
        </select>
    </div>
    <button type="submit" class="btn btn-primary">更新</button>
</form>
...
```
前台编辑教师信息的页面效果：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200613132324693.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RoYW5sb24=,size_16,color_FFFFFF,t_70)
<hr>

##### 24. AJAX删除教师信息
AJAX方式删除教师信息的后台逻辑：
```py
def del_teacher_modal(request):
    """
    AJAX的方式删除教师信息
    :param request: 
    :return: 
    """
    if request.method == 'GET':
        ret = {'status': True, 'msg': None}
        try:
            obj = sqlhelper.SqlHelper()
            tid = request.GET.get('teacher_id')
            obj.modify('delete from teacher where id =%s', [tid])
            obj.modify('delete from teacher2class where teacher_id = %s', [tid])
            obj.close()
        except Exception as e:
            ret['status'] = False
            ret['msg'] = "删除失败！"
        return HttpResponse(json.dumps(ret))
```
前台的部分代码：
```html
{% for row in teacher_list %}
    <tr>
        <td>{{ row.tid }}</td>
        <td>{{ row.name }}</td>
        <td>
            {% for item in row.titles %}
                <span>{{ item }}</span>
            {% endfor %}
        </td>
        <td>
            <a href="/user/edit_teacher/?nid={{ row.tid }}">编辑</a>
            <a href="javascript:;" class="del_teacher" onclick="del_teacher_modal(this)">删除</a>
        </td>
    </tr>
{% endfor %}
...
<script>
...
//Ajax删除教师信息
function del_teacher_modal(ths) {
    falg = confirm('确定要删除？')
    if (falg) {
        var row = $(ths).parent().prevAll();
        teacher_id = $(row[2]).text();
        $.ajax({
            url: '/user/del_teacher_modal/',
            type: 'get',
            data: {'teacher_id': teacher_id},
            dataType: 'json',
            success: function (arg) {
                if (arg.status) {
                    location.reload()
                } else {
                    alert(arg.msg)
                }
            }
        })
    }
}
...
</script>
```
前台的效果图：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200613210035113.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RoYW5sb24=,size_16,color_FFFFFF,t_70)
<hr>

##### 25. AJAX添加教师信息
 AJAX添加教师信息后台逻辑：
```py
def add_teacher_modal(request):
    """
    AJAX的方式添加教师信息
    :param request: 
    :return: 
    """
    if request.method == 'GET':
        obj = sqlhelper.SqlHelper()
        class_list = obj.get_list('select id,title from class', [])
        import time
        # 这里是用来模拟用户网站压力比较大的情况下
        time.sleep(0.2)
        obj.close()
        return HttpResponse(json.dumps(class_list))
    if request.method == 'POST':
        ret = {'status': True, 'msg': None}
        # 一般ajax请求要加上try
        try:
            name = request.POST.get('name')
            class_ids = request.POST.getlist('class_ids')  # ['1', '8', '9', '10']
            # print(name,class_ids) #奈何 ['9', '10']
            obj = sqlhelper.SqlHelper()
            teacher_id = obj.create('insert into teacher(name) values (%s) ', [name, ])
            data_list = []
            func = lambda item: data_list.append((teacher_id, item))
            for item in class_ids:
                func(item)
            # print(data_list)  # [(8, '8'), (8, '10')]
            obj.multiple_modify('insert teacher2class(teacher_id,class_id) values(%s,%s)', data_list)
            obj.close()
        except Exception as e:
            ret['status'] = False
            ret['msg'] = '处理失败!'
        return HttpResponse(json.dumps(ret))
```
前台AJAX添加教师信息：
```html
<script>
    $(function () {
        addBtn();
        shadow_btn();
        close_btn();
        add_teacher_modal();
    })

    function shadow_btn() {
        $('#shadow').click(function () {
            $('#shadow,#modal_add_teacher').addClass('hide');
        });
    }

    function close_btn() {
        $('#close_btn').click(function () {
            $('#shadow,#modal_add_teacher').addClass('hide');
        });
    }

    //点击按钮之后如果数据没有拿到就不断动画加载
    function addBtn() {
        $('#addBtn').click(function () {
            $('#shadow').removeClass('hide');
            $('#loading').removeClass('hide');
            $.ajax({
                url: '/user/add_teacher_modal/',
                type: 'get',
                dataType: 'json',//拿到的是对象
                success: function (arg) {
                    //alert(arg)//[object Object],[object Object],[object Object],[object Object]
                    $('#class_ids').html('') //保证上一次的标签内容不会留存再页面上
                    $.each(arg, function (i, row) {
                        var tag = $("<option></option>").html(row.title);
                        tag.attr('value', row.id)
                        $('#class_ids').append(tag)
                    })
                    $('#loading').addClass('hide');
                    $('#modal_add_teacher').removeClass('hide');
                }
            })
        })
    }

    //Ajax添加教师信息
    function add_teacher_modal() {
        $('#addTeacherBtn').click(function () {
            var name = $('#name').val();
            var class_ids = $('#class_ids').val();//['9', '10']
            $.ajax({
                url: '/user/add_teacher_modal/',
                type: 'POST',
                data: {'name': name, 'class_ids': class_ids},
                traditional: true,//如果提交的数据有列表，需要添加这个属性
                dataType: 'json', //如果后台返回的是json格式的数据则这里必须写上json，大小写忽略
                success: function (arg) {
                    if (arg.status) {
                        location.reload();
                    } else {
                        $('#add_teacher_error').text(arg.msg);
                    }
                }
            })
        })
    }
</script>
```
前台AJAX添加教师信息的页面效果：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200613210119205.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RoYW5sb24=,size_16,color_FFFFFF,t_70)

<hr>

#### Django操作cookie
<hr>

##### 1. 初识cookie
cookie 是保存在浏览器端的特殊"键值对"，服务端可以向浏览器端写cookie。<font>客户端每次发送请求时需要携带本地 cookie，此时 cookie 放到请求头中</font>。<font>服务端回写 cookie 会放到响应头</font>中，<font>render 和 redirect 以及 HttpResponse 函数</font> 都可以在向服务端浏览器返回响应体的时候回写cookie。cookie的应用：<font>可以用于投票，也可以用于用户登录。</font>
<hr>

##### 2. 操作cookie的方式
(1) 设置超时时间有两种方式，下面是设置cookie的函数的源码：
```py
def set_cookie(self, key, value='', max_age=None, expires=None, path='/',domain=None, secure=False, httponly=False, samesite=None):
	pass
```
第一种方式，使用 **`max_age`**。max_age=10 表示超时时间是10秒，<font>10秒过后不管客户端有没有操作，都会跳转到登录页面</font>。
```py
def login(request):
    username = request.POST.get('username')
    pwd = request.POST.get('pwd')
    if request.method == 'POST':
        if username == 'thanlon' and pwd == '123456':
            obj = redirect('/classes/')
            # redirect对象的set_cookie方法来设置回传到浏览器的cookie
            obj.set_cookie('ticket', 'O2UikIFGGvHxcUQD7rIbgxedinIpEoMjStxoO579rgY8NeQM',max_age=10)
            return obj
    else:
        return render(request, 'login.html')
```
第二种方式，使用 expires：
```py
def login(request):
    username = request.POST.get('username')
    pwd = request.POST.get('pwd')
    if request.method == 'POST':
        if username == 'thanlon' and pwd == '123456':
            obj = redirect('/classes/')
            from datetime import timedelta
            import datetime
            ct = datetime.datetime.utcnow()
            v = timedelta(seconds=10)  # 加10s
            value = ct + v
            obj.set_cookie('ticket', 'O2UikIFGGvHxcUQD7rIbgxedinIpEoMjStxoO579rgY8NeQM', expires=value)
            return obj
    else:
        return render(request, 'login.html')
```
PS：使用第一种方式和第二种方式效果是一样的，但推荐使用第一种方式。因为 <font>第一种方式设置 max_age 后，内部会转换成 datatime 类型，把 expires 也设置一遍，所以推荐使用第一种方式</font>。

( 2 ) 设置在某个 url 上读取 cookie

下面设置只有 **`/class/`** 的 url 才可以读取到 cookie：
```py
def login(request):
    username = request.POST.get('username')
    pwd = request.POST.get('pwd')
    if request.method == 'POST':
        if username == 'thanlon' and pwd == '123456':
            obj = redirect('/classes/')
            obj.set_cookie('ticket', 'O2UikIFGGvHxcUQD7rIbgxedinIpEoMjStxoO579rgY8NeQM', path='/class/')
            return obj
    else:
        return render(request, 'login.html')
```
PS：<font>默认 **`path = '/'`** 表示所有url都可以读取到 cookie</font>。

( 3 ) 设置不同的域名访问 cookie，默认是当前域名，当然也可以设置子域名，表示只有子域名才可以获取到，一般用不到。
```py
def login(request):
    username = request.POST.get('username')
    pwd = request.POST.get('pwd')
    if request.method == 'POST':
        if username == 'thanlon' and pwd == '123456':
            obj = redirect('/classes/')
            obj.set_cookie('ticket', 'O2UikIFGGvHxcUQD7rIbgxedinIpEoMjStxoO579rgY8NeQM',domain=)
            return obj
    else:
        return render(request, 'login.html')
```
( 4 ) 设置安全相关，httponly 表示写的 cookie 只能通过 http 来回发送，如果为 True，cookie 是写到浏览器上了，但是 <font>通过 javascript 找不到，没有权限对其进行操作</font>，当然可以通过抓包获取。secure 与 https 相关的，<font>网站如果是 https 的，要把secure设置为 True</font>。
```py
def login(request):
    username = request.POST.get('username')
    pwd = request.POST.get('pwd')
    if request.method == 'POST':
        if username == 'thanlon' and pwd == '123456':
            obj = redirect('/classes/')
            obj.set_cookie('ticket', 'O2UikIFGGvHxcUQD7rIbgxedinIpEoMjStxoO579rgY8NeQM',httponly=False,secure=False)
            return obj
    else:
        return render(request, 'login.html')
```
<hr>

##### 3. 设置cookie的签名
对 cookie 进行签名是指对cookie的值进行操作，使用 <kbd>set_signed_cookie()</kbd> 方法。Django 中默认使用的是时间戳来签名，当然也可以自定制签名，只需要自己定义一个类继承 **`TimestampSigner`**，然后重写 <kbd>sign</kbd> 和 <kbd>unsign</kbd> 方法。最后在配置文件文件中指定自己定义的类 **`SIGNING_BACKEND=Python文件名.类名`** 就可以了。下面是对 cookie 进行签名：
```py
def classes(request):
    ticket = request.get_signed_cookie('ticket', salt='123456')
    if not ticket:
        return redirect('/login/')
 def login(request):
    username = request.POST.get('username')
    pwd = request.POST.get('pwd')
    if request.method == 'POST':
        if username == 'thanlon' and pwd == '123456':
            obj = redirect('/classes/')
            obj.set_signed_cookie('ticket', 'thanlon', salt='123456')
            return obj
    else:
        return render(request, 'login.html')
```
<hr>

##### 4. 基于cookie的登录验证
```py
def classes(request):
    '''
    查询班级id、班级名称
    '''
    # 获取cookie
    ticket = request.COOKIES.get('ticket')
    if not ticket:
        return redirect('/login/')
    conn = pymysql.connect(host='127.0.0.1', port=3306, user='root', passwd='123456', db='test')
    cursor = conn.cursor(cursor=pymysql.cursors.DictCursor)
    cursor.execute("select id,title from class")
    classes_list = cursor.fetchall()
    cursor.close()
    conn.close()
    return render(request, 'classes.html', {'classes_list': classes_list})
    
def login(request):
    '''
    登录
    '''
    username = request.POST.get('username')
    pwd = request.POST.get('pwd')
    if request.method == 'POST':
        if username == 'thanlon' and pwd == '123456':
            obj = redirect('/classes/')
            # 设置cookie
            obj.set_cookie('ticket', 'O2UikIFGGvHxcUQD7rIbgxedinIpEoMjStxoO579rgY8NeQM')
            return obj
    else:
        return render(request, 'login.html')
```
PS：读所有的 cookie 使用 request.COOKIES
<hr>

##### 5. Django主流操作
以上 Django 的使用中至少有两点是非主流操作的：<font>第一点体现在创建 app 上，第二点体现在数据库操作上</font>。以后，我们将使用Django的主流操作来进行开发。<font>创建 app 方面，使用命令的方式来创建</font>。<font>操作数据库方面，不再使用 pymysql 或者 SqlAchemy，而是使用 ORM</font>。
<hr>

#### Django项目创建和目录文件介绍
<hr>

##### 1. 创建一个完整的项目
```python
# 创建一个名为mysite的Django工程目录
$ django-admin startproject mysite
# 进入工程目录
$ cd mysite/
# 创建一个名为app01的Django应用程序
$ python3 manage.py startapp app01
```
##### 2. Django主要目录文件
```py
mysite/
    manage.py
    mysite/
        __init__.py
        settings.py
        urls.py
        asgi.py
        wsgi.py
```
**`外部 mysite/`**：项目的容器，它的名称与 Django 无关；您可以将其重命名为任何喜欢的名称

**`manage.py`**：一个命令行实用程序，可让您以各种方式与该 Django 项目进行交互

**`内部 mysite/目录`**：项目的实际 Python 包，它的名称是 Python 包名称，您需要使用它来导入其中的任何内容（例如 mysite.urls）

**`mysite/__init__.py`**：一个空文件，告诉 Python 该目录应视为 Python 软件包

**`mysite/settings.py`**：此 Django 项目的设置/配置

**`mysite/urls.py`**：此 Django 项目的 URL 声明，Django 支持的网站的“目录”

**`mysite/asgi.py`**：与 ASGI 兼容的 Web 服务器为您的项目提供服务的入口点

**`mysite/wsgi.py`**：兼容 WSGI 的 Web 服务器为您的项目提供服务的入口点

**`migrations`**：与数据库相关，ORM 对数据表的操作记录会放到这个目录下

**`admin.py`**：Django 自带后台管理相关配置

**`models.py<`**：与数据库表结构对应的类，根据类创建数据库表

**`test.py`**：用作单元测试

**`views.py`**：写视图函数，做业务处理。不一定只有一个 views.py，可以在app目录下单独创建一个 views 的目录用存放不同的视图函数。
<hr>

#### Django路由系统
<hr>

##### 1. 静态路由
路由就是用户访问网站资源的路径，在Django中路由要和视图函数对应起来，路由和视图的对应关系有一对一和多对一。静态路由是比较常见的路由，不使用尖括号和正则表达式定义的路由，与视图函数是一对一关系。如默认的 **`/admin/`** 和我们自己定义的 **`/login/`**、**`edit/1/`**：
```py
urlpatterns = [
	# 匹配admin/
    path('admin/', admin.site.urls),
    # 匹配login/
    path('login/', views.login),
    # 匹配edit/1
    path('edit/1', views.add_user),
    # 匹配edit/1/，和不加/是有区别的
    path('edit/1/', views.add_user),
]
```
注意：最后加不加 **`/`** 匹配到的路径是不同的。 
<hr>

##### 2. 动态路由
使用尖括号定义的路由是动态的，可以定义传入变量并且指定变量的类型，其它类型还有字符串，用 **`str`** 表示：
```py
urlpatterns = [
	# 匹配任意整型，视图函数中必须用名为id的变量接收，当然也可以使用万能的**kwargs来接收,转换成字典后再找到索引id的值即为传入的参数
    path('add-user/<int:id>', views.add_user),
    # 匹配任意整型，和不加/是有区别的
    path('add-user/<int:id>/', views.add_user),
    # 匹配任意字符串类型
    path('add-user/<str:str_name>', views.add_user),
    # 匹配任意字符串类型，和不加/是有区别的
    path('add-user/<str:str_name>/', views.add_user),
]
```
PS：尖括号的方式下也可以使用转换器，可以自定义转换器，暂时用不到就不说。

使用正则表达式定义的路由也是动态的，同样可以实现多个路由对应一个视图函数。Django3.0 版本使用正则表达式定义路由需要使用到 **`re_path`**：
```py
from django.urls import path, re_path

urlpatterns = [
    # 如果只想匹配add-user，可以在最后加上终止符号$
    re_path('^add-user$', views.add_user),
    # 可以匹配到add-user/
    re_path('^add-user/', views.add_user),
    # 可以匹配到add-user，也可以匹配到add-user/
    re_path('^add-user', views.add_user),
    # 匹配任意一位数字
    re_path('^add-user/(\d)/', views.add_user),
    # 匹配任意数字，数字会被当作传参传递，add_user方法中必须有形式参数接收
    re_path('^add-user/(\d+)/', views.add_user),
    # 匹配任意一个字符(大小写)，字符会被当作传参传递，add_user方法中必须有形式参数接收
    re_path('^add-user/([A-Za-z])/', views.add_user),
    # 伪静态匹配数字.html，数字部分会被当作传参传递，add_user方法中必须有形式参数接收
    re_path('^add-user/(\d+).html$', views.add_user),
    # 伪静态匹配任意字符串.html，字符串中也可以只有一个字符，字符串部分会被当作传参传递，add_user方法中必须有形式参数接收
    re_path('^add-user/(\w+).html$', views.add_user),
    # 位置传参，所以视图函数中形参必须有a和b接收,a、b的位置随意。注意如果是'^add-user/(\d+)/(?P<b>\d+)，视图是不接收(\d+)部分的参数。
    re_path('^add-user/(?P<a>\d+)/(?P<b>\d+)', views.add_user),
]
```
注意：<font>Django中的路径匹配是顺序匹配</font>。也就是从上到下匹配，上面的路由匹配成功就停止匹配下面的路由。
<hr>

##### 3. 路由分发
多个 app 时可以使用路由分发，可以实现不同应用使用不同的路由，方便管理路由。可以在 app01 目录下新建 **`urls.py`** 文件用作 app01 应用的路由：
```py
urlpatterns = [
    path('login/', views.login),
]
```
在主要的 **`urls.py`** 文件中要导入 include 函数才能实现路由的分发：
```py
from django.urls import path, include

urlpatterns = [
	# 注意路由后面必须加上/
    path('app01/', include('app01.urls'))
]
```
下面就可以通过 <font>http://127.0.0.1:8000/app01/login/</font> 来访问 app01 下的视图函数 login，这样就实现了路由的分发。
<hr>

##### 4. 反向生成路由
在写路由的时候，给路由命个名字，以后可使用这个名字找到这个路由，在存储用户路由信息的信息也可以存储路由的名字，节约空间，方便使用。<font>可以在 Python 代码中反向生成路由，也可以在模板中反向生成路由</font>。

( 1 ) 在Python代码中使用。需要设置路由、业务逻辑：
**`urls.py:`**
```py
urlpatterns = [
    path('index/', views.index, name="index"),
]
```
**`views.py:`**
```py
def index(request, id):
    v = reverse('index_id', kwargs={'id': id})
    print(v)  # /index/1/
    return HttpResponse('成功执行！')
```
( 2 ) 在模板中使用。需要设置路由、写视图逻辑和模板：

**`urls.py:`**
```py
urlpatterns = [
    path('index/', views.index, name="index"),
]
```
**`views.py:`**
```py
def index(request):
    return render(request, 'index.html')
```
**`index.html:`**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
{% url 'index' %} # 
</body>
</html>
```
如果路由中没有传值，模板中可以使用上面的方式。但是，如果路由中有传值，如：

**`urls.py:`**
```py
urlpatterns = [
    path('index/<int:id>/', views.index, name="index"),
]
```
**`views.py:`**
```py
def index(request,id):
    # v = reverse('index_id', kwargs={'id': id})
    # print(v)  # /index/1/
    # print(id)
    # 把id传到模板中
    return render(request,'index.html',{'id':id})
```
模板中反向生成路由的方式：

**`index.html:`**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
{% url 'index' id %}
</body>
</html>
```
注意：如果有多个参数，在id后面追加就可以，使用空格隔开，如：**`{% url 'index' id page %}`**
<hr>

#### Django的ORM操作
<hr>

##### 1. ORM的功能
Django 的ORM 可以操作数据库的表结构和数据行。操作表结构体现在创建表、修改表和删除表，操作数据行则体现在对表的 CURD 操作，也就是增删改查。<font>Django 的 ORM 本身不支持连接数据库，实质上使用的是第三方工具如 pymysql 或者是 sqlalchemy 来连接数据库</font>。
<hr>

##### 2. 数据库设置
Django 默认使用的是 SQLite，也是 Django 中自带的数据库，但是我们一般不会使用。我们通常会使用 SQLite 之外的数据库，如 mysql、oracle、postgresql 等。所以，需要在 Django 中修改默认使用的 SQLite 为其它的数据库。在 **`settings.py`** 中找到 **`DATABASES`** 变量：
```py
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}
```
如果使用的是 mysql 数据，修改为：
```py
DATABASES = {
    'default': {
        # 'ENGINE': 'django.db.backends.sqlite3',
        'ENGINE': 'django.db.backends.mysql',
        'NAME': '数据库的名称',
        'USER': '用户名',
        'PASSWORD': '密码',
        'HOST': '数据库地址',
        'PORT': '数据库端口'
    }
}
```
设置ORM使用 **`pymysql`** 连接数据库，只需要在与 **`settings.py`** 同级目录下的 **`__init__.py`** 这个空文件中写入：
```py
import pymysql
pymysql.install_as_MySQLdb()
```
配置文件 **`setting.py`** 中的 **`INSTALLED_APPS`** 下包含了在 Django 实例中激活的所有 Django 应用程序的名称，这些应用程序都是随 Django 一起提供的：

django.contrib.admin：管理站点

django.contrib.auth：认证系统

django.contrib.contenttypes ：内容类型的框架

django.contrib.sessions：会话框架

django.contrib.messages：消息传递框架

django.contrib.staticfiles：用于管理静态文件的框架

这些应用中的一些应用程序 <font>至少使用一个数据库表</font>，因此我们需要在数据库中创建表之后才能使用它们，执行下面的命令来创建：
```py
(django_test) thanlon@thanlon:~/projects/PycharmProjects/django_test$ python manage.py migrate
```
可以在数据库看到创建的数据表：
```sql
mysql> show tables;
+----------------------------+
| Tables_in_django_test      |
+----------------------------+
| auth_group                 |
| auth_group_permissions     |
| auth_permission            |
| auth_user                  |
| auth_user_groups           |
| auth_user_user_permissions |
| django_admin_log           |
| django_content_type        |
| django_migrations          |
| django_session             |
+----------------------------+
10 rows in set (0.00 sec)
```
migrate 命令获取所有尚未应用的迁移（Django 使用名为的特殊表在数据库中跟踪应用了哪些迁移 django_migrations），并针对数据库运行它们。本质上，将你对模型所做的更改与数据库。迁移功能非常强大，可以在开发项目时随时间更改模型，而无需删除数据库或表并创建新的模型。它专门用于实时升级数据库而不会丢失数据。
<hr>

##### 3. makemigrations和migrate
接下来需要到模型中创建类和字段，创建完成后需要先使用 **`python manage.py makemigrations`** 命令来为数据表的更改创建迁移，然后使用 **`python manage.py migrate`** 将更改应用到数据库。之所以使用单独的命令来进行和应用迁移，是因为你会将迁移提交到版本控制系统，并随应用程序一起交付。<font>这些单独的命令不仅使您的开发更加容易，而且还可以被其他开发人员和生产环境使用</font>。
<hr>

##### 4. ORM创建数据表
在 **`models.py`** 文件中写模型，这里分别创建员工表和部门表：
```py
from django.db import models

class Depart(models.Model):
    """
    创建部门表
    """
    title = models.CharField(max_length=32, unique=True)

class EmpInfo(models.Model):
    """
    创建员工信息表
    """
    # 主键默认是id，写与不写名字都是id，类型是int且为主键和自动递增
    nid = models.AutoField(primary_key=True)
    username = models.CharField(max_length=32)
    pwd = models.CharField(max_length=64)
    # 'max_length' is ignored when used with IntegerField.
    age = models.IntegerField()
    # 会自动创建dp_id字段
    dp = models.ForeignKey("Depart", on_delete=models.CASCADE, null=True)
```
执行创建迁移和应用更改的命令后会创建两张表：
```sql
部门表：
+-------+-------------+------+-----+---------+----------------+
| Field | Type        | Null | Key | Default | Extra          |
+-------+-------------+------+-----+---------+----------------+
| id    | int         | NO   | PRI | NULL    | auto_increment |
| title | varchar(32) | NO   | UNI | NULL    |                |
+-------+-------------+------+-----+---------+----------------+
员工表：
+----------+-------------+------+-----+---------+----------------+
| Field    | Type        | Null | Key | Default | Extra          |
+----------+-------------+------+-----+---------+----------------+
| nid      | int         | NO   | PRI | NULL    | auto_increment |
| username | varchar(32) | NO   |     | NULL    |                |
| pwd      | varchar(64) | NO   |     | NULL    |                |
| age      | int         | NO   |     | NULL    |                |
| dp_id    | int         | YES  | MUL | NULL    |                |
+----------+-------------+------+-----+---------+----------------+
```
<hr>

##### 5. ORM单表CURD
数据的增加：
```py
from django.shortcuts import render, HttpResponse, reverse
from app01 import models

# Create your views here.
def index(request):
    models.Depart.objects.create(title='技术部')
    models.Depart.objects.create(title='运维部')
    models.EmpInfo.objects.create(username='Thanlon', pwd='123456', age=23, dp_id=3)
    return render(request, 'index.html')
```
```sql
部门表：
+----+-----------+
| id | title     |
+----+-----------+
|  2 | 技术部    |
|  1 | 运维部    |
+----+-----------+
员工表：
+-----+----------+--------+-----+-------+
| nid | username | pwd    | age | dp_id |
+-----+----------+--------+-----+-------+
|   1 | Thanlon  | 123456 |  23 |     1 |
+-----+----------+--------+-----+-------+
```
数据的查询：
```py
from django.shortcuts import render, HttpResponse, reverse
from app01 import models

def index(request):
    # 查询所有部门信息
    dp_list = models.Depart.objects.all()
    print(dp_list)  # <QuerySet [<Depart: Depart object (2)>, <Depart: Depart object (1)>]>
    for item in dp_list:
        print(item.id, item.title)
        """
        2 技术部
        1 运维部
        """
    # 查询满足条件的数据行
    # emp_list_id = models.EmpInfo.objects.filter(name='thanlon').first()
    # dp_list_id = models.Depart.objects.filter(id=1)
    # dp_list_id = models.Depart.objects.filter(id__lt=2)
    dp_list_id = models.Depart.objects.filter(id__gt=1)
    for item in dp_list_id:
        print(item.id, item.title)  # 2 技术部
    return render(request, 'index.html')
```
数据的删除：
```py
from django.shortcuts import render, HttpResponse, reverse
from app01 import models

# Create your views here.
def index(request):
    # 删除id=2的部门
    models.Depart.objects.filter(id=2).delete()
    return render(request, 'index.html')
```
```sql
+----+-----------+
| id | title     |
+----+-----------+
|  1 | 运维部    |
+----+-----------+
```
数据表的修改：
```py
from django.shortcuts import render, HttpResponse, reverse
from app01 import models

# Create your views here.
def index(request):
    # 修改id=1的部门信息
    models.Depart.objects.filter(id=1).update(title="人事部")
    return render(request, 'index.html')
```
```sql
+----+-----------+
| id | title     |
+----+-----------+
|  1 | 人事部    |
+----+-----------+
```
<hr>

##### 6. 正向连表操作
创建用户表和用户类型表，用户类型表是用户表的父表，用户表是用户类型的字表。

**`models.py:`**
```python
class UserType(models.Model):
    """
    用户类型表
    """
    title = models.CharField(max_length=32)

class UserInfo(models.Model):
    """
    用户表
    """
    name = models.CharField(max_length=16)
    age = models.IntegerField()
    ut = models.ForeignKey('UserType', on_delete=models.CASCADE)
```
**`views.py:`**：
```python
def user(request):
    models.UserType.objects.create(title='普通用户')
    models.UserType.objects.create(title='VIP用户')
    models.UserInfo.objects.create(name='Thanlon', age=20, ut_id=1)
    models.UserInfo.objects.create(name='Kiku', age=23, ut_id=2)
    return HttpResponse('...')
```
正向连表查的是 UserInfo 表，是通过 UserInfo 表的外健 ut 字段来获取父表与之对应的字段。<font>一个用户只有一个用户类型</font>。
```python
def user(request):
    result = models.UserInfo.objects.all()
    for obj in result:
        # print(obj.id,obj.name,obj.age,obj.ut,obj.ut.id,obj.ut.title)
        # 如果UserType还有父表则继续使用.的方式获取父表的值(三个表,四个表...都可以通过这种方式)
        print(obj.id, obj.name, obj.age, obj.ut.title)
    """
    2 Thanlon 20 普通用户
    3 Kiku 23 VIP用户
    """
    return HttpResponse('...')
```
<hr>

##### 7. 反向连表操作
反向连表查询的父表 UserType，通过父表隐藏的字段来获取子表 UserInfo 的字段，这个“隐藏”的字段的格式是 **`表名_set`**。<font>一个用户类型下可以有多个用户</font>。
```python
def user(request):
	# 一个用户类型下可以有多个用户
    # obj = models.UserType.objects.first()
    # print(obj.id, obj.title, obj.userinfo_set.all())
    """
      1 普通用户 <QuerySet [<UserInfo: UserInfo object (2)>]>
    """
    # 查所有用户类型下所有的用户
    result = models.UserType.objects.all()
    for obj in result:
        for row in obj.userinfo_set.all():
            print(row.id, row.name, row.age, row.ut.title)
    """
    2 Thanlon 20 普通用户
    3 Kiku 23 VIP用户
    """
    return HttpResponse('...')
```
如果是查 Userinfo 的所有字段，使用反向连表和正向连表都能查询到结果，但是我们发现反向连表的时间复杂度比正向连表要大。

反向连表可以获取用户类型下对应的所有用户，还可以通过过滤这些用户：
```python
def user(request):
    obj = models.UserType.objects.first()
    print(obj.id, obj.title, obj.userinfo_set.filter(name='Thanlon'))
    for row in obj.userinfo_set.filter(name='Thanlon'):
        print(row.id, row.name, row.ut.title)
    """
    1 普通用户 <QuerySet [<UserInfo: UserInfo object (2)>]>
    2 Thanlon 普通用户
    """
    return HttpResponse('...')
```
<hr>

##### 8. 获取数据的三种方式
第一种方式，获取的是对象：
```python
def user(request):
    result = models.UserType.objects.all()
    print(result)  # [obj,obj,obj,,,]
    """
    <QuerySet [<UserInfo: UserInfo object (2)>, <UserInfo: UserInfo object (3)>]>
    """
    for obj in result:
        for row in obj.userinfo_set.all():
            print(row.id, row.name, row.ut.title)
    """
    2 Thanlon 普通用户
    3 Kiku VIP用户
    """
    return HttpResponse('...')
```
第二种方式，获取的是字典：
```python
def user(request):
    # 获取所有字段
    # result = models.UserInfo.objects.values()
    # 获取指定字段
    result = models.UserInfo.objects.values('age', 'name', 'ut__title')
    print(
        result)  # [{'age': 20, 'name': 'Thanlon', 'ut__title': '普通用户'}, {'age': 23, 'name': 'Kiku', 'ut__title': 'VIP用户'}]
    """
    <QuerySet [{'age': 20, 'name': 'Thanlon', 'ut__title': '普通用户'}, {'age': 23, 'name': 'Kiku', 'ut__title': 'VIP用户'}]>
    """
    for row in result:
        print(row['age'], row['name'], row['ut__title'])
    """
    20 Thanlon 普通用户
    23 Kiku VIP用户
    """
    return HttpResponse('...')
```
第三种方式，获取的是元组：
```python
def user(request):
    # 获取所有字段
    # result = models.UserInfo.objects.values_list()
    # 获取指定字段
    result = models.UserInfo.objects.values_list('age', 'name', 'ut__title')
    print(result)  # [(20, 'Thanlon', '普通用户'), (23, 'Kiku', 'VIP用户')]
    """
    <QuerySet [(20, 'Thanlon', '普通用户'), (23, 'Kiku', 'VIP用户')]>
    """
    for row in result:
        print(row[0], row[1], row[2])
    """
    20 Thanlon 普通用户
    23 Kiku VIP用户
    """
    return HttpResponse('...')
```
<font>三种方式都支持跨表操作</font>，只不过对象的方式跨表是在循环对象的时候，而字典和元组的方式是在查询的的时候。

<hr>

##### 9. 查询相关的关键字
( 1 ) all

获取所有的数据对象，参数使用参考：
```python
def all(self):
	pass
```
应用：
```python
from django.shortcuts import HttpResponse
from app01 import models

def user_list(request):
    result = models.UserInfo.objects.all()
    """
    print(result.query)
    SELECT `app01_userinfo`.`id`, `app01_userinfo`.`name`, `app01_userinfo`.`age`, `app01_userinfo`.`ut_id` 
    FROM `app01_userinfo`
    """
    return HttpResponse()
```

( 2 ) filter

条件查询，条件也可以是字典类型，参数使用参考：
```python
def filter(self, *args, **kwargs):
	pass
```
应用：
```python
from django.shortcuts import HttpResponse
from app01 import models

def user_list(request):
    # result = models.UserInfo.objects.filter(id__gt=1)
    # result = models.UserInfo.objects.filter(id__lt=1)
    # result = models.UserInfo.objects.filter(id__gte=1)
    result = models.UserInfo.objects.filter(id__lte=1)
    """
    print(result.query)
    SELECT `app01_userinfo`.`id`, `app01_userinfo`.`name`, `app01_userinfo`.`age`, `app01_userinfo`.`ut_id` 
    FROM `app01_userinfo` 
    WHERE `app01_userinfo`.`id` <= 1
    """
    result = models.UserInfo.objects.filter(id__in=[1, 2, 3])
    """
    print(result.query)
    SELECT "app01_userinfo"."id", "app01_userinfo"."name", "app01_userinfo"."age", "app01_userinfo"."ut_id" 
    FROM "app01_userinfo" 
    WHERE "app01_userinfo"."id" IN (1, 2, 3)
    """
    result = models.UserInfo.objects.filter(id__range=[1, 3])
    """
    print(result.query)
    SELECT "app01_userinfo"."id", "app01_userinfo"."name", "app01_userinfo"."age", "app01_userinfo"."ut_id" 
    FROM "app01_userinfo" 
    WHERE "app01_userinfo"."id" BETWEEN 1 AND 3
    """
    result = models.UserInfo.objects.filter(name__startswith='xxx')
    """
    print(result.query)
    SELECT "app01_userinfo"."id", "app01_userinfo"."name", "app01_userinfo"."age", "app01_userinfo"."ut_id" 
    FROM "app01_userinfo" 
    WHERE "app01_userinfo"."name" LIKE xxx%
    """
    result = models.UserInfo.objects.exclude(id=1)
    """
    print(result.query)
    SELECT "app01_userinfo"."id", "app01_userinfo"."name", "app01_userinfo"."age", "app01_userinfo"."ut_id" 
    FROM "app01_userinfo" 
    WHERE NOT ("app01_userinfo"."id" = 1)
    """
    result = models.UserInfo.objects.filter(name__endswith='xxx')
    """
    print(result.query)
    SELECT "app01_userinfo"."id", "app01_userinfo"."name", "app01_userinfo"."age", "app01_userinfo"."ut_id" 
    FROM "app01_userinfo" 
    WHERE "app01_userinfo"."name" LIKE %xxx
    """
    result = models.UserInfo.objects.filter(id=1, name='thanlon')
    """
    print(result.query)
    SELECT `app01_userinfo`.`id`, `app01_userinfo`.`name`, `app01_userinfo`.`age`, `app01_userinfo`.`ut_id` 
    FROM `app01_userinfo` 
    WHERE (`app01_userinfo`.`id` = 1 AND `app01_userinfo`.`name` = thanlon)
    """
    condition = {
        'id': 1,
        'name': 'thanlon'
    }
    result = models.UserInfo.objects.filter(**condition)
    """
    print(result.query)
    SELECT `app01_userinfo`.`id`, `app01_userinfo`.`name`, `app01_userinfo`.`age`, `app01_userinfo`.`ut_id` 
    FROM `app01_userinfo` 
    WHERE (`app01_userinfo`.`id` = 1 AND `app01_userinfo`.`name` = thanlon)
    """
    return HttpResponse()
```

( 3 ) order_by

order_by 用于排序，参数使用参考：
```python
def order_by(self, *field_names):
	pass
```
应用：
```python
from django.shortcuts import HttpResponse
from app01 import models

def user_list(request):
    # 1、按照id从小到大排序
    result = models.UserInfo.objects.all().order_by('id')
    """
    print(result.query)
    SELECT `app01_userinfo`.`id`, `app01_userinfo`.`name`, `app01_userinfo`.`age`, `app01_userinfo`.`ut_id` 
    FROM `app01_userinfo` 
    ORDER BY `app01_userinfo`.`id` ASC
    """
    # 2、按照id从小到大排序
    result = models.UserInfo.objects.all().order_by('-id')
    """
    print(result.query)
    SELECT `app01_userinfo`.`id`, `app01_userinfo`.`name`, `app01_userinfo`.`age`, `app01_userinfo`.`ut_id` 
    FROM `app01_userinfo` 
    ORDER BY `app01_userinfo`.`id` DESC
    """
    # 3、按照id从大到小排序,如果有重复的按照name从小到大排序
    result = models.UserInfo.objects.all().order_by('-id', 'name')
    print(result.query)
    """
    print(result.query)
    SELECT `app01_userinfo`.`id`, `app01_userinfo`.`name`, `app01_userinfo`.`age`, `app01_userinfo`.`ut_id` 
    FROM `app01_userinfo` 
    ORDER BY `app01_userinfo`.`id` DESC, `app01_userinfo`.`name` ASC
    """
    return HttpResponse()
```

( 4 ) reverse

reverse 用来对查询结果进行倒序排序，**`只有在使用 order_by 之后才会有用`**，参数使用参考：
```python
def reverse(self):
	pass
```
应用：
```python
from django.shortcuts import HttpResponse
from app01 import models

def user_list(request):
    result = models.UserInfo.objects.all().reverse()
    """
    print(result.query)
    SELECT `app01_userinfo`.`id`, `app01_userinfo`.`name`, `app01_userinfo`.`age`, `app01_userinfo`.`ut_id` 
    FROM `app01_userinfo`
    """
    result = models.UserInfo.objects.all().reverse().order_by('id')
    """
    print(result.query)
    SELECT `app01_userinfo`.`id`, `app01_userinfo`.`name`, `app01_userinfo`.`age`, `app01_userinfo`.`ut_id` 
    FROM `app01_userinfo`
    ORDER BY `app01_userinfo`.`id` DESC
    """
    result = models.UserInfo.objects.all().order_by('id').reverse()
    """
    print(result.query)
    SELECT `app01_userinfo`.`id`, `app01_userinfo`.`name`, `app01_userinfo`.`age`, `app01_userinfo`.`ut_id` 
    FROM `app01_userinfo` 
    ORDER BY `app01_userinfo`.`id` DESC
    """
    return HttpResponse()
```
( 5 ) defer

映射中排除某列数据，id 列不可以去除，参数:
```python
def defer(self, *fields):
	pass
```
使用：
```python
from django.shortcuts import HttpResponse
from app01 import models

def user_list(request):
    result = models.UserInfo.objects.all()
    """
    print(result.query)
    SELECT `app01_userinfo`.`id`, `app01_userinfo`.`name`, `app01_userinfo`.`age`, `app01_userinfo`.`ut_id` 
    FROM `app01_userinfo`
    """
    # id列不可使用defer来去除
    result = models.UserInfo.objects.all().defer('id','name','age')
    """
    print(result.query)
    SELECT `app01_userinfo`.`id`, `app01_userinfo`.`ut_id` FROM `app01_userinfo`
    """
    return HttpResponse()
```

( 6 ) only

只取某些列，参数使用参考：
```python
def only(self, *fields):
	pass
```
应用：
```python
from django.shortcuts import HttpResponse
from app01 import models

def user_list(request):
    result = models.UserInfo.objects.all().only('id','age')
    """
    print(result.query)
    SELECT `app01_userinfo`.`id`, `app01_userinfo`.`age` 
    FROM `app01_userinfo`
    """
    return HttpResponse()
```

( 7 ) annotate

annotate 可以实现聚合分组查询，参数使用参考：
```python
def annotate(self, *args, **kwargs):
	pass
```
应用：
```python
from django.shortcuts import HttpResponse
from app01 import models


def user_list(request):
    result = models.UserInfo.objects.values('ut_id')
    result = models.UserInfo.objects.values('ut_id').annotate()
    """
    print(result.query)
    SELECT `app01_userinfo`.`ut_id` FROM `app01_userinfo`
    """
    from django.db.models import Count, Min, Max, F, Q
    result = models.UserInfo.objects.values('ut_id').annotate(xxx=Count('id'))
    """
    print(result.query)
    SELECT `app01_userinfo`.`ut_id`, COUNT(`app01_userinfo`.`id`) AS `xxx` 
    FROM `app01_userinfo` 
    GROUP BY `app01_userinfo`.`ut_id` 
    ORDER BY NULL
    """
    result = models.UserInfo.objects.values('ut_id').annotate(xxx=Count('id')).filter(xxx__gt=2)
    """
    print(result.query)
    SELECT `app01_userinfo`.`ut_id`, COUNT(`app01_userinfo`.`id`) AS `xxx` 
    FROM `app01_userinfo` GROUP BY `app01_userinfo`.`ut_id` 
    HAVING COUNT(`app01_userinfo`.`id`) > 2 
    ORDER BY NULL
    """
    result = models.UserInfo.objects.filter(id__gt=2).values('ut_id').annotate(xxx=Count('id')).filter(xxx__gt=2)
    """
    print(result.query)
    SELECT `app01_userinfo`.`ut_id`, COUNT(`app01_userinfo`.`id`) AS `xxx` 
    FROM `app01_userinfo` 
    WHERE `app01_userinfo`.`id` > 2 
    GROUP BY `app01_userinfo`.`ut_id` 
    HAVING COUNT(`app01_userinfo`.`id`) > 2 
    ORDER BY NULL
    """
    return HttpResponse()
```

( 8 ) F 

F 会认为是数据库原有的值，参数：
```python

```
应用：
```python
from django.shortcuts import HttpResponse
from app01 import models

def user_list(request):
    from django.db.models import F
    # 不可用来更新id的值，可能是id是自动递增的原因
    result = models.UserInfo.objects.all().update(age=F("age") + 1)
    print(result)  # 更新的结果数
    return HttpResponse()
```

( 9 ) Q 

Q 是用来构造复杂的查询条件，有两种适用方式，一种是 **`对象方式`**：
```python
from django.shortcuts import HttpResponse
from app01 import models

def user_list(request):
    from django.db.models import Q
    result = models.UserInfo.objects.filter(Q(id__gt=1))
    """
    print(result.query)
    SELECT `app01_userinfo`.`id`, `app01_userinfo`.`name`, `app01_userinfo`.`age`, `app01_userinfo`.`ut_id` 
    FROM `app01_userinfo` 
    WHERE `app01_userinfo`.`id` > 1
    """
    result = models.UserInfo.objects.filter(Q(id__gt=1) & Q(name='thanlon'))
    """
    print(result.query)
    SELECT `app01_userinfo`.`id`, `app01_userinfo`.`name`, `app01_userinfo`.`age`, `app01_userinfo`.`ut_id` 
    FROM `app01_userinfo` 
    WHERE (`app01_userinfo`.`id` > 1 AND `app01_userinfo`.`name` = thanlon)
    """
    result = models.UserInfo.objects.filter(Q(id__gt=1) | Q(name='thanlon'))
    """
    print(result.query)
    SELECT `app01_userinfo`.`id`, `app01_userinfo`.`name`, `app01_userinfo`.`age`, `app01_userinfo`.`ut_id` 
    FROM `app01_userinfo` 
    WHERE (`app01_userinfo`.`id` > 1 OR `app01_userinfo`.`name` = thanlon)
    """
    return HttpResponse()
```
另一种是 **`方法`** 的方式：
```python
from django.shortcuts import HttpResponse
from app01 import models

def user_list(request):
    from django.db.models import Q
    q1 = Q()
    q1.connector = 'OR'
    q1.children.append(('id__gt', 1))
    q1.children.append(('id__lt', 5))
    print(q1)  # (OR: ('id__gt', 1), ('id__lt', 5))
    print(q1.children)  # [('id__gt', 1), ('id__lt', 5)]
    result = models.UserInfo.objects.filter(q1)
    """
    print(result.query)
    SELECT `app01_userinfo`.`id`, `app01_userinfo`.`name`, `app01_userinfo`.`age`, `app01_userinfo`.`ut_id` 
    FROM `app01_userinfo` 
    WHERE (`app01_userinfo`.`id` > 1 OR `app01_userinfo`.`id` < 5)
    """

    q2 = Q()
    q2.connector = 'AND'
    q2.children.append(('age__gt', 16))
    q1.add(q2, 'OR')
    result = models.UserInfo.objects.filter(q1)
    """
    print(result.query)
    SELECT `app01_userinfo`.`id`, `app01_userinfo`.`name`, `app01_userinfo`.`age`, `app01_userinfo`.`ut_id` 
    FROM `app01_userinfo` 
    WHERE (`app01_userinfo`.`id` > 1 OR `app01_userinfo`.`id` < 5 OR `app01_userinfo`.`age` > 16)
    """
    
    q3 = Q()
    q3.add(q1, 'AND')
    q3.add(q2, 'AND')
    result = models.UserInfo.objects.filter(q3)
    """
    print(result.query)
    SELECT `app01_userinfo`.`id`, `app01_userinfo`.`name`, `app01_userinfo`.`age`, `app01_userinfo`.`ut_id` 
    FROM `app01_userinfo` 
    WHERE ((`app01_userinfo`.`id` > 1 OR `app01_userinfo`.`id` < 5 OR `app01_userinfo`.`age` > 16) AND `app01_userinfo`.`age` > 16)
    """
    return HttpResponse()
```

( 10 ) extra

extra 可以构造额外的查询条件或者映射，如子查询等，参数：
```python
def extra(self, select=None, where=None, params=None, tables=None,
              order_by=None, select_params=None):
	pass     
```
子查询：
```python
from django.shortcuts import HttpResponse
from app01 import models

def user_list(request):
    result = models.UserInfo.objects.all().extra()
    """
    print(result.query)
    SELECT `app01_userinfo`.`id`, `app01_userinfo`.`name`, `app01_userinfo`.`age`, `app01_userinfo`.`ut_id` 
    FROM `app01_userinfo`
    """
    result = models.UserInfo.objects.all().extra(select={'n': 'select count(1) from app01_usertype'})
    """
    print(result.query)
    SELECT (select count(1) from app01_usertype) AS `n`, `app01_userinfo`.`id`, `app01_userinfo`.`name`, `app01_userinfo`.`age`, `app01_userinfo`.`ut_id` 
    FROM `app01_userinfo`
    """
    result = models.UserInfo.objects.all().extra(select={'n': 'select count(1) from app01_usertype where id>%s'},
                                                 select_params=[1])
    """
    print(result.query)
    SELECT (select count(1) from app01_usertype where id>1 and id<3) AS `n`, `app01_userinfo`.`id`, `app01_userinfo`.`name`, `app01_userinfo`.`age`, `app01_userinfo`.`ut_id` 
    FROM `app01_userinfo`
    """
    result = models.UserInfo.objects.all().extra(
        select={'n': 'select count(1) from app01_usertype where id>%s and id<%s'},
        select_params=[1, 3])
    """
    print(result.query)
    SELECT (select count(1) from app01_usertype where id>1 and id<3) AS `n`, 
    `app01_userinfo`.`id`, `app01_userinfo`.`name`, `app01_userinfo`.`age`, `app01_userinfo`.`ut_id` 
    FROM `app01_userinfo`
    """
    result = models.UserInfo.objects.all().extra(
        select={
            'n': 'select count(1) from app01_usertype where id>%s and id<%s',
            'm': 'select count(1) from app01_usertype where id>%s and id<%s'
        },
        select_params=[1, 2, 3, 4])
    """
    for obj in result:
        print(obj.name, obj.id, obj.n, obj.m)
    print(result.query)
    SELECT 
    (select count(1) from app01_usertype where id>1 and id<2) AS `n`, 
    (select count(1) from app01_usertype where id>3 and id<4) AS `m`, 
    `app01_userinfo`.`id`, `app01_userinfo`.`name`, `app01_userinfo`.`age`, `app01_userinfo`.`ut_id` 
    FROM `app01_userinfo`
    """
    return HttpResponse()
```
根据条件查询，与 filter 功能是相同的：
```python
from django.shortcuts import HttpResponse
from app01 import models

def user_list(request):
    result = models.UserInfo.objects.all().extra(where=['id=1', 'name=thanlon'])
    """
    print(result.query)
    SELECT `app01_userinfo`.`id`, `app01_userinfo`.`name`, `app01_userinfo`.`age`, `app01_userinfo`.`ut_id` 
    FROM `app01_userinfo` 
    WHERE (id=1) AND (name=thanlon)
    """
    result = models.UserInfo.objects.all().extra(where=['id=1 or id = %s', "name='%s'"], params=[2, 'thanlon'])
    """
    print(result.query)
    SELECT `app01_userinfo`.`id`, `app01_userinfo`.`name`, `app01_userinfo`.`age`, `app01_userinfo`.`ut_id` 
    FROM `app01_userinfo` 
    WHERE (id=1 or id = 2) AND (name='thanlon')
    """
    return HttpResponse()
```
在原来的基础上增加查询范围：
```python
from django.shortcuts import HttpResponse
from app01 import models

def user_list(request):
    result = models.UserInfo.objects.all().extra(tables=['app01_usertype'])
    """
    print(result.query)
    SELECT `app01_userinfo`.`id`, `app01_userinfo`.`name`, `app01_userinfo`.`age`, `app01_userinfo`.`ut_id` 
    FROM `app01_userinfo` , `app01_usertype`
    """
    return HttpResponse()
```
进行排序，与 **`models.UserInfo.objects.all().order_by('-age')`** 具有相同的功能：
```python
from django.shortcuts import HttpResponse
from app01 import models

def user_list(request):
    result = models.UserInfo.objects.all().extra(order_by=['-age'])
    print(result.query)
    """
    print(result.query)
    SELECT `app01_userinfo`.`id`, `app01_userinfo`.`name`, `app01_userinfo`.`age`, `app01_userinfo`.`ut_id` 
    FROM `app01_userinfo` 
    ORDER BY `app01_userinfo`.`age` DESC
    """
    return HttpResponse()
```
如果在 extra 中使用了 order_by 参数，又在 extra 之外使用了 order_by('-age')，如
```python
models.UserInfo.objects.all().extra(order_by=['-age']).order_by('-age')
```
或
```python
models.UserInfo.objects.all().order_by('-age').extra(order_by=['-age'])
```
哪个在后面哪个就生效，其它 extra 中的参数也是一样。

extra 的综合应用：
```python
from django.shortcuts import HttpResponse
from app01 import models

def user_list(request):
    result = models.UserInfo.objects.all().extra(
        select={
            'm': 'select count(1) from app01_usertype where id>%s and id<%s',
            'n': 'select count(1) from app01_usertype where id>%s and id<%s'
        },
        select_params=[1, 2, 3, 4],
        where=['age>%s'],
        params=[18, ],
        order_by=['-age'],
        tables=['app01_usertype']
    )
    """
    print(result.query)
    SELECT 
        (select count(1) from app01_usertype where id>1 and id<2) AS `m`, 
        (select count(1) from app01_usertype where id>3 and id<4) AS `n`, 
        `app01_userinfo`.`id`, 
        `app01_userinfo`.`name`, 
        `app01_userinfo`.`age`, 
        `app01_userinfo`.`ut_id` 
        FROM `app01_userinfo` , `app01_usertype` 
        WHERE (age>18) 
        ORDER BY `app01_userinfo`.`age` DESC
    """
    return HttpResponse()
```

( 11 ) distinct
用于去重，使用参考：
```python
def distinct(self, *field_names):
	pass
```
应用：
```python
from django.shortcuts import HttpResponse
from app01 import models

def user_list(request):
    result = models.UserInfo.objects.all().values('id','name').distinct()
    """
    print(result.query)
    SELECT DISTINCT `app01_userinfo`.`id`, `app01_userinfo`.`name` 
    FROM `app01_userinfo`
    """
    return HttpResponse()
```
如果是 PostgreSQL 数据库使用方式：
```python
from django.shortcuts import HttpResponse
from app01 import models

def user_list(request):
    result = models.UserInfo.objects.distinct('id','name')
    """
    print(result.query)
    SELECT DISTINCT `app01_userinfo`.`id`, `app01_userinfo`.`name` 
    FROM `app01_userinfo`
    """
    return HttpResponse()
```

( 12 ) select_related
与性能相关，表之间进行 join 连表操作，一次性获取关联数据：
```python
from django.shortcuts import HttpResponse
from app01 import models

def user_list(request):
    result = models.UserInfo.objects.all().select_related()
    """
    print(result.query)
    SELECT `app01_userinfo`.`id`, `app01_userinfo`.`name`, `app01_userinfo`.`age`, `app01_userinfo`.`ut_id`, `app01_usertype`.`id`, `app01_usertype`.`title` 
        FROM `app01_userinfo`
        INNER JOIN `app01_usertype`
        ON (`app01_userinfo`.`ut_id` = `app01_usertype`.`id`)
    """
    return HttpResponse()
```
( 13 ) prefetch_related
性能相关，多表连表操作时速度会慢，使用其执行多次 SQL 查询在 Python 代码中实现连表操作：
```python
from django.shortcuts import HttpResponse
from app01 import models

def user_list(request):
    # result = models.UserInfo.objects.all().prefetch_related()
    # 加不加外键都是同样的结果
    result = models.UserInfo.objects.all().prefetch_related('ut_id')
    """
    print(result.query)
    SELECT `app01_userinfo`.`id`, `app01_userinfo`.`name`, `app01_userinfo`.`age`, `app01_userinfo`.`ut_id` 
    FROM `app01_userinfo`
    """
    return HttpResponse()
```

( 14 ) 原生sql
ORM 可以解决绝大多数查询，但是可能解决不了非常复杂的请求。这个时候只能使用原生 sql 了，Django 中使用原生sql 的方式：
```python
from django.shortcuts import HttpResponse
from app01 import models
from django.db import connection, connections

def user_list(request):
    try:
        # cursor = connection.cursor()  # connections['default'].cursor()
        cursor = connections['mysql'].cursor()
        cursor.execute("""select *from app01_userinfo where id >= 2 and id <= 4""")
        # row = cursor.fetchone()#(2, 'Thanlon', 23, 1)
        row = cursor.fetchall()  # (((2, 'Thanlon', 33, 1), (3, 'Kiku', 36, 2), (4, 'lili', 33, 1))
        print(row)
    except Exception as e:
        print(e)
    return HttpResponse()
```
**`settings.py:`**
```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    },
    'mysql': {
		'ENGINE': 'django.db.backends.mysql',
        'NAME': 'django_test',
        'USER': 'root',
        'PASSWORD': '123456',
        'HOST': 'localhost',
        'PORT': '3306'
    }
}
```
<hr>

##### 10. ORM提高性能的操作
( 1 ) 把 MODEL 转换为迭代器去执行
```python
Article.objects.all(),iterator()
```
( 2 ) only 获取字段等同于 values 和 values_list，但是使用 only 这种方式不会一下获取全部数据
```python
Article.objects.only('FIELD1','FIELD2','')
```
( 3 ) 如果要用于判断某个条件的数据是否存在，建议使用 exists，这比使用 count 或者直接判断 QuerySet 更加高效

使用 exists：
```python
if Article.objects.filter(title='xxx').exists():
    print(True)
```
使用 count：
```python
if Article.objects.filter(title='xxx').count()>0:
    print(True)
```
直接判断 QuerySet：
```python
if Article.objects.filter(title='xxx'):
    print(True)
```
<hr>

##### 11. 查询过滤综合
( 1 ) 返回查询集

<kbd>filter()</kbd>：条件满足的查询集合

<kbd>order_by()</kbd>：排序的集合

<kbd>values()</kbd>：一个对象构成一个字典，然后构成一个列表返回。相当于 json 数据，很方便使用

限制查询集：返回的查询集支持切片操作，但是不支持负索引

( 2 ) 返回单个值

<kbd>get()</kbd>：返回单个满足条件的对象，如果未找到会引发 “模型类.DoesNotExist” 异常

<kbd>count()</kbd>：返回当前查询的总条数

<kbd>first()</kbd>：返回第一个对象

<kbd>last()</kbd>：返回最后一个对象

<kbd>exists()</kbd>：判断查询集中是否有数据，如果有返回 True, 否则返回 False

<hr>

##### 12. 格式化参数
( 1 ) slice：切片操作，返回列表
```djangotemplate
{{ [1,2,3] | slice:':2' }}  # [1,2]
```
( 2 ) slugify：在字符串中留下减号和下划线。其它符号删除，空格用减号替换
```djangotemplate
{{'1-2=3and4 5=6' | slugify}} # 5-23and4-56
```
( 3 ) stringformat：字符串格式化，语法同 Python
```djangotemplate
1 | stringformat:"i" # '1'
```
( 4 ) time：返回日期的时间部分

( 5 ) timesince：到现在为止过长时间。结果可能是 45day、3hours

( 6 ) timeuntil：给定日期到现在过去了多少时间

( 7 ) lower：大写字母转换成小写

<hr>

#### Django的CBV使用
<hr>

##### 1. CBV的引入
FBV 即 Function-Based-View，是 <font>通过函数来处理请求</font>。CBV 即 Class-Based-View，是 <font>通过类来处理请求</font>。相对于传统的 FBV 方式，CBV的优点体现在：① 提高了代码的复用性，可以使用面向对象的技术，比如Mixin（多继承）；② 可以用不同的函数针对不同的HTTP方法处理，而不是通过很多if判断，提高代码可读性。
<hr>

##### 2. CBV的应用
登录功能的实现，定义一个 Login 类用于处理用户的登录请求。路由 URL 匹配成功后，开始匹配请求的方法 method。如果是 GET 请求，执行 Login 类的 get 方法，获取到登录页面。如果是 POST 请求，将登录表单的数据发送到后台验证。无须使用 if 语句来判断请求的方法是什么：

**`urls.py`**：
```py
from django.contrib import admin
from django.urls import path
from app01 import views

urlpatterns = [
    path('login.html/', views.Login.as_view()),
]
```
**`views.py`**：
```py
class Login(View):
    """
    get：查询
    post：创建
    put：更新
    delete：删除
    """

    def get(self, request):
        """
        请求的方法是get时执行
        :param request:
        :return:
        """
        return render(request, 'login.html')

    def post(self, request):
        """
        请求的方法是post时执行
        :param request:
        :return:
        """
        username = request.POST.get('username')
        print(username)
        return HttpResponse('登录成功！')
```
**`login.html`**：
```html
...
<div class="container">
    <div class="row">
        <div class="col-md-4 col-md-offset-4">
            <div class="panel panel-danger">
                <div class="panel-heading" style="font-weight: bold">用户登录
                    <button type="button" class="close" id="close_add_modal"><span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="panel-body">
                    <form method="post">
                        <div class="form-group">
                            <label for="">用户名</label>
                            <input type="text" name="username" class="form-control" id="name" placeholder="请输入用户名"
                                   autofocus>
                        </div>
                        <div class="form-group">
                            <label for="">密码</label>
                            <input type="password" name="pwd" class="form-control" id="pwd" placeholder="请输入密码">
                        </div>
                        <input type="submit" class="btn" value="登录" id="add_student" style="background: #f2dede;">
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
...
```
表单只支持POST和GET方式提交！AJAX支持所有的请求！
<hr>

##### 3. dispatch方法
请求的方法有很多，如果使用 if 来一一判断就要写很多判断语句。但是，实际上使用的并不是条件判断，而是 <font>反射</font>。用户发送请求，URL 会匹配到类。找类中的方法时，<font>使用getattr方法判断请求的方法是否对应类中的方法</font>。查看源码的时候发现在执行 get 和 post 方法之前，还执行了 dispatch 方法。dispatch 方法里执行就是这个操作：
```py
def dispatch(self, request, *args, **kwargs):
    # Try to dispatch to the right method; if a method doesn't exist,
    # defer to the error handler. Also defer to the error handler if the
    # request method isn't on the approved list.
    if request.method.lower() in self.http_method_names:
    	# 在当前对象中找用户提交的方法request.method.lower(),handler就是找到的方法名
        handler = getattr(self, request.method.lower(), self.http_method_not_allowed)
    else:
        handler = self.http_method_not_allowed
    # handler加括号就是执行这些方法
    return handler(request, *args, **kwargs)
```
dispatch 方法的功能类似 <font>装饰器</font> 的功能，在执行请求的方法之前和之后做其它操作：
```py
class Login(View):

    def dispatch(self, request, *args, **kwargs):
        print('Before')
        obj = super(Login, self).dispatch(request, *args, **kwargs)
        print('After')
        return obj

    def get(self, request):
        print('get')
        return render(request, 'login.html')

    def post(self, request):
        print('post')
        return HttpResponse('登录成功！')
```
执行记录：
```py
[06 / Jun / 2020 01: 32:33] "GET /login.html/ HTTP/1.1" 200 1813
Before
get
After
[06 / Jun / 2020 01: 32:38] "GET /login.html/ HTTP/1.1" 200 1813
[06 / Jun / 2020 01: 32:41] "POST /login.html/ HTTP/1.1" 200 15
Before
post
After
```
如果要对 get 和 post 等请求方法做批量操作时，<font>没必要在每个方法中都写一遍，只要在 dispatch 写一遍就可以了</font>。
<hr>

##### 4. CBV中添加装饰器
CBV 中添加装饰器有两种方法，分别是在指定的方法中添加装饰器和在类上添加装饰器。在方法中添加装饰器：

**`views.py:`**
```py
from django.views import View
from django.views.decorators.csrf import csrf_protect
from django.utils.decorators import method_decorator

def wrapper(func):
    def inner(*args, **kwargs):
        return func(*args, **kwargs)
    return inner

class Login(View):
    @method_decorator(csrf_protect)
    def get(self, request):
        pass

    @method_decorator(wrapper)
    def post(self, request):
        pass
```
在类上添加装饰器不可以直接把装饰器放在类上，这样时错误的，如:
```py
from django.views import View
from django.views.decorators.csrf import csrf_protect

@csrf_protect
class Login(View):
    def get(self, request):
        pass

    def post(self, request):
        pass
```
在类上加装饰器，需要用到 **`@method_decorator`**:
```py
from django.views import View
from django.views.decorators.csrf import csrf_protect
from django.utils.decorators import method_decorator

# 对类中所有的方法添加csrf_protect装饰器
@method_decorator(csrf_protect)
class Login(View):
    def get(self, request):
        pass

    def post(self, request):
        pass
```
还可以通过类方法名称来指定方法添加装饰器：
```py
from django.views import View
from django.views.decorators.csrf import csrf_protect
from django.utils.decorators import method_decorator

@method_decorator(csrf_protect, name='get')
@method_decorator(csrf_protect, name='post')
class Login(View):
    def get(self, request):
        pass

    def post(self, request):
        pass
```
csrf的装饰器在使用CBV的情况下不能加到类方法上!

以上两种方法都具有为所有的函数加装饰器的功能，不过如果 <font>想为所有类方法添加装饰器显得比较麻烦!</font> 这里还有一种方法可以 <font>为所有的方法加上某个装饰器</font>，那就是把装饰器加到 dispatch 方法上：
```py
from django.views import View
from django.views.decorators.csrf import csrf_protect
from django.utils.decorators import method_decorator

def wrapper(func):
    def inner(*args, **kwargs):
        return func(*args, **kwargs)
    return inner

@method_decorator(csrf_protect, name='dispatch')
@method_decorator(wrapper, name='dispatch')
class Login(View):
    def get(self, request):
        pass

    def post(self, request):
        pass
```
<hr>

#### Django内置分页
<hr>

##### 1. 后台分页逻辑
```python
from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage

def student(request):
    # 获取所有的结果集
    emp_list = models.StuInfo.objects.all()  # <QuerySet [<StuInfo: StuInfo object (1)>]>
    """
    emp_list也可以是使用pymysql拿到的列表：student_list = cursor.fetchall()
    [{'id': 1, 'name': '超越'}, {'id': 2, 'name': '奈何'}] <class 'list'>
    """
    # 创建Paginator对象，可直接设置每页显示的条目数量
    pagenator = Paginator(emp_list, 3) 
    """
    pagenator.page(1)：显示第1页
    
    pagenator.per_page：每页显示的条目数量
    pagenator.count：数据总个数
    pagenator.num_pages：总页数
    pagenator.page_range：页码列表，总页数的索引范围，如(1,10)
    """
    # 获取传入的页码
    current_page = request.GET.get('page')
    try:
        posts = pagenator.page(current_page)
    except PageNotAnInteger as e:
        posts = pagenator.page(1)  # 如果传入的页码不是整型，则默认显示第一页，如传入的是/student.html/?page=abc，/student.html/
	"""
	posts.has_next：是否有下一页
	posts.next_page_number：下一页页码
	posts.has_previous：是否有上一页
	posts.previous_page_number：上一页页码
	posts.object_list：分页之后的数据列表
	
	posts.number:当前页
	posts.paginator：paginator对象
	"""
    # PageNotAnInteger：如果传入的页码不是整数的值时会抛出异常，如传入的是/student.html/?page=abc
    # InvalidPage：当向page()传入一个无效的页码时抛出
    # EmptyPage：当向page()提供一个有效值但是那个页面上没有任何对象时抛出
    except EmptyPage as e:
        posts = pagenator.page(1)  # 如果传入的页码是空页，则默认显示第一页，如传入的是/student.html/?page=-10
    return render(request, 'student.html', {'posts': posts})
```
<hr>

##### 2. 前台分页展示
```html
<table class="table table-hover text-center" style="background: white;margin-bottom: 0">
    <tr>
        <th class="text-center">ID</th>
        <th class="text-center">姓名</th>
        <th class="text-center">年龄</th>
    </tr>
    {% for row in posts.object_list %}
        <tr>
            <td>{{ row.id }}</td>
            <td>{{ row.name }}</td>
            <td>{{ row.age }}</td>
        </tr>
    {% endfor %}
</table>
<nav aria-label="Page navigation" class="text-left">
    <ul class="pagination">
        {% if posts.has_previous %}
            <li>
                <a href="/student.html?page={{ posts.previous_page_number }}">上一页</a>
            </li>
        {% endif %}
        {% if posts.has_next %}
            <li>
                <a href="/student.html?page={{ posts.next_page_number }}">下一页</a>
            </li>
        {% endif %}
    </ul>
</nav>
```
<hr>

#### Django自定义分页
<hr>

##### 1. 自定义分页效果
可以实现查找 <font>首页和最后一页，上一页和下一页，以及指定页</font>：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200614162457430.png)
<hr>

##### 2. 自定义分页的实现
模型 Model 部分的代码：

**`models.py`**:
```py
from django.db import models

class UserType(models.Model):
    """
    用户类型表
    """
    title = models.CharField(max_length=32)

class UserInfo(models.Model):
    """
    用户表
    """
    name = models.CharField(max_length=16)
    age = models.IntegerField()
    ut = models.ForeignKey('UserType', on_delete=models.CASCADE)
```
控制器 Controller 部分的代码：

**`vews.py`**:
```py
from django.shortcuts import render, HttpResponse
from app01 import models
from utils.pagger import PageInfo


class PageInfo:
    def __init__(self, current_page, per_page, count_sum, base_url, show_page=11):
        """
        :param current_page:当前的页码
        :param per_page:每页显示的数据量
        :param count_sum:总的数据量
        """
        try:
            self.current_page = int(current_page)
        except Exception as e:
            self.current_page = 1
        self.per_page = per_page
        self.count_sum = count_sum
        a, b = divmod(count_sum, per_page)
        if b:
            a += 1
        # page_num：所有页码的数量
        self.sum_page_num = a
        self.show_page = show_page
        self.base_url = base_url

    def start(self):
        return (self.current_page - 1) * self.per_page

    def end(self):
        return self.current_page * self.per_page

    def pager(self):
        half = int((self.show_page - 1) / 2)
        # 如果总页数小于11
        if self.sum_page_num < self.show_page:
            begin = 1
            stop = self.sum_page_num + 1
        else:
            if self.current_page <= half:
                begin = 1
                stop = self.show_page + 1
            else:
                if self.current_page + half > self.sum_page_num:
                    begin = self.sum_page_num - self.show_page + 1
                    stop = self.sum_page_num + 1
                else:
                    begin = self.current_page - half
                    stop = self.current_page + half + 1
        page_num_list = []
        index_page = '<li><a href="%s?page=1"><span aria-hidden="true">首页</span></a></li>' % (self.base_url)
        page_num_list.append(index_page)
        if self.current_page <= 1:
            prev_page = '<li><a href="#"><span aria-hidden="true">&laquo;</span></a></li>'
        else:
            prev_page = '<li><a href="%s?page=%s"><span aria-hidden="true">&laquo;</span></a></li>' % (
                self.base_url, self.current_page - 1,)

        page_num_list.append(prev_page)
        for i in range(begin, stop):
            if i == self.current_page:
                page_num_list.append(
                    "<li class='active'><a class='active' href='%s?page=%s'>%s</a></li>" % (self.base_url, i, i))
            else:
                page_num_list.append("<li><a class='active' href='%s?page=%s'>%s</a></li>" % (self.base_url, i, i))
        if self.current_page >= self.sum_page_num:
            next_page = '<li><a href="#"><span aria-hidden="true">&raquo;</span></a></li>'
        else:
            next_page = '<li><a href="%s?page=%s"><span aria-hidden="true">&raquo;</span></a></li>' % (
                self.base_url, self.current_page + 1,)
        page_num_list.append(next_page)

        final_page = '<li><a href="%s?page=%s"><span aria-hidden="true"></span>最后一页</a></li>' % (
            self.base_url, self.sum_page_num)
        page_num_list.append(final_page)
        return ''.join(page_num_list)


def index(request):
    count_sum = models.UserInfo.objects.count()
    page_info = PageInfo(request.GET.get('page'), 1, count_sum, '/index.html')
    user_info = models.UserInfo.objects.all()[page_info.start():page_info.end()]
    return render(request, 'index.html', {'user_info': user_info, 'page_info': page_info})

```
视图 View 部分的代码：
```html
...
<table class="table table-bordered">
    <tr>
        <th>用户名</th>
        <th>年龄</th>
    </tr>
    {% for item in user_info %}
        <tr>
            <td> {{ item.name }}</td>
            <td> {{ item.age }}</td>
        </tr>
    {% endfor %}
</table>
<nav aria-label="Page navigation">
    <ul class="pagination">
        {{ page_info.pager|safe }}
    </ul>
</nav>
...
```
<hr>

##### 3. 分页插件
可以把控制器部分的 PageInfo 类放在单独的 Python 文件中，可以复用。新建 utils 目录，然后将其放在 utils 目录下：

**`pager.py`**
```py
class PageInfo:
    def __init__(self, current_page, per_page, count_sum, base_url, show_page=11):
        """
        :param current_page:当前的页码
        :param per_page:每页显示的数据量
        :param count_sum:总的数据量
        """
        try:
            self.current_page = int(current_page)
        except Exception as e:
            self.current_page = 1
        self.per_page = per_page
        self.count_sum = count_sum
        a, b = divmod(count_sum, per_page)
        if b:
            a += 1
        # page_num：所有页码的数量
        self.sum_page_num = a
        self.show_page = show_page
        self.base_url = base_url

    def start(self):
        return (self.current_page - 1) * self.per_page

    def end(self):
        return self.current_page * self.per_page

    def pager(self):
        half = int((self.show_page - 1) / 2)
        # 如果总页数小于11
        if self.sum_page_num < self.show_page:
            begin = 1
            stop = self.sum_page_num + 1
        else:
            if self.current_page <= half:
                begin = 1
                stop = self.show_page + 1
            else:
                if self.current_page + half > self.sum_page_num:
                    begin = self.sum_page_num - self.show_page + 1
                    stop = self.sum_page_num + 1
                else:
                    begin = self.current_page - half
                    stop = self.current_page + half + 1
        page_num_list = []
        index_page = '<li><a href="%s?page=1"><span aria-hidden="true">首页</span></a></li>' % (self.base_url)
        page_num_list.append(index_page)
        if self.current_page <= 1:
            prev_page = '<li><a href="#"><span aria-hidden="true">&laquo;</span></a></li>'
        else:
            prev_page = '<li><a href="%s?page=%s"><span aria-hidden="true">&laquo;</span></a></li>' % (
                self.base_url, self.current_page - 1,)

        page_num_list.append(prev_page)
        for i in range(begin, stop):
            if i == self.current_page:
                page_num_list.append(
                    "<li class='active'><a class='active' href='%s?page=%s'>%s</a></li>" % (self.base_url, i, i))
            else:
                page_num_list.append("<li><a class='active' href='%s?page=%s'>%s</a></li>" % (self.base_url, i, i))
        if self.current_page >= self.sum_page_num:
            next_page = '<li><a href="#"><span aria-hidden="true">&raquo;</span></a></li>'
        else:
            next_page = '<li><a href="%s?page=%s"><span aria-hidden="true">&raquo;</span></a></li>' % (
                self.base_url, self.current_page + 1,)
        page_num_list.append(next_page)

        final_page = '<li><a href="%s?page=%s"><span aria-hidden="true"></span>最后一页</a></li>' % (
            self.base_url, self.sum_page_num)
        page_num_list.append(final_page)
        return ''.join(page_num_list)
```
<hr>

#### Django解决跨站脚本攻击
<hr>

##### 1. Django处理XSS攻击 
Django 本身默认可以处理 XSS 攻击，例如：

**`views.py`**:
```py
def test(request):
    ret = '<script>alert("XSS")</script>'
    return render(request, 'test.html', {'ret': ret})
```
**`test.html`**:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
{{ ret }}
</body>
</html>
```
并没有解析传入的字符串，当作js脚本来执行。

![在这里插入图片描述](https://img-blog.csdnimg.cn/2020061419582245.png)

但是当传入到模板的数据是我们自己的并且是安全的，我们想要告诉系统这是安全的应该如何去做呢！有两种方法，分别是后端标记字符串和前端标记字符串。
<hr>

##### 2. 前端标记字符串
在模板上写 **`|safe`** 的方法可以标记字符串是安全的，可以去解析执行：

**`test.html`**:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
{{ ret|safe }}
</body>
</html>
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200614200239547.png)
<hr>

##### 3. 后端标记字符串
后台把字符串标记成安全的需要在传入模板之前就操作，使用到的是 **`django.utils.safestring`** 模块中的 <kbd>mark_safe</kbd> 函数：

**`views.py`**:
```py
def test(request):
    from django.utils.safestring import mark_safe
    ret = '<script>alert("XSS")</script>'
    ret = mark_safe(ret)
    return render(request, 'test.html', {'ret': ret})
```
**`test.html`**:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
{{ ret }}
</body>
</html>
```
与前端标记一样：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200614200239547.png)
<hr>

#### Django处理跨站请求伪造
<hr>

##### 1. 基本应用
Django 中通过生成随机字符串的方式对客户发送提交数据的请求（POST）进行验证，基本原理：客户端向服务端先发送GET请求，服务端会把随机字符串写到请求的页面上，客户端再来提交数据的时候需要带上这个随机字符串，服务端才会处理请求。默认中间件的配置中 CSRF 是开启的状态：

**`settings.py:`**
```py
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',	# CSRF
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]
```
**`views.py:`**
```py
def csrf(request):
    if request.method == 'GET':
        return render(request, 'csrf.html')
    else:
        return HttpResponse('ok')
```
Django 中的 **`{% csrf_token %}`** 就是服务端生成的随机字符串，如果在页面上没有加上它，那么请求的时候就不会带上这个随机字符串：

**`csrf.html:`**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<form action="" method="post">
    <input type="text">
    <input type="submit">
</form>
</body>
</html>
```
在提交数据的时候会 403 Forbidden 的错误：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200615080606759.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RoYW5sb24=,size_16,color_FFFFFF,t_70)

如果在页面上加上 **`{% csrf_token %}`**，客户端在发送 GET 请求后，服务端返回的页面上就会显示这个随机字符串，
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<form action="" method="post">
    <input type="text">
    <input type="hidden" name="csrfmiddlewaretoken" value="a7brzXos3mDRZlmdWyJcKs72MJ4WtvXaZfa8xWUJq7E3dvNhFrWk3gesKdup3TR2">
    <input type="submit">
</form>
</body>
</html>
```
客户端直接带着这个随机字符串提交提交数据即可，不会再包请求拒绝的问题。
**`{{ csrf_token }}`** 会在页面上直接显示这个随机字符串，而 **`{% csrf_token %}`** 会生成 input 标签，这是有区别的。
<hr>

##### 2. 全站禁用
如果全站都不想使用 CSRF 的验证，可以全局禁用处理里 CSRF，只需要在配置文件中的中间件部分注释掉CSRF的过滤，
```py
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    # 'django.middleware.csrf.CsrfViewMiddleware',	
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]
```
如果是这样，客户端提交数据请求时不会进行CSRF的处理。
<hr>

##### 3. 局部禁用
如果不想在某些页面提交请求数据时做CSRF验证，这个时候 **`django.middleware.csrf.CsrfViewMiddleware`** 中间件是（全局）开启的状态，那就可以通过 <font>装饰器</font> 的方式单独禁用这个页面发送提交数据请求的CSRF的验证，只需要 <font>在视图函数中加入 csrf_exempt 装饰器</font>：

**`views.py:`**
```py
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def csrf(request):
    if request.method == 'GET':
        return render(request, 'csrf.html')
    else:
        return HttpResponse('ok')
```
<hr>

##### 4. 局部使用
如果在全局禁用的状态下，局部使用 CSRF 验证。需要在视图函数中加上 <font>装饰器</font>，表示在这个视图函数对应的模板中提交数据的请求必须进行 CSRF 验证：

**`views.py:`**
```py
from django.views.decorators.csrf import csrf_protect


@csrf_protect
def csrf(request):
    if request.method == 'GET':
        return render(request, 'csrf.html')
    else:
        return HttpResponse('ok')
```
如果在模板中没有加上 **`{% csrf_token %}`** 同样是请求被拒绝的：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200615080606759.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RoYW5sb24=,size_16,color_FFFFFF,t_70)

加入 csrf 认证后服务端只接收来自本站提交数据的请求，别的站点发送的是不被接收的。所以，csrf 验证是可以防止别的站点发送提交数据的请求到本站。但是，csrf 认证不是完全可以避免的，如过是其它站点获取到了本站的 csrf，带着它去请求本站，服务端也会认为是自己的站点发送的请求，会选择接收请求的。所以，csrf 认证只是在一定程度上保护了站点。
<hr>

##### 5. AJAX携带CSRF提交数据
如果 AJAX 不携带 CSRF 字符串提交数据，也会出现 403 Forbidde 报错，所以 <font>AJAX提交数据也是要携带CSRF字符串的</font>。AJAX 携带 CSRF 提交数据的方法有两种，一种是把页面上的 csrf 随机字符串放在 <font>data</font> 中传到后端，另一种是放在 <font>把 csrf 随机字符串放在请求头中</font> 。首先探讨第一种方法：

**`views.py:`**
```py
from django.views.decorators.csrf import csrf_protect

@csrf_protect
def csrf(request):
    if request.method == 'GET':
        return render(request, 'csrf.html')
    else:
        return HttpResponse('ok')
```
**`index.html:`**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<form>
    <input type="text" id="user">
    {% csrf_token %}
    <input type="button" value="提交" id="submit">
</form>
</body>
<script src="/static/js/jquery-3.5.1.min.js"></script>
<script>
    $(function () {
        submitForm();
    });

    function submitForm() {
        $('#submit').click(function () {
            var user = $('#user').val();
            var csrfmiddlewaretoken = $('input[name="csrfmiddlewaretoken"]').val()
            $.ajax({
                url: '/index.html/', //可以不写，默认发送到本页面对应的视图函数中
                type: 'post',
                data: {
                    'user': user,
                    'csrfmiddlewaretoken': csrfmiddlewaretoken  //csrfmiddlewaretoken也可以不获取直接拿"{{csrf_token}}"
                },
                success: function (arg) {
                    alert(arg) //ok
                }
            })
        })
    }
</script>
</html>
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200615122305197.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200615121557459.png)

第二种方法，<font>把 cookie 放在请求头中</font>。首先引入插件 **`jquery.cookie.js`**，这个插件专门对 cookie 进行操作的，通过 cookie 名可以直接获取 cookie 的值，也还可以设置 cookie：
![在这里插入图片描述](https://img-blog.csdnimg.cn/2020061512394832.png)

Django 规定从 <font>浏览器获取的cookie</font> 传入到 Django 中要传到 <font>请求头</font> 中，要使用到 headers：

**`index.html:`**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<form>
    <input type="text" id="user">
    <input type="button" value="提交" id="submit">
</form>
</body>
<script src="/static/js/jquery-3.5.1.min.js"></script>
<script src="/static/js/jquery.cookie.js"></script>
<script>
    $(function () {
        submitForm();
    });

    function submitForm() {
        $('#submit').click(function () {
            var user = $('#user').val();
            var token = $.cookie('csrftoken');
            $.ajax({
                url: '/csrf.html/', //可以不写，默认发送到本页面对应的视图函数中
                type: 'post',
                headers:{'X-CSRFToken':token},
                data: {
                    'user': user
                },
                success: function (arg) {
                    alert(arg) //ok
                }
            })
        })
    }
</script>
</html>
```
<hr>

#### Django中Session的使用
<hr>

##### 1. Session简介
客户端向服务端发送请求获取登录页面，服务端返回给客户端登录页面。客户端向服务器端发送登录系统的请求，如果登录成功，服务端会生成一段随机字符串，会把随机字符串和客户端数据对应起来保存在服务端并返回给客户端。每一个客户端登录成功后，服务端都会保存随机字符串和数据。当客户端带着服务端之前返回的随机字符串和数据(被写在浏览器的 Cookie 中)再次向服务端请求数据时，在 Session 没有失效的情况下，就不需要验证客户端的状态。Session 本质是键值对：
```py
{
    'zx7a4imi2v5dvfrda1vlw3lkoiao6ubj':{'id':1,'name':'erics'},
}
```
Session<font>是保存在服务器端的数据，本质上是键值对</font>。一般用于 Web 网站的时候保持与用户之间的会话，即记录用户的的登录状态，登录之后不要求再次登录。它的优点是敏感信息不会直接给客户端。Session 的应用依赖 Cookie，Session 需要通过 Cookie 写给客户端浏览器。

Cookie<font>是保存在客户端上的键值对!</font>
<hr>

##### 2. 基于Session的用户登录
Django 内置 Session 操作( Flask 也内置 Session )，所以可以直接使用。下面基于 Session 来完成用户登录：

**`views.py`**
```py
from django.shortcuts import render, HttpResponse, redirect
from app01 import models
from django.views import View
from utils.md5 import md5

class Login(View):
    def get(self, request):
        return render(request, 'login.html')

    def post(self, request):
        name = request.POST.get('name')
        pwd = request.POST.get('pwd')
        obj = models.User.objects.all().filter(name=name, pwd=md5(pwd)).first()
        if obj:
            """
            1.生成随机字符串
            2.通过cookie发送给客户端
            3.服务端保存[随机字符创1:['xx':xx,'xxx':xxx,...]](Session)
            """
            request.session['name'] = name
            return redirect('/index.html/')
        return HttpResponse()

def index(request):
    """
    1.获取客户端cookie中的字符串
    2.去session中查找有没有这个字符串
    3.在session对应key的value中查看有没有name
    """
    v = request.session.get('name')
    if v:
        return HttpResponse('%s登录成功！' % (v))
    else:
        return redirect('/login.html/')
```
**`md5.py:`**
```py
import hashlib

SALT = b'erics'

# 自定义MD5函数
def md5(pwd):
    obj = hashlib.md5(SALT)
    # pwd是字符串，需要将其转换成字节
    obj.update(pwd.encode('utf-8'))
    # 返回密文
    return obj.hexdigest()
```
**`login.html:`**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>登录</title>
    <link rel="stylesheet" href="/static/css/bootstrap.min.css">
</head>
<body>
<div class="container" style="margin-top: 10px">
    <div class="row">
        <div class="col-md-4 col-md-offset-4">
            <div class="panel panel-primary">
                <div class="panel-heading">
                    登录
                </div>
                <div class="panel-body">
                    <form action="/login.html/" method="POST" name="loginForm">
                        <div class="form-group">
                            <label for="name">用户名</label> <input type="text" class="form-control" name="name"
                                                                 placeholder="请输入用户名">
                        </div>
                        <div class="form-group">
                            <label for="">密码</label> <input type="password" class="form-control" name="pwd"
                                                            placeholder="请输入密码">
                            <div style="color: red;font-weight: bold">{{ msg }}</div>
                        </div>
                        {% csrf_token %}
                        <button type="submit" class="btn btn-primary">登录</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
```
登录页面：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200616085128265.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RoYW5sb24=,size_16,color_FFFFFF,t_70)

用户登录之后，服务端把Session保存在数据库中的 **`django_session`** 表中，session_data也就是随机字符串对应的键值被内部进行了加密：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200616085446540.png)

登录成功：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200616085217430.png)

浏览器上查看有没有这样的cookie：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200616090412528.png)
<hr>

##### 3. Session的配置
```py
def test(request):
    pass
    """
    1.获取/设置/删除session中的数据
    """
    # 获取session中的数据，如果k1不存在则报错
    request.session['k1']
    # 获取session中的数据，如果k1不存在则获取到的是None
    request.session.get('k1', None)
    # 设置session中的数据
    request.session['k1'] = 'erics'
    # 设置session中的数据，存在则不设置
    request.session.setdefault('k1', 'erics')
    # 删除session中的数据
    del request.session['k1']
    """
    2.获取键/值/键值对
    """
    request.session.keys()
    request.session.values()
    request.session.items()
    """
    3.获取用户session的字符串
    """
    request.session.session_key
    """
    4.将所有session失效日期小于当前日期的数据删除
    """
    request.session.clear_expired()
    """
    5.检查用户session的随机字符串在数据库中是否存在
    """
    request.session.exists(request.session.session_key)
    """
    6.删除当前用户的所有session数据(session_id和session_data)，会话没有了下次需要重新登录
    """
    request.session.delete(request.session.session_key)
    """
    7.设置超时时间(在浏览器cookie和数据库中都设置)，如果value是整数，表示多少s之后失效；如果是datetime或timedelta，在这个时间后失效；
    value=0表示关闭浏览器失效(浏览器关闭，不是Web页面关闭)；value=None表示依赖全局session失效策略
    """
    request.session.set_expiry(value=None)
```
如果使用 Django 默认的 session 登录后，浏览器上的 session 默认生效时间是2周，被存放在浏览器的 cookie 中，2周之后 cookie 会被删除。但是数据库中的 session 不会被删除，只能手动删除。可以将所有 session 失效日期小于当前日期的数据删除。session 的配置可以写在 **`settings.py`** 文件中：
```py
"""
以下为默认的配置，如果写了会把默认配置覆盖(优先级高)
"""
SESSION_COOKIE_NAME = 'session_id'  # session的cookie保存在浏览器上名字,sessionid=随机字符串
SESSION_COOKIE_PATH = '/'  # 在所有的url上都生效
SESSION_COOKIE_DOMAIN = None  # session的cookie保存的域名
SESSION_COOKIE_SECURE = False  # 是否https传输cookie
SESSION_COOKIE_HTTPONLY = True  # 是否session的cookie只支持http传输
SESSION_COOKIE_AGE = 1209600  # session的cookie失效日期(2周)
SESSION_EXPIRE_AT_BROWSER_CLOSE = False  # 是否关闭浏览器使session的cookie过期
SESSION_SAVE_EVERY_REQUEST = False  # 是否每次请求都保存session(如设置了30分钟失效，如果是True，30min之内操作从最后一次操作开始计算30分钟后失效)
```
<hr>

##### 4. Session数据源配置
Session的配置都要放在settings.py文件中！

放在数据库中：
```py
SESSION_ENGINE = 'django.contrib.session.backends.db'  # 默认
```
放在文件中：
```py
SESSION_ENGINE = 'django.contrib.session.backends.file'
SESSION_FILE_PATH = None  # 没有设置文件路径，Django会使用tempfile模块获取一个临时地址tempfile.gettempdir()
```
放在缓存中：
```py
SESSION_ENGINE = 'django.contrib.session.backends.cache'
SESSION_CACHE_ALIAS = 'default'  # 使用缓存别名（默认内存缓存）,default可以代之缓存服务器的IP和Port
```
放在数据库和缓存中：
```py
SESSION_ENGINE = 'django.contrib.session.backends.cache_db'
```
放在cookie中：
```py
SESSION_ENGINE = 'django.contrib.session.backends.signed_cookies'
```
<font>推荐使用数据和缓存来存放Session！</font>
<hr>

#### Web服务网关接口
<hr>

##### 1. WSGI
WSGI 即 Web 服务网关接口，这是一种协议。uwsgi 和 wsgiref 都是基于这个协议。Django 没有自己的 socket，<font>默认使用的是 wsgiref</font>。wsgiref 由于性能原因，一般用于本地测试环境，uwsgi 支持并发的一些设置可用于生产环境。
<hr>

##### 2. Django请求的生命周期
socket 的作用是接收请求和响应请求。当用户向 socket 发送请求数据后，socket 还需要对请求数据进行解析，根据请求数据来响应不同的内容。Django 做的就是解析请求数据（需要从 socket 中获取请求相关信息），找到对应的响应内容（产出字符串），然后返回给 socket，socket 再发送响应数据给用户。Django 不关心 socket 接发数据，只关心 <font>从 socket 那里获取到请求数据并处理和返回请求数据给 socket</font>。
```py
def RunServer(environ, start_response):
    """
    :param environ: 请求相关的所有操作
    :param start_response:socket给Django的容器，Django最后要把容器给socket，可以用来方请求头
    :return:
    """
    # Django框架开始
    # 中间件
    # 路由系统
    # 视图函数
    # 数据库
    # 模板引擎的渲染
    # 最后把响应头+响应体通过socket返回给用户
    start_response('200 OK', [('Content-Type', 'text/html')])
    return [bytes('<h1>!!!</h1>', encoding='utf-8')]


if __name__ == '__main__':
    """
    下面两句代码的操作是：创建socket服务端和等待客户端连接
    """
    httpd = make_server('localhost', 8000, RunServer)
    httpd.serve_forever()
```
Django 部分源码，Django 请求处理的入口点：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200617212524672.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RoYW5sb24=,size_16,color_FFFFFF,t_70)
<hr>

Django 请求的生命周期流程：用户->WSGI->中间件->视图函数(数据库和模板进行渲染)->中间件->WSGI->用户，中间件和视图函数部分属于 Django。
<hr>

#### Django中间件
<hr>

##### 1. 中间件执行流程
Django 1.10之前，请求到达第一个中间件，会找到最后一个中间件的 process_response 返回：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200618005438431.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RoYW5sb24=,size_16,color_FFFFFF,t_70)

而Django 1.10之后，会找到自己的 process_response 返回：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200618005323503.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RoYW5sb24=,size_16,color_FFFFFF,t_70)

<font>中间件是有序执行的！</font>
<hr>

##### 2. 中间件原理浅析
中间件是类，首先查看 Django 源码中的中间件：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200618011158584.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RoYW5sb24=,size_16,color_FFFFFF,t_70)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200618011204639.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RoYW5sb24=,size_16,color_FFFFFF,t_70)

所以，我们写的中间件也要继承 **`MiddlewareMixin`** 类，这里把中间件类写在 **`middleware.py`**，并放置在与 **`manage.py`** 同级目录下：

**`middleware.py:`**
```py
from django.utils.deprecation import MiddlewareMixin

class M1(MiddlewareMixin):
    def process_request(self, request):
        print('m1.process_request')

    def process_response(self, request, response):
        print('m1.process_response')
        return response

class M2(MiddlewareMixin):
    def process_request(self, request):
        print('m2.process_request')

    def process_response(self, request, response):
        print('m2.process_response')
        return response
"""
m1.process_request
m2.process_request
test
m2.process_response
m1.process_response
"""
```
还要在配置文件 **`settings.py`** 中注册中间件：
```py
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'middleware.M1',
    'middleware.M2'
]
```
可以看到先执行 <kbd>process_request</kbd> 再执行 <kbd>process_response</kbd>。还有个 <kbd>process_view</kbd> 方法：
```py
from django.utils.deprecation import MiddlewareMixin

class M1(MiddlewareMixin):
    def process_request(self, request):
        print('m1.process_request')

    def process_view(self, request, callback, callback_args, callback_kwargs):
        print('m1.process_view')
        # return callback(*callback_args, **callback_kwargs)

    def process_response(self, request, response):
        print('m1.process_response')
        return response

class M2(MiddlewareMixin):
    def process_request(self, request):
        print('m2.process_request')

    def process_view(self, request, callback, callback_args, callback_kwargs):
        print('m2.process_view')
        # return callback(*callback_args, **callback_kwargs)

    def process_response(self, request, response):
        print('m2.process_response')
        return response

"""
m1.process_request
m2.process_request
m1.process_view
m2.process_view
test
m2.process_response
m1.process_response
"""
```
process_request 有返回值会直接执行自己的 process_response 。如果执行的是 process_view 有返回值，会跳过下一个中间件的 process_view，执行视图函数(<font>这里是自动调用的</font>)。接下来，不是执行自己的 process_response 返回给用户，而是 <font>最开始</font> 的 process_response（<font>把所有的 process_response 都执行一遍</font>）：
```py
from django.utils.deprecation import MiddlewareMixin


class M1(MiddlewareMixin):
    def process_request(self, request):
        print('m1.process_request')

    def process_view(self, request, callback, callback_args, callback_kwargs):
        # print(callback, callback_args, callback_kwargs) #<function test at 0x7fd39b986040> () {}
        print('m1.process_view')
        response = callback(request, *callback_args, **callback_kwargs)
        return response

    def process_response(self, request, response):
        print('m1.process_response')
        return response


class M2(MiddlewareMixin):
    def process_request(self, request):
        print('m2.process_request')

    def process_view(self, request, callback, callback_args, callback_kwargs):
        print('m2.process_view')

    def process_response(self, request, response):
        print('m2.process_response')
        return response
        
"""
m1.process_request
m2.process_request
m1.process_view
test
m2.process_response
m1.process_response
"""
```
中间件的类中还有 <kbd>process_exception</kbd> 方法，这是关于异常的方法。为了进行测试首先在视图函数中使代码产生异常：
```py
def test(request):
    print('test')
    a = int('erics')
    return HttpResponse()
```
通过下面的代码测试发现，请求经过所有的 process_request、process_view 到达视图函数，没有错误的情况下会执行 process_response，出现错误会执行 process_exception 在执行 process_response：
```py
from django.utils.deprecation import MiddlewareMixin

class M1(MiddlewareMixin):
    def process_request(self, request):
        print('m1.process_request')

    def process_view(self, request, callback, callback_args, callback_kwargs):
        # print(callback, callback_args, callback_kwargs) #<function test at 0x7fd39b986040> () {}
        print('m1.process_view')
        # response = callback(request, *callback_args, **callback_kwargs)
        # return response
    #
    def process_response(self, request, response):
        print('m1.process_response')
        return response

    def process_exception(self, request, exception):
        print('m1.process_exception')


class M2(MiddlewareMixin):
    def process_request(self, request):
        print('m2.process_request')

    def process_view(self, request, callback, callback_args, callback_kwargs):
        print('m2.process_view')

    def process_response(self, request, response):
        print('m2.process_response')
        return response

    def process_exception(self, request, exception):
        print('m2.process_exception')

"""
m1.process_request
m2.process_request
m1.process_view
m2.process_view
test
m2.process_exception
m1.process_exception
m2.process_response
m1.process_response
"""
```
在 process_exception 使用 HttpResponse 函数返回异常，可以看这个时候中间件方法的执行顺序：
```py
from django.utils.deprecation import MiddlewareMixin
from django.shortcuts import HttpResponse

class M1(MiddlewareMixin):
    def process_request(self, request):
        print('m1.process_request')

    def process_view(self, request, callback, callback_args, callback_kwargs):
        # print(callback, callback_args, callback_kwargs) #<function test at 0x7fd39b986040> () {}
        print('m1.process_view')
        # response = callback(request, *callback_args, **callback_kwargs)
        # return response
    #
    def process_response(self, request, response):
        print('m1.process_response')
        return response

    def process_exception(self, request, exception):
        print('m1.process_exception')

class M2(MiddlewareMixin):
    def process_request(self, request):
        print('m2.process_request')

    def process_view(self, request, callback, callback_args, callback_kwargs):
        print('m2.process_view')

    def process_response(self, request, response):
        print('m2.process_response')
        return response

    def process_exception(self, request, exception):
        # print('m2.process_exception')
        return HttpResponse('出现异常！')

"""
m1.process_request
m2.process_request
m1.process_view
m2.process_view
test
m2.process_response
m1.process_response
"""
```
异常被 M2 的 process_exception 处理了，跳过 M1 的 process_exception，直接执行 process_response。页面也不没有报错了：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200618023429223.png)

中间件中还有 process_template_response 方法，但是这个方法在视图函数的返回值中有 render 方法才会执行，没有 render 方法不会被执行，所以这里修改视图函数：
```py
class Foo:
    def __init__(self, req):
        self.req = req

    def render(self):
        return HttpResponse()

def test(request):
    obj = Foo(request)
    return obj
```
接下来可以看到 process_template_response 方法被执行，
```py
from django.utils.deprecation import MiddlewareMixin
from django.shortcuts import HttpResponse

class M1(MiddlewareMixin):
    def process_request(self, request):
        print('m1.process_request')

    def process_view(self, request, callback, callback_args, callback_kwargs):
        print('m1.process_view')

    def process_response(self, request, response):
        print('m1.process_response')
        return response

    def process_exception(self, request, exception):
        print('m1.process_exception')

    def process_template_response(self, request, response):
        """
        视图函数的返回值中有render方法才会执行
        :param request:
        :param response:
        :return:
        """
        print('m1.process_template_response')
        return response

class M2(MiddlewareMixin):
    def process_request(self, request):
        print('m2.process_request')

    def process_view(self, request, callback, callback_args, callback_kwargs):
        print('m2.process_view')

    def process_response(self, request, response):
        print('m2.process_response')
        return response

    def process_exception(self, request, exception):
        return HttpResponse('出现异常！')

    def process_template_response(self, request, response):
        print('m2.process_template_response')
        return response

"""
m1.process_request
m2.process_request
m1.process_view
m2.process_view
m2.process_template_response
m1.process_template_response
m2.process_response
m1.process_response
"""
```
process_template_response 方法的使用，可以帮助我们把一些可以复用的功能组件拆分出来，如 JSON 序列化：
```py
class Foo:
    def __init__(self, req, status, msg):
        self.req = req
        self.status = status
        self.msg = msg

    def render(self):
        import json
        ret = {
            'status': self.status,
            'msg': self.msg
        }
        return HttpResponse(json.dumps(ret))

def test(request):
    return Foo(request, True, '错误信息！')
```
在视图函数中打造功能，改造另外一个对象，让这个对象把我们的数据封装起来：
```py
class JsonResponse:
    """
    内部帮助我们序列化，
    """
    def __init__(self, req, status, msg):
        self.req = req
        self.status = status
        self.msg = msg

    def render(self):
        import json
        ret = {
            'status': self.status,
            'msg': self.msg
        }
        return HttpResponse(json.dumps(ret))


def test(request):
    return JsonResponse(request, True, '错误信息！')
```
<font>视图函数返回的对象且对象中有 render 方法才会执行 process_template_response方法。</font>
<hr>

##### 3. 中间件的应用
中间件可以对 <font>所有请求或一部分请求做批量处理</font>。使用缓存时，需要对 <font>所有请求进行判断</font>，缓存中如果有就把缓存中的数据返回，没有就执行视图函数。对所有的请求进行判断就需要使用到中间件。
<hr>
##### 4. 中间件解决跨域问题
由于浏览器同源策略的限制（同一主机不同端口之间），会产生客户端向服务端请求存在跨域的问题，如向服务端发送获取数据的请求，客户端：
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
</head>
<body>
<div id="app">
    <button @click="getUser">获取用户信息</button>
    <ul>
        <li v-for="(item,index) in users">{{item}}</li>
        <li v-for="(item,index) in users">{{item.id}}</li>
        <li v-for="(item,index) in users">{{item.name}}</li>
        <li v-for="(item,index) in users">{{item.register_date}}</li>
    </ul>
</div>
</body>
<script src="js/vue.js"></script>
<script src="js/axios.js"></script>
<script>
    new Vue({
        el: '#app',
        data: {
            apiDomain: 'http://localhost:8000/api/v1',
            users: []
        },
        methods: {
            getUser() {
                let self = this
                axios.get(`${this.apiDomain}/user/`).then(function (response) {
                    self.users = response.data.data
                    console.log(response)
                }).catch(function (error) {
                    console.log(error)
                })
            }
        }
    });
</script>
</html>
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200621214743591.png)

服务端：
```py
from rest_framework import views, serializers, response
from .. import models

class UserSerializer(serializers.ModelSerializer):
    name = serializers.CharField(max_length=5, error_messages={'max_length': '字段太长！'})
    register_date = serializers.DateTimeField(format='%Y-%m-%d %X')

    class Meta:
        model = models.User
        fields = ('name', 'register_date', 'id')

class User(views.APIView):
    def get(self, request):
        qs = models.User.objects.all().first()
        serializer = UserSerializer(qs, many=False)
        return response.Response({
            'status': 0,
            'data': serializer.data
        })
```
当点击获取数据的按钮后，报错：

![在这里插入图片描述](https://img-blog.csdnimg.cn/2020062121491146.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RoYW5sb24=,size_16,color_FFFFFF,t_70)

这时候可以在 Django 中写中间件，通过修改 <font>response 的属性允许这个域的请求</font> 来解决：
```py
from django.utils.deprecation import MiddlewareMixin

class M1(MiddlewareMixin):
    def process_response(self, request, response):
        response['Access-Control-Allow-Origin'] = '*'
        return response
```
记得需要在配置文件中配置这个中间件：
```py
MIDDLEWARE = [
	...
    'app.middle.M1'
]
```
这个时候就可以成功获取数据：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200621223508390.png)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200621221349584.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RoYW5sb24=,size_16,color_FFFFFF,t_70)
再看下提交数据的请求：
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
</head>
<body>
<div id="app">
    <button @click="getUser">获取用户信息</button>
    <button @click="createUser">创建用户信息</button>
    <ul>
        <li v-for="(item,index) in users">{{item}}</li>
        <li v-for="(item,index) in users">{{item.id}}</li>
        <li v-for="(item,index) in users">{{item.name}}</li>
        <li v-for="(item,index) in users">{{item.register_date}}</li>
    </ul>
</div>
</body>
<script src="js/vue.js"></script>
<script src="js/axios.js"></script>
<script>
    new Vue({
        el: '#app',
        data: {
            apiDomain: 'http://localhost:8000/api/v1',
            users: []
        },
        methods: {
            getUser() {
                let self = this
                axios.get(`${this.apiDomain}/user/`).then(function (response) {
                    self.users = response.data.data
                    console.log(response)
                }).catch(function (error) {
                    console.log(error)
                })
            },
            createUser() {
                let self = this
                axios.post(`${this.apiDomain}/user/`, {"name": 'Thanlon'}).then(function (response) {
                    console.log(response)
                }).catch(function (error) {
                    console.log(error)
                })
            }
        }
    });
</script>
</html>
```
发送 POST 请求提交数据的时候，客户端报错竟然也报跨域问题。根据报错提示，这是不允许请求头引起的，所以需要配置允许的请求头 Access-Control-Allow-Headers：

![在这里插入图片描述](https://img-blog.csdnimg.cn/2020062122424084.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RoYW5sb24=,size_16,color_FFFFFF,t_70)

并且服务端报错：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200621224306606.png)
这是因为一般跨域会出现预检请求，浏览器会认为这是一次复杂的请求，会先发一个请求做预检。预检请求响应的状态是 200 的时候才会发真正的请求。所以，还需要在 <font>中间件中设置允许的方法</font>：
```py
from django.utils.deprecation import MiddlewareMixin

class M1(MiddlewareMixin):
    def process_response(self, request, response):
    	# 允许请求的域
        response['Access-Control-Allow-Origin'] = '*'
        # 允许请求的请求头
        response['Access-Control-Allow-Headers'] = '*'
        # 允许请求的方法，适用*是允许所有，还可以指定。需要用都好隔开,例如'OPTIONS,GET,POST',实测发现这里不需要也是可以的
        # response['Access-Control-Allow-Methods'] = 'OPTIONS'
        return response
```
<hr>

#### Django的Form组件
<hr>

##### 1. Form组件的功能
对用户提交表单数据进行校验、保留上次输入内容。
<hr>

##### 2. 数据校验
Form组件对Form表单的方式提交的数据进行校验：

**`login.html:`**
```py
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>登录</title>
    <link rel="stylesheet" href="/static/css/bootstrap.min.css">
</head>
<body>
<div class="container" style="margin-top: 10px">
    <div class="row">
        <div class="col-md-4 col-md-offset-4">
            <div class="panel panel-primary">
                <div class="panel-heading">
                    登录
                </div>
                <div class="panel-body">
                    <form action="/login.html/" method="POST" name="loginForm">
                        <div class="form-group">
                            <label for="name">用户名</label>
                            <input type="text" class="form-control" name="name" placeholder="请输入用户名">
                            <div style="color: red;font-weight: bold">{{ obj.errors.name.0 }}</div>
                        </div>
                        <div class="form-group">
                            <label for="">密码</label>
                            <input type="password" class="form-control" name="pwd" placeholder="请输入密码">
                            <div style="color: red;font-weight: bold">{{ obj.errors.pwd.0 }}</div>
                        </div>
                        {% csrf_token %}
                        <button type="submit" class="btn btn-primary">登录</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
</body>
</html>
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200622102003133.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RoYW5sb24=,size_16,color_FFFFFF,t_70)
```py
class LoginForm(Form):
    name = fields.CharField(
        required=True,
        min_length=6,
        max_length=20,
        error_messages={
            'required': '用户名不能为空！',
            'min_length': '用户名长度不能小于6！',
            'max_length': '用户名长度不能大于20！'
        }
    )
    pwd = fields.CharField(
        required=True,
        min_length=6,
        max_length=20,
        error_messages={
            'required': '密码不能为空！',
            'min_length': '密码长度不能小于6！',
            'max_length': '密码长度不能大于20！'
        }
    )
    
def login(request):
    if request.method == 'GET':
        return render(request, 'login.html')
    else:
        obj = LoginForm(request.POST)
        """
        1、LoginForm实例化时
        self.field={'name':正则表达式,'pwd':正则表达式}
        2、循环self.field
        for k,v in self.field.items():
            input_value = request.POST.get(k)
            正则表达式和input_value进行匹配
        """
        if obj.is_valid():
            # 校验通过的数据
            print(obj.cleaned_data)
        else:
        	print(obj.errors, type(obj.errors))  # <class 'django.forms.utils.ErrorDict'>
            """
            <ul class="errorlist">
                <li>name
                    <ul class="errorlist">
                        <li>用户名不能为空</li>
                    </ul>
                </li>
                <li>pwd
                    <ul class="errorlist">
                        <li>用户名不能为空</li>
                    </ul>
                </li>
            </ul>
            """
        return render(request, 'login.html', {'obj': obj})
```
上面是 Form 组件校验以 Form 表单的方式的提交数据，下面是以 AJAX 的方式提交数据：

**`login.html:`**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>登录</title>
    <link rel="stylesheet" href="../static/css/bootstrap.min.css">
</head>
<body>
<div class="container" style="margin-top: 10px">
    <div class="row">
        <div class="col-md-4 col-md-offset-4">
            <div class="panel panel-primary">
                <div class="panel-heading">
                    登录
                </div>
                <div class="panel-body">
                    <form id="form" action="" method="POST" name="loginForm" novalidate>
                        <div class="form-group">
                            <label for="name">用户名</label>
                            <input type="text" class="form-control" name="name" placeholder="请输入用户名">
                            <div style="color: red;font-weight: bold">{{ obj.errors.name.0 }}</div>
                        </div>
                        <div class="form-group">
                            <label for="">密码</label>
                            <input type="password" class="form-control" name="pwd" placeholder="请输入密码">
                            <div style="color: red;font-weight: bold">{{ obj.errors.pwd.0 }}</div>
                        </div>
                        <div class="form-group">
                            <label for="">邮箱</label>
                            <input type="email" class="form-control" name="email" placeholder="请输入密码">
                            <div style="color: red;font-weight: bold">{{ obj.errors.email.0 }}</div>
                        </div>
                        <div class="form-group">
                            <label for="">手机号</label>
                            <input type="text" class="form-control" name="phone" placeholder="请输入密码">
                            <div style="color: red;font-weight: bold">{{ obj.errors.phone.0 }}</div>
                        </div>
                        {% csrf_token %}
                        <button id="loginBtn" type="button" class="btn btn-primary">登录</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
</body>
<script src="../static/js/jquery-3.5.1.min.js"></script>
<script>
    $(function () {
        ajaxLogin();
    })

    function ajaxLogin() {
        $('#loginBtn').click(function () {
            var formData = $('#form').serialize();//会忽略字段左右的空格
            console.log(formData)//name=thanlon&pwd=123456&email=thanlon@sina.com&phone=18523332005&csrfmiddlewaretoken=xxx
            $.ajax({
                url: '/login.html/',
                type: 'post',
                data: formData,
                dataType: 'json',
                success: function (arg) {
                    console.log(arg);//{"status": 0, "msg": null}
                    if (arg.status) {
                        //location.href = 'https://www.baidu.com'
                    } else {
                        //清除之前的错误提示信息
                        $('.clearTag').remove();
                        console.log(arg.msg)//对象类型
                        $.each(arg.msg, function (index, value) {
                            /**
                             * alert(index);//错误字段，pwd
                             * alert(value);//错误消息,如This field is required.
                             * alert(typeof (index)) //string
                             * alert(typeof (value))//object
                             * alert(value[0])
                             */
                            var tag = document.createElement('span');
                            tag.innerHTML = value[0];
                            tag.className = 'clearTag';
                            $('#form').find('input[name="' + index + '"]').after(tag);
                        })
                    }
                }
            })
        })
    }
</script>
</html>
```
**`views.py:`**
```py
from django.forms import Form, fields
from django.shortcuts import render, HttpResponse
from app01 import models
import json

class LoginForm(Form):
    name = fields.CharField()
    pwd = fields.CharField()
    email = fields.EmailField()
    phone = fields.RegexField('185\d+')

def ajax_login(request):
    if request.method=='GET':
        return render(request,'login.html')
    ret = {'status': True, 'msg': None}
    print(type(json.dumps(ret)))  # <class 'str'>
    obj = LoginForm(request.POST)
    if obj.is_valid():
        print(obj.cleaned_data)#{'name': 'thanlon', 'pwd': '123456', 'email': 'thanlon@sina.com', 'phone': '18523332005'}
    else:
        print(obj.errors)  # obj.errors是对象
        ret['status'] = False
        ret['msg'] = obj.errors
    return HttpResponse(json.dumps(ret))  # <class 'str'>
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200622164034109.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RoYW5sb24=,size_16,color_FFFFFF,t_70)

<font>AJAX 仅用来验证功能，Form 可以验证功能也可以生成 HTML 标签</font>。
<hr>

##### 3. 常用字段和参数
```py
Field：
	required = True,  # 是否允许为空
	label = None,  # 用于生成Label标签
	initial = None,  # 初始值
	help_text = '',  # 帮助信息（在标签旁边显示）
	error_messages = {},  # 错误信息{'invalid':'格式错误'}
	show_hidden_initial = None,  # 是否在当前插件后面再加上一个隐藏的且具有默认值的插件（可用于检验两次输入是否一致）
	validators = [],  # 自定义验证规则
	localize = False,  # 是否支持本地化
	disabled = False,  # 是否可以编辑
	label_suffix = None,  # Label内容后缀
	widget = None,  # HTML插件
```
CharField 类和 IntegerField 类都继承 Field 类，但是除了具有 Field 中的所有属性之外还有其它属性：
```py
CharField(Field)：
    min_length = None,
    max_length = None,
    strip = True,  # 是否移除空白
    
IntegerField(Field):
	min_length = None,
    max_length = None,

DecimalField(IntegerField):
    max_value=None,  # 最大值
    min_value=None,  # 最小值
    max_digits=None,  # 总长度
 
BaseTemporalField(Field)
	input_formats=None,  # 时间格式化

BaseTemporalField(Field)
	input_formats=None,  # 时间格式化

DateField(BaseTemporalField): # 格式：2020-10-12
TimeField(BaseTemporalField): # 格式：12:50
DateTimeField(BaseTemporalField): # 格式：2020-10-12 12:50

DurationField(Field): # 时间间隔：%d %H:%M:%S.%f

RegexField(CharField):
	regex='185\d+',
	max_length=None,
    min_length=None,
    error_messages={}

EmailField(CharField)
URLField(CharField)
SlugField(CharField)
GenericIPAddressField(CharField)
```
<hr>

##### 4. 保留上次输入内容

Form 表单的方式提交数据，页面会刷新会失去提交的内容。AJAX 方式提交时页面不刷新，上次输入内容自动保存。使用 Form 表单提交数据保存上次输入的内容也是可以实现的，需要应用到 Form 组件提供的第二个功能生成HTML标签。只需要在 input 框中加入验证通过的数据 **`obj.cleaned_data`**：

**`views.py:`**
```py
class LoginForm(Form):
    name = fields.CharField(
        label='用户名',
    )
    pwd = fields.CharField(
        label='密码',
    )
    email = fields.EmailField(
        label='邮箱'
    )
    phone = fields.RegexField(
        label='手机号',
        regex='185\d+',
    )

def ajax_login(request):
    if request.method == 'GET':
        obj = LoginForm()
        return render(request, 'login.html',{'obj': obj})
    else:
        obj = LoginForm(request.POST)
        if obj.is_valid():
            print(obj.cleaned_data)
        else:
            print(obj.errors)
        return render(request, 'login.html', {'obj': obj})
```
**`login.html:`**
```html
...
<form id="form" action="" method="POST" name="loginForm" novalidate>
	<!--{{ obj.as_p }}-->
    <div class="form-group">
        {{ obj.name.label }}
        <input type="text" class="form-control" name="name" placeholder="请输入用户名" value="{{ obj.cleaned_data.name }}">
        <div style="color: red;font-weight: bold">{{ obj.errors.name.0 }}</div>
    </div>
    <div class="form-group">
        {{ obj.pwd.label }}
        <input type="password" class="form-control" name="pwd" placeholder="请输入密码" value="{{ obj.cleaned_data.pwd }}">
        <div style="color: red;font-weight: bold">{{ obj.errors.pwd.0 }}</div>
    </div>
    <div class="form-group">
        {{ obj.email.label }}
        <input type="email" class="form-control" name="email" placeholder="请输入邮箱" value="{{ obj.cleaned_data.email }}">
        <div style="color: red;font-weight: bold">{{ obj.errors.email.0 }}</div>
    </div>
    <div class="form-group">
        {{ obj.phone.label }}
        <input type="text" class="form-control" name="phone" placeholder="请输入手机号" value="{{ obj.cleaned_data.phone }}">
        <div style="color: red;font-weight: bold">{{ obj.errors.phone.0 }}</div>
    </div>
    {% csrf_token %}
    <button id="loginBtn" type="submit" class="btn btn-primary">登录</button>
</form>
...
```
上一次验证通过的数据才会被保存：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200622173852651.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RoYW5sb24=,size_16,color_FFFFFF,t_70)
<hr>

#### Django信号
<hr>

##### 1. Django信号使用场景
对 Django 数据库中的某张表做增加、删除、修改之前记录一条日志可以使用 Django 中的信号，Django 中的信号是 <font>Django 框架内部帮助开发者预留的可自定义扩展的位置</font>。Flask 和 Scrapy 框架也有信号。
<hr>

##### 2. Django内置信号
Model signals：
```py
pre_init                    # django的modal执行其构造方法前，自动触发
post_init                   # django的modal执行其构造方法后，自动触发
pre_save                    # django的modal对象保存前，自动触发
post_save                   # django的modal对象保存后，自动触发
pre_delete                  # django的modal对象删除前，自动触发
post_delete                 # django的modal对象删除后，自动触发
m2m_changed                 # django的modal中使用m2m字段操作第三张表（add,remove,clear）前后，自动触发
class_prepared              # 程序启动时，检测已注册的app中modal类，对于每一个类，自动触发
```
Management signals：
```py
pre_migrate                 # 执行migrate命令前，自动触发
post_migrate                # 执行migrate命令后，自动触发
```
Request/response signals：
```py
request_started             # 请求到来前，自动触发
request_finished            # 请求结束后，自动触发
got_request_exception       # 请求异常后，自动触发
```
Test signals：
```py
setting_changed             # 使用test测试修改配置文件时，自动触发
    template_rendered           # 使用test测试渲染模板时，自动触发
```
Database Wrappers：
```py
connection_created          # 创建数据库连接时，自动触发
```
<hr>

##### 3. Django信号简单示例
**`models.py:`**
```py
from django.db import models

# Create your models here.
class User(models.Model):
    name = models.CharField(max_length=32)
```
**`urls.py:`**
```py
from django.urls import path
from app import views

urlpatterns = [
    # path('admin/', admin.site.urls),
    path('func1/', views.func1),
    path('func2/', views.func2),
    path('func3/', views.func3),
    path('func4/', views.func4),
]
```
**`views.py:`**
```py
from django.shortcuts import render, HttpResponse
from app.models import User

# Create your views here.
def func1(request):
    """
    不会触发保存数据之前的操作（没有保存数据操作）
    :param request:
    :return:
    """
    return HttpResponse('创建成功！')

def func2(request):
    """
    会触发保存数据之前的操作
    :param request:
    :return:
    """
    User.objects.create(name='liki')
    return HttpResponse('创建成功！')

def func3(request):
    User.objects.create(name='thanlon')
    return HttpResponse('创建成功！')

def func4(request):
    User.objects.create(name='kiku')
    return HttpResponse('创建成功！')
```
**`__init__.py:`**
```py
from django.db.models import signals


def before_save(*args, **kwargs):
    """
    增加之前
    :param args:
    :param kwargs:
    :return:
    """
    print(args)  # ()
    print(kwargs)


"""
{
    'signal': <django.db.models.signals.ModelSignal object at 0x7fb2c41964c0>,
    'sender': <class 'app.models.User'>,
    'instance': <User: User object (None)>,
    'raw': False,
    'using': 'default',
    'update_fields': None
}
"""


def after_save(*args, **kwargs):
    """
    增加之后
    :param args:
    :param kwargs:
    :return:
    """
    print(args)  # ()
    print(kwargs)
    """
    {
    'signal': <django.db.models.signals.ModelSignal object at 0x7f3196b96400>, 
    'sender': <class 'app.models.User'>, 
    'instance': <User: User object (10)>, 
    'created': True, 
    'update_fields': None, 
    'raw': False, 
    'using': 'default'
    }
    """


signals.pre_save.connect(before_save)
signals.post_save.connect(after_save)
"""
Model signals
    pre_init                    # django的modal执行其构造方法前，自动触发
    post_init                   # django的modal执行其构造方法后，自动触发
    pre_save                    # django的modal对象保存前，自动触发
    post_save                   # django的modal对象保存后，自动触发
    pre_delete                  # django的modal对象删除前，自动触发
    post_delete                 # django的modal对象删除后，自动触发
    m2m_changed                 # django的modal中使用m2m字段操作第三张表（add,remove,clear）前后，自动触发
    class_prepared              # 程序启动时，检测已注册的app中modal类，对于每一个类，自动触发
Management signals
    pre_migrate                 # 执行migrate命令前，自动触发
    post_migrate                # 执行migrate命令后，自动触发
Request/response signals
    request_started             # 请求到来前，自动触发
    request_finished            # 请求结束后，自动触发
    got_request_exception       # 请求异常后，自动触发
Test signals
    setting_changed             # 使用test测试修改配置文件时，自动触发
    template_rendered           # 使用test测试渲染模板时，自动触发
Database Wrappers
    connection_created          # 创建数据库连接时，自动触发
"""
```
<hr>

#### Django的contenttype组件
<hr>

##### 1. contenttype组件作用
1） contenttype 组件帮助我们 <font>生成了所有关联数据库的表</font>，使用 ForeignKey 与 contenttyp e表直接关联就可以

2）在模型类中使用 GenericForeignKey 可以帮助我们 <font>快速插入数据</font>，实现 content_typ e操作

3）在模型类中使用 GenericRelation 可以实现 <font>快速查找</font>，不用自己去连表
<hr>

##### 2. contenttype组件示例
有这样的业务场景，课程分为普通课程和 VIP 课程，需要为这两种课程设置价值策略。在价格策略表中需要记录两种课程的课程 ID，为了区分是哪个表的课程ID，还需要记录表名称。表设计如下：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200802103218703.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RoYW5sb24=,size_16,color_FFFFFF,t_70)

创建表，**`models.py:`**
```py
from django.db import models
from django.contrib.contenttypes.models import ContentType

# Create your models here.
class Course(models.Model):
    """
    普通课程
    """
    name = models.CharField(max_length=32, help_text='课程的名称')

class VipCourse(models.Model):
    """
    VIP普通课程
    """
    name = models.CharField(max_length=32, help_text='Vip课程的名称')

class PricePolicy(models.Model):
    """
    价格策略
    """
    price = models.FloatField(help_text='价格')
    period = models.IntegerField(help_text='时间周期')
    # table_name = models.CharField(verbose_name='关联的表名称')
    # course_id = models.IntegerField(verbose_name='关联的表中的数据行的ID，即课程ID')
    table_name = models.ForeignKey(ContentType, verbose_name='关联的表名称')  # ContentType表中有表名称字段
    course_id = models.IntegerField(verbose_name='关联的表中的数据行的ID，即课程ID')
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200802121819727.png)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200802121921982.png)

在 models.py 中设置的价格策略的字段 table_name 在生成表的时候变成了 table_name_id，下面将使用 content_type 来替换 table_name，这样生成表的字段就是 content_type_id，这将更方便我们知道该字段关联 content_type 表。

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200802121928937.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RoYW5sb24=,size_16,color_FFFFFF,t_70)

我们用 <font>常规的方式</font> 在 **`views.py`** 中为课程添加价格策略，

**`urls.py:`**
```py
from django.urls import path
from app import views

urlpatterns = [
    # path('admin/', admin.site.urls),
    path('test/', views.test)
]
```
**`views.py:`**
```py
from django.shortcuts import render, HttpResponse

from app import models


# Create your views here.
def test(request):
    """
    # 添加之前向两个课程表中添加数据
    models.Course.objects.create(name='Python')
    models.Course.objects.create(name='Flask')
    models.Course.objects.create(name='Django')
    models.VipCourse.objects.create(name='DRF')
    models.VipCourse.objects.create(name='VUE')
    models.VipCourse.objects.create(name='Scrapy')
    """
    """
    添加一条普通课程为“Python”价格为99.9，学习周期为3个月的价格策略记录(首先还要查询相关字段的值)
    """
    course_obj = models.Course.objects.filter(name='Python').first()
    print(course_obj)  # Course object (1)
    # 首先需要获取根据课程的名称获取课程的id
    course_id = course_obj.id
    # 然后还要获取content_type表中course表对应的id
    content_type_obj = models.ContentType.objects.filter(model='course').first()
    content_type_id = content_type_obj.id
    models.PricePolicy.objects.create(price=99.9, period=3, course_id=course_id, content_type_id=content_type_id)
    return HttpResponse('...')
```
这样就成功创建策略：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200802125559876.png)

1）这样为课程添加价格策略未免有些麻烦，<font>借助contenttype组件可以帮助我们快速实现content_type操作。</font>修改 **`models.py`**：
```py
...
from django.contrib.contenttypes.fields import GenericForeignKey
...
class PricePolicy(models.Model):
    """
    价格策略
    """
    price = models.FloatField(help_text='价格')
    period = models.IntegerField(help_text='时间周期')
    content_type = models.ForeignKey(ContentType, verbose_name='关联的表名称',
                                     on_delete=models.CASCADE)  # ContentType表中有表名称字段
    course_id = models.IntegerField(verbose_name='关联的表中的数据行的ID，即课程ID')
    content_object = GenericForeignKey('content_type', 'course_id')

```
因此添加策略的时候可以这样：
```py
from django.shortcuts import render, HttpResponse

from app import models


# Create your views here.
def test(request):
    """
    # 添加之前向两个课程表中添加数据
    models.Course.objects.create(name='Python')
    models.Course.objects.create(name='Flask')
    models.Course.objects.create(name='Django')
    models.VipCourse.objects.create(name='DRF')
    models.VipCourse.objects.create(name='VUE')
    models.VipCourse.objects.create(name='Scrapy')
    """
    """
    # 添加一条普通课程为“Python”价格为99.9，学习周期为3个月的价格策略记录(首先还要查询相关字段的值)
    course_obj = models.Course.objects.filter(name='Python').first()
    print(course_obj)  # Course object (1)
    # 首先需要获取根据课程的名称获取课程的id
    course_id = course_obj.id
    # 然后还要获取content_type表中course表对应的id
    content_type_obj = models.ContentType.objects.filter(model='course').first()
    content_type_id = content_type_obj.id
    models.PricePolicy.objects.create(price=99.9, period=3, course_id=course_id, content_type_id=content_type_id)
    """
    """
    1.借助content_type快速实现数据插入(content_type)操作
    """
    course_obj = models.Course.objects.filter(name='Python').first()
    models.PricePolicy.objects.create(price=99.9, period=3, content_object=course_obj)
    return HttpResponse('...')
```
只需要两行代码即可以，不需要查课程的 ID 和课程对应 content_type 表中的 ID。表中成功插入一条课程策略记录：

![在这里插入图片描述](https://img-blog.csdnimg.cn/2020080213155559.png)

2）根据课程 ID 获取该课程所有的价格策略，这里可以使用 contenttype 组件中的 GenericRelation 来实现反向查找，需要修改 **`models.py:`**
```py
from django.db import models
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericForeignKey, GenericRelation


# Create your models here.
class Course(models.Model):
    """
    普通课程
    """
    name = models.CharField(max_length=32, help_text='课程的名称')
    # 仅仅用于反向查找（无须修改表结构）
    price_policy_list = GenericRelation('PricePolicy')


class VipCourse(models.Model):
    """
    VIP普通课程
    """
    name = models.CharField(max_length=32, help_text='Vip课程的名称')
    # 仅仅用于反向查找（无须修改表结构）
    price_policy_list = GenericRelation('PricePolicy')


class PricePolicy(models.Model):
    """
    价格策略
    """
    price = models.FloatField(help_text='价格')
    period = models.IntegerField(help_text='时间周期')
    # table_name = models.CharField(verbose_name='关联的表名称')
    # course_id = models.IntegerField(verbose_name='关联的表中的数据行的ID，即课程ID')
    content_type = models.ForeignKey(ContentType, verbose_name='关联的表名称', on_delete=models.CASCADE)
    """
    课程的ID，要使用object_id，不要使用course_id，这是个坑
    """
    object_id = models.IntegerField(verbose_name='关联的表中的数据行的ID，即课程ID')
    # 仅仅用于快速操作content_type（无须修改表结构）
    content_object = GenericForeignKey('content_type', 'object_id')
```
**`views.py:`**
```py
from django.shortcuts import render, HttpResponse

from app import models


# Create your views here.
def test(request):
    """
    # 添加之前向两个课程表中添加数据
    models.Course.objects.create(name='Python')
    models.Course.objects.create(name='Flask')
    models.Course.objects.create(name='Django')
    models.VipCourse.objects.create(name='DRF')
    models.VipCourse.objects.create(name='VUE')
    models.VipCourse.objects.create(name='Scrapy')
    """
    """
    # 添加一条普通课程为“Python”价格为99.9，学习周期为3个月的价格策略记录(首先还要查询相关字段的值)
    course_obj = models.Course.objects.filter(name='Python').first()
    print(course_obj)  # Course object (1)
    # 首先需要获取根据课程的名称获取课程的id
    course_id = course_obj.id
    # 然后还要获取content_type表中course表对应的id
    content_type_obj = models.ContentType.objects.filter(model='course').first()
    content_type_id = content_type_obj.id
    models.PricePolicy.objects.create(price=99.9, period=3, course_id=course_id, content_type_id=content_type_id)
    """
    """
    1. 借助content_type快速实现数据插入(content_type)操作
    1. 借助content_type快速实现数据插入(content_type)操作
    course_obj = models.Course.objects.filter(name='Python').first()
    models.PricePolicy.objects.create(price=99.9, period=3, content_object=course_obj)
    """
    """
    2. 根据课程ID获取该课程所有的价格策略(借助GenericRelation实现反向查找)
    """
    try:
        course_obj = models.Course.objects.filter(id=1).first()  # id=1是Python课程
        price_policy_list = course_obj.price_policy_list.all()
        print(
            price_policy_list)  # <QuerySet [<PricePolicy: PricePolicy object (1)>, <PricePolicy: PricePolicy object (2)>]>
        for i in price_policy_list:
            print(i)
        """
        PricePolicy object (1)
        PricePolicy object (2)
        """
    except Exception as e:
        print(
            e)  # Cannot resolve keyword 'object_id' into field. Choices are: content_object, content_type, content_type_id, course_id, id, period, price
    return HttpResponse('...')
```
<hr>

#### Django缓存
<hr>

##### 1. Django缓存
由于 Django 是动态网站，所以每次请求都会去数据库进行相应的操作。当程序访问量大时，耗时必然会更加明显，最简单解决方式是使用缓存。缓存将 views
的返回值保存至内存或者 Memcache、redis 等内存数据库中，几分钟内再有人访问时，则不再去执行 views 中的操作，直接获取缓存的内容，并返回。Django
提供了六种缓存方式：

( 1 ) 开发调试

( 2 ) 内存

( 3 ) 文件

( 4 ) 数据库

( 5 ) Memcache缓存 ( memcached 模块 )

( 6 ) Memcache缓存 ( pylibmc 模块)

<hr>

#### API接口开发
<hr>

##### 1. 模型的创建
创建模型用于测试，设计一张简单的数据表存放在 Pycharm 自带的 sqlite 数据库中：

**`models.py`**
```py
from django.db import models

# Create your models here.
class User(models.Model):
    name = models.CharField(max_length=12)
    register_date = models.DateTimeField(auto_now_add=True, null=True)  # 如果设置为自动设置时间，要添加可以为空，默认是不为空的
```
生成数据表：
```py
(DjangoAPI) thanlon@thanlon:~/PycharmProjects/DjangoAPI$ python manage.py makemigrations
(DjangoAPI) thanlon@thanlon:~/PycharmProjects/DjangoAPI$ python manage.py migrate
```
<hr>

##### 2. 路由系统的创建
添加和查询信息使用的路由是 **`user/`**，修改（更新）和删除信息使用路由是 **`user/<int:pk>/`**，路由创建如下：

**`urls.py：`**
```py
from django.contrib import admin
from django.urls import path
from app import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('user/', views.UserView.as_view()),
    path('user/<int:pk>/', views.UserDetail.as_view()),
]
```
<hr>

##### 3. 添加数据的接口
添加数据的业务逻辑：

**`views.py:`**
```py
class UserView(View):
    def post(self, request):
        """
        增加数据
        :param request:
        :return:
        """
        # request.POST中是没有数据的，需要在body中获取，但是需要先将bytes->符串->反序列化转化成列表对象
        form = UserForm(None, json.loads(request.body.decode()))
        if form.is_valid():
            instance = form.save()
            ret = {
                'status': 0,
                'data': instance.pk
            }
            return JsonResponse(ret)
        else:
            ret = {
                'status': 1,
                'data': form.errors
            }
            return JsonResponse(ret)
```
数据验证：

**`user_form.py:`**
```py
from django import forms
from .. import models

class UserForm(forms.Form):
    name = forms.CharField(max_length=10)

    def __init__(self, instence=None, *args, **kwargs):  # 函数传参不要使用可变类型
        self.instence = instence
        super(UserForm, self).__init__(*args, **kwargs)  # 原封不动传过去，这样就可以多传递一个值

    def save(self):
        if self.instence:
            # 通过反射设置新值,不能直接self.instence.name='thanlon'
            # print(self.cleaned_data)
            for k, v in self.cleaned_data.items():
                setattr(self.instence, k, v)
            self.instence.save()
            return self.instence # 更新instence
            # 如果没有数据。校验通过的数据全部放在cleaned_data中，key value组成的字典:{'name': 'thanlon'}
        return models.User.objects.create(**self.cleaned_data)
```
添加和修改数据，因为需要有数据传入后台，所以需要对数据进行验证。查询所有数据因为不传入后台任何数据，也无须验证。查询单条数据和删除数据需要进行验证，但不是Form验证，使用路由匹配进行验证！

Postman 向后台发送添加数据的 POST 请求，<font>返回的状态码是0</font>，说明添加成功：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200619220039200.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RoYW5sb24=,size_16,color_FFFFFF,t_70)

验证数据库，已经添加完成：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200619220354492.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RoYW5sb24=,size_16,color_FFFFFF,t_70)
<hr>

##### 4. 获取所有数据的接口
获取所有数据的业务逻辑：
```py
class UserView(View):
    def get(self, request):
        """
        查询(所有数据)
        :param request:
        :return:
        """
        query_set = models.User.objects.values('name')  # <QuerySet [{'name': 'Erics'}]>
        ret = {
            'status': 0,
            'data': list(query_set)  # 转换成列表,[{'name': 'Erics'}]
        }
        return JsonResponse(ret)
```

Postman 向后台发送获取所有数据的 GET 请求，<font>返回的状态码是0</font>，说明查询数据成功：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200619220847519.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RoYW5sb24=,size_16,color_FFFFFF,t_70)
<hr>

##### 5. 获取单条数据的接口
获取单条数据的业务逻辑，走的路由是 **`/user/<int:pk>/`**：

**`views.py:`**
```py
class UserDetail(View):
    def get(self, request, pk):
        """
        查询单条数据
        :param request:
        :param pk:
        :return:
        """
        # instence = models.User.objects.filter(pk=pk)
        # print(instence)  # <QuerySet [<User: User object (1)>]>
        instence = models.User.objects.filter(pk=pk).first()
        print(instence)  # User object (1)
        ret = {
            'status': 0,
            'data': {
                'name': instence.name
            }
        }
        return JsonResponse(ret)
```

Postman 向后台发送查询单条数据的GET请求，<font>返回的状态码是0</font>，说明添加成功：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200619221220532.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RoYW5sb24=,size_16,color_FFFFFF,t_70)
<hr>

##### 6. 更新数据的接口
更新数据的业务逻辑：
```py
class UserDetail(View):
    def put(self, request, pk):
        """
        修改数据。restful规定更新数据，用put或者patch，put用得多一些
        :param request:
        :return:
        """
        instence = models.User.objects.filter(pk=pk).first()
        if not instence:
            ret = {
                'status': 1,
                'data': {
                    'name': '数据不存在'
                }
            }
            return JsonResponse(ret)
        # 借助form来修改(form中有新数据),降低了耦合度
        form = UserForm(instence, json.loads(request.body.decode()))
        if form.is_valid():
            instence = form.save()  # instence不更新也是可以的，还是查找到的和要修改的id是一样的
            ret = {
                'status': 0,
                'data': instence.pk
            }
            return JsonResponse(ret)
        else:
            ret = {
                'status': 1,
                'data': form.errors
            }
            return JsonResponse(ret)
```
数据的验证：

**`user_form.py:`**
```py
from django import forms
from .. import models

class UserForm(forms.Form):
    name = forms.CharField(max_length=10)

    def __init__(self, instence=None, *args, **kwargs):  # 函数传参不要使用可变类型
        self.instence = instence
        super(UserForm, self).__init__(*args, **kwargs)  # 原封不动传过去，这样就可以多传递一个值

    def save(self):
        if self.instence:
            # 通过反射设置新值,不能直接self.instence.name='thanlon'
            # print(self.cleaned_data)
            for k, v in self.cleaned_data.items():
                setattr(self.instence, k, v)
            self.instence.save()
            return self.instence # 更新instence
            # 如果没有数据。校验通过的数据全部放在cleaned_data中，key value组成的字典:{'name': 'thanlon'}
        return models.User.objects.create(**self.cleaned_data)
```
Postman 向后台发送更新数据的PUT请求，<font>返回的状态码是0</font>，说明修改成功：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200619223522714.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RoYW5sb24=,size_16,color_FFFFFF,t_70)
<hr>

##### 7. 删除数据的接口
删除数据的业务逻辑：

**`views.py:`**
```py
class UserDetail(View):
    def delete(self, request, pk):
        """
        删除数据(删除单条数据)
        :param request:
        :param pk:
        :return:
        """
        models.User.objects.filter(pk=pk).delete()
        ret = {
            'status': 0,
            'data': []
        }
        return JsonResponse(ret)
```
**`user_form.py:`**
```py
class UserForm(forms.Form):
    name = forms.CharField(max_length=10)

    def __init__(self, instence=None, *args, **kwargs):  # 函数传参不要使用可变类型
        self.instence = instence
        super(UserForm, self).__init__(*args, **kwargs)  # 原封不动传过去，这样就可以多传递一个值

    def save(self):
        if self.instence:
            # 通过反射设置新值,不能直接self.instence.name='thanlon'
            # print(self.cleaned_data)
            for k, v in self.cleaned_data.items():
                setattr(self.instence, k, v)
            self.instence.save()
            return self.instence # 更新instence
            # 如果没有数据。校验通过的数据全部放在cleaned_data中，key value组成的字典:{'name': 'thanlon'}
        return models.User.objects.create(**self.cleaned_data)
```
Postman 向后台发送添加数据的 <font>DELETE请求</font>，返回的状态码是0，说明删除成功：

![在这里插入图片描述](https://img-blog.csdnimg.cn/2020061922383547.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RoYW5sb24=,size_16,color_FFFFFF,t_70)


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
<div style="width: auto;height: auto;z-index: 99;position: fixed;right: 0;top: 70px;" id="google_ads">
        <div>
            <div style="width: 180px;height: auto"></div>
            <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
            <!-- Vertical -->
            <ins class="adsbygoogle"
                 style="display:block"
                 data-ad-client="ca-pub-6937898095875663"
                 data-ad-slot="2927491642"
                 data-ad-format="auto"
                 data-full-width-responsive="true"></ins>
            <script>
                 (adsbygoogle = window.adsbygoogle || []).push({});
            </script>
        </div>
</div>
<div style="width: auto;height: auto;z-index: 99;position: fixed;left: 0;top: 70px;" id="google_ads">
        <div>
            <div style="width: 180px;height: auto"></div>
            <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
            <!-- Vertical -->
            <ins class="adsbygoogle"
                 style="display:block"
                 data-ad-client="ca-pub-6937898095875663"
                 data-ad-slot="2927491642"
                 data-ad-format="auto"
                 data-full-width-responsive="true"></ins>
            <script>
                 (adsbygoogle = window.adsbygoogle || []).push({});
            </script>
        </div>
</div>
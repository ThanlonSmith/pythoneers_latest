![软件设计模式](../img/flask.jpeg)
#### 第一个Flask应用
<hr>

##### 1. Flask概述
Flask 框架是一个短小精悍且可扩展强的 Web 框架，同 Django 框架一样依赖于第三方实现 socket 模块。
><font>Flask 特有上下文管理机制！</font>

<hr>

##### 2. wsgi
WEB 服务网关接口，是一个协议。Flask 中实现该协议的模块有 **`wsgiref`** 和 **`werkzeug`**，模块本质上就是 socket服务端用于接收客户端的请求并处理。
><font>面试中可能会被问道 wsgi 是什么？</font>

<hr>

##### 3. 安装Flask
一般使用 pip 安装 Flask：**`pip install Flask`**，如果想加速下载，可以指定国内阿里云 pipy 的源，安装方法是：**`pip install flask -i https://mirrors.aliyun.com/pypi/simple`**
<hr>

##### 4. werkzurg
Flask 中实现 wsgi 的模块是 werkzurg，它是 Flask 第三方模块。
```py
from werkzeug.serving import run_simple

def run(environ, start_response):
    return 'Hello Flask!'
    
if __name__ == '__main__':
    run_simple('localhost', 5000, run)
```
```python
from werkzeug.wrappers import Request, Response
from werkzeug.serving import run_simple

@Request.application
def hello_flask(request):
    return Response('Hello Flask!')
    
if __name__ == '__main__':
    run_simple('localhost', 5000, hello_flask)
```
><font>Django中实现wsgi的模块是wsgiref</font>

<hr>

##### 5. 第一个Flask应用
```python
from flask import Flask

app = Flask(__name__)  # 实例化Flask类

@app.route('/index')
def index():
    return 'Hello Flask!'

if __name__ == '__main__':
    app.run()  # run方法启动socket
```
<hr>

##### 6. Flask配置文件
Flask 配置文件是一个 **`flask.config.Config`** 对象，它继承字典，默认配置文件如下：
```py
print(type(app.config), app.config)
"""
<class 'flask.config.Config'>
"""
```
```py
{
'ENV': 'production', 
'DEBUG': False, 
'TESTING': False, 
'PROPAGATE_EXCEPTIONS': None,
'PRESERVE_CONTEXT_ON_EXCEPTION': None, 
'SECRET_KEY': None, 
'PERMANENT_SESSION_LIFETIME': datetime.timedelta(days=31),
'USE_X_SENDFILE': False,
'SERVER_NAME': None, 'APPLICATION_ROOT': '/', 
'SESSION_COOKIE_NAME': 'session',
'SESSION_COOKIE_DOMAIN': None, 
'SESSION_COOKIE_PATH': None, 
'SESSION_COOKIE_HTTPONLY': True, 
'SESSION_COOKIE_SECURE': False, 
'SESSION_COOKIE_SAMESITE': None, 
'SESSION_REFRESH_EACH_REQUEST': True, 
'MAX_CONTENT_LENGTH': None, 
'SEND_FILE_MAX_AGE_DEFAULT': datetime.timedelta(seconds=43200), 'TRAP_BAD_REQUEST_ERRORS': None, 
'TRAP_HTTP_EXCEPTIONS': False, 
'EXPLAIN_TEMPLATE_LOADING': False, 
'PREFERRED_URL_SCHEME': 'http', 
'JSON_AS_ASCII': True, 
'JSON_SORT_KEYS': True, 
'JSONIFY_PRETTYPRINT_REGULAR': False, 
'JSONIFY_MIMETYPE': 'application/json', 
'TEMPLATES_AUTO_RELOAD': None, 
'MAX_COOKIE_SIZE': 4093}
```
修改默认配置文件，创建配置文件 **`settings.py`**，用于存放修改的配置文件：

**`settings.py`**：
```python
# 存放开发环境、线上环境、测试环境共有的配置文件
class Config(object):
    pass
    
# 线上环境配置文件
class ProductionConfig(Config):
    DEBUG = False
    
# 开发环境配置文件
class DevelopmentConfig(Config):
    DEBUG = True
    
# 测试环境配置文件
class TestingConfig(Config):
    DEBUG = True
```
**`app.py：`**

```python
from flask import Flask

app = Flask(__name__)
# print(type(app.config), app.config)
app.config.from_object('settings.DevelopmentConfig')  # 引入配置文件

if __name__ == '__main__':
    app.run()
```
<hr>

#### Flask路由系统
<hr>

##### 1. 反向生成URL
使用 <kbd>url_for()</kbd> 方法生成 **`url`**：
```python
@app.route('/index', methods=['GET', 'POST'], endpoint='name')
def index():
    print(url_for('name'))
    return 'Flask!'
```
使用 <kbd>url_for()</kbd> 方法生成 url 时设置参数：

```python
@app.route('/index/<int:id>')
def index(id):
    print(url_for('index', id=1))
    return 'Flask!'
"""
/index/1
"""
```
如果不指定 **`endpoint`** 的值，默认为函数名：
```py
def _endpoint_from_view_func(view_func):
    assert view_func is not None, 'expected view func if endpoint ' \
                                  'is not provided.'
    return view_func.__name__ # 返回函数名
def add_url_rule(self,rule,endpoint=None,view_func=None,provide_automatic_options=None, **options):
	if endpoint is None:
		endpoint = _endpoint_from_view_func(view_func)
    options['endpoint'] = endpoint
    methods = options.pop('methods', None)
```
```python
@app.route('/index', methods=['GET', 'POST'])
def index():
    print(url_for('index'))
    return 'Flask!'
```
><font>如果 endpoint 非要重名，必须保证函数相同。</font>

<hr>

##### 2. 动态路由的构造
```python
@app.route('/index/<username>') # 没有指定类型是字符串类型
@app.route('/index/<int:id>')
@app.route('/index/<float:id>') 
@app.route('/index/<path:path>') 
```
示例：
```python
@app.route('/index/<float:id>') 
def index(id):
    print(type(id),id)
    return 'Flask!'
```
```py
浏览器输入：http://127.0.0.1:5000/index/1.0
控制台输出：<class 'float'> 1.0
```
<hr>

#### Flask请求与响应相关数据
<hr>

##### 1. 请求相关数据
常用请求的相关信息：
```py
request.method
request.args
request.form
request.cookies
request.headers
```
其它请求的相关信息：
```py
request.values
request.path
request.full_path
request.script_root
request.url
request.base_url
request.url_root
request.host_url
request.host
request.files
obj = request.files['the_file_name']
obj.save('/uploads/'+secure_filename(f.filename))
```
<hr>

##### 2. 响应响应体
响应字符串：
```python
@app.route('/index')
def index():
    return 'Flask'  # 字符串
```
响应模板：
```python
@app.route('/index')
def index():
	return render_template() # 模板
```
响应重定向：
```python
@app.route('/index')
def index():
	return redirect('') # 重定向
```
响应 json 格式数据 [**`from flask import json`**]：
```python
@app.route('/index')
def index():
    return json.dumps({'name': 'thanlon'})  # {'name': 'thanlon'}
```
另一种响应 json 格式数据的方式 [**`from flask import jsonify`**]：
```python
@app.route('/index')
def index():
    return jsonify({'name': 'thanlon'}) # {'name': 'thanlon'}
```
<hr>

##### 3. 响应响应头
以上是响应响应体，还可以响应响应头和 cookie，只需要从 Flask 模块中导入 make_response 进行封装即可。(**`from flask import make_response`**）

将字符串类型的响应体与响应头和 cookie 一同封装响应：
```py
@app.route('/index')
def index():
    obj = make_response('Flask')
    obj.headers['response_flag'] = 'response_info'
    obj.set_cookie('key','value')
    return obj
```
响应模板、响应重定向、响应json格式数据和示例就一样的。
<hr>

#### Flask用户认证
<hr>

##### 1. 第一种用户认证
**`settings.py`**：
```python
# 存放开发环境、线上环境、测试环境共有的配置文件
class Config(object):
    DEBUG = False
    SECRET_KEY = 'thanlon'
```
**`app.py`**：
```python
from flask import Flask, render_template, redirect, url_for, request, session

app = Flask(__name__)
app.config.from_object('settings.DevelopmentConfig')  # 引入配置文件

USER_DICT = {
    1: {'username': 'thanlon', 'age': '23', 'gender': '男'},
    2: {'username': 'kiku', 'age': '25', 'gender': '女'}
}
@app.route('/login', methods=['GET', 'POST'])  # 默认允许GET请求
def login():
    if request.method == 'GET':
        return render_template('login.html')
    username = request.form.get('username')
    pwd = request.form.get('pwd')
    if username == 'Thanlon' and pwd == '123':
        session['username'] = username  # 默认session保存在签名或加密的cookie中
        return redirect('/index')
    # return render_template('login.html', error='用户名或者密码错误！')
    return render_template('login.html', **{'error': '用户名或者密码错误！'})

@app.route('/index')
def hello_world():
    if not session.get('username'):
        return redirect(url_for('login'))
    return render_template('index.html', user_dict=USER_DICT)

@app.route('/delete/<int:nid>')
def delete(nid):
    if not session.get('username'):
        return redirect(url_for('login'))
    del USER_DICT[nid]
    return redirect(url_for('hello_world'))  # url_for('')写函数名,和路由无关

@app.route('/detail/<int:nid>')
def detail(nid):
    if not session.get('username'):
        return redirect(url_for('login'))
    info = USER_DICT[nid]
    return render_template('detail.html', info=info)

if __name__ == '__main__':
    app.run()
```
**`index.html`**：
```html
……
<div class="container">
    <div class="row">
        <div class="col-md-4">
            <table class="table table-hover">
                <tr>
                    <th style="text-align: center">ID</th>
                    <th style="text-align: center">用户名</th>
                    <th style="text-align: center">年龄</th>
                    <th style="text-align: center">性别</th>
                    <th style="text-align: center">操作</th>
                </tr>
                {% for k,v in user_dict.items() %}
                    <tr style="text-align: center">
                        <td>{{ k }}</td>
                        <td>{{ v.username }}</td>
                        <td>{{ v.age }}</td>
                        <td>{{ v.gender }}</td>
                        <td><a href="/detail/{{ k }}">详情</a> | <a href="/delete/{{ k }}">删除</a></td>
                    </tr>
                    {#                    <tr>#}
                    {#                        <td>{{ v['username'] }}</td>#}
                    {#                        <td>{{ v['age'] }}</td>#}
                    {#                        <td>{{ v['gender'] }}</td>#}
                    {#                    </tr> #}
                    {#                                        <tr>#}
                    {#                                            <td>{{ v.get('usename','默认') }}</td>#}
                    {#                                            <td>{{ v.get('age') }}</td>#}
                    {#                                            <td>{{ v.get('gender') }}</td>#}
                    {#                                        </tr>#}
                {% endfor %}
            </table>
        </div>
    </div>
</div>
……
```
**`detail.html`**：
```html
……
<body>
{#{'username': 'thanlon', 'age': '23', 'gender': '男'}#}
<br>
{% for item in info.values() %}{#% for item in info.values() %#}
    {{ item }}
{% endfor %}
</body>
```
<hr>

##### 2. 装饰器知识点补充
函数没有加装饰器：
```python
# coding:utf-8
def auth(func):
    def inner(*args, **kwargs):
        ret = func(*args, **kwargs)
        return ret
    return inner
def index():
    print('index')
print(index.__name__)  # 打印函数名
'''index'''
```
函数加装饰器，让 <kbd>inner()</kbd> 函数伪装成 <kbd>index()</kbd> 函数：
```py
# coding:utf-8
def auth(func):
    def inner(*args, **kwargs):
        ret = func(*args, **kwargs)
        return ret
    return inner
@auth
def index():
    print('index')
@auth
def login():
    print('login')
print(index.__name__)  # 打印函数名
print(login.__name__)  # 打印函数名
'''inner'''
'''inner'''
```
上面的例子中加装饰器虽然把名字伪装成功，但是内部没有伪装成功，可以使用 <kbd>functools.wraps(func)</kbd>：把原来函数执行的信息放到inner函数中（把原来的函数名放进闭包）：
```python
# coding:utf-8
import functools
def auth(func):
    @functools.wraps(func)
    def inner(*args, **kwargs):
        ret = func(*args, **kwargs)
        return ret
    return inner
@auth
def index():
    print('index')
@auth
def login():
    print('login')
print(index.__name__)  # 打印index函数名
print(login.__name__)  # 打印login函数名
'''
index
login
'''
```
<hr>

##### 3. endpoint参数
可以指定，默认是函数名。作用是：反向生成 url，如果同名会出错。查看 route 函数源码：
```py
def add_url_rule(self, rule, endpoint=None, view_func=None,
provide_automatic_options=None, **options):
	if view_func is not None:
	old_func = self.view_functions.get(endpoint)
	if old_func is not None and old_func != view_func:
		raise AssertionError('View function mapping is overwriting an ''existing endpoint function: %s' % endpoint)
            self.view_functions[endpoint] = view_func
……

def route(self, rule, **options):
	def decorator(f):
		endpoint = options.pop('endpoint', None)
        self.add_url_rule(rule, endpoint, f, **options)
        return f
	return decorator
```
<hr>

##### 4. 装饰器的先后顺序
装饰器和路由配合，把 url 和函数加入到路由关系中：
```python
@app.route('/login', methods=['GET', 'POST'])  # 默认允许GET请求
def hello_world():
    if not session.get('username'):
        return redirect(url_for('login'))
    return render_template('index.html', user_dict=USER_DICT)
```
如果想要再加入一个登录验证的装饰器，如果把 **`@auth`** 加入到 <kbd>@app.route('/login', methods=['GET', 'POST'])</kbd> 上面，那就是url和函数是一个大整体，再用 **`@auth`** 装饰，这显然不是我们的目标。函数应该优先和 **`@auth`** 结合，再去做路由和函数的路由对应关系。装饰完成之后，多个路由都对应 inner，endpoint 默认是函数名，这样所有的函数都是 inner，这也是有问题。有两种解决方式。

方式一：自己定义 endpoint，
```py
@app.route('/index',endpoint='1')
……
@app.route('/delete/<int:nid>',endpoint='2')
……
```
方式二：使用 <kbd>@functools.wraps(func)</kbd>
```python
import functools
def auth(func):
    @functools.wraps(func)
    def inner(*args, **kwargs):
        result = func(*args, **kwargs)
        return result
    return inner
    
@app.route('/index', endpoint='1')
@auth
def hello_world():
    if not session.get('username'):
        return redirect(url_for('login'))
    return render_template('index.html', user_dict=USER_DICT)
```
<hr>

##### 5. 第二种用户认证方式
第二种用户认证方式是加装饰器，

**`app.py`**：
```python
def auth(func):
    @functools.wraps(func)
    def inner(*args, **kwargs):
        result = func(*args, **kwargs)
        return result
    return inner
    
@app.route('/index', endpoint='1')
@auth
def hello_world():
    if not session.get('username'):
        return redirect(url_for('login'))
    return render_template('index.html', user_dict=USER_DICT)
```
这有个不好的地方，就是每一个需要做认证的都需要一个一个加入装饰器 <kbd>@auth</kbd>。

><font>应用场景：比较少的函数中需要额外加入功能。</font>

<hr>

##### 6. 第三种用户认证方式
可以使用 **`before_request`**，返回None表示可以通过执行，如果返回其它，不能通过执行。这是比较推荐的方式：
```py
@app.before_request
def auth():
    if request.path == '/login':
        return None
    if session.get('username'):
        return None
    # return redirect('/login')
    return redirect(url_for('login'))
```
><font>应用场景：批量给函数加额外的功能!</font>

<hr>

#### Flask中的flash
<hr>

##### 1. flash的使用
```python
@app.route('/page1')
def page1():
    flash('临时数据存储') # 临时存在内存中一个数据
    return 'session'

@app.route('/page2')
def page2():
    print(get_flashed_messages()) # 取一次就没有了,实际上用的时pop
    return 'session'
'''
''' 
['临时数据存储', '临时数据存储']
[]
'''
'''
```
对临时数据也可以做分类：
```python
@app.route('/page1')
def page1():
    flash('临时数据存储','info')
    flash('error','error')
    return 'session'

@app.route('/page2')
def page2():
    print(get_flashed_messages(category_filter=['error']))
    return 'session'

''' 
['error', 'error']
[]
'''
```
<hr>

#### Flask中间件
<hr>

##### 1. call方法的执行
<kbd>\__call__</kbd> 方法在用户发起请求时才执行。flask 依赖 wsgi ，程序启动时执行的是 <kbd>run_simple(host, port, self, **options)</kbd>。在 `app.py` 文件中，会把 app 对象传入 <kbd>run_simple</kbd> 方法中。请求进来，第三个参数加括号，对象加括号执行 call 方法。
```py
def wsgi_app(self, environ, start_response):
        ctx = self.request_context(environ)
        error = None
        try:
            try:
                ctx.push()
                response = self.full_dispatch_request()
            except Exception as e:
                error = e
                response = self.handle_exception(e)
            except:
                error = sys.exc_info()[1]
                raise
            return response(environ, start_response)
        finally:
            if self.should_ignore_error(error):
                error = None
            ctx.auto_pop(error)
    def __call__(self, environ, start_response):
        return self.wsgi_app(environ, start_response)
```
所有的请求入口就在 call 方法。
```py
if __name__ == '__main__':
	app.run()
```
<kbd>app.run()</kbd> 方法执行后，运行 <kbd>run_simple(host, port, self, **options)</kbd>，在内部就是死循环，等待客户端发送请求（socket在监听连接）。此时 \__call__ 方法不会执行，有请求就会执行该方法。

修改源码：
```py
def __call__(self, environ, start_response):
        """The WSGI server calls the Flask application object as the
        WSGI application. This calls :meth:`wsgi_app` which can be
        wrapped to applying middleware."""
        print('请求之前做的操作')
        data = self.wsgi_app(environ, start_response)
        print('请求之后做的操作')
        return data
```
```py
if __name__ == '__main__':
    app.run()
```
```py
'''
请求之前做的操作
请求之后做的操作
'''
```
这样做是不合适的，修改源代码是不可选的。
<hr>

##### 2. 自定义中间件
```py
class Middleware(object):
    def __init__(self, old):
        self.old = old

    def __call__(self, *args, **kwargs):
        print('请求之前做的操作')
        ret = self.old(*args, **kwargs)
        print('请求之后做的操作')
        return ret

if __name__ == '__main__':
    app.wsgi_app = Middleware(app.wsgi_app)
    app.run()
```
通过 Middleware 中间件，在请求之前和请求之后做一些操作。	
<hr>

#### Flask路由和视图
<hr>

##### 1. 路由和视图函数对应关系
```py
# /index和/login是路由;index和login是视图函数
[
    ('/index', 'index'),
    ('/login', 'login')
]
```
请求来了，一个个筛选，并且前面的匹配成功，后面的都不再进行匹配了。
<hr>

##### 2. 路由设置两种方式
① @app.route('/xxx')
```py
@app.route('/')
def index():
    return 'index'
```
② app.add_url_rule('/index',None,index)
```py
def index():
    return 'index'
app.add_url_rule('/index', None, index)
```
注意：不要让 endpoint 重名，如果重名函数一定要相同。
```py
@app.route('/index', endpoint=1)
def index():
    return 'index'
@app.route('/index', endpoint=1)
def index():
    return 'index'
```
上面两个 index 函数是不同的。
<hr>

##### 3. app.route方法的参数

( 1 ) rule：url规则

( 2 ) view_func：视图函数名称

( 3 ) defaults = None：默认值，当 url 中无参数数时，使用 defaults = {'k':'v'} 为函数提供参数
```py
@app.route('/index', defaults={'k': 'v'})
def index(k):
    return 'index'
```
( 4 ) endpoint = None：名称，用于反向生成 url，即 url_for('名称')

( 5 ) methods = None：允许请求的方式，如：[ 'get', 'post' ]

( 6 ) strict_slashes  = None：对url最后 / 符号是严格要求的。对于 <kbd>@app.route('/login',strict_slashes = False)</kbd>，访问 [ https://www.xxx.com/login ] 或 [ https://www.xxx.com/login/ ] 都可以。但对于 <kbd>@app.route('/login',strict_slashes = True)</kbd>，仅能访问 [ https://www.xxx.com/login ]。建议使 strict_slashes = True，只有写了什么，才能访问什么，默认也是 True。

( 7 ) redirect_to = None：重定向到指定的地址

① 一般的重定向：
```py
@app.route('/index', redirect_to='/login')
def index():
    return 'index'
    
@app.route('/login')
def login():
    return 'login'
```
② 重定向的时候传参数：
```py
@app.route('/index/<int:nid>', redirect_to='/home/<nid>')
def index():
    return 'index'

@app.route('/home/<int:nid>')
def home(nid):
    return str(nid)
```
```py
def func(adapter, nid):
    return '/home/' + str(nid)
    
@app.route('/index/<int:nid>', redirect_to=func)
def index():
    return 'index'
```
( 8 ) subdomain = None：子域名访问
绑定域名：

**`hosts`**：
```py
# localhost name resolution is handled within DNS itself.
#	127.0.0.1       localhost
#	::1             localhost
	127.0.0.1       thanlon.com
	127.0.0.1       home.thanlon.com
	127.0.0.1       admin.thanlon.com
```
**`app.py`**：
```py
from flask import Flask
app = Flask(__name__)
app.config['SERVER_NAME'] = 'thanlon.com:5000'

# http://admin.thanlon.com:5000
@app.route('/index', subdomain='admin')
def admin():
    return 'admin.thanlon.com'

# http://home.thanlon.com:5000
@app.route('/index', subdomain='home')
def home():
    return 'home.thanlon.com'

if __name__ == '__main__':
    app.run()
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190814154557908.png)![在这里插入图片描述](https://img-blog.csdnimg.cn/20190814154545228.png)

```py
from flask import Flask
app = Flask(__name__)
app.config['SERVER_NAME'] = 'thanlon.com:5000'

# http://xxxxx.thanlon.com:5000
@app.route('/', subdomain='<username>')
def index(username):
    return username + '.thanlon.com'

if __name__ == '__main__':
    app.run()
```
<hr>

##### 4. CBV
CBV 是 Flask 从 Django 框架中借鉴过来的，
```py
from flask import Flask, views
import functools
app = Flask(__name__)

def wrapper(func):
    @functools.wraps(func)
    def inner(*args, **kwargs):
        return func(*args, **kwargs)
    return inner

class UserView(views.MethodView):
    methods = ['GET']  # 表示只支持get请求
    decorators = [wrapper]  # 在执行get和post时，先执行这个装饰器

    def get(self, *args, **kwargs):
        return 'GET'

    def post(self, *args, **kwargs):
        return 'POST'
        
app.add_url_rule('/index', None, UserView.as_view('uuu'))
```
<hr>

##### 5. 自定义正则
( 1 ) python 默认支持的转换器
```py
#: the default converter mapping for the map.
DEFAULT_CONVERTERS = {
    "default": UnicodeConverter,
    "string": UnicodeConverter,
    "any": AnyConverter,
    "path": PathConverter,
    "int": IntegerConverter,
    "float": FloatConverter,
    "uuid": UUIDConverter,
}
```
( 2 ) 自定义正则的三个步骤

① 定制类
```py
class RegexConverter(BaseConveter):
	def __init__(self,map,regex):
		super(RegexConverter,self).__ini__(map)
		self.regex = regex
		
	def to_python(self,value):
		# 路由匹配时，匹配成功后传递给视图函数中参数的值
		return int(value) # 可以做一些自定义操作
		
	def to_url(self,value):
		# 反向生成url
		var = super(RegexConverter, self).to_url(value)
        return var
```
② 添加转换器
```py
app.url_map.converters['reg'] = RegexConverter  # reg是自己定义
```
③ 使用自定义正则（ <kbd>to_python</kbd> 方法是匹配的时候使用，<kbd>to_url</kbd> 方法是反向生成 url 的时候使用 ）
```py
from flask import Flask, url_for

app = Flask(__name__)
from werkzeug.routing import BaseConverter

# 第一步：定制类
class RegexConverter(BaseConverter):
    def __init__(self, map, regex):
        super(RegexConverter, self).__init__(map)
        self.regex = regex

    def to_python(self, value):
        return str(value)

    def to_url(self, value):
        var = super(RegexConverter, self).to_url(value)
        return var

# 第二步：添加转换器
app.url_map.converters['reg'] = RegexConverter  # reg是自己定义

# 第三步：使用自定义正则（to_python方法是匹配的时候使用，to_url方法是反向生成url的时候使用）
# 如果匹配成功，执行to_python方法，该方法返回什么，nid就是什么
@app.route("/index/<reg('\d+'):nid>", methods=['GET'])
def index(nid):
    '''
    1. 用户发送请求
    2. flask内部进行正则匹配
    3. 调用to_python(正则匹配的结果)方法
    4. to_python方法的返回值会交给视图函数的参数
    :param nid: 
    :return: 
    '''
    # print(nid, type(nid))  # 查看nid的类型
    print(url_for('index', nid=123))  # 如果反向生成url，执行流程，先将参数nid=123传入to_url方法，让to_url方法帮助我们去反向生成。
    '''
    控制台：/index/123
    '''
    return 'index'
    
if __name__ == '__main__':
    app.run()
```
#### FLask蓝图
<hr>

##### 1. 蓝图 ( 一 )
实际项目中，需要进行项目目录结构的划分，蓝图就是用来帮助开发者进行目录结构的划分，下面是目录结构划分的几个步骤。

( 1 ) 新建项目，在项目下新建一个和项目名同名的目录

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190815094530310.png)

( 2 ) 在与项目名同名的目录中新建 **`__ init __.py`**，用来实例化 Flask 对象

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190815095502946.png)

```py
from flask import Flask

def create_app():
    app = Flask(__name__)
    return app
```
( 3 ) 在项目目录下新建 **`manage.py`** （ 也可以是其它的名字 ），

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190815095847799.png)

将 <kbd>create_app</kbd> 函数导入 manage.py，在 manage.py 中：
```py
from test_blueprint import create_app

app = create_app()
if __name__ == '__main__':
    app.run()
```
( 4 ) 在 test_blueprint（ 非项目目录 ）下新建 views 目录，用来放视图函数，在视图函数中可以根据视图的不同进行分类。

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190815101405871.png)

( 5 ) 创建视图函数与 app 对象的关系，首先在视图函数中，创建 Blueprint 对象。

**`admin.py`**：
```py
from flask import Blueprint
admin_bp = Blueprint('admin_bp', __name__)  # 创建Blueprint(蓝图)对象，第一个参数name不能同名

@admin_bp.route('/login')
def login():
    return 'admin.login'
    
@admin_bp.route('/logout')
def logout():
    return 'logout'
```
**`home.py`**：
```py
from flask import Blueprint
home_bp = Blueprint('home_bp', __name__)  # 第一个参数是name，第一个参数name不能同名

@home_bp.route('/login')
def login():
    return 'home.login'

@home_bp.route('/list')
def list():
    return 'list'
```
需要修改 **`__ init __.py`**，注册蓝图，
```python
from flask import Flask
from .views.admin import admin_bp
from .views.home import home_bp

def create_app():
    app = Flask(__name__)
    # 注册蓝图
    app.register_blueprint(home_bp)
    app.register_blueprint(admin_bp)
    return app
```
注意：如果两个或多个视图函数中有同名的路由，如 home.py 和 admin.py 都有 **`/login`** 路由，谁先注册先执行谁的视图函数。

( 6 ) 创建模板。在 **`__ init __.py`** 所在的目录中新建 templates 目录（ Flask 实例化的文件所在的目录中 ），如果有静态文件，放静态文件的目录 static 与 templates 目录处于同一级。

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190815105313126.png)

在 templates 目录中建模板文件 **`login.html`**，同时修改 **`admin.py`**：
```py
@admin_bp.route('/login')
def login():
    return render_template('login.html')
```
这时候就可以访问模板了。
<hr>

##### 2. 蓝图 ( 二 )
( 1 ) 自定义静态文件和模板的路径
```python
admin_bp = Blueprint('admin_bp', __name__,template_folder='xxx')
@admin_bp.route('/login')
def login():
    return render_template('login.html')
```
注意：蓝图 <font>优先</font> 去 templates 去找 loging.html，找不到去 xxx 中找。当然静态文件也是可以指定的：
```python
admin_bp = Blueprint('admin_bp', __name__,template_folder='xxx',static_folder='xxxx')

@admin_bp.route('/login')
def login():
    return render_template('login.html')
```
( 2 ) 为某一个蓝图地址加上前缀
```python
def create_app():
    app = Flask(__name__)
    # 注册蓝图
    app.register_blueprint(home_bp, url_prefix='/home')
    app.register_blueprint(admin_bp)
    return app
```
按照原先访问方式：**`http://127.0.0.1:5000/login`** ,访问失败。

现在需要：**`http://127.0.0.1:5000/home/login`**

( 3 ) 为所有蓝图加上 <kbd>@before_request</kbd>

**`__ init __.py`**：
```python
from flask import Flask
from .views.admin import admin_bp
from .views.home import home_bp

def create_app():
    app = Flask(__name__)

    @app.before_request
    def xxx():
        return '123'

    # 注册蓝图
    app.register_blueprint(home_bp)
    app.register_blueprint(admin_bp)
    return app
```
( 4 ) 为指定的蓝图加上 <kbd>@before_request</kbd>

**`admin.py`**：
```python
from flask import Blueprint, render_template
admin_bp = Blueprint('admin_bp', __name__, template_folder='xxx', static_folder='xxxx')

@admin_bp.before_request
def xxx():
    return '123'

@admin_bp.route('/login')
def login():
    return render_template('login.html')

@admin_bp.route('/logout')
def logout():
    return 'logout'
```
><font>应用场景：可以在指定蓝图中加入登录验证 。</font>

<hr>

#### Flask中session的使用
<hr>

##### 1. session的基本使用

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190811121342441.png)

当请求刚进来时，flask 读取 cookie 中 session 对应的值，将该值解密并反序列化为字典，放入内存以便视图函数使用。 

视图函数： 
```py
@app.route('/session')
def sess():
    # from flask.sessions import SecureCookieSession
    print(type(session))  # session继承了字典，字典有什么方法，它就有什么方法
    print(type(session))  # session继承了字典，字典有什么方法，它就有什么方法
    session['k1'] = 'v1'
    return 'session'
    '''
    <class 'werkzeug.local.LocalProxy'>
    '''
```
当请求结束时，flask 会读取内存中字典的值，进行序列化加密，写入到用户的 cookie 中。
<hr>

##### 2. 自定义Session配置
**`settings.py`**：
```py
class Config(object):
    # PERMANENT_SESSION_LIFETIME = datetime.timedelta(days=31)  # 生命周期，最多的保存时间
    # PERMANENT_SESSION_LIFETIME = datetime.timedelta(hours=1)
    PERMANENT_SESSION_LIFETIME = datetime.timedelta(minutes=30)  # 30min后过期
    SESSION_COOKIE_NAME = 'session',  # cookie的名称
    SESSION_COOKIE_DOMAIN = None,  # 域名
    SESSION_COOKIE_PATH = None  # 路径
    SESSION_COOKIE_HTTPONLY = True  # http读取
    SESSION_COOKIE_SECURE = False  # 安全设置
    SESSION_REFRESH_EACH_REQUEST = True  # 在最后访问的基础上加上生命周期
```
<hr>

#### Flask中的wtforms组件
<hr>

##### 1. 用户登录
**`form.py`**：
```python
from wtforms import Form
from wtforms.fields import simple
from wtforms import widgets, validators

class LoginForm(Form):
    # name = simple.StringField()
    name = simple.StringField(
        validators=[
            validators.DataRequired(message='用户名不能为空'),
            validators.Length(min=6,max=20,message='用户名长度必须大于%(min)d且小于%(max)d')
        ],
        widget=widgets.TextInput(),
        render_kw={'placeholder': '请输入用户名', 'class': 'form-control'}
    )
    # pwd = simple.PasswordField()
    pwd = simple.PasswordField(
        validators=[
            validators.DataRequired(message='密码不能为空')
        ],
        render_kw={'placeholder': '请输入密码','class': 'form-control'}
    )
```
**`app.py`**：
```py
from flask import Flask, render_template, request
from forms import LoginForm

app = Flask(__name__)
app.debug = True

@app.route('/')
def index():
    return 'index'

@app.route('/login', methods=['get', 'post'])
def login():
    if request.method == 'GET':
        form = LoginForm()
        # print(form.name, type(form.name))  # name是一个对象,print的时候执行这个对象的__str__方法,
        # print(form.pwd, type(form.pwd))  # name是一个对象,print的时候执行这个对象的__str__方法
        '''
       <input id="name" name="name" type="text" value=""> <class 'wtforms.fields.core.StringField'>
        <input id="pwd" name="pwd" type="password" value=""> <class 'wtforms.fields.simple.PasswordField'>
        '''
        return render_template('login.html', form=form)
    form = LoginForm(formdata=request.form)
    if form.validate():
        print(form.data)  # {'name': '123456', 'pwd': '123456'}
        return '验证成功!'
    else:
        # print(form.errors)  # {'name': ['用户名不能为空'], 'pwd': ['密码不能为空']}
        return render_template('login.html', form=form)

if __name__ == '__main__':
    app.run()
```
**`login.html`**：
```html
  <form method="POST" novalidate>
                        <div class="form-group">
                            <label>用户名</label>
                            {{form.name}}
                            <div style="color:red">{{form.name.errors[0]}}</div>
                        </div>
                        <div class="form-group">
                            <label>密&nbsp;&nbsp;&nbsp;&nbsp;码</label>
                             {{form.pwd}}
                            <div style="color:red">{{form.pwd.errors[0]}}</div>
                        </div>
                        <button type="submit" class="btn btn-primary">登录</button>
                    </form>
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190905181115785.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RoYW5sb24=,size_16,color_FFFFFF,t_70)
<hr>

##### 2. 用户注册
**`form.py`**：
```py
class RegisterForm(Form):
    name = simple.StringField(
        label='用户名',
        validators=[
            validators.DataRequired(message='密码不能为空!')
        ],
        widget=widgets.TextInput(),
        render_kw={'class': 'form-control'},
        default='thanlon'
    )
    pwd = simple.PasswordField(
        label='密码',
        validators=[
            validators.DataRequired(message='密码不能为空!')
        ],
        widget=widgets.PasswordInput(),
        render_kw={
            'class': 'form-control'
        }
    )
    pwd_confirm = simple.PasswordField(
        label='重复密码',
        validators=[
            validators.DataRequired(message='重复密码不能为空!'),
            validators.EqualTo('pwd', message='两次密码输入不一致!')
        ],
        widget=widgets.PasswordInput(),
        render_kw={
            'class': 'form-control'
        }
    )
    email = html5.EmailField(
        label='邮箱',
        validators=[
            validators.DataRequired(message='邮箱不能为空!'),
            validators.Email(message='邮箱格式错误!')
        ],
        widget=widgets.TextInput(input_type='email'),
        render_kw={
            'class': 'form-control'
        }
    )
    gender = core.RadioField(
        label='性别',
        choices=(
            (1, '男'), (2, '女')
        ),
        coerce=int,  # int('1')

    )
    city = core.SelectField(
        label='城市',
        choices=(
            ('bj', '北京'),
            ('sh', '上海')
        )
    )
    hobby = core.SelectMultipleField(
        label='爱好',
        choices=(
            (1, '羽毛球'),
            (2, '篮球')
        ),
        coerce=int
    )
    favor = core.SelectMultipleField(
        label='喜好',
        choices=(
            (1, '羽毛球'),
            (2, '篮球')
        ),
        widget=widgets.ListWidget(prefix_label=False),
        option_widget=widgets.CheckboxInput(),
        coerce=int,
        default=[2]
    )
```
**`register.html`**：
```py
<form method="post" novalidate>
	{% for field in form %}
	{{field.label}} {{field}}{{field.errors[0]}}
	{% endfor %}
	<button type="submit" class="btn btn-primary">登录</button>
 </form>
```
**`app.py`**：
```py
@app.route('/register',methods=['get','post'])
def register():
    if request.method == 'GET':
        form = RegisterForm()
        return render_template('register.html', form=form)
    form = RegisterForm(formdata=request.form)
    if form.validate():
        print(form.data)
        return redirect('https://www.blueflags.cn')
    return render_template('register.html', form=form)
```
<hr>

##### 3. 数据库实时更新
数据相关：
```sql
mysql> create table city(id int primary key auto_increment,city_name varchar(20) not null );
mysql> insert city values(null,'beijin');
mysql> insert city values(null,'shanghai');
mysql> insert city values(null,'shenzhen');	
```
效果图：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190906143006821.png)

主要代码：
```py
class UserForm(Form):
    city = core.SelectField(
        label='城市',
        choices=helper.fetch_all('select *from city', [], type=None),  # 只是在第一次从数据库获取一次
        coerce=int,  # 自动把用户提交的字符串转换为数字
    )
```
选项中的数据只是在第一次请求的时候从数据库获取一次，当数据更新时，用户页面中的数据并没有实时更新。所以，代码是存在问题的。

解决方案：对于 UserForm 类，每次实例化的时候都去从数据库中获取一次数据，可以这样写：
```py
class UserForm(Form):
    city = core.SelectField(
        label='城市',
        choices=(),  # 只是在第一次从数据库获取一次
        coerce=int,  # 自动把用户提交的字符串转换为数字
    )

    # 如果没有写执行Form的构造方法
    def __init__(self, *args, **kwargs):
        super(UserForm, self).__init__(*args, **kwargs)  # 在UserForm中执行什么在父类中还要执行什么
        self.city.choices = helper.fetch_all('select *from city', [], type=None)
```

实例化 UserForm 的时候传值：
```py
@app.route('/user', methods=['get', 'post'])
def user():
    if request.method == 'GET':
        form = UserForm(data = {'name':'thanlon','city':3})
        return render_template('user.html',form=form)
```
<hr>

##### 4. wtforms的作用
wtforms 有两个作用：

( 1 ) 自动生成 html 标签；

( 2 ) 对用户请求数据进行校验
<hr>

##### 5. django实现数据实时更新
在 django 中想实现实时更新，也需要重写构造方法。

**`views.py`**：
```python
from django.shortcuts import render
from django.forms import Form
from django.forms import fields
from app01 import models

class IndexForm(Form):
    title = fields.CharField()
    # group = fields.ChoiceField(
    #     choices=(
    #         (1, 'A'),
    #         (2, 'B')
    #     )
    # )
    group = fields.ChoiceField(
        choices=()
    )
    def __init__(self, *args, **kwargs):
        super(IndexForm, self).__init__(*args, **kwargs)
        self.fields['group'].choices = models.UserGroup.objects.all().values_list('id', 'title')

# Create your views here.
def index(request):
    if request.method == 'GET':
        form = IndexForm()
        return render(request, 'index.html', {'form': form})
```
<hr>

#### flask-session组件
flask-session 组件可以帮助我们把默认的 session 放入到加密的 cookie 中。
<hr>

##### 1. 安装 flask-session
安装 flask-session：**`pip install flask-session`**
<hr>

##### 2. 将 session 保存在 Redis 中
session 保存在 Redis 中：
```python
from flask import Flask, request, session
from flask.sessions import SecureCookieSessionInterface
# from flask.ext.session import Session#以前导入session的方式，与下面是一样的
from flask_session import Session
import redis

app = Flask(__name__)
'''
session保存在redis中
'''
# app.session_interface = SecureCookieSessionInterface()  # 默认
# app.session_interface 换成flaks-session中的内容
# app.session_interface =RedisSessionInterface()
app.config['SESSION_TYPE'] = 'redis'
app.config['SESSION_REDIS'] = redis.Redis(host='主机IP', port=6739, password='密码!')
Session(app)

@app.route('/login')
def login():
    session['user'] = 'thanlon'
    return '……'

@app.route('/')
def index():
    print(session.get('user'))  # 没有不报错，session['user']没有会报错
    return 'index'

if __name__ == '__main__':
    app.run()
    # app.__call__  # 请求进来执行__call__，把数据交给__call__方法
    # app.wsgi_app  # __call__方法会调用wsgi_app
```
<hr>

##### 3. 查看Redis中存入的session

**`look_cookie.py`**:
```python
import redis
conn = redis.Redis(host='106.12.115.136',port=6379)
print(conn.keys())
'''
[b'session:.eJwVzDEOgCAQRNG7bO0muyOoy2UMAoWxw2BjvLvQTF4x-S-lVuve7tKnnZkCZVEVD-GcLLETr2yIkRFNt2OFMxSa6NL-fXQIQ-gaGQqK2fnl-wG6SBh8.XVNcEA.0NiiN7ldvhokI3sKsstrb0GhOQs']
'''
```
<hr>

##### 4. flask-session的原理

session 数据保存在 Redis，在 Redis 中 key 是 session，value 是随机字符串，每一个随机字符串对应一个自己的值。每一个用户都会有一个随机字符串。系统将随机字符串返回给用户。
<hr>

##### 5.flask-session源码
```py
from flask_session import RedisSessionInterface
```
<hr>

##### 6. flask-session更多配置
```py
SESSION_TYPE = 'redis'	# 设置session类型
SESSION_REDIS = redis.Redis(host='127.0.0.1', port=6379, password='foobared') # 配置连接redis
SESSION_PERMANENT = True
SESSION_USE_SIGNER = False   # 是否对发送到浏览器上session的cookie值进行加密
SESSION_KEY_PREFIX = 'session:') # 保存到session中的值的前缀
# PERMANENT_SESSION_LIFETIME = datetime.timedelta(days=31)   # session生命周期，保存31天。31天后过期
# PERMANENT_SESSION_LIFETIME = datetime.timedelta(hours=1)   # 保存1小时
PERMANENT_SESSION_LIFETIME = datetime.timedelta(minutes=30)  # 保存30min
```
<hr>

#### Flask中的SQLAlchemy
<hr>

##### 1. SQLAlchemy简介
SQLAlchemy 是 ORM ( 对象关系映射 ) 框架，类名对应表名，类中的字段对应数据表的列，对象对应数据表的一行。<font>SQLAlchemy可以帮助我们使用类和对象快速实现数据库操作</font>。我们在公司里要么是用原生 sql，要么是用 ORM
框架。原生 SQL 中可以用 MySQLdb 和 pymysql 模块，MySQLdb 的用法和 pymysql
基本上是完全一样的。两者在使用上是有区别的，<font>MySQLdb不支持Python3，pymysql支持Python2和Python3</font>。对于 Python Web 框架，如果有自己的使用自己的，如果没有 ORM 一般都用 SQLAlchemy。

<hr>

##### 2. CURD
( 1 ) 创建一张数据表
```python
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Text, Date, DateTime
from sqlalchemy import create_engine
Base = declarative_base()

class Users(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    name = Column(String(32), index=True, nullable=False)

engine = create_engine(
    'mysql+pymysql://root:123456@127.0.0.1:3306/sqlalchemy_test?charset=utf8',
    max_overflow=0,  # 超过连接池大小外最多创建的连接
    pool_size=5,  # 连接池大小
    pool_timeout=30,  # 连接池中没有连接最多等待的时间，否则会报错，30s
    pool_recycle=-1,  # 多久之后对线程池中的线程中进行一次连接的回收（重置）-1表示不重置
)
# Base.metadata.drop_all(engine) # 删除这个数据表
Base.metadata.create_all(engine)  # 创建这个数据表
```
创建的 Users 表：
```sql
+-------+-------------+------+-----+---------+----------------+
| Field | Type        | Null | Key | Default | Extra          |
+-------+-------------+------+-----+---------+----------------+
| id    | int(11)     | NO   | PRI | NULL    | auto_increment |
| name  | varchar(32) | NO   | MUL | NULL    |                |
+-------+-------------+------+-----+---------+----------------+
```
注意：SQLAlchemy 默认是不可以修改创建好的数据表的，需要用到第三方组件

( 2 ) 封装操作：防止 **`models.py`** 被导入的时候执行，把创建表和删除表封装在函数中
```python
# coding:utf-8
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Text, Date, DateTime
from sqlalchemy import create_engine

Base = declarative_base()

class Users(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    name = Column(String(32), index=True, nullable=False)

def create_all():
    engine = create_engine(
        'mysql+pymysql://root:123456@127.0.0.1:3306/sqlalchemy_test?charset=utf8',
        max_overflow=0,  # 超过连接池大小外最多创建的连接
        pool_size=5,  # 连接池大小
        pool_timeout=30,  # 连接池中没有连接最多等待的时间，否则会报错，30s
        pool_recycle=-1,  # 多久之后对线程池中的线程中进行一次连接的回收（重置）-1表示不重置
    )
    Base.metadata.create_all(engine)  # 创建这个数据表

def drop_all():
    engine = create_engine(
        'mysql+pymysql://root:123456@127.0.0.1:3306/sqlalchemy_test?charset=utf8',
        max_overflow=0,  # 超过连接池大小外最多创建的连接
        pool_size=5,  # 连接池大小
        pool_timeout=30,  # 连接池中没有连接最多等待的时间，否则会报错，30s
        pool_recycle=-1,  # 多久之后对线程池中的线程中进行一次连接的回收（重置）-1表示不重置
    )
    Base.metadata.drop_all(engine)  # 删除这个数据表
if __name__ == '__main__':
    pass
    # create_all()
    # drop_all()
```
( 3 ) 添加数据
```python
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Users

engine = create_engine(
    'mysql+pymysql://root:123456@127.0.0.1:3306/sqlalchemy_test?charset=utf8',
    max_overflow=0,  # 超过连接池大小外最多创建的连接
    pool_size=5,  # 连接池大小
    pool_timeout=30,  # 连接池中没有连接最多等待的时间，否则会报错，30s
    pool_recycle=-1,  # 多久之后对线程池中的线程中进行一次连接的回收（重置）-1表示不重置
)
SessionFactory = sessionmaker(bind=engine)
'''
根据Users类对users表进行增删改查
'''
session = SessionFactory()  # 创建一个连接
'''
增加单条数据
'''
# obj = Users(name='thanlon')
# session.add(obj)
'''
添加多条数据
'''
# obj = Users(name='thanlon')
# obj2 = Users(name='kiku')
# session.add(obj)
# session.add(obj2)
'''
添加多条数据的时候也可以把这些对对象放在列表中
'''
session.add_all([
    Users(name='thanlon'),
    Users(name='kiku')
])

session.commit()
session.close()
```
( 4 ) 查询数据
```python
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Users

engine = create_engine(
    'mysql+pymysql://root:123456@127.0.0.1:3306/sqlalchemy_test?charset=utf8',
    max_overflow=0,  # 超过连接池大小外最多创建的连接
    pool_size=5,  # 连接池大小
    pool_timeout=30,  # 连接池中没有连接最多等待的时间，否则会报错，30s
    pool_recycle=-1,  # 多久之后对线程池中的线程中进行一次连接的回收（重置）-1表示不重置
)
SessionFactory = sessionmaker(bind=engine)
'''
根据Users类对users表进行增删改查
'''
session = SessionFactory()  # 创建一个连接
'''
查询表中所有内容
'''
# ret = session.query(Users).all()
# # print(ret)#拿到的是对象
# # [<models.Users object at 0x7f9cc4ca1080>, <models.Users object at 0x7f9cc4ca10f0>, <models.Users object at 0x7f9cc4ca1160>, <models.Users object at 0x7f9cc4ceee80>, <models.Users object at 0x7f9cc4cf50f0>, <models.Users object at 0x7f9cc4cf5160>]
# for row in ret:
#     print(row.id)
#     print(row.name)
'''
根据条件查询
'''
# ret = session.query(Users).filter(Users.id > 3)  # filter中直接加表达式
# for row in ret:
#     print(row.id, row.name)
#     '''
#     4 kiku
#     5 thanlon
#     6 kiku
#     '''
'''
根据条件查询,拿到第一条数据
'''
ret = session.query(Users).filter(Users.id > 3).first()  # filter中直接加表达式
print(ret.id, ret.name)
'''
4 kiku
'''
session.commit()
session.close()
```
( 5 ) 删除数据
```python
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Users

engine = create_engine(
    'mysql+pymysql://root:123456@127.0.0.1:3306/sqlalchemy_test?charset=utf8',
    max_overflow=0,  # 超过连接池大小外最多创建的连接
    pool_size=5,  # 连接池大小
    pool_timeout=30,  # 连接池中没有连接最多等待的时间，否则会报错，30s
    pool_recycle=-1,  # 多久之后对线程池中的线程中进行一次连接的回收（重置）-1表示不重置
)
SessionFactory = sessionmaker(bind=engine)
session = SessionFactory()  # 创建一个连接
'''
删除数据
'''
# session.query(Users).delete()
session.query(Users).filter(Users.id > 3).delete()
session.commit()
```
( 6 ) 修改数据
```py
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Users

engine = create_engine(
    'mysql+pymysql://root:123456@127.0.0.1:3306/sqlalchemy_test?charset=utf8',
    max_overflow=0,  # 超过连接池大小外最多创建的连接
    pool_size=5,  # 连接池大小
    pool_timeout=30,  # 连接池中没有连接最多等待的时间，否则会报错，30s
    pool_recycle=-1,  # 多久之后对线程池中的线程中进行一次连接的回收（重置）-1表示不重置
)
SessionFactory = sessionmaker(bind=engine)
session = SessionFactory()  # 创建一个连接
'''
修改数据
'''
# session.query(Users).filter(Users.id == 1).update({Users.name: 'liuyuqin'})
# session.query(Users).filter(Users.id == 1).update({'name': Users.name + 'hello'}, synchronize_session=False)#等效于下面的
session.query(Users).filter(Users.id == 1).update({Users.name: Users.name + 'hello'}, synchronize_session=False)
session.commit()
```
<hr>

##### 3. 常用操作
( 1 ) 指定列
```py
ret = session.query(Users.id, Users.name.label('cname')).all()
for item in ret:
    print(item, type(item), item[0], item.id, item.cname)
    # item是<class 'sqlalchemy.util._collections.result'>,打印的是元组，实际不是元组类型，但可以通过元组去值。能够通过索引去取，说明该类中有__item__方法
query = session.query(Users.id, Users.name.label('cname'))  # query的值就是sql语句
```
( 2 ) 默认条件是and
```py
session.query(Users).filter(Users.id == 1, Users.name == 'thanlon').all()
```
( 3 ) between
```py
session.query(Users).filter(Users.id.between(1, 2), Users.name == 'thanlon').all()
```
( 4 ) in
```py
 session.query(Users).filter(Users.id.in_([1, 2, 3])).all()
session.query(Users).filter(~Users.id.in_([1, 2, 3])).all()
```
( 5 ) 子查询
```py
session.query(Users).filter(Users.id.in_(session.query(Users.id).filter(Users.name == 'thanlon'))).all()
```
( 6 ) and和or
```py
from sqlalchemy import and_, or_

session.query(Users).filter(and_(Users.id > 1, Users.name == 'thanlon')).all()  # 没有and_也是一样的表示and
session.query(Users).filter(or_(Users.id > 1, Users.name == 'thanlon')).all()  # 或者
session.query(Users).filter(
    or_(Users.id > 1, and_(Users.name == 'thanlon', Users.id > 3))
).all()
```
( 7 ) filter_by
```py
session.query(Users).filter_by(name='thanlon').all()  # 条件，内部也是使用filter
```
( 8 ) 通配符
```py
session.query(Users).filter(Users.name.like('t_')).all()  # t后面有一个字符
session.query(Users).filter(~Users.name.like('t%')).all()  # 以t开头
```
( 9 ) 切片/分页
```py
session.query(Users)[1, 3]
```
( 10 ) 排序：
```py
session.query(Users).order_by(Users.name.desc()).all()  # 按照姓名从大到小
session.query(Users).order_by(Users.name.desc(), Users.id.asc()).all()  # 先按照name从大到小排列，如果同名按照id升序排列
```
( 11 ) 分组：
```py
from sqlalchemy.sql import func

'''
第一种情况
'''
# ret = session.query(func.max(Users.id)).group_by(Users.depart_id).all()
# for item in ret:
#     print(item)
'''
第二种情况
'''
# ret = session.query(func.min(Users.id)).group_by(Users.depart_id).all()
# for item in ret:
#     print(item)
'''
第三种情况
'''
# ret = session.query(Users.depart_id,func.count(Users.id)).group_by(Users.depart_id).all()
# for item in ret:
#     print(item)
#     '''
#     (1, 2)
#     (2, 1)
#     '''
'''
第四种情况:根据聚合条件二次筛选用having(部门人数大于等于2)
'''
ret = session.query(Users.depart_id, func.count(Users.id)).group_by(Users.depart_id).having(
    func.count(Users.id) >= 2).all()
for item in ret:
    print(item)
    '''
    (1, 2)
    '''
# 注意：如果使用group，根据聚合的结果进行二次筛选时，只能用having
```
( 12 ) 组合：将两个表上下拼接(union和union all)，而join是左右拼接
```py
'''
union：不会去重
'''
# q = session.query(Users.name).filter(Users.id > 0)
# q2 = session.query(Admin.admin_name).filter(Admin.id > 0)
# ret = q.union(q2).all()
# for item in ret:
#     print(item.name)
'''
union：去重
'''
q = session.query(Users.name).filter(Users.id > 0)
q2 = session.query(Admin.admin_name).filter(Admin.id > 0)
ret = q.union_all(q2).all()
for item in ret:
    print(item.name)
```
<hr>

##### 4. 外键操作
( 1 ) 创建两个表，注意 Users 表中是加了外键的
```py
class Depart(Base):
    __tablename__ = 'depart'
    id = Column(Integer, primary_key=True)
    title = Column(String(32), index=True, nullable=False)

class Users(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    name = Column(String(32), index=True, nullable=False)
    depart_id = Column(Integer, ForeignKey('depart.id'))  # depart小写代表表名，不是类名
```
插入数据：
```sql
mysql> insert depart values(null,'technology');
mysql> insert depart values(null,'develop');
mysql> insert users values(null,'thanlon',1);
mysql> insert users values(null,'yuqin',2);
```
( 2 ) 外键操作：
我们在这里可以查询所有用户的信息和所属部门名称，具体操作如下：
```py
# ret = session.query(Users, Depart).join(Depart).all()  #depart_id = Column(Integer, ForeignKey('depart.id')),默认根据depart.id等效于下面的
ret = session.query(Users, Depart).join(Depart, Users.depart_id == Depart.id).all()  # on的条件是:depart_id == Depart.id
for row in ret:
    print(row[0].id, row[0].name, row[1].title)
```
也可以指定要查询的具体内容，
```py
# 也可以指定获取指定的内容
ret = session.query(Users.id, Users.name, Depart.title.label('as_title')).join(Depart,
                                                                               Users.depart_id == Depart.id).all()
for row in ret:
    print(row.id, row.name, row.as_title)
```
可以使用多个 join，但只有左连接没有右连接的概念，右连接是没有意义的。此外，下面 query 变量打印出来是一个 sql 语句，query 变量的类型是：**`<class 'sqlalchemy.orm.query.Query'>`**。
```py
query = session.query(Users.id, Users.name, Depart.title).join(Depart, Users.depart_id == Depart.id,
                                                               isouter=True)  # 没有right join是没有意义的
```
我们把在对应 users 的 Users 类中添加一个 dp 字段，注意这个字段不会在表中存在，只有 Column 实例化的对象才会对应数据表中的列。<font>加入 relationship 可以帮助我们（ 跨表 ）做关联查询和创建关联数据。</font>
```py
from sqlalchemy.orm import relationship
class Users(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    name = Column(String(32), index=True, nullable=False)
    depart_id = Column(Integer, ForeignKey('depart.id'))  # depart小写代表表名，不是类名
    dp = relationship('Depart',backref = 'pers')
```
比如上面的 “查询所有用户的信息和所属部门名称” 可以这样操作：
```py
ret = session.query(Users).all()
print(ret)  # [<models.Users object at 0x7f5b935bb7f0>, <models.Users object at 0x7f5b935bb860>……]
for row in ret:
    print(row.id, row.name, row.depart_id, row.dp.title)
```
还可以反向跨表，比如查询销售部为 “develop” 的所有人员，我们可以这样操作：
```py
obj = session.query(Depart).filter(Depart.title == 'develop').first()
print(obj.pers)  # [<models.Users object at 0x7fef08122160>]
for row in obj.pers:
    print(row.id, row.name, obj.title)
```
上面两个例子是使用表示 relationship 可以做关联查询，下面的例子则会介绍一次性创建关联数据。

比如有这样的需求 “创建一个名称是 ‘finance’ 的部门并在该部门中添加员工：thanlon”，一般情况下我们是这样操作的：
```py
dp = Depart(title='finance')
session.add(dp)
session.commit()
#再根据根据finance部门id创建员工
u = Users(name='thanlon', depart_id=dp.id)
session.add(u)
session.commit()
```
上面是一种方式，有了 relationship，我们可以这样创建：
```py
u = Users(name='thanlon', dp=Depart(title='finance'))
session.add(u)
session.commit()
```
可以看到简单多了吧!

问题来了，如果创建一个部门再在这个部门创建多个员工，如果按照上面的例子，会又创建若干个 finance 部门。当然，如果按照上上个例子一个个添加员工也是可以的。但是，我们还有简便的方式，你可以这样做：
```py
# 创建一个部门，添加多个员工
dp = Depart(title='finance')
dp.pers = [
    Users(name='a'),
    Users(name='b'),
    Users(name='c')
]
session.add(dp)
session.commit()
```
<hr>

##### 5. 多对多操作
( 1 ) 多对多表的创建

创建学生表、课程表和中间表（部分代码省略）
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
( 2 ) 添加数据

添加 Student 表和 Course 表数据：
```py
session.add_all([
    Student(name='thanlon'),
    Student(name='Aurora'),
    Student(name='kiku'),
    Course(title='English'),
    Course(title='Computer'),
])
session.commit()
```
添加中间表数据：
```py
session.add_all([
    Student2Course(student_id=4,course_id=1),
    Student2Course(student_id=4,course_id=2),
])
session.commit()
```
```py
session.add_all([
    Student2Course(student_id=5,course_id=1),
])
session.commit()
```
```py
session.add_all([
    Student2Course(student_id=6,course_id=2),
])
session.commit()
```
( 3 ) 多对多操作

操作1：查询学生姓名和对应的选课课程名（三张表关联查询）
```py
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Users, Depart, Student, Course, Student2Course

engine = create_engine(
    'mysql+pymysql://root:123456@127.0.0.1:3306/sqlalchemy_test?charset=utf8',
    max_overflow=0,  # 超过连接池大小外最多创建的连接
    pool_size=5,  # 连接池大小
    pool_timeout=30,  # 连接池中没有连接最多等待的时间，否则会报错，30s
    pool_recycle=-1,  # 多久之后对线程池中的线程中进行一次连接的回收（重置）-1表示不重置
)
SessionFactory = sessionmaker(bind=engine)
session = SessionFactory()
ret = session.query(Student2Course.id, Student.name, Course.title).join(Student,
                                                                        Student2Course.student_id == Student.id,
                                                                        isouter=True).join(
    Course, Student2Course.course_id == Course.id, isouter=True).order_by(Student2Course.id.asc())
for row in ret:
    print(row)
    '''
    (1, 'thanlon', 'English')
    (2, 'thanlon', 'Computer')
    (3, 'Aurora', 'English')
    (4, 'kiku', 'Computer')
    '''
session.close()
```
操作2：学生“thanlon”选的所有课
```py
……
ret = session.query(Student2Course.id, Student.name, Course.title).join(Student,
                                                                        Student2Course.student_id == Student.id,
                                                                        isouter=True).join(
    Course, Student2Course.course_id == Course.id, isouter=True).filter(Student.name == 'Thanlon').order_by(
    Student2Course.id.asc()).all()
print(ret)
# [(1, 'thanlon', 'English'), (2, 'thanlon', 'Computer')]
……
```
上面两个例子是一般多对关联查询操作，下面使用 relationship，首先需要修改建 Student 表语句：

**`model.py`**：
```py
class Student(Base):
    __tablename__ = 'student'
    id = Column(Integer, primary_key=True)
    name = Column(String(32), index=True, nullable=False)
    course_list = relationship('Course', secondary='student2course', backref='student_list')  # 根据与Course做关联
```
使用 relationship 来查询来执行操作2：学生 “thanlon” 选的所有课，可以这样：
```py
obj = session.query(Student).filter(Student.name == 'thanlon').first()
for item in obj.course_list:
    print(item.title)
    '''
    Computer
    English
    '''
```
除了使用 relationship 正向查找，还可以反向查找，比如：查找选择 “Computer” 的所有人，
```py
obj = session.query(Course).filter(Course.title == 'computer').first()
# print(obj)#<models.Course object at 0x7fe264215668>
for item in obj.student_list:
    print(item.name)
    '''
    thanlon
    kiku
    '''
```
操作3：插入数据示例，需求“创建一个课程，创建两个学生，两个学生选新创建的课程”。这里使用relationship，
```py
obj = Course(title='math')
obj.student_list = [Student(name='Maria'), Student(name='Michael')]
session.add(obj)#在course表增加数据，在student表增加两条数据，在中间关系表中增加两条
session.commit()
```
<hr>

##### 6. 两种连接数据库的方式
( 1 ) 自己实例化session对象
```py
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Users
from threading import Thread

engine = create_engine(
    'mysql+pymysql://root:123456@127.0.0.1:3306/sqlalchemy_test?charset=utf8',
    max_overflow=0,  # 超过连接池大小外最多创建的连接
    pool_size=5,  # 连接池大小
    pool_timeout=30,  # 连接池中没有连接最多等待的时间，否则会报错，30s
    pool_recycle=-1,  # 多久之后对线程池中的线程中进行一次连接的回收（重置）-1表示不重置
)
SessionFactory = sessionmaker(bind=engine)

def task():
    # 去连接池获取一个连接
    session = SessionFactory()
    ret = session.query(Users).all()
    # 将连接交给连接池
    session.close()

if __name__ == '__main__':
    t = Thread(target=task)
    t.start()
```
如果用同一个连接，多线程请求数据时，这个连接很可能忙不过来，数据很有可能出现混乱。所以，实例化 session 对象（创建一个连接）的代码是不可以放在 task 函数外面（全局）。此外，<kbd>session.close()</kbd> 会把仅有的一个连接释放，其它线程是不可以用到的，因为这种情况下连接只创建了一次。
```py
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Users
from threading import Thread

engine = create_engine(
    'mysql+pymysql://root:123456@127.0.0.1:3306/sqlalchemy_test?charset=utf8',
    max_overflow=0,  # 超过连接池大小外最多创建的连接
    pool_size=5,  # 连接池大小
    pool_timeout=30,  # 连接池中没有连接最多等待的时间，否则会报错，30s
    pool_recycle=-1,  # 多久之后对线程池中的线程中进行一次连接的回收（重置）-1表示不重置
)
SessionFactory = sessionmaker(bind=engine)

# 去连接池获取一个连接
session = SessionFactory()

def task():
    ret = session.query(Users).all()
    # 将连接交给连接池
    session.close()

if __name__ == '__main__':
    t = Thread(target=task)
    t.start()
```
( 2 ) 通过Threading.Local实现的（推荐使用）

基于 Threading.Local 也是为每个线程获取一个连接。
```py
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Users
from threading import Thread
from sqlalchemy.orm import scoped_session

engine = create_engine(
    'mysql+pymysql://root:123456@127.0.0.1:3306/sqlalchemy_test?charset=utf8',
    max_overflow=0,  # 超过连接池大小外最多创建的连接
    pool_size=5,  # 连接池大小
    pool_timeout=30,  # 连接池中没有连接最多等待的时间，否则会报错，30s
    pool_recycle=-1,  # 多久之后对线程池中的线程中进行一次连接的回收（重置）-1表示不重置
)
SessionFactory = sessionmaker(bind=engine)
# 去连接池获取一个连接
session = scoped_session(SessionFactory)

def task():
    ret = session.query(Users).all()
    # 将连接交给连接池
    session.remove()

if __name__ == '__main__':
    t = Thread(target=task)
    t.start()
```
<hr>

##### 7. 原生SQL
Django 里面可以执行原生 SQL，SQLAlchemy 也可以执行原生 SQL，如果 SQL 语句比较复杂，ORM 解决不了，那么可以使用原生 SQL。SQLAlchemy 执行原生 SQL 的方式有好多种，在这里介绍其中两种。

方式1：
```py
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Users
from threading import Thread
from sqlalchemy.orm import scoped_session

engine = create_engine(
    'mysql+pymysql://root:123456@127.0.0.1:3306/sqlalchemy_test?charset=utf8',
    max_overflow=0,  # 超过连接池大小外最多创建的连接
    pool_size=5,  # 连接池大小
    pool_timeout=30,  # 连接池中没有连接最多等待的时间，否则会报错，30s
    pool_recycle=-1,  # 多久之后对线程池中的线程中进行一次连接的回收（重置）-1表示不重置
)
SessionFactory = sessionmaker(bind=engine)
# 去连接池获取一个连接
session = scoped_session(SessionFactory)

def task():
    '''
    方式1
    '''
    # 查询
    # cursor = session.execute('select *from users')
    # ret = cursor.fetchall()
    # 插入
    cursor = session.execute('insert users(name) values(:value)', params={'value': 'thanlon'})
    session.commit()
    print(cursor.lastrowid)

if __name__ == '__main__':
    t = Thread(target=task)
    t.start()
```
方式2：
```py
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Users
from threading import Thread
from sqlalchemy.orm import scoped_session

engine = create_engine(
    'mysql+pymysql://root:123456@127.0.0.1:3306/sqlalchemy_test?charset=utf8',
    max_overflow=0,  # 超过连接池大小外最多创建的连接
    pool_size=5,  # 连接池大小
    pool_timeout=30,  # 连接池中没有连接最多等待的时间，否则会报错，30s
    pool_recycle=-1,  # 多久之后对线程池中的线程中进行一次连接的回收（重置）-1表示不重置
)
SessionFactory = sessionmaker(bind=engine)
# 去连接池获取一个连接
session = scoped_session(SessionFactory)

def task():
    '''
    方式2
    '''
    conn = engine.raw_connection()
    cursor = conn.cursor()
    cursor.execute(
        'select *from users'
    )
    ret = cursor.fetchall()
    print(ret)  # ((1, 'liuyuqinhellohello'), (2, 'thanlon'), (3, 'thanlon'), (7, 'thanlon'))
    cursor.close()
    conn.close()

if __name__ == '__main__':
    t = Thread(target=task)
    t.start()
```
<hr>

#### pipreqs组件
<hr>

##### 1. pipreqs的安装
pipreqs 组件可以帮助我们找到项目中使用到的所有依赖库及其对应的版本信息并自动保存为
**`requirements.txt`** 文件，与我们一般使用的：
```python
$ pip freeze > xxx.txt
```
命令具有相同的功能。**`requirements.txt`** 文件可以被 PyCharm 识别，会提示我们安装依赖库。应用之前需要安装：
```python
$ pip install pipreqs -i https://mirrors.aliyun.com/pypi/simple
```
<font>pipreqs 是第三方组件，Flask 和 Django 中都可以使用！</font>

<hr>

##### 2. pipreqs的应用
在项目目录下执行 **`pipreqs ./`**，就会在当前目录生成 **`requirements.txt`** 文件：
```py
$ pipreqs ./
INFO: Successfully saved requirements file in ./requirements.txt
```
有的电脑是 unicode 编码，有的是 gbk (windows)。如果遇到编码错误，需要指定编码：
```py
$ pipreqs ./ --encoding=utf-8
```
生成的 **`requirements.txt`** 可以通过 **`pip install -r requirements.txt`** 命令来安装依赖库。

<hr>

#### Flask-Script组件
<hr>

##### 1. 安装Flask-Script
```py
$ pip install flask-script -i https://mirrors.aliyun.com/pypi/simple
```
<hr>

##### 2. 命令的方式启动项目
Flask-Script 使用命令的方式启动 Flask 项目：

**`manage.py:`**
```py
from app import create_app
from flask_script import Manager

app = create_app()
manager = Manager(app)
if __name__ == '__main__':
    # app.run(port=5051)
    manager.run()
```
在项目目录下执行下面的命令，还可以指定 IP 和端口：
```py
$ python manage.py runserver
$ python manage.py runserver -h 127.0.0.1
$ python manage.py runserver -h 127.0.0.1 -p 5051
```
<hr>

##### 3. 定制命令
( 1 ) 通过 <font>位置传参</font> 定制命令：
```py
from app import create_app
from flask_script import Manager

app = create_app()
manager = Manager(app)

@manager.command
def custom(arg):
    """
    自定义命令
    :return:
    """
    print(arg)

if __name__ == '__main__':
    # app.run(port=5051)
    manager.run()
```
```py
$ python manage.py custom 123456
123456
```
><font>可以把创建表的离线脚本写到函数中，运行的时候创建表。</font>

( 2 ) 通过 <font>关键字传参</font> 定制下面的命令：
```py
from app import create_app
from flask_script import Manager

app = create_app()
manager = Manager(app)

@manager.command
def custom(arg):
    """
    自定义命令
    :return:
    """
    print(arg)

@manager.option('-n', '--name', dest='name')
@manager.option('-u', '--url', dest='url')
def cmd(name, url):
    print(name, url)

if __name__ == '__main__':
    # app.run(port=5051)
    manager.run()
```
```py
$ python manage.py cmd -n erics -u https://www.erics1996.com
erics https://www.erics1996.com
```
<hr>

##### 4. Flask-Script应用
离线脚本做一些操作时可以通过自定制命令来执行，比如执行导入用户名密码、敏感字符到 excel 的离线脚本等操作。
<hr>

#### Flask-Migrate组件
<hr>

##### 1. Flask-Migrate组件的使用
Flask-Migrate 可以做 <font>数据库迁移</font>，与 Django 中数据迁移功能相同。Flask-Migrate 依赖于 flask_script 来执行命令：

**`manage.py:`**
```py
from app import create_app
from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand
from app import db

app = create_app()
manager = Manager(app)
Migrate(app, db)
manager.add_command('db', MigrateCommand)
"""
数据库迁移命令：
python manage.py db init
python manage.py db migrate # 相当于Django中makemigrations
python manage.py db upgrade # 相当于Django中的migrate
"""
if __name__ == '__main__':
    manager.run()
    # app.run(port=5051)
```
在项目目录下执行数据库迁移命令：
```py
$ python manage.py db init
$ python manage.py db migrate
$ python manage.py db upgrade
```
><font>执行迁移操作之前需要保证 models.py 中有写表对应的类，也要确保把导入 model.py，即 import app.models 或 from app.models import *</font>

<hr>

#### Flask-SQLALchemy组件
<hr>

##### 1. Flask-SQLALchemy的安装
```py
$ pip install flask-sqlalchemy -i https://mirrors.aliyun.com/pypi/simple
```
<hr>

##### 2. Flask-SQLALchemy的使用
**`__init__.py:`**
```py
from flask import Flask
from flask_session import Session
from flask_sqlalchemy import SQLAlchemy

"""
第一步：实例化SQLAlchemy
"""
db = SQLAlchemy()

from app.admin import admin as admin_blueprint
from app.home import home as home_blueprint

from .models import *


def create_app():
    app = Flask(__name__)
    app.config.from_object('settings.DevelopmentConfig')
    app.register_blueprint(admin_blueprint)
    app.register_blueprint(home_blueprint)
    Session(app)
    """
    第二步：初始化，读配置文件
    """
    # 缺少数据库连接，把数据库连接配置传到sqlalchemy，
    db.init_app(app)  # init_app方法源码可以查看已有的配置
    return app
```
><font>注意实例化 SQLAlchemy 必须在导入蓝图之前，因为蓝图中需要用到 db，db 必须在导入蓝图之前创建。还有，必须导入 models.py 才能生成表结构!</font>

**`settings.py:`**
```py
import redis

class BaseConfig(object):
	"""
	第三步：在配置文件写入配置
	"""
    SECRET_KEY = '0160a068dba74c5aa21f5b93cc6b95c5'
    # SQLALCHEMY配置
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://root:123456@localhost:3306/d5_video?charset=utf8mb4'
    SQLALCHEMY_TRACK_MODIFICATIONS = True
    SQLALCHEMY_POOL_SIZE = 10
    SQLALCHEMY_MAX_OVERFLOW = 10  # 最多超出10个连接
    # Redis配置
    SESSION_TYPE = 'redis'
    SESSION_REDIS = redis.Redis(host='127.0.0.1', port=6379, password='foobared')

class ProductionConfig(BaseConfig):
    DEBUG = False

class DevelopmentConfig(BaseConfig):
    DEBUG = True

class TestingConfig(BaseConfig):
    DEBUG = True
```
**`models.py:`**
```py
"""
第四步：创建与数据库表结构对应的类
"""
from app import db
from datetime import datetime

# db.Model=make_declarative_base
class Auth(db.Model):
    __tablename__ = "auth"
    __table_args__ = {'extend_existing': True}
    id = db.Column(db.Integer, primary_key=True)  # 编号
    name = db.Column(db.String(100), unique=True)  # 权限名称
    url = db.Column(db.String(255), unique=True)  # 权限名称
    addtime = db.Column(db.DateTime, default=datetime.now)  # 添加时间
```
**`create_tables.py:`**
```py
"""
第五步：创建生成数据表的离线脚本，需要使用到app上下文
"""
from app import db, create_app

app = create_app()  # from manage import app
app_ctx = app.app_context()  # AppContext对象里面有app和g
"""
1.去指定的请求上下文中找app,再去app中找配置文件和Models
2.在执行db.create_all()之前，必须先把app和g封装成AppContext对象，然后放到Local中，才就可以取到
3.没有用到应用上下文request/session。app上下文中有app和g，g没有用上，但app用上了！
4.为什么要把上下文管理分为应用上下文request/session和请求上下文app/g?
① Flask的SQLALchemy生成表结构时候用不上应用上下文request/session。
② 如果用到request/session需要传请求，并非http操作，生成表结构只是个离线脚本)
"""
"""
__enter__：LocalStack().push()，通过LocalStack把AppContext的对象(app_ctx)放到Local中
"""
with app_ctx:
    db.create_all()  # 内部会从app_ctx中获取app，再从app中获取配置文件
"""
__exit__：LocalStack().pop(),通过LocalStack再从Local中移出
"""
```
**`admin.py:`**
```py
from .. import admin
from app import db,models

@admin.route('/admin/')
def index():
    """
    添加数据，如果没有连接db.session(create_scoped_session)内部会自动创建连接
    """
    db.session.add(models.Auth(name='',url=''))
    db.session.commit()
    # 释放连接
    db.session.remove()
    """
    查询数据
    """
    ret = db.session.query(models.Auth).all()
    print(ret)
    db.session.remove()
    return 'index'
```
<hr>

##### 3. 源码相关图示
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200714055240749.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RoYW5sb24=,size_16,color_FFFFFF,t_70)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200714055354520.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RoYW5sb24=,size_16,color_FFFFFF,t_70)

![在这里插入图片描述](https://img-blog.csdnimg.cn/202007140604298.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RoYW5sb24=,size_16,color_FFFFFF,t_70)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200714060509650.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RoYW5sb24=,size_16,color_FFFFFF,t_70)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200714060616799.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RoYW5sb24=,size_16,color_FFFFFF,t_70)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200714060622541.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RoYW5sb24=,size_16,color_FFFFFF,t_70)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200714155629805.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RoYW5sb24=,size_16,color_FFFFFF,t_70)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200714155735868.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RoYW5sb24=,size_16,color_FFFFFF,t_70)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200714155727684.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RoYW5sb24=,size_16,color_FFFFFF,t_70)

<hr>

##### 2. 查询命令

<hr>

#### Flask简单登录案例
<hr>

##### 1. 案例目录结构
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190617090517640.jpg)

<hr>

##### 2. 案例主要代码
**`app.py：`**
```python
from flask import Flask, render_template, request, redirect, session

# app = Flask(__name__, static_folder='static', static_url_path='/thanlon')  # 可指定前缀
app = Flask(__name__)
app.secret_key = 'thanlon'


@app.route('/login', methods=['GET', 'POST'])  # 默认允许GET请求
def login():
    if request.method == 'GET':
        return render_template('login.html')
    username = request.form.get('username')
    pwd = request.form.get('pwd')
    if username == 'Thanlon' and pwd == '123':
        session['username'] = username  # 默认session保存在签名或加密的cookie中
        return redirect('/index')
    # return render_template('login.html', error='用户名或者密码错误！')
    return render_template('login.html', **{'error': '用户名或者密码错误！'})


@app.route('/index')  # 默认允许GET请求
def index():
    username = session.get('username')
    if not username:
        return redirect('/login')
    return render_template('index.html')


if __name__ == '__main__':
    app.run()
```
**`login.html：`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>登录</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css"
          integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
</head>
<body>
<div class="container">
    <div class="row" style="margin-top:30px">
        <div class="col-md-4 col-md-offset-4">
            <div class="panel panel-primary">
                <div class="panel-heading">登录</div>
                <div class="panel-body">
                    <form method="POST">
                        <div class="form-group">
                            <label>用户名</label>
                            <input type="text" name="username" class="form-control" id="" placeholder="Username"
                                   required="required">
                        </div>
                        <div class="form-group">
                            <label>密码</label>
                            <input type="password" name="pwd" class="form-control" placeholder="Password"
                                   required="required">
                            <div style="color:red">{{error}}</div>
                        </div>
                        <button type="submit" class="btn btn-primary">登录</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
</body>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/js/bootstrap.min.js"
        integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa"
        crossorigin="anonymous"></script>
</html>
```
**`index.html：`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>首页</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css"
          integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
</head>
<body>
<div class="container">
    <div class="row" style="margin-top:30px">
        <div class="panel panel-default">
            <div class="panel-body">
                欢迎{{session['username']}}进入首页！
            </div>
        </div>
    </div>
</div>
</body>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/js/bootstrap.min.js"
        integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa"
        crossorigin="anonymous"></script>
</html>
```
<hr>

#### Flask模板渲染
<hr>

##### 1. 数据类型的渲染
显示列表：

**`app.py：`**
```py
@app.route('/tpl')
def tpl():
    content = {
        'user': ['thanlon', 'kiku']
    }
    return render_template('tpl.html', **content)
```
**`tpl.html：`**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
{{ user.0 }}{#支持django的写法#}
{{ user[1] }}{#支持python的写法#}
</body>
</html>
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190810192024323.png)

显示元组：
**`app.py`**
```py
@app.route('/tpl')
def tpl():
    content = {
        'user': ('thanlon', 'kiku')
    }
    return render_template('tpl.html', **content)
```
**`tpl.html`**
```py
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
{{ user.0 }}
{{ user[1] }}
</body>
</html>
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190810192024323.png)

显示字符串：

**`app.py`**：
```python
@app.route('/tpl')
def tpl():
    content = {
        'txt': '<input type="text"/>'
    }
    return render_template('tpl.html', **content)
```
**`tpl.html`**：
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
{{ txt }}
{{ txt|safe }}
</body>
</html>
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190810192639638.png)

使用Markup函数：
**`app.py`**：
```py
@app.route('/tpl')
def tpl():
    content = {
        'txt': Markup('<input type="text"/>')
    }
    return render_template('tpl.html', **content)
```
**`tpl.html`**：
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
{{ txt }}
</body>
</html>
```
<hr>

##### 2. 传入函数
**`app.py`**：
```py
def func(arg):
    return arg + 1
@app.route('/tpl')
def tpl():
    content = {
        'func': func
    }
    return render_template('tpl.html', **content)
```
**`tpl.html`**：
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
{{ func(1) }}<!--2-->
</body>
</html>
```
<hr>

##### 3. 全局定义函数
传参的时候自己可以传，全局也可以传参，<kbd>template_global()</kbd> 装饰器就是用来传参的。

**`app.py`**：
```py
@app.template_global()
def test(a, b):
	# {{ test(1,2) }}
    return a + b
    
@app.route('/tpl')
def tpl():
    content = {
    
    }
    return render_template('tpl.html', **content)
```
**`tpl.html`**：
```py
……
<body>
{{ test(1,2) }}
</body>
…… 
```

template_filter() 装饰器也就是用来传参的，

app.py：
```py
@app.template_filter()
def test(a, b, c):
	# {{ 1|test(2,3) }}
    return a + b + c

@app.route('/tpl')
def tpl():
    content = {

    }
    return render_template('tpl.html', **content)
```
**`tpl.html`**：
```html
<body>
{{ 1|test(2,3) }}
{% if 1|test(2,3) %}
</body>
```
<kbd>template_filter()</kbd>与<kbd>template_global()</kbd>的区别是：template_filter 可以放在 if 后面做条件。
<hr>

##### 4. 模板的继承
tpl.html 继承 layout.html，

**`tpl.html`**：
```py
{% extends 'layout.html' %}
{% block content %}
    {% if 1|test(2,3) %}
        <div>True</div>
    {% else %}
        <div>False</div>
    {% endif %}
{% endblock %}
```
**`layout.html`**：
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<h4>继承</h4>
{% block content %}{% endblock %}
</body>
</html>
```
<hr>

##### 5. 模板的包含
**`tpl.html`**：
```html
{% include 'form.html' %}
```
**`form.html`**：
```html
<form action="">
    form表单
</form>
```
<hr>

##### 6. 宏定义的使用
**`tpl.html`**：
```html
{#默认是不显示的#}
{% macro input(name,type='text',value='') %}
    <input type="{{ type }}" name="{{ name }}" value="{{ value }}">
{% endmacro %}
{#如果想显示#}
{{ input('username') }}
```
<hr>

##### 7. 模板安全
前端：**`{{u|safe}}`**

后端：**`Markup("<input type="text">")`**
<hr>

#### Flask特殊的装饰器
<hr>

##### 1. before_request与after_request
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190811155842208.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RoYW5sb24=,size_16,color_FFFFFF,t_70)

```py
app = Flask(__name__)
app.config.from_object('settings.DevelopmentConfig')  # 引入配置文件

@app.before_request
def test1():
    print('before_request')

@app.after_request
def test2(response):
    print('after_request')
    return response

@app.route('/index')
def index():
    print('index')
    return 'index'

@app.route('/login')
def login():
    print('login')
    return 'login'

if __name__ == '__main__':
    app.run()
'''
before_request
index
after_request
'''
```

```py
@app.before_request
def test1():
    print('before_request_01')

@app.before_request
def test2():
    print('before_request_02')

@app.after_request
def test3(response):
    print('after_request_01')
    return response

@app.after_request
def test4(response):
    print('after_request_02')
    return response

@app.route('/index')
def index():
    print('index')
    return 'index'

@app.route('/login')
def login():
    print('login')
    return 'login'

if __name__ == '__main__':
    app.run()
'''
before_request_01
before_request_02
index
after_request_02
after_request_01
'''
```
如果 test1 函数有返回值，不执行 test2。

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190811161927617.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RoYW5sb24=,size_16,color_FFFFFF,t_70)

```py
@app.before_request
def test1():
    print('before_request_01')
    return ''

@app.before_request
def test2():
    print('before_request_02')

@app.after_request
def test3(response):
    print('after_request_01')
    return response

@app.after_request
def test4(response):
    print('after_request_02')
    return response

@app.route('/index')
def index():
    print('index')
    return 'index'

@app.route('/login')
def login():
    print('login')
    return 'login'

if __name__ == '__main__':
    app.run()
'''
before_request_01
after_request_02
after_request_01
'''
```
flask 和 <=django1.9 会执行所有的 response 返回，但是 django1.10 及之后的版本会这样执行：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190811162139839.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RoYW5sb24=,size_16,color_FFFFFF,t_70)

<hr>

##### 2. before_first_request

第一次请求的时候才执行，
```py
@app.before_first_request
def test():
    print('test')

@app.route('/index')
def index():
    return 'index'
```
<hr>

##### 3. template_global 与 template_filter
模板中有介绍，在这里不赘述。

<hr>

##### 4. errorhandler
```python
@app.errorhandler(404)
def page_not_found(arg):
    return 'This page does not exit'

@app.route('/index')
def index():
    return 'index'

if __name__ == '__main__':
    app.run()
```
<hr>

#### Flask扩展
<hr>

##### 1. 为什么将把Form和View分开

把 form 和 view 分开可以实现解耦合，即降低耦合

<hr>

##### 2. 控制文件上传的大小
```python
app.config('MAX_CONTENT_LENGTH') = 1024 * 1024 * 7 # 控制文件上传的大小为7MB 
```
<hr>

##### 3. Flask源码入口
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

##### 4. 上下文管理之请求上下文request/session

<hr>

##### 5.上下文管理之App上下文app/g

<hr>

##### 6. Flask中wsgi协议是如何体现的
体现在请求相关数据和响应相关数据上：environ、start_response
```python
from wsgiref.simple_server import make_server

def run_server(environ, start_response):
    start_response('200 OK', [('Content-Type', 'text/html')])
    return [bytes('<h1>Hello Erics!</h1>', encoding='utf-8'), ]

if __name__ == '__main__':
    httpd = make_server('127.0.0.1', 8000, run_server)
    httpd.serve_forever()
```
<hr>

##### 7. 获取当前日期
```python
import datetime
ctime = datetime.date.today()
```
<hr>

##### 8. 文件/文件夹压缩和解压缩


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
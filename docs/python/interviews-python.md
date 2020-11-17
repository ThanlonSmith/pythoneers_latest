m ![](../img/python-interview.jpg)
#### Python面试题
<hr>

##### 1. 写一个迭代器
```python
# 下面只是一个为序列类型写的迭代器例子
class Iterator(object):
    def __init__(self, data):
        self.data = data
        self.num = 0

    def __iter__(self):
        return self

    def __next__(self):
        if self.num < len(self.data):
            ret = self.data[self.num]
            self.num += 1
            return ret
        else:
            raise StopIteration


# iterator = Iterator("12345")
# iterator = Iterator([1, 2, 3, 4, 5])
iterator = Iterator((1, 2, 3, 4, 5))
print(iterator.__iter__())
print(iterator.__next__())
print(iterator.__next__())
print(iterator.__next__())
print(iterator.__next__())
print(iterator.__next__())
# for i in iterator:
#    print(i)
```
<hr>

##### 2. 基于列表实现一个栈
```python
class Stacklist(object):
    def __init__(self):
        self.data = []
    def push(self,val):
        self.data.append(val)
    def pop(self):
        self.data.pop()
    def top(self):
        return self.data[-1]
sl = Stacklist()
sl.push('thanlon')
sl.push('kiku')
print(sl.top()) # kiku
sl.pop()
print(sl.top()) # thanlon
```
<hr>

##### 3. 使用直接插入排序对 57 68 59 52 进行排序
```js
# 首先比较前两个数57和68，因为57<68，所以不交换57和68的位置
57 68 59 52
# 接下来比较68和59，因为68>59，所以需要交换58和59的位置
57 59 68 52
# 因为59的前面还有57，所以比较57和59，因为57<59，所以不交换位置
57 59 68 52
# 再接下来比较68和52，因为52<68，所以交换52和68的位置
57 59 52 68
# 因为52的前面有59，所以比较59和52，因为59>52，所以交换位置
57 52 59 68
# 因为52的前面还有57，所以比较52和57，因为52<57，所以交换位置
52 57 59 68
```
直接插入排序的优点是简单明了，缺点是速度很慢。

<hr>

##### 4. 使用冒泡排序对 57 68 59 52 进行排序
```python
# 57与68比较，57<68，不交换位置
57 68 59 52
# 68与59比较，68>59，交换位置
57 59 68 52
# 68与52比较，68>52，交换位置
57 59 52 68
# 57与59比较，57<59，不交换位置
57 59 52 68
# 59与52比较，59>52，交换位置
57 52 59 68
# 59与68比较，59<68，不交换位置
57 52 59 68
# 52与57比较，57>52，交换位置
52 57 59 68
# 57与59比较，57<59，不交换位置
52 57 59 68
# 59与68比较，59<68，不交换位置
52 57 59 68
```

<hr>

##### 5. 编程实现冒泡排序
```python
def sort(lst):
    length =  len(lst)
    for i in range(0,length-1):
        for j in range(0,length-1-i):
            if lst[j]>lst[j+1]:
                lst[j],lst[j+1] = lst[j+1],lst[j]
    return lst
print(sort([57,68,59,52]))
```
或
```python
def sort(lst):
    length = len(lst)
    for i in range(length-1,0,-1):
        for j in range(0,i):
            if lst[j]>lst[j+1]:
                lst[j],lst[j+1] = lst[j+1],lst[j]
    return lst
print(sort([57,68,59,52]))
```
冒泡排序的优化：
```python
def bubble_sort(alist):
    n = len(alist)
    for i in range(n - 1, 0, -1):
        count = 0
        for j in range(i):
            if alist[j] > alist[j + 1]:
                alist[j], alist[j + 1] = alist[j + 1], alist[j]
                count += 1
        if count == 0:
            return
    return alist

test_list = [9, 2, 3, 3, 1, 0]
bubble_sort(test_list)
print(test_list)
"""
[0, 1, 2, 3, 3, 9]
"""
```
<hr>

##### 6. 写出二叉树的前序遍历、中序遍历和后序遍历

![在这里插入图片描述](https://img-blog.csdnimg.cn/20191027143900428.png)

( 1 ) 前序遍历：根节点、左节点、右节点的顺序规则，所以该二叉树的前序遍历结果是：ABDECF

( 2 ) 中序遍历：左节点、根节点、右节点的顺序规则，所以该二叉树的中序遍历结果是：DBEAFC

( 3 ) 后续遍历：左节点、右节点、根节点的顺序规则，所以该二叉树的后序遍历结果是：DEBFCA

<hr>

##### 7. Web 攻击的方式有哪些
( 1 ) XSS（ Cross-Site Scripting ）跨站脚本攻击， 在 Web 界面插入恶意脚本，用户在浏览页面时执行脚本。

( 2 ) SQL 注入，通过输入拼接成 sql 语句并执行

( 3 ) DDos 是分布式拒绝服务攻击，是向服务器发送大量请求，导致服务器瘫痪

( 4 ) CSRF（ Cross-Site Request Forgeries ) 是跨站请求伪造，用户本地浏览器存储 cookie，攻击者利用用户的 cookie 进行认证，然后伪造用户发出请求

<hr>

##### 8. 设计一张用户评论表
```sql
create table if not exists comment(
	id int primary key auto_increment,
	addtime datetime not null,
	context text not null,
	article_id int,
	user_id int,
	constraint comment_fk_user foreign key(user_id) REFERENCES user(id),
	constraint comment_fk_article foreign key(article_id) REFERENCES article(id)
)engine=innodb default charset=utf8;
```

<hr>

##### 9. == 和 is 的区别
== 比较的是值是否相等，is 比较的是内存地址是否相等

PS：
```python
lst1 = [1,2,3]
lst2 = [4,5,6]
print(lst1==lst2) # False
print(lst1 is lst2) # False
```
```python
lst1 = [1,2,3] 
lst2 = [1,2,3]
print(lst1 == lst2) # True
print(lst1 is lst2) # False
```
```python
lst1 = [1,2,3]
lst2 = lst1
print(lst1==lst2) # True
print(lst1 is lst2) # True
```
```python
a = 1
b = 2
print(a==b) # False
print(a is b) # False
```
```python
a = 1
b = 1
print(a == b) # True
print(a is b) # True
```
```python
a = 1
b = a
print(a == b) # True
print(a is b) # True
```
```python
app1 = Flask(__name__)
app2 = Flask(__name__)
print(app1 == app2) # False
print(app1 is app2) # False
```
```python
app1 = Flask(__name__)
app2 = app1
print(app1 == app2) # True
print(app1 is app2) # True
```
<hr>

##### 10. session 和 cookie 的联系和区别
( 1 ) Session 是保存在服务器端的数据，<font>本质上是键值对</font>。一般用于 Web
网站的时候保持与用户之间的会话，即记录用户的的登录状态，实现登录之后不要求再次登录的功能。它的优点：敏感信息不会直接给客户端。Session 的应用依赖 Cookie，Session 需要通过 Cookie 写给客户端浏览器。

( 2 ) Cookie 是保存在客户端 (浏览器) 上的键值对!
<hr>

##### 11. Web 请求的方法
GET：请求指定的页面信息，并返回实体主体

HEAD：类似于 GET 请求，只不过返回的响应中没有具体的内容，用于获取报头

POST：向指定资源提交数据进行处理请求 ( 例如提交表单或者上传文件 ) 。数据被包含在请求体中。POST 请求可能会导致新的资源的建立和/或已有资源的修改

PUT：从客户端向服务器传送的数据取代指定的文档的内容

DELETE：请求服务器删除指定的页面

CONNECT：HTTP/1.1 协议中预留给能够将连接改为管道方式的代理服务器

OPTIONS：允许客户端查看服务器的性能

TRACE：回显服务器收到的请求，主要用于测试或诊断

PATCH：是对 PUT 方法的补充，用来对已知资源进行局部更新

<hr>

##### 12. 递归求n!
```python
def factorial(n):
    if n==1:
        return n
    return n*factorial(n-1)
print(factorial(3))
```

<hr>

##### 13. 递归求1!+2!+3!+...+n!
```python
def sum(n):
    sum = 0
    def fun(n):
        if n==1:
            return n
        return n*fun(n-1)
    for i in range(1,n+1):
        sum += fun(i)
    return sum
print(sum(5))
```

<hr>

##### 14. 数据类型中哪些是可变的类型，哪些是不可变得类型
( 1 ) 整型、布尔、字符串、元组是不可变数据类型

( 2 ) 列表、字典、集合是可变数据类型。

判断是否是可变类型和不可变类型：当该数据类型的对应变量的值发生了改变，那么它对应的内存地址也会发生改变，对于这种数据类型，就称不可变数据类型。当该数据类型的对应变量的值发生了改变，那么它对应的内存地址不发生改变，对于这种数据类型，就称可变数据类型。

<font>简而言之：不可变数据类型更改后地址发生改变，可变数据类型更改地址不发生改变。</font>

<hr>

##### 15. 写一个脚本接收两个参数
```python
import sys

if len(sys.argv) != 3:
    print('参数不满足题意！')
    # sys.exit(0)
else:
    print(sys.argv, type(sys.argv)) # ['argv_test.py', '/home/thanlon/test.txt', 'content'] <class 'list'>
    print(len(sys.argv)) # 3
    print(sys.argv[1]) # /home/thanlon/test.txt
    print(sys.argv[2]) # content
    file_path = sys.argv[1]
    content = sys.argv[2]
    with open(file_path, mode='w', encoding='utf-8') as f:
        f.write(content)
```
```python
$ python argv_test.py /home/thanlon/test.txt content
```
<hr>

##### 16. 编程求出400万以内最大的斐波那契数，并求出它是第几个斐波那契数
```py
num1 = 0
num2 = 1
count = 0
while num2 < 4000000:
    num1, num2 = num2, num1 + num2
    count += 1
print(num1, count)
```

<hr>

##### 17. 数据类型的有无序性
元组和列表是有序的，集合和字典是无序的，但是 Python3.6 之后字典是有序的。<font>可以认为元组、列表和字典都是有序的，只有集合是无序的。</font>

<hr>

##### 18. 写一个装饰器
普通的装饰器：
```python
def wrapper(func):
    def inner(*args, **kwargs):
        data = func(*args, **kwargs)
        return data
    return inner

@wrapper
def func():
    pass
```
带参数的装饰器：
```python
def x(name):
    def wrapper(func):
        def inner(*args, **kwargs):
            data = func(*args, **kwargs)  # 执行原函数并获取返回值
            return data
        return inner
    return wrapper

@x('erics')  # index = x('erics')(index)
def index():
    pass
```
<hr>

##### 19. Python 中有哪些数据类型
整型 ( 数字 )，布尔，字符串，列表，元组，字典，集合，None。
<hr>

##### 20. Python 数据类型中哪些是序列类型
字符串、列表和元组
<hr>

##### 21. 什么是守护进程和僵尸进程
( 1 ) 守护进程：一直在后台运行，不与任何终端关联的进程，通常情况下守护进程在系统启动时就在运行

( 2 ) 僵尸进程：如果子进程终止了，而父进程没有获取子进程的状态信息，这时候子进程的 <font>进程描述符</font> 仍然会保存在系统中，这种进程称为僵尸进程。

<hr>

##### 22. Python2 中的 xrange 和 range 与 Python3 中 range 有什么区别和联系
( 1 ) Python2：xrange 不会在内存中立刻把值创建出来，<font>而是在循环的时候，边循环边创建</font>；range 会在内存中立即把所有的值都创建。
```python
xrange(1,11)
Out[2]: xrange(1, 11)
Out[3]: range(1,11)
Out[4]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```
( 3 ) Python3：Python3 中的 range 就是 Python2 中的 xrange，和 Python2 中的 xrange 一样不会在内存中立刻创建，而是在循环的时候，边循环边创建。<kbd>list(range())</kbd> 等价于 Python2 中的 range。
```python
range(1,11)
Out[2]: range(1, 11)
list(range(1,11))
Out[3]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```
<hr>

##### 23. Python 中 pass 语句的作用是什么
我们在写代码时，有时可能只写了函数声明而没想好函数怎么写，但为了保证语法检查的正确必须输入一些东西。在这种情况下，我们使用 pass 语句。pass 语句什么也不做，一般作为占位符或者创建占位程序。

<hr>

##### 24. Python 是如何进行类型转换的
Python 提供了一系列将变量或值从一种类型转换成另一种类型的内置函数。如常见的类型转换：字符串转数字使用的 int、float
函数；数字转字符串使用 str 函数；列表转元组使用 tuple 函数；元组转类表使用 list 函数；数字、字符串、列表、元组转布尔类型使用 bool 函数。

<hr>

##### 25. Python 是如何进行内存管理的
Python 使用一个私有堆内存空间来放置所有对象和数据结构，我们无法访问它。不过使用一些核心 API，我们可以访问一些Python内存管理工具来控制内存分配。

( 1 ) 对象的引用计数机制。Python 使用引用计数来保持追踪内存中的对象，所有对象都有引用计数。<font>当一个对象分配了一个新的名称和将对象放到一个列表或元组中引用计数都会增加 1</font>。使用 del 语句销毁对象别名，引用计数就是减1。

( 2 ) 垃圾回收机制。当一个对象的引用计数归零时，它将被垃圾收集机制处理掉。

( 3 ) 内存池机制。为了加速 Python 的执行效率，Python 引入了一个内存池 Pymalloc 机制，<font>用于管理对小块内存的申请和释放</font>。Python 中所有小于 256 个字节的对象都使用了 Pymalloc 机制实现的分配器，而大的对象则使用系统的 malloc。对于 Python
对象，如 int、float 和 list，都有其独立的私有内存池，<font>对象间不共享他们的内存池</font>。也就是说如果你分配又释放了大量的整数，用于缓存这些整数的内存就不能再分配给浮点数。

<hr>

><font>sys.getrefcount( )函数可以获得对象的当前引用计数。</font>

<hr>

##### 26. Python2 中字典的 items 方法与 iteritems 方法的不同
<kbd>items()</kbd> 方法将字典中的键值以列表的方式返回，而 <kbd>iteritems()</kbd> 方法返回的是字典迭代器对象。
```python
# items方法
dict1 = {'name': 'thanlon', "age": '23'}
ret = dict1.items()
print ret, type(ret) # [('age', '23'), ('name', 'thanlon')] <type 'list'>
```
```python
# iteritems方法
dict1 = {'name': 'thanlon', "age": '23'}
ret = dict1.iteritems()
print ret, type(ret) # <dictionary-itemiterator object at 0x7f73b3147dd0> <type 'dictionary-itemiterator'>
```
<hr>

##### 27. 什么是 lambda 函数，使用它有什么好处
lambda 函数其格式是：函数名 = lambda 参数:表达式。使用 lambda 函数可以用来定义匿名函数，解决简单函数。lambda 函数可以接受任意个参数，包括可选参数，<font>但是表达式只有一个</font>。通常是在需要一个函数，但是又不想为函数命名的场合下使用。

<hr>

##### 28. 说明 os 和 sys 模块不同并列举它们常用的方法
os 模块可以提供一种方便的使用操作系统函数的方法。sys 模块可以提供访问 <font>由解释器使用或维护的变量</font>和在与解释器交互中使用到的函数。

( 1 ) os 常用的方法：
```python
os.remove()  # 删除文件
os.rename()  # 重命名文件
os.walk()  # 生成目录树下的所有文件
os.chdir()  # 改变目录
os.mkdir()  # 创建一层目录
os.makedirs()  # 创建多层目录
os.rmdir()  # 删除一层目录
os.removedirs()  # 删除多层目录
os.listdir()  # 列出指定目录的文件
os.getcwd()  # 取得当前工作目录
os.chmod()  # 改变目录权限
os.path.basename()  # 去掉目录路径，返回文件名
os.path.dirname()  # 去掉文件名，返回目录路径
os.path.join()  # 将分离的各部分组合成一个路径名
os.path.split()  # 返回(dirname(),basename())元组
os.path.getatime()  # 返回最近访问时间
os.path.getctime()  # 返回创建时间
os.path.getmtime()  # 返回修改时间
os.path.getsize()  # 返回文件大小
os.path.exists()  # 返回文件是否存在
os.path.isabs()  # 是否为绝对路径
os.path.isdir()  # 是否为目录
os.path.isfile()  # 是否为文件
```
( 2 ) sys 常用的方法：
```python
sys.argv  # 命令行参数列表，第一个元素是程序本身路径
sys.modules.keys()  # 返回所有已经导入的模块列表
sys.exc_info()  # 获取当前正在处理的异常类exc_type、exc_value、exc_traceback当前处理的异常信息
sys.exit(n)  # 退出程序，正常退出时exit(0)
sys.hexversion  # 获取python解释程序的版本值，16进制格式
sys.version
print(sys.maxsize)
sys.maxunicode  # 最大的unicode值
sys.modules  # 返回系统导入的模块字段
sys.path  # 返回模块的搜索路径，初始化时使用python path环境变量的值
sys.platform  # 返回操作系统平台名称
sys.stdout  # 标准输出
sys.stdin  # 标准输入
sys.stderr  # 错误输出
sys.exec_prefix  # 用来清除当前线程所出现的当前的或最近的错误信息
sys.byteorder  # 本地字节规则的提示器,big-endian平台的值是'big'，little-endian平台的值是‘little’
sys.copyright  # 记录python版本相关的东西
sys.api_version  # 解释器的C的api版本
sys.version_info  # 获取python解释程序的版本信息
```
<hr>

##### 29. os.path 和 sys.path 的区别
( 1 ) os.path 是模块，包含了各种处理长文件名、路径名的函数。

( 2 ) sys.path 是个由模块的目录名构成的列表，这些目录是 Python 模块的搜索路径，Python 从这些路径查找扩展模块。

<hr>

##### 30. 解释生成器与函数的不同，并实现简单生成器
与普通函数不同的是，带有 yield 关键字的函数才是生成器。一般函数在生成值后退出，<font>生成器函数在生成值后会自动挂起并暂停它的执行状态</font>。生成器用来一点点产生数据的，只有被 for 循环时，生成器函数内部的代码才会被执行，生成器每次循环都会获取 yield 返回的值。
```python
def func():
    print('f1:', end='')
    yield 'f1'
    print('f2:', end='')
    yield 'f2'

v = func()
print(v, type(v))
for i in v:
    print(i)
''''
<generator object func at 0x7f86f3c554d0> <class 'generator'>
f1:f1
f2:f2
'''
```
<hr>

##### 31. Python 里面如何实现 tuple 和 list 的相互转换
tuple 转 list 使用 <kbd>list()</kbd> 函数；list 转 tuple 使用 <kbd>tuple()</kbd> 函数。

<hr>

##### 32. 请写出一段 Python 代码实现删除一个 list 里面的重复元素
( 1 ) 第一种方法，使用 for 循环+另外一个列表
```python
lst = [1, 1, 2, 3, 2, 3, 3, ]
lst2 = []
for i in lst:
    if i not in lst2:
        lst2.append(i)
print(lst2)
"""
[1, 2, 3]
"""
```
( 2 ) 第一种方法是先将 list 先转为 set 再转回 ( 因为 set 是无序的，元素的顺序可能发生改变，但也实现了去重 )：
```python
lst = [1, 1, 2, 3, 2, 3, 3, ]
ret = list(set(lst))
print(ret)
```
( 3 ) 第二种方法是将 list 先转为 dict 再转回 ( for 循环将元素放到 dict 的设置为 key 也是可以的，只是这里应用了 dict的 <kbd>fromkeys()</kbd>方法 )：
```python
lst = [1, 1, 2, 3, 2, 3, 3, ]
b = {}
b = b.fromkeys(lst)
print(b)  # {1: None, 2: None, 3: None}
print(b.keys())  # dict_keys([1, 2, 3])
print(list(b.keys()))  # [1, 2, 3]
```
( 4 ) 若 list 中全部是整型数据，在不要求顺序的情况下可以先使用 <kbd>sort()</kbd> 排序，然后再去重。下一题就是个例子。

第二种方法利用了字典的 key 不能重复的特性。有时候面试官会问除了使用第一种方法之外还有没有其它方法？会第二种方法会给自己加分的。

<hr>

##### 33. 编程用 sort 进行排序，然后从最后一个元素开始判断去重
排序好的列表中的倒数第二个元素，不要使用负索引，要使用正索引去做。
```python
def sort_quchong(lst):
    # 对列表排序
    lst.sort()
    # 获取最后一个元素
    last_item = lst[-1]
    # 从倒数第二个元素开始向前遍历，到第一个元素位置结束
    for i in range(len(lst) - 2, -1, -1):
        # 如果存在和列表最后一个元素相同的元素就直接删除
        if lst[i] == last_item:
            del lst[i]
        # 否则就把当前元素赋值给最后一个元素(前提已经说清楚是已经排过序的)
        else:
            last_item = lst[i]
    return lst


ret = sort_quchong([1, 3, 4, 2, 1, 0, 3, -5, 0, -5, 0])
print(ret)
"""
[-5, 0, 1, 2, 3, 4]
"""
```
<hr>

##### 34. 介绍 except 的作用和如何使用它
( 1 ) except的作用：Python 的 except 用来捕获所有异常， 因为 Python 里面的每次错误都会抛出一个异常，所以每个程序的错误都被当作一个运行时错误。

( 2 ) 如何使用：
```python
try:
    pass
except NotImplemented as e:
    pass
except Exception as e:
    pass
else:
    pass
finally:
    pass
```
else 和 finally 是可选的。执行 try 下的语句，如果引发异常，则执行过程会跳到 except 语句。对每个 except
分支顺序尝试执行，如果引发的异常与 except 中的异常组匹配，执行相应的语句。如果所有的 except
都不匹配，则异常会传递到下一个调用本代码的最高层 try 代码中。try 下的语句正常执行，则执行 else 块代码。如果发生异常，else 块代码就不会执行。如果存在
finally 语句，最后总是会执行。

<hr>

##### 35. 如何用 Python 查询和替换一个文本字符串
可以使用re模块中的 <kbd>sub()</kbd> 和 <kbd>subn()</kbd> 方法进行查询和替换，
```python
# replacement是被替换成的文本，string 是需要被替换的文本，count是一个可选参数，指最大被替换的数量
sub(replacement, string[,count=0])
```
subn 方法执行的作用跟 sub 一样，<font>不过它会返回一个具有两个元素的元组</font>，两个元组分别是：替换后的新的字符串和总共替换的数量。

第一种方法：使用 sub 方法：
```python
import re

p = re.compile('a|ab|abc')  # 优先替换a,其次是ab,最后的是abc
ret = p.sub('x', 'ababc')
print(ret)  # xbxbc
ret2 = p.sub('x', 'aababc', 2)
print(ret2)  # xxbabc
```
第二种方法：使用 subn 方法：
```python
import re

p = re.compile('a|ab|abc')  # 优先替换a,其次是ab,最后的是abc
ret = p.subn('x', 'ababc')
print(ret)  # ('xbxbc', 2)
ret2 = p.subn('x', 'aababc', 1)
print(ret2)  # ('xxbabc', 1)
```
<hr>

##### 36. 介绍一下 Python 下 range 函数的用法
一般在循环中使用，遍历序列类型的索引。range 函数不会在内存中立刻把值创建出来，而是在循环的时候，边循环边创建。

<hr>

##### 37. 有两个序列 a，b，大小都为 n，序列元素的值任意整形数，无序
要求：通过交换 a，b 中的元素，使序列 a 元素的和与序列 b 元素的和之间的差最小。
```py

```
<hr>

##### 38. 有没有一个工具可以帮助查找 Python 的 bug 和进行静态的代码分析
PyChecker 是一个 Python 静态代码整分析工具，它可以帮助查找 Python 代码的 bug，会对代码的复杂度和格式提出警告。Pylint
也是一个 Python 静态代码分析工具，它可以查找编程错误、帮助执行编码标准并提供简单的重构建议。

<hr>

##### 39. 如何在一个函数里面设置一个全局的变量
使用 global 关键字可以在函数里面设置一个全局变量。

<hr>

##### 40. 单引号，双引号，三引号的区别
( 1 ) 换行：单因号和双引号都需要使用斜杠 \，三引号可以直接换行，不使用斜杠。

( 2 ) 表示特殊字符串时，如字符串中有引号：单引号需要通过斜杠 \ 转义字符串中的单引号。字符串中有单引号，双引号不需要转义，有双引号的时候需要转义。不论里面是单引号还是双引号三引号不要转义，三引号里面有三引号，需要分别对构成三引号的双引号做转义，单三引号无须转义。

<hr>

##### 41. 用 Python 匹配 HTML 标签的时候，<.\*> 和 <.*?> 有什么区别
( 1 ) <.\*> 这种是是贪婪匹配，尽可能多地匹配字符

( 2 ) <.\*?>是非贪婪匹配，尽可能少地匹配字符

<hr>

##### 42. 如何理解释实例方法、静态方法和类方法
( 1 ) 实例方法：如果需要使用到对象中封装的值，可以使用实例方法，实例方法的调用方式是 <kbd>对象.方法名</kbd>

( 2 ) 静态方法：如果方法无需使用对象中的封装的值，那么就可以使用静态方法。写静态方法时上方需要写
<font>@staticmethod</font>，方法中参数可有可无，参数中不可以用 self，否则会出错。解释器执行时也不会将 self 自动传入参数列表。静态方法调用时，可以使用 <kbd>类.方法名</kbd>，也可以使用 <kbd>对象.方法名</kbd>，但推荐类来调用。

( 3 ) 如果在方法中会使用到当前类，那么就可以使用类方法。定义类方法时，方法上方写 <font>@classmethod</font>，方法中至少有一个参数 cls。类方法和静态方法一样，可以使用类.方法名，也可以使用对象.方法名，但推荐类来调用。

<hr>

##### 43. 迭代器和生成器是什么
( 1 ) 对可迭代对象 ( str、list、tuple、dict、set ) 中的元素进行逐一获取，具有 \_ \_ next \_ \_ 方法且每次调用都获取可迭代对象中的元素 ( 从前到后一个一个获取 )

( 2 ) 函数中如果存在 yield，那么这个函数就是一个生成器函数。调用一个生成器函数会返回一个生成器对象，<font>生成器只有被for循环时，生成器函数内部的代码才会被执行</font>，生成器每次循环都会获取 yield 返回的值。

<hr>

##### 44. 鸭子类型是什么
在鸭子类型中，关注的不是对象的类型，而是对象具有的行为 ( 方法 )。例如，在不使用鸭子类型的语言中，我们可以编写一个函数，它接受一个类型为鸭的对象，并调用它的走和叫方法。在使用鸭子类型的语言中，这样的一个函数可以接受一个任意类型的对象，并调用它的走和叫方法。
```python
class Duck:
    def walk(self):
        print('walk!')

    def shout(self):
        print('shout!')

class Dog:
    def walk(self):
        print('walk!')

    def shout(self):
        print('shout!')

class Chicken:
    def walk(self):
        print('walk!')

    def shout(self):
        print('shout!')

def fun(arg):
    arg.walk()
    arg.shout()

if __name__ == '__main__':
    duck = Duck()
    fun(duck)
    chicken = Chicken()
    fun(chicken)
"""
walk!
shout!
walk!
shout!
"""
```
<hr>

##### 45. @property的作用是什么
属性是通过方法改造的，属性代码编写时需要在方法的上面加上 <font>@property</font>，方法的参数只有一个 self。属性在调用时，无需加括号，使用 <kbd>对象.方法名</kbd>。属性的应用场景是对于简单的方法，<font>当不需要传参且有返回值时可以使用</font>。

<hr>

##### 46. 类变量和实例变量
( 1 ) 类变量，也称为静态字段。类变量是在类中定义的变量，类变量的访问，可以使用类访问，也可以使用对象访问。优先使用类访问，实在不方便，才使用对象访问。

( 2 ) 实例变量，也称为字段。实例变量是在 <kbd>\_ \_ init \_ \_</kbd> 方法中定义的变量，实例变量是使用对象访问。

<hr>

##### 47. 装饰器是什么
在不过改变原函数内部代码的基础上，在函数执行前后自定义功能（在原函数执行之前和之后自动执行某个功能。装饰器本质上是一个函数，而且使一个 <font>双层函数</font>。

<hr>

##### 48. 如何解释多进程和多线程，它们的区别是什么
( 1 ) 进程是资源分配的最小单位，<font>创建和销毁开销较大</font>。线程是 CPU 调度的最小单位，<font>开销小，切换速度快</font>。操作系统将 CPU 时间片分配给多个线程，每个线程在指定放到时间片内完成。操作系统不断从一个线程切换到另一个线程执行，宏观上看就好像是多个线程一起执行。Python 中由于全局锁 ( GIL ) 的存在导致同一时间只有一个获得 GIL 的线程在跑，其他线程则处于等待状态，<font>这导致了多线程只是在做分时切换，并不能利用多核</font>。

( 2 ) 多进程中同一个变量各自有一份拷贝在每个进程中，互不影响。线程中，所有变量都由所有线程共享，任何一个变量都可被任何一个线程修改。线程之间共享数据的最大危险在于多个线程同时更改一个变量。

<hr>

##### 49. Python的特点和优点有什么
解释性的语言、具有动态特性、面向对象编程、语法简洁、开源、有丰富的社区资源、有很多实用性很强的库 ( 机器学习库、web开发库、科学计算库等 )，可以做很多事情。

<hr>

##### 50. 深拷贝和浅拷贝的区别是什么
深拷贝：将<font>对象本身</font>复制给另一个对象，这意味着如果对象的副本进行修改，那么不会影响原对象。在 Python 中，使用 <kbd>deepcopy()</kbd> 函数进行深拷贝

浅拷贝：将<font>对象的引用</font>复制给另一个对象，如果在副本中进行修改，会影响到原对象。使用 <kbd>copy()</kbd> 函数进行浅拷贝。

PS：

( 1 ) 遇到不可变类型，深浅拷贝都不会拷贝一份 ( 不需要重新开辟内存 )，用的都会是原来的那份 ( 其实不应该是原来的那份，是由于 Python 中小数据池的缘故 )

( 2 ) 遇到可变类型，浅拷贝只拷贝第一层 ( 需要开辟内存空间 )，里面的值都来自原来的那份。而深拷贝拷贝嵌套层次中的所有可变类型 ( 第一层需要开辟内存空间，拷贝嵌套的可变类型也需要开辟内存空间 )，嵌套的可变类型里面的值来自原来的那份 。如果元组
( 不可变类型 ) 中嵌套有可变类型的数据，浅拷贝不拷贝里面的值，用原来那份。但是深拷贝会把这个元组重新拷贝一份
 
<hr>

##### 51. 列表和元组有什么不同
列表 ( list ) 是可变类型，元组 ( tuple ) 是不可变类型。列表中的数据修改之后内存地址不发生改变，但元组中的会发生改变。

<hr>
><font>数字、字符串、布尔和元组是不可变类型。列表、集合、字典是可变类型。这基本上是面试必问的问题。</font>

<hr>

##### 52. 解释 Python 中的三元表达式
Python 的中三元表达式的语法格式是：
```python
[语句1] if [条件] else [语句2]
```
如果条件是真，语句 1 部分被执行，否则语句 2 部分被执行。其它语言，如 javascript 的三元表达式语法格式是：
```python
[条件]?[语句1]:[语句2]
```
同样如果条件为真，则语句1被执行，条件为假则语句2被执行。

<hr>

##### 53. Python 中如何实现多线程
线程是轻量级的进程，多线程允许一次执行多个线程。<font>Python 是一种多线程语言</font>，它有一个多线程包。

全局解释器锁GIL可以 <font>确保一次执行单个线程</font> 。一个线程保存 GIL 并在将其传递给下一个线程之前执行一些操作，这就产生了并行执行的错觉。但实际上，只是线程轮流在
CPU 上。当然，所有传递都会增加执行的开销。

<hr>

##### 54. 解释继承
继承是实现代码的复用。一个类可以继承另外一个类，被继承的类称为父类，继承的称为子类。面向对象里的继承也就是父类的相关的属性可以被子类重复使用，子类不必再在自己的类里面重新定义一回。需要用到的新的属性和方法时，子类也可以自己来扩展。增加了类的耦合性，使得代码更加规范化、合理化。继承使我们可以重用代码，并且还可以更方便地创建和维护代码。继承的分类有，

( 1 ) 单继承： 一个子类类继承自单个基类

( 2 ) 多重继承：一个子类继承自多个基类

( 3 ) 多级继承：一个子类继承自一个基类，而基类继承自另一个基类

( 4 ) 分层继承：多个子类继承自同一个基类

( 5 ) 混合继承：两种及以上继承类型的总和
<hr>

##### 55. 什么是 Flask
Flask 是一个使用 Python 编写的轻量级 Web 应用框架，使用 BSD 授权。其 WSGI 工具箱采用 Werkzeug，模板引擎则使用 Jinja2。除了 Werkzeug 和 Jinja2 以外几乎不依赖任何外部库。Flask 的会话使用签名 cookie 来允许用户查看和修改会话内容。它会记录从一个请求到另一个请求的信息。但如果要修改会话，则必须有密钥 Flask.secret_key。

<hr>

##### 56. 对list进行分页

<hr>

##### 57.  解释 Python 中的 help 函数和 dir 函数
<kbd>help</kbd> 函数返回帮助文档和参数说明；

<kbd>dir</kbd> 返回对象中的所有成员，如 <kbd>dir(list)</kbd>。

<hr>

##### 58. 当退出 Python 时是否释放所有内存分配
否；那些具有对象循环引用或全局命名空间引用的变量，在 Python 退出后一般是不被释放的。

<hr>

##### 59. 什么是猴子补丁
在程序运行时动态修改类和模块。

<hr>

##### 60. 什么是Python字典
字典是 Python 中一种数据结构，由键值对组成，类似 json 的键值对形式。<font>Python3.6 及其之后的版本字典有序的。</font>

<hr>

##### 61. 能否解释一下 *args 和 **kwargs
( 1 ) 如果我们不知道将多少个参数传递给函数，可以使用 *args。args 不支持关键字传参，只支持位置传参，可以接收任意个数的位置参数，并将参数转换成元组。

( 2 ) 当我们不知道将会传入多少关键字参数时，使用 **kwargs 会收集关键字参数，kwargs 可以接收任意数量的关键字参数，并将参数转换为字典。使用 args 和 kwargs 作为参数名只是举例，可以任意替换。

<hr>

##### 62. 编程实现计算文件中的大写字母数
```py
import os

def count_upper():
    os.chdir('/home/thanlon')
    with open('test.txt') as f:
        ret_str = f.read()
        ret_list = list(ret_str)
        num = 0
        for i in ret_list:
            if i.isupper():
                num += 1
        return num
```
<hr>

##### 63. 什么是负索引
与正索引不同，负索引是从右边开始检索。

<hr>

##### 64. 如何随机打乱列表中元素，要求不引用额外的内存空间
random 包中的 shuffle() 函数来实现。
```py
from random import shuffle

lst = [1, 2, 3, 4, 5, 6]
shuffle(lst)
print(lst)
```
<hr>

##### 65. 解释 Python 中的 join 和 split 函数
① join函数可以指定字符将列表中的字符串连接成新的字符串。

② split函数可以指定字符分割字符串为list。
```py
# join函数举例，split函数中没有参数默认不指定连接字符
print(''.join(['a', 'bb'])) # abb
# split函数举例，split函数中没有参数默认不对字符串分割，直接转为list
print('abcde'.split())  # ['abcde']
```
<hr>

##### 66. Python 区分大小写吗
Python中是区分大小写的，可以自行验证。

<hr>

##### 67. Python 中标识符的命名规则
可以是任意长度，

① 只能是字母数字下划线组成且首位不能是数字；

② 区分大小写；

③ 不能用关键字作为标识符。

<hr>

##### 68. 如何删除字符串中的前置空格
使用字符串的 lstrip 方法删除字符串中的前置空格，使用 rstrip 方法删除字符串中的后置空格。返回的结果是已删除空字符的字符串。

前置空格是第一个非空格字符前的所有空格。

<hr>

##### 69. 如何将字符串转换为大小写
使用字符串的 upper 方法将字符串中的小写字母转换为大写，使用 lower 方法将字符串中的大写字母转换为小写。返回的结果是转换后的字符串。

<hr>

##### 70. Python 中的 pass 语句有什么作用
我们在写代码时，有时可能只写了函数声明而没想好函数怎么写，但为了保证语法检查的正确必须输入一些东西。在这种情况下，我们使用 pass 语句。pass语句什么也不做，一般作为占位符或者创建占位程序，pass语句不会执行任何操作。

<hr>

##### 71. 请解释 Python 中的闭包
在一个外函数中定义了一个内函数，内函数里运用了外函数的临时变量，并且外函数的返回值是内函数的引用，这样就构成了一个闭包。闭包为函数创建一块区域为其维护自己的数据，以后执行时方便调用。闭包的应用场景之一就是装饰器。下面是闭包的例子：

<hr>

```py
def outer():			# 外部函数 
	b = 10
	def inner():     # 内部函数
		print(a+b)	# 调用外部函数的形式参数
	return inner 	#  返回内部函数
```
##### 72. 解释 Python 中的//，％和**运算符
① //是地板除，向下取整(1.6向下取整是1)；

② %是取模，获取余数；③**取幂，获取多少次方。

<hr>

##### 73.  Python 中有多少种运算符，解释算术运算符
①  Python中有7中运算符，分别是算术运算符、关系(比较)运算符、逻辑运算符、赋值运算符、位运算符、成员运算符、身份运算符。

② +、-、*、/、//、%、**，就是对象的相加、相减……。

<hr>

##### 74. 解释 Python 中的关系运算符
关系运算符是用来比较对象的，关系运算符有 > < >= <= = !=，比较简单……。

<hr>

##### 75. 解释 Python 中的赋值和算数运算符
赋值运算就是=，算法运算符25题已经说过，不再赘述。

<hr>

##### 76. 解释 Python 中的逻辑运算符
有三个逻辑运算符，分别是and or not。and运算符两边都为真的时候，结果才为真。or运算符只要有一个为真，结果为真。not运算符是取反。

<hr>

##### 77. 解释 Python 中的成员运算符
使用in和not in可以来判断某个值是否在成员中，如判断字符或子串是否在字符串中，列表中元素是否在列表中（注意：不能判断子列表）

<hr>

##### 78. 解释 Python 中的身份运算符
is 和 is not 是python中的身份运算符，可以用来判断是否是同一个对象。 

<hr>

##### 79. 解释 Python 中的位运算符
位运算符是按二进制位对值进行操作。有与(&)、或(|)、非(~)、亦或(^)、左移(<<)、右移(>>)。

<hr>

##### 80. 如何在 Python 使用多进制数字
Python中除了十进制，还可以使用二进制、八进制和十六进制。用0b或0B前缀可以表示二进制数，使用 bin 函数可以将十进制数字装换成二进制。用0o或0O表示八进制，使用oct函数可以将十进制转换为八进制；用0x或0X表示十六进制，使用hex函数可以将十进制转换为十六进制。

<hr>

##### 81. 如何获取字典中的所有键
可以使用字典的keys方法。

<hr>

##### 82. 为什么标志符不建议使用下划线开头
Pyth7on中以下划线开头的标志符是私有的。我们原本是不详让它变成私有的，如果使用了下划线标志符就变为私有的了，所以不建议下划线开头。

<hr>

##### 83. 如何声明多个变量并赋值
可以使用传统a =1 b =2，也可以使用a, b = 1, 2 声明了两个变量并分别赋值。

<hr>

##### 84. 什么是元组的解封装
解封装就是把一个元组赋予多个变量，多个变量分别对应元组中的元素，元素和变量的数量必须一一对应。下面举个例子：
```py
# 封装
tuple1 = 1,2,3
# 解封装(必须用元素个数的变量来接收元素)
x, y, z = tuple1
```
<hr>

##### 85. 列举常用的内置模块
sys、os、json、time、datetime、logging、csv、random等

<hr>

##### 86. global与nolocal的作用
global：找到全局变量

nolocal：找到上一级变量方便进行修改

<hr>

##### 87. 为什么学习python
高级语言，不需要如何考虑如何管理你的程序使用的内存一类的底层细节等；

可移植性，由于python开源的特性，它已经被移植到许多平台上；

面向对象的，python不仅支持面向过程的编程，也支持面向对象的编程；

可扩展性，python编辑的程序可以直接调用用部分c或者c++开发的程序；

可嵌入性，可以把python嵌入c/c++程序，从而向程序用户提供脚本功能；

丰富的库：python庞大的标准库可以帮助我们处理各种工作，几乎无所不能；

规范的代码：python不需要编译成二进制代码的强制缩进方式，使得代码具有较好的可读性。

总结：语言本身简洁，功能强大，跨平台性强，从桌面应用到web开发，再到自动化运维、爬虫、人工智能、大数据都可以做。


<hr>

##### 88. python和java,php,C,C++,C#等语言的对比
C语言由于其底层操作特性和历史的积累，在嵌入式领域是当之无愧的。php跨平台，性能优越，和linux结合比和windows结合性能强45%。开发成本低，php5已经有了成熟的面向对象特性，适合开发大型项目。java是简单的、面向对象的语言。具有健壮、跨平台、高性能(自动垃圾回收机制)、多线程、动态和安全等特性。

<hr>

##### 89. 简述编译型语言和解释型的语言
编译性语言：编译型语言在执行前需要经过编译器的编译处理，将程序翻译成机器语言。因为在执行前编译型语言就已经被翻译成机器语言，所以在执行的时候会很快。例如C和C++是编译型语言。

解释型语言：解释型语言是在运行的时候将程序翻译成机器语言，所以运行速度相对于编译语言要慢一些。例如：Python、Java、C#、JavaScript是解释型语言。

<hr>

##### 90. python解释器种类以及特点
CPython解释器：由C语言开发，所以叫CPython，在命令行的下面运行python，启动的就是CPython解释器，CPython是使用最广的python解释器。

Jython：运行在java平台上的python解释器，直接把python代码编译成java字节码执行。

IPython：IPython是基于CPython之上的一个交互式解释器，也就是说，IPython只是在交互上有所增强，但是执行代码的功能和CPython是完全一样的。

<hr>

##### 91. 位和字节的关系
位是计算机存储信息的最小单位，二进制中一个0或1是一位。计算机存储容量最的单位是字节，8个二进制位组成一个字节，一个标准的英文字母占用一个字节，一个标准的汉字占用两个字节。

<hr>

##### 92. b、B、KB、MB、GB关系
```py
8b = 1B
1024B = 1KB
1024KB = 1MB
1024MB = 1GB
```

<hr>

##### 93. 请列举5个PE8规范
```py
1. 4个空格的缩进，不使用Tab，更不能混合使用Tab和空格。
3. 类中的方法定义之间空一行
4. 在一段代码前增加的注释，在'#'后加一空格
5. 逗号，冒号前不加空格
6. 函数的左括号前不要加空格
7. 序列的左括号前不要加空格
8. 操作符左右各加一个空格
9. 函数默认参数使用的赋值符号左右省略空格
10.不要将多个语句写在同一行，允许使用分号
11. if、for、while语句中即使执行语句只有一句，也必须另起一行
12. 类的方法第一个参数必须是self，而静态方法第一个参数必须是cls
```

<hr>

##### 94. 通过代码实现如下转换
1. 二进制转换成十进制：v = "0b1111011"
```py
In [1]: v = '0b1111011'              
In [2]: ret = int(v,2)
In [3]: print(ret)                                                              
123
```
2. 八进制转换成十进制：v = "0o11"
```py
In [5]: v = '0o11'                                                              
In [6]: ret = int(v,8)                                                          
In [7]: print(ret)  
9
```
3. 十六进制转换成十进制：v = "0x12"
```py
In [9]: v = '0x12'
In [10]: ret = int(v,16)
In [11]: print(ret)                        
18
```
4. 十进制转换成二进制：v = 18
```py
In [12]: v = 18                                                                 
In [13]: val = bin(18)                                                          
In [14]: print(val)                                                             
0b10010
```
5. 十进制转换成八进制：v = 30
```py
In [15]: v = 30                                                                 
In [16]: val = oct(v)                                                           
In [17]: print(val)                                                             
0o36
```
6. 十进制转换成十六进制：v = 87
```py
In [18]: v = 87                                                                 
In [19]: val = hex(v)                                                           
In [20]: print(val)                                                             
0x57
```

<hr>

##### 95. 请编写一个函数实现将ip地址转换成一个整数
首先需要将每个十进制数分别转换成二进制数再将这些二进制数拼接在一起，然后转换成十进制整数。我们可以在vim编辑器编写代码如下
```py
def ip_zh(ip):
    ip_list = ip.split('.')
    # print(ip_list)
    sum = ''
    for item in ip_list:
        # print(type(int(item)))
        # print(bin(int(item)))
        # print(type(bin(int(item))))
        ret = bin(int(item))[2:]
        if len(ret) < 8:
            ret = (8 - len(ret)) * '0' + ret
        # print(ret)
        sum += ret
    return int(sum,2)

print(ip_zh('10.3.9.12'))
```

<hr>

##### 96. python递归的最大层数
`python中默认递归限制的最大次数是1000层，查看默认最大层数：`
```py
In [21]: import sys 
In [22]: sys.getrecursionlimit
Out[22]: <function sys.getrecursionlimit>
In [23]: sys.getrecursionlimit()
Out[23]: 3000
```

<hr>

##### 97. 求结果
```js
1、v = 1 or 3							# 如果1是真结果就是1，否则是3。所以，本题结果是1
2、v = 1 and 3						# 如果1是假，结果就是1，如果1是真，结果就是3。所以，本题结果是3
3、v = 0 and 2 and 1 			# 从前到后计算，先看前一个and，因为0是假，所以结果是0。后一个and，0是假，所以结果是0
4、v = 0 and 2 or 1			    # 因为0是假，所以前两个的结果是0， 0是假但是1是真，所以结果是1
5、v = 0 and 2 or 1 or 4 	# 因为0是假，所以前两个结果是0。对于0  or 1，0是假，但是1是真，所以结果是1。对于1  or 4，1是真结果就是1。
6、v = 0 or Flase and 1		# 因为0是假，所以结果是False。对于False and 1因为False是假，所以结果是False
```

<hr>

##### 98. 简述ASCII、Unicode、GBK、UTF-8编码的区别
ASCII：使用一个字节编码，所以它的范围基本是只有英文字母、数字和一些特殊符号 ，只有256个字符，使用8位二进制表示信息。

Unicode：使用32位表示信息，Unicode一般用于计算机内存中做计算。

GBK：只用来编码汉字的，GBK全称《汉字内码扩展规范》。使用双字节编码，一个中文占2个字节。

UTF-8：压缩Unicode，使用8位二进制表示信息，用尽量少的位数来表示信息，节省存储空间。UTF-8中一个中文占3个字节，UTF-8一般可用于网络传输和数据存储。

<hr>

##### 99. 字节码和机器码的区别
字节码是一种已经经过编译需要通过翻译后才能成为机器码的中间码，字节码通常不像源码一样可以让人阅读。字节码主要是为了实现特定软件的运行与软件环境和硬件环境无关的，字节码的实现方式是通过编译器和虚拟机。编译器将源码编译成字节码，特定平台上的虚拟机把字节码可以直接翻译成可执行的指令。字节码典型的应用是java语言。总而言之，字节码是一种中间状态的二进制代码(中间码)，需要直接翻译才能成为机器码。

机器码是计算机可以直接执行并且执行速度最快的代码，由0和1组成的二进制代码序列。
<hr>

#### 100. Python2和Python3的区别
( 1 ) Python2 中 print 被视为一条语句，而不是一个函数。如果在 Python2 中输出一个字符串，不要加括号。但是，在 Python2 中，print 被视为函数。输出的字符串需要放到print函数中。Python3 使用 print 必须以小括号包裹打印内容，Python2 既可以使用带小括号的方式，也可以使用一个空格来分隔打印内容。】

( 2 ) Python2 中 range 函数返回列表，而 python3 返回迭代器，节约内存。

( 3 ) Python2 中使用 ASCII 编码，python3 中使用 UTF-8 编码。

( 4 ) Python2 中 Unicode 类型 ( Unicode编码 ) 表示字符串，str 表示字节。而 Python3 中 str 表示字符串 ( Unicode编码 )，bytes 表示字节 ( utf-8、gbk )。Python2 中的 unicode 类型是 Python3 中的 str 类型，Python2 中的 str 类型是 Python3 中的 bytes 类型。<font>这是Python2和Python3最大的区别。</font>对于网络传输，Python2使用str类型，Python3使用bytes类型。

( 5 ) Python2 中为正常显示中文，引入coding 声明，python3 中可以不用声明。

( 6 ) Python2 中的 <kbd>raw_input()</kbd> 函数是 python3 中 <kbd>input()</kbd> 函数

( 7 ) 对包的定义，Python2 中必须要有 \_ \_ init \_ \_.py文件；python3 中不是必须使用这个文件

( 8 ) 对于map和filter：Python2 中返回列表，python3 中返回迭代器

( 9 ) Python2 中字典的 keys( ) 和 values( ) 方法会立即在内存中开辟 ( 创建 ) 一块内存空间，而 Python3 中的字典的 keys() 和 values() 方法不会立即在内存中开辟一块内存空间，循环的时候才会创建。Python3 相对于 Python2 节省内存。

<hr>

##### 101. python2和python3中int和long的区别
python2中有int和long类型，但是python3已经废弃了long类型，统一使用int类型。

<hr>

##### 102. 用一行代码实现数值交换
a , b = b , a

<hr>

##### 103. 	range和xrang函数的区别
range和xrange都在循化中使用，输出的结果一样

range返回的是list对象，而xrange返回的是一个生成器对象(xrange object)

xrange不会直接生成一个list，而是每次调用返回其中的一个值，内存空间使用极少，因而性能高

>**python3中已经去掉了xrange函数，全部用range代替。**

<hr>

##### 104. 文件操作时：xreadlines和readlines的区别
二者使用相同，但返回值类型不同，xreadlines返回的是一个生成器，readlines返回的是list

<hr>

##### 105. 列举布尔值为False的常见值
0，None，空(空字符串、空列表、空字典、空元组)

<hr>

##### 106. 列举字符串列表元组和字典常用的5个方法

<hr>


##### 107. lambda表达式的格式以及应用场景

<hr>


##### 108. pass的作用
pass可作空语句，表示什么也不做；也可以保证格式的完整，保证语义的完整。
```py
# 可做空语句，表示什么也不做
if true:
    pass
else:
    pass
# 保证格式的完整
def foo():
    pass
# 保证语义的完整
while True:
    pass
```

<hr>

##### 109. \*args和**kwargs的作用
args不支持关键字传参，只支持位置传参，可以接收任意个数的位置参数，并将参数转换成元组

kwargs可以接收任意数量的关键字参数，并将参数转换为字典。

<hr>

##### 110. is和==的区别
==用于比较值是否相等，is用于比较内存地址是否相等。

<hr>

##### 111. 可变类型与不可变类型
可变类型内部不能被修改的，只能重新赋值，如 int、str、bool、tuple
不可变类型的内部可以被修改的，如list、set、dict

<hr>

##### 112. 至少列举8个常用模块
django、flask、pip、pygame、pymysql、numpy、pandas、hashlib、json、datetime、time、os、sys、logging等等……

<hr>

##### 113. 列举常见的内置函数


<hr>

##### 114. 装饰器的写法以及应用场景
装饰器的写法：
```py
def x(func):
	def inner(*args,**kwargs):
		data = func(*args,**kwargs)
		return data
	return inner
```
应用场景：在flask框架和django框架中都有应用，如路由、权限等

<hr>

##### 115. 如何安装第三方模块
python中，安装第三方模块，是通过setuptools这个工具完成的。python有两个封装了setuptools的包管理工具：easy_install和pip，目前官方推荐使用pip。

<hr>

##### 116. 你使用哪些第三方模块
jinjia2、requests、、、、

<hr>

##### 117. 如何实现"1,2,3"与[1,2,3]互相转换
对于字符串"1,2,3"转换成[1,2,3]，可以使用split(',')方法以逗号分割将字符串分割成列表[1,2,3]，然后把每个list的元素转换成int类型。

对于[1,2,3]转换成"1,2,3"可以先见列表中每个元素转换成字符串，然后使用列表的join方法以逗号的方式将元素连接成字符串。

<hr>

##### 118. 求结果
```py
1 or 2						# 1
1 and 2					# 2
1 < (2==2)			# 比较大小的时候要转换成bool类型，2==2是真为True，1< True等价于True < True，所以为False
1 < 2 = 2 				# 1 < 2 为真得True，True = 2等价于True = True，所以为True
```

<hr>

##### 119. 如何用一行代码生成[1,4,9,16,25,36,49,64,81,100] 
[i**2 for i in range(1,11)]，考察的是列表生成式。

<hr>

##### 120. 一行代码实现删除列表中重复的值 
list(set([1,2,1,2]))

<hr>

##### 121. 比较[1,2,3] 和[(1),(2),(3) ]以及[(1,),(2,),(3,) ] 的之间的区别
[1,2,3] 列表和 [(1),(2),(3)] 列表是等价的，元素都是整型。[(1,),(2,),(3,)] 列表中的元素都是元组类型。

<hr>

##### 122. 定义def func(a,b=[])这种写法有什么特点
将可变对象作为默认参数，若多次调用时使用默认参数，默认参数会保留上次调用时的状态。可以在函数体中判断如果 b 不是空列表就让为空列表，即：
```python
if not b:
    b = []
```
例子：
```python
def func(a, b=[]):
    if not b:
        b = []
    b.append(a)
    return b


lst01 = func(1, [1, 2, 3])  # 传递的参数是列表
lst02 = func(1)  # 此时b=[1]，但是返回的b是[1,2]，若多次调用时使用默认参数，默认参数会保留上次调用时的状态
lst03 = func(2)  # 此时b=[1,2]
print(lst01)
print(lst02)
print(lst03)
"""
[1, 2, 3, 1]
[1, 2]
[1, 2]
"""
```
<hr>

##### 123. 计算结果
```py
[ i % 2 for i in range(10) ]			# 是一个列表：[0, 1, 0, 1, 0, 1, 0, 1, 0, 1]
( i % 2 for i in range(10) )			# 是一个元组，所以结果是一个生成器对象
```

<hr>

##### 124. 如何在函数中设置一个全局变量
在函数的内部，通过global声明，使在函数内部中设置一个全局变量，这个全局变量可以在任意的函数中进行调用。

<hr>

##### 125. 什么是正则的贪婪匹配
贪婪匹配是尝试匹配尽可能多的字符，非贪婪匹配是尝试匹配尽可能少的字符。
```py
import re

code = 'thanlonkikuthanlon'
ret1 = re.findall('a.*lon', code)  # 贪婪匹配
print(ret1)  # ['anlonkikuthanlonlon']
ret2 = re.findall('a.*?lon', code)  # 非贪婪匹配
print(ret2)  # ['anlon', 'anlon']
```

<hr>

##### 126. logging模块的作用以及应用场景
loggin模块的作用：可以更好的管理我们的日志，并且可以将标准输入输出保存到日志文件，而且利用logging模块可以部分代替debug的功能，给程序排错。

应用场景：设置登录日志，将系统错误信息写入日志等等。

<hr>

##### 127. re的match和search区别
match函数在字符串第一个位置(0索引)匹配成功才会返回，不是第一个位置匹配成功则返回None：
```py
In [1]: import re                                                               

In [2]: re.match('thanlon','thanlonlovekiku')                                   
Out[2]: <re.Match object; span=(0, 7), match='thanlon'>
```
search函数会扫描整个字符串返回第一个成功匹配：
```py
In [3]: re.search('thanlon','kikulovethanlon')                                  
Out[3]: <re.Match object; span=(8, 15), match='thanlon'>
```

<hr>

##### 128. 请用代码简单实现stack
```python
'''
基于列表实现栈
class Stack(object):
    def __init__(self):
        self.data = []

    def push(self, val):
        self.data.append(val)

    def pop(self):
        return self.data.pop()

    def top(self):
        return self.data[-1]

stack = Stack()
stack.push('Thanlon')
stack.push('Kiku')
print(stack.data)
print(stack.pop())
print(stack.pop())
'''
['Thanlon', 'Kiku']
Kiku
Thanlon
'''
```

<hr>

##### 129. python的垃圾回收机制
引用计数可以用于跟踪和回收垃圾。标记清除，解决容器对象可能产生的循环引用问题。分代回收，以空间换取时间进一步提高垃圾回收的效率。

<hr>

##### 130. python的可变类型和不可变类型
可变类型：可变类型有list、dict，可变类型的内部是可以被修改的。不可变类型只要值相同就不会指向同一地址。

不可变类型：不可变类型有int、string和tuple，不可变类型的内部是不可以被修改的。可变类型只要值相同就指向同一个内存地址(除非进行复制操作，那么他们将会指向同一个地址)。

<hr>

##### 131.  == 和 is 的区别
==用于比较值是否相等
is用于比较内存地址是否相等

<hr>

##### 132. filter、map、reduce的作用
filter是对序列中的元素进行筛选，最终获取符合条件的序列。

map是用同样方法把所有数据都改成别的。

reduce是用某种方法依次把所有数据丢进去最后得到一个结果。

<hr>

##### 133. os和sys模块的作用
**os模块可以获取与操作系统相关的数据，是一个用于访问操作系统功能的模块；sys模块中包含pthon解释器相关的数据，用于提供对python解释器相关的操作。其它相似的说法：os模块提供一种方便的使用操作系统函数的方法，sys模块提供访问由解释器使用或维护的变量和在与解释器交互使用到的函数和解释器交互使用到的函数。**

<hr>

##### 134. 如何生成一个随机数
使用random函数可以生成一个随机数，如：

随机整数：random.randint(a,b)，得到值x在a<=x<=b

返回一个范围在start和stop之间且步长为step的随机整数，不包括结束值：random.randrange(start,stop,step)

返回0到1之间的浮点数：random.random( )

返回指定范围内的浮点数：random.uniform(a,b)

<hr>

##### 135. 如何使用python删除一个文件
可以使用python内置模块 shutil 中的 rmtree 方法，也可以使用os.remove(path)来删除文件。

<hr>

##### 136. 如何判断是函数还是方法
一般我们认为在类中是方法，写在外面的是函数。其实，这样判断是函数还是方法是不精准的。方法和函数的区分，不仅和定义的位置有关系，还和方法或函数的调用者有关系。如果通过“对象.xxx”调用，那么xxx就是方法。如果通过“类.xxx”调用或者直接执行xxx，那么xxx就是个函数。

<hr>

##### 137. 列举面向对象中带下划线的特殊方法
__init__、__new__、__call__、__enter__、__exit__、__getitem__、__ setitem__、__ delitem__、 __ add __

<hr>

##### 138. __new__与__init__的区别
\_\_new__是一个静态方法，\_\_ init \_\_ 是一个实例方法。\_\_new\_\_ 方法会返回一个创建的实例，而__init__什么都不返回。只有在__new__返回一个类的实例时，后面的__init__才能被调用。当创建一个新实例时调用__new__，初始化一个实例时用__init__。

<hr>

##### 139. 是否使用过functools中的函数，它的作用是
functools模块用于高阶函数，是作用于函数或者返回其他函数的函数。使用过functools模块中的reduce函数，用某种方法依次把所有数据丢进去最后得到一个结果。

functools的作用是提供一种用于对函数固定属性的函数。

<hr>

##### 140. 面向对象中super的作用
super不是指父类(基类)，而是按照类的继承顺序指下一个类。可以写一个帮助理解的程序：
```python
# coding:utf-8
class Base(object):
    def f1(self):
        print('Base.f1()')
        pass

class Foo1(object):
    def f1(self):
        super().f1()

class Foo2(object):
    def f1(self):
        print('Foo2.f1()')

class Info(Foo1, Foo2):
    pass

obj = Info()
obj.f1()
'''
先找Info类中有无f1方法，确认Info类中没有f1方法
下面按照类的继承顺序，找下一个类Foo1
Foo1中找到f1方法，Foo1中的f1方法执行super().f1()
super().f1()即：按照Info类的继承顺序找下一个类（注意：并不是去Foo1的基类object中找f1），看有无f1方法
下一个类是Foo2，在Foo2中找到了f1方法，所以执行Foo2类中的f1方法
'''
```
<hr>

##### 141. 静态方法和类方法区别
静态方法：如果方法无需使用对象中封装的值，那么就可以使用静态方法。写静态方法时，方法上方需要写@staticmethod，方法中参数可有可无，参数中不可以用self会出错，解释器执行时也不会将self自动传入参数列表。

类方法：如果在方法中会使用到当前类，那么就可以使用类方法。定义类方法时，方法上方写@classmethod，方法中至少有一个参数cls。定义类方法时，方法上方写@classmethod，方法中至少有一个参数cls。

<hr>

##### 142. isinstance作用以及应用场景
判断对象是否是某一个指定类或其及父类的实例。

<hr>

##### 143.  如何解决json序列化时默认遇到中文会转换成unicode
可以设置 json 模块的 dumps 函数里的参数 ensure_ascii=False，默认 ensure_ascii = True。json.dumps(v, ensure_ascii=False)

<hr>

##### 144. json序列化是如何保留中文
可以设置 json 模块的 dumps 函数里的参数 ensure_ascii=False，默认 ensure_ascii = True。json.dumps(v, ensure_ascii=False)

<hr>

##### 145. json序列化时可以处理的数据类型有哪些
int、bool、str、list、dict、tuple、None（除了集合）

<hr>

##### 146. json序列化时如何定制支持datetime类型
将datetime类型通过字符串的 strftime 方法转换成字符串类型，然后序列化字符串。

<hr>

##### 147. 提高Python运行效率的方法
( 1 ) 使用生成器，因为可以节约大量内存

( 2 ) 循环代码优化，避免过多重复代码的执行

( 3 ) 核心模块用 Cython、PyPy 等，提高效率

( 4 ) 使用多进程、多线程、协程

( 5 ) 多个 if...else... 条件判断，可以 <font>把最有可能先发生的条件放到前面写，这样可以减少程序判断的次数，提高效率。</font>

<hr>

##### 148. 简述yield和yield from
yield：生成器每次循环都会获取yield返回的值。
yield from：从当前生成器跳到另一个生成器。

<hr>

##### 149. 使用代码列举目录下的所有文件
需要使用到os模块，
```python
import os
res = os.walk(r'E:\pycharmProjects\practice')
for a, b, c in res:
    '''
    a:正在查看的目录
    b:此目录下的文件夹
    c:此目录下的文件
    '''
    # print(a)
    # print(b)
    # print(c)
    '''
    E:\pycharmProjects\practice
    ['.idea', 'test']
    ['test.py']
    E:\pycharmProjects\practice\.idea
    []
    ['misc.xml', 'modules.xml', 'practice.iml', 'workspace.xml']
    E:\pycharmProjects\practice\test
    []
    ['index.html', 'log.txt']
    '''
    for item in c:
        path = os.path.join(a, item)
        print(path)
    '''
    E:\pycharmProjects\practice\test.py
    E:\pycharmProjects\practice\.idea\misc.xml
    E:\pycharmProjects\practice\.idea\modules.xml
    E:\pycharmProjects\practice\.idea\practice.iml
    E:\pycharmProjects\practice\.idea\workspace.xml
    E:\pycharmProjects\practice\test\index.html
    E:\pycharmProjects\practice\test\log.txt
    '''
```
##### 150. 字符串、列表、元组、字典常用的5个方法
字符串：len、join、split、strip、upper、lower、replace、isdigit、startwith、endwith、format
列表：len、append、insert、pop、remove、clear、expend、reverse、sort
 元组：len
字典：keys、values、items、get、pop、update

<hr>

##### 151. 常用字符串格式化哪几种
第一种：print('%s,%s'%('thanlon','kiku'))，最方便的，需要一个个格式化。
第二种：print('{},{}'.format('thanlon','kiku'))、print('{first},{second}.format(first='thanlon',second='kiku')')，最先进的，可读性强
第三种：print('%(first)s,%(second)s'%{'first':'thanlon','second':'kiku'})，最好用的，不需要一个个格式化，可以用字典的方式，缩短时间。

<hr>

##### 152. 简述 生成器、迭代器、可迭代对象以及应用场景
迭代器：访问集合元素的一种方式，从集合的第一个元素开始访问，直到所有元素被访问结束。其优点是不需要事先准备好整个迭代过程中的所有元素，仅在迭代到某个元素时才开始计算该元素。适合遍历比较巨大的集合。__iter__方法返回迭代器本身， __next__方法用于返回容器中下一个元素或数据。

生成器：带有yield的函数不再是一个普通函数，而是一个生成器。当函数被调用时，返回一个生成器对象。不像一般函数在生成值后退出，生成器函数在生成值后会自动挂起并暂停他们的执行状态。【生成器用来一点一点产生数据的。生成器只有被for循环时，生成器函数内部的代码才会被执行，生成器每次循环都会获取yield返回的值。】

可迭代对象：可以被for循环且对象中具有__iter__方法，还要返回一个迭代器（或生成器）

<hr>

##### 153. 什么是反射以及反射的应用场景
反射：实质上是利用字符串的形式去对象(模块)中操作(查找/删除/添加)成员，是一种字符串的时间驱动。【反射主要是指程序可以访问、检测和修改它本身状态或行为的一种能力(自省)。python面向对象中的反射就是通过字符串获取模块、对象或类的属性，进行操作。】

应用场景：需要执行对象中的某个方法或者调用对象中的某个变量，但是种种原因无法确定方法或变量是否存在。

<hr>

##### 154. 1，2，3，4，5 能组成多少个互不相同且无重复的三位数
```py
num = 0
for i in range(1, 6):
    for j in range(1, 6):
        for k in range(1, 6):
            if i != j and i != k and j != k:
                num += 1
print(num)  # 60
```

<hr>

##### 155. 求结果
v = dict.fromkeys(['k1','k2'],[])
v['k1'].append(666)
print(v)
v['k1'] = 777
print(v)

```py
v = dict.fromkeys(['k1', 'k2'], [])  # {'k1': [], 'k2': []}
v['k1'].append(666)
print(v)  # {'k1': [666], 'k2': [666]}
v['k1'] = 777
print(v)  # {'k1': 777, 'k2': [666]}
```
<hr>

##### 156. 三元运算规则以及应用场景
三元运算规则：对于v = value1 if 条件 else value2，如果条件成立，v = value1，否则 v = value2。

三元运算应用场景：简单的 if else 结构

<hr>

##### 157. lambda表达式格式以及应用场景
lambda表达式格式：函数名 = lambda 参数:函数返回

lambda表达式的应用场景：lambda可以用来定义一个匿名函数，可以用来解决简单的函数

<hr>

##### 158. python面向对象中的继承有什么特点和优点
优点：1. 建造系统中的类，避免重复操作。2. 新类经常是基于已经存在的类，这样就可以提升代码的复用程度。
特点：1. 在继承中基类的构造方法(__init__)不会被自动调用，它需要在其派生类的构造中方法中专门调用；2. 在调用基类的方法时，需要加上基类的类名前缀，且需要带上self参数变量。3. python总是首先查找对应类型的方法，如果它不能在派生类中找到对应的方法，它才开始到基类中逐个查找。

<hr>

##### 159. 谈谈你对面向对象的理解
面向对象中有封装、继承、多态、

所谓的面向对象的封装就是将我们的程序模块化，对象化，把具体事物的特性属性和通过这些属性来实现一些动作的具体方法放到一个类里面，这就是封装。封装是我们所说的面相对象编程的特征之一。【面向对象中的最重要的是封装，可以将实现归类和打包。归类：将相似功能的函数放到一个类中；打包：可以将数据打包放到对象中。】

继承是实现代码的复用，一个类可以继承另外一个类，被继承的类称为父类，继承的称为字类。面向对象里的继承也就是父类的相关的属性，可以被子类重复使用，子类不必再在自己的类里面重新定义一回。需要用到的新的属性和方法时，子类也可以自己来扩展。增加了类的耦合性，使得代码更加规范化、合理化。

多态：在子类里面把父类里面定义的方法在子类里面重新实现一遍，多态包含了重载和重写。　重载就是类里面相同方法名，不同形参的情况，可以是形参类型不同或者形参个数不同，或者形参顺序不同，但是不能使返回值类型不同。重写很简单就是把子类从父亲类里继承下来的方法重新写一遍，覆盖父类的方法。

<hr>

##### 160. 谈谈你对闭包的理解
闭包：在一个外函数中定义了一个内函数，内函数里运用了外函数的临时变量，并且外函数的返回值是内函数的引用，这样就构成了一个闭包。闭包为函数创建一块区域为其维护自己的数据，以后执行时方便调用。闭包的应用场景之一就是装饰器。下面是闭包的例子：
```py
def outer():			# 外部函数 
	b = 10
	def inner():     # 内部函数
		print(a+b)	# 调用外部函数的形式参数
	return inner 	#  返回内部函数
```
一般情况下，在我们认知当中，如果一个函数结束，函数的内部所有东西都会释放掉，还给内存，局部变量都会消失。但是闭包是一种特殊情况，如果外函数在结束的时候发现有自己的临时变量将来会在内部函数中用到，就把这个临时变量绑定给了内部函数，然后自己再结束。

<hr>

##### 161. 列举面向对象中的特殊成员以及应用场景
__init__：类名()，自动执行__init__方法

__call__：对象()，自动执行__call__方法

__getitem__：对象[]，自动执行__getitem__方法

__setitem__：对象['xxx']=xx，自动执行__setitem__方法

__delitem__：del 对象，自动执行__delitem__方法

__add__：对象+对象，自动执行__add__方法

__enter__与__exit__：with 对象，自动执行__enter__和__exit__方法

__new__：类()，其实是先执行__new__方法，再执行__init__方法

<hr>

##### 162. 以下代码的输出结果是什么
```python
def extendList(val, list=[]):
    list.append(val)
    return list

list1 = extendList(10)
list2 = extendList(123, [])
list3 = extendList('a')
print(list1, list2, list3)

"""
[10,'a'] [123] [10,'a']
"""
```
<hr>

##### 163. 每种数据类型，列举你了解的方法
str：strip、split、replace、join

list：append、insert、pop、remove、find/index

dics：get、keys、values、items

<hr>

##### 164. 大文件如何读取内容，比如50G的日志文件
读取一个特别大的文件，要一行一行的读入内存，需要使用for循环：
```python
with open(file='file_path',mode='r',encoding='utf-8') as f:
    for line in f:
        pass
```
<hr>

##### 165. 选出以下表达式表述正确的选项
```
A：{1: 0, 2: 0, 3: 0}

B：{'a':0,'b':0,'c':0}

C：{{1, 2}: 0, (4, 3): 0}

D：{[1, 2]: 0, {4, 3}: 0}

E：{{1, 2}: 0, {4, 3}: 0}
```
A、B是正确的，C、D、E中都存在有字典的键是可变类型的，所以不正确。<font>字典中的键必须是不可变类型。</font>

<hr>

##### 166. Python代码获取命令行参数
使用sys.argv来接收命令行参数：
```python
import sys

val1 = sys.argv[0]
val2 = sys.argv[1]
print(val1)
print(val2)
```
执行 **`$ python test.py 1`**，得到的结果：
```python
test.py
1
```
<hr>

##### 167. 已知ip='192.168.0.100'代码实现提取ip的各个部分并写入列表
```python
ip = '192.168.0.100'
ip_list = ip.split('.')
print(ip_list)
"""
['192', '168', '0', '100']
"""
```
<hr>

##### 168. 写出tupleA和tupleB的到res的具体实现过程
```python
tupleA = ('a', 'b', 'c', 'd', 'e')
tupleB = (1, 2, 3, 4, 5)
ret = {'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5}
```
实现过程：
```python
tupleA = ('a', 'b', 'c', 'd', 'e')
tupleB = (1, 2, 3, 4, 5)
ret = {}
for i in range(0, 5):
    ret[tupleA[i]] = tupleB[i]
print(ret)
"""
{'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5}
"""
```
<hr>

##### 169. 实现将已知Alist=['a','b','c']转化为'a,b,c'的实现过程
```python
Alist = ['a', 'b', 'c']
a_str = ','.join(Alist)
print(a_str)
"""
a,b,c
"""
```
<hr>

##### 170. 为函数写装饰器，在函数执行之后输出after
```python
@wrapper
def func():
    print(123)

func()
```
装饰器函数：
```python
def wrapper(f):
    def inner(*args, **kwargs):
        date = f(*args, **kwargs)
        print('after')
        return date

    return inner
```
<hr>

##### 171. 为函数写装饰器，把函数的返回值+100然后返回
```python
@wrapper
def func():
    return 7


result = func()
print(result)
```
装饰器函数：
```python
def wrapper(f):
    def inner(*args, **kwargs):
        date = f(*args, **kwargs) + 100
        return date

    return inner
```
<hr>

##### 172. 为一个函数加装饰器，根据参数不同做不同的操作
flag为True时，则让原函数执行后返回值加100，并返回

flag为False时，则让原函数执行后返回值减100，并返回 

```python
@x(True)
def f1():
    return 11

@x(False)
def f2():
    return 22

r1 = f1()
r2 = f2()
print(r1, r2)
```
装饰器函数：
```python
def x(b):
    def wrapper(f):
        def inner(*args, **kwargs):
            if b == True:
                date = f(*args, **kwargs) + 100
            else:
                date = f(*args, **kwargs) - 100
            return date

          return inner

    return wrapper
```
<hr>

##### 看代码写结果
```python
print("你\n好")
print("你\\n好")
print(r"你\n好")
```
结果：
```python
你
好
你\n好
你\n好
```
<hr>

##### 173. 写代码，根据path找到code目录下所有的文件（单层）并打印出来
```python
path = r'/home/thanlon/code/test.pdf'
```
代码如下：
```python
import os

path = r'/home/thanlon/code/test.pdf'
pre_path = os.path.dirname(path)
ret = os.listdir(pre_path)
print(ret)
for i in ret:
    print(i)
"""
['test.pdf', 'log.txt', 'Python']
test.pdf
log.txt
Python
"""
```
<hr> 

##### 174. 编程实现以下功能
```python
dicta = {'a':1,'b':2,'c':3,'d':4,'f':'hello'}
dictb = {'b':3,'d':5,'e':7,'m':9,'k':'world'}
```
要求写一段代码实现两个字典的相加，不同的 key 对应的值保留，相同的 key 对应的值相加后保留，如果是字符串就拼接，如上示例得到的结果是：
```python
dictc = {'a': 1, 'b': 5, 'c': 3, 'd': 9, 'f': 'hello', 'e': 7, 'm': 9, 'k': 'world'}
```
代码如下：
```python
dicta = {'a': 1, 'b': 2, 'c': 3, 'd': 4, 'f': 'hello'}
dictb = {'b': 3, 'd': 5, 'e': 7, 'm': 9, 'k': 'world'}
for k, v in dictb.items():
    if k not in dicta:
        dicta[k] = v
        continue
    dicta[k] = dicta[k] + v
dictc = {}
dictc.update(dicta)
print(dictc)
"""
{'a': 1, 'b': 5, 'c': 3, 'd': 9, 'f': 'hello', 'e': 7, 'm': 9, 'k': 'world'}
"""
```
<hr>

##### 175. 已知StrA='1234A6FASKKSJJLSKWLM<SJKL90'
( 1 ) 如何获取最后两个字符
```python
StrA = '1234A6FASKKSJJLSKWLM<SJKL90'
ret = StrA[-2:]
print(ret)
"""
90
"""
```
( 2 ) 如何获取第二个和第三个字符
```python
StrA = '1234A6FASKKSJJLSKWLM<SJKL90'
ret = StrA[1:3]
print(ret)
"""
23
"""
```
<hr>

##### 176. 已知Alist=[1,2,3,1,3,1,2,1,3]如何Alist得到[1,2,3]
```python
Alist = [1, 2, 3, 1, 3, 1, 2, 1, 3]
ret = list(set(Alist))
print(ret)
"""
[1, 2, 3]
"""
```
借助set中的元素是不可重复的这一特性，可以实现去重。但set是无序的，这会导致最终的列表中的元素可能不是[1,2,3]这个顺序。所以，可以使用第二种方法是将 list 先转为 dict 再转回：
```python
Alist = [1, 2, 3, 1, 3, 1, 2, 1, 3]
b = {}
b = b.fromkeys(Alist)
"""
print(b)  # {1: None, 2: None, 3: None}
print(b.keys())  # dict_keys([1, 2, 3])
"""
ret = list(b.keys())
print(ret)
"""
[1, 2, 3]
"""
```
<hr>

##### 177. 编写一个函数，这个函数接收一个文件夹名称作为参数，显示文件中文件的路径以及其中包含文件夹中文件的路径
```python
# 编写一个函数，这个函数接收一个文件夹名称作为参数，显示文件中文件的路径以及其中包含文件夹中文件的路径
import os

def func(filename):
    if not os.path.exists(filename):
        return '文件夹不存在！'
    ret = os.walk(filename)
    for a, b, c in ret:
        # print(a)
        # print(b)
        # print(c)
        for i in c:
            path = os.path.join(a,i)
            print(path)

func(r'/home/thanlon/code/')
"""
/home/thanlon/code/test.pdf
/home/thanlon/code/log.txt
/home/thanlon/code/Python/test.pdf
"""
```
<hr>

##### 178. 1000以内的完美数(如果一个数恰好等于它的因子之和，则称该数为完美数)
如：6 = 1 * 2 * 3 = 1 + 2 + 3
```python
for i in range(1, 1001):
    lst = list()
    for j in range(1, i):
        if i % j == 0:
            lst.append(j)
    if sum(lst) == i:
        print(i)
```
<hr>

##### 179. 有A.txt和B.txt两个文件，使用多进程的进程池方式分别读取这两个文件
```python
from multiprocessing import Pool

def func(file_path):
    with open(file_path, 'r') as f:
        for line in f:
            line = line.strip()
            print(line)

if __name__ == '__main__':
    pool = Pool(processes=2)
    pool.apply_async(func, ['A.txt'])
    pool.apply_async(func, ['B.txt'])
    pool.close()
    pool.join()
```
<hr>

##### 180. 输两个列表alist和blist依次顺序比较这两个列表的元素
如果 alist 的元素大于 blist 的元素返回 alist，如果 alist 的元素小于 blist 的元素返回 blist，如果两个 list 所有的元素都相等，返回 alist，其它有大于有小于的返回 blist

参考代码如下：
```python
def func(alist, blist):
    ret_set = set()
    for i in range(len(alist)):
        if alist[i] > blist[i]:
            ret_set.add('a>b')
        elif alist[i] < blist[i]:
            ret_set.add('a<b')
        else:
            ret_set.add('a=b')
    # 有大于有小于有等于的情况下
    if len(ret_set) > 1:
        return blist
    else:
        # 有都大于，都小于，都等于的情况下，需要进行判断
        list_item = ret_set.pop()
        # alist>blist和alist=blist的情况下都返回alist
        if list_item == 'a>b' or list_item == 'a=b':
            return alist
        else:
            return blist


if __name__ == '__main__':
    # 第一种情况：有大于有小于有等于
    alist = [18, 9, 32, 65]
    blist = [18, 8, 16, 60]
    print(func(alist, blist))  # blist：[18, 8, 16, 60]
    # 第二种情况：alist>blist
    alist = [18, 9, 32, 65]
    blist = [10, 8, 16, 60]
    print(func(alist, blist))  # alist：[18, 9, 32, 65]
    # 第三种情况：alist<blist
    alist = [18, 9, 32, 65]
    blist = [19, 10, 33, 66]
    print(func(alist, blist))  # blist：[19, 10, 33, 66]
    # 第四种情况：alist=blist
    alist = [18, 9, 32, 65]
    blist = [18, 9, 32, 65]
    print(func(alist, blist))  # alist：[18, 9, 32, 65]
```
<hr>

##### 181. 一个大小为100G的文件log.txt,要读取文件中的内容写出具体过程代码
```python
with open('log.txt', 'r', encoding='utf-8') as f:
    for line in f:
        print(line)
```

##### 182. 说说你对僵尸进程和孤儿进程的理解
僵尸进程：正常老说子进程终止后进入僵死状态，等待告知父进程自己终止后才能完全消失一个进程创建子进程。但是如果子进程终止了，而父进程没有获取子进程的状态信息，这时候子进程的进程描述符仍然会保存在系统中，这种进程称为僵尸进程。

孤儿进程：一个父进程退出，而它的一个或多个子进程还在运行，那么这些子进程将成为孤儿进程。孤儿进程将被init进程（进程号为1）所收养，并由init进程完成对它们状态收集工作。

<hr>

##### 183. 看代码写结果
代码1：
```python
name = 'Erics'

def base():
    print(name)

def func():
    name = 'Kiku'
    base()

func()
```
结果：
```python
Erics
```
代码2：
```python
info = list()

def func(i):
    def inner():
        print(i)

    return inner


for item in range(5):
    info.append(func(item))
info[0]()  # 函数名加括号
info[1]()
info[2]()
info[3]()
info[4]()
```
结果：
```python
0
1
2
3
4
```
<hr>

##### 184. 有如下文件，通过分页的形式将数据展示出来(文件非常小)
```python
商品|价格
钻戒|2000
瑞士手表|3000
小米手环|4000
```
```python
with open('log_small.txt', 'r') as f:
    ret = f.read()
    print(ret)
```
<hr>

##### 185. 有如下文件，通过分页的形式将数据展示出来(文件非常大)
```python
商品|价格
钻戒|2000
瑞士手表|3000
小米手环|4000
钻戒|2000
瑞士手表|3000
小米手环|4000
...
```
```python
with open('log_big.txt', 'r') as f:
    for line in f:
        print(line, end='')
```
<hr>

##### 186. 请为以下函数编写装饰器，添加上装饰器后可以实现：执行read_ userinfo函数时，先检查文件路径是否存在，如果不存在则输入文件路径不存在，并且不再执行read_userinfo函数体中的内容，再将content变量赋值None。
```python
def read_userinfo(path):
    file_obj = open(path, 'r', encoding='utf-8')
    data = file_obj.read()
    file_obj.close()
    return data

content = read_userinfo('xxx.txt')
```
装饰器如下所示：
```python
def wrapper(func):
    def inner(path):
        import os
        if not os.path.exists(path):
            return
        data = func(path)
        return data

    return inner


@wrapper
def read_userinfo(path):
    file_obj = open(path, 'r', encoding='utf-8')
    data = file_obj.read()
    file_obj.close()
    return data

content = read_userinfo('xxx.txt')
```
##### 187. 查看一个类都有哪些方法
使用内置的dir函数，可以传入类和类的实例(对象):
```python
dir(int)
```
<hr>

##### 188. 各种数据类型的底层

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
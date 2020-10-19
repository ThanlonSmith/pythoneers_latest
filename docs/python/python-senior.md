![](../img/python.jpg)
#### 面向过程和面向函数编程
<hr>

##### 1. 面向过程编程
```python
# coding:utf-8
'''
面向过程实现：计算字符串与列表中元素的个数
'''
count_str = 0
str = 'Thanlon'
for i in str:
    count_str += 1

count_list = 0
lst = ['I', 'am', 'Thanlon']
for j in lst:
    count_list += 1
print(count_str, count_list)
'''
7 3
'''
```
##### 2. 面向函数编程
```python
# coding:utf-8
'''
面向函数实现计算字符串与列表中元素的个数
'''
def count(param):
    count = 0
    for i in param:
        count += 1
    return count

str = 'Thanlon'
lst = ['I', 'am', 'Thanlon']
print(count(str), count(lst))
'''
7 3
'''
```
<hr>

#### 面向函数编程与面向对象编程
<hr>

##### 1. 面向函数
```python
# coding:utf-8
'''
 用户认证相关
'''
def login():
    pass
def regisgter():
    pass
# 统计相关
def count(param):
    count = 0
    for i in param:
        count += 1
    return count
```
<hr>

##### 2. 面向对象
```python
# coding:utf-8
'''
 用户认证相关
'''
class Foo(object):
    def login(self):
        pass
    def regisgter(self):
        pass
# 统计相关
class Foo2(object):
    def count(self, param):
        count = 0
        for i in param:
            count += 1
        return count
```
对比两种方式，不难发现：面向对象把相似的功能函数进行了划分，代码就显得更加清晰明了。

<hr>

##### 3. 面向对象中的类和对象
( 1 ) 什么是类

类是具有相同属性和功能的一类事物。

( 2 ) 什么是对象 

对象是类的具体表现形式。

<hr>

##### 4. 面向对象编程的优点
面向对象中的类就是一个公共模板，对象就是从具体的模板实例化出来的。面向对象编程是一类相似功能函数的集合，使代码更清晰化，更合理化。

<hr>

#### 何编写面向对象程序
<hr>

##### 1. 面向对象基本格式
```python
# 定义类
class 类名:  # 首字母大写
    def 方法名(self, name):
        print(name)
        return name
    def 方法名(self, name):
        print(name)
        return name
        ……
# 调用类中方法
# 1.创建该类的对象
obj = 类名()
# 2.通过对象调用方法
result = obj.方法名('Thanlon')
print(result)
```
<hr>

##### 2. 面向对象的应用场景
调用很多函数，需要给函数进行归类和划分。对于函数特别少、功能特别少，用函数就能实现，不用面向对象。

<hr>

##### 3. 对象的作用
存储一些值，以后方便自己使用。

<hr>

#### 封装
<hr>

##### 1. 封装的优点
把函数封装在类中，把数据封装到对象，方便使用。

<hr>

##### 2. 封装的形式
一种是将函数封装在类中，一种是把一些值封装到对象中

##### 3. 封装示例
```python
class Person:
    def show(self):
        tmp = "My name is %s，my age is %s,my gender is %s" % (self.name, self.age, self.gender)
        print(tmp)
p1 = Person()
p1.name = 'Thanlon'
p1.gender = '男'
p1.age = 23
p1.show()
p2 = Person()
p2.name = 'KiKu'
p2.gender = '女'
p2.age = 25
p2.show()
```
对封装示例改进
```python
class Person:
    def __init__(self):# 初始化方法，说构造方法是不准确的
        self.name = 'Thanlon'
        self.gender = '男'
        self.age = 23

    def show(self):
        tmp = "My name is %s，my age is %s,my gender is %s" % (self.name, self.age, self.gender)
        print(tmp)

# 类()实例化对象，自动执行此类的__init__方法
p1 = Person()
print(p1.name, p1.gender, p1.age)
p1.show()
p2 = Person()
p2.show()
```
为了能让不同对象封装不一样的值，需要对封装示例进一步改进：
```python
class Person:
    def __init__(self, name, gender, age):  # init方法是可以加参数的
        self.name = name
        self.gender = gender
        self.age = age

    def show(self):
        tmp = "My name is %s，my age is %s,my gender is %s" % (self.name, self.age, self.gender)
        print(tmp)

# 类()实例化对象，自动执行此类的__init__方法
p1 = Person('Thanlon', '男', '23')
p1.show()
p2 = Person('KiKu', '女', '25')
```
<hr>

#### 继承
<hr>

##### 1. 什么是继承
继承是面向对象软件技术当中的一个概念。如果一个类别A“继承”另一个类别B，就把这个A称为B的“子类别”，而把B称为“A的父类别”也可以称“B是A的超类”。继承可以使得子类别具有父类别的各种属性和方法，而不需要再次编写相同的代码。在令子类别继承父类别的同时，可以重新定义某些属性，并重写某些方法，即覆盖父类别的原有属性和方法，使其获得与父类别不同的功能。一般静态的面向对象编程语言，继承属于静态的，意即在子类别的行为在编译期就已经决定，无法在执行期扩充。

<hr>

##### 2. 为什么要使用继承
实现代码的复用，增加了类的耦合性，使得代码更加规范化、合理化。

##### 3. 单继承
子类可以只继承一个(父)类。子类的实例化对象调用类中的变量或方法的顺序是：先调用子类中的再调用父类中的。
```python
class Superbase:
    def fun01(self):
        pass
class Base(Superbase):  # 父类/基类
    def fun02(self):
        pass
class Foo(Base):  # 字类/派生类
    def func03(self):
        pass
foo = Foo()
foo.func03()
foo.fun02()
foo.fun01()
```
<hr>

##### 4. 多继承
子类可以同时继承多个(父)类。如果继承的这些类中有相同的方法或变量，当子类不存在此方法或变量，而需要调用父类中的这个方法或变量时，最先继承的类中的方法或变量会先被调用。如 class Foo(Base01, Base02)，先调用类 Base01 中的方法。
```python
class Base01():  # 父类/基类
    def show(self):
        print('Base01.show()')
class Base02():  # 父类/基类
    def show(self):
        print('Base-2.show()')
class Foo(Base01, Base02):  # 字类/派生类
    def func03(self):
        pass
foo = Foo()
foo.show() # Base01.show()
```
<hr>

##### 5. 继承练习题
( 1 ) 继承练习1

注意：self是哪个类的对象，就从哪个类开始找（自己如果没有就去找父类）
```python
class Base:
    def f1(self):
        print('Base.f1')
    def f3(self):
        self.f1()
        print('Base.f3')
class Foo(Base):
    def f1(self):
        print('Foo.f1')
    def f2(self):
        print('Foo.f2')
        self.f3()
obj = Foo()
obj.f2()
# Foo.f2
# Foo.f1
# Base.f3
obj2 = Base()
obj2.f3()
# Base.f1
# Base.f3
```
( 2 ) 继承练习2

注意：继承的父类的先后顺序
```python
class Base01:
    def f1(self):
        print('Base01.f1')
class Base02:
    def f1(self):
        print('Base02.f2')
    def f3(self):
        print('Base02.f3')
        self.f1()
class Foo(Base01, Base02):
    def f0(self):
        print('Foo.f0')
        self.f3()
obj = Foo()
obj.f0()
# Foo.f0
# Base02.f3
# Base01.f1
```
<hr>

#### 多态
<hr>

Python 中多态无处不在，同一个变量可以有多种状态，同一个对象也可以有多种状态。在 java 和 CSharp 语言中，定义变量和给变量赋值就必须定义数据类型，而类似于 python 这种弱定义类的语言，变量可以是任意形态。比如，创建一个变量 tmp，给 tmp 赋值 10，那么 tmp 就是整型的。再将 tmp 赋值 'thanlon'，那么它就是字符串类型。这就体现出多态性，同一个变量可以是多种形态。

<hr>

#### 成员变量
<hr>

##### 1. 成员变量分类
类变量与实例变量

<hr>

##### 2. 类变量
类变量，也称为静态字段。类变量是在类中定义的变量，如示例程序中的sex = 'man'。类变量（静态字段）的访问，可以使用类访问，也可以使用对象访问。单优先使用类访问，实在不方便，才使用对象访问。

<hr>

##### 3. 实例变量
实例变量，也称为字段。实例变量是在 <kbd>\_\_init\_\_</kbd> 方法中定义的变量，如示例程序中的 self.name = name，实例变量（字段）访问时使用是对象访问。

<hr>

##### 4. 成员变量示例程序
```python
class Foo:
    # 定义类变量（静态字段）
    sex = 'man'
    def __init__(self, name):
        # 定义实例变量(字段)
        self.name = name  # 实例变量/字段
# 对象obj1和对象obj2各自维护自己的实例变量，修改obj1的实例变量，不影响obj2的实例变量值
# obj1 = Foo('Thanlon')  # Foo的对象/Foo类的实例
# obj2 = Foo('Kiku')
# obj1.name = 'Thanlon Smith'
# print(obj1.name)  # Thanlon Smith
# print(obj2.name)  #Kiku

# 可以使用对象调用类变量,但是不能修改类变量的值
obj1 = Foo('Thanlon')
obj2 = Foo('Kiku')
print(obj1.sex)  # man
print(obj2.sex)  # man
obj1.sex = 'woman'  # obj1定义了自己的变量sex，obj1.sex访问sex时，先访问自己中的变量sex
print(obj1.sex)  # 'woman''
print(obj2.sex)  # man
print(Foo.sex)  # man
```

<hr>

#### 私有变量

<hr>

###### 1. 私有变量分类
私有类变量、私有实例变量

###### 2. 私有类变量	
内部可以访问私有类变量（self.私有变量名、类名.私有变量名），外部不可以访问私有变量，但可以借助类中的方法间接访问私有变量。
```python
class Foo:
    __age = 12

    def f1(self):
        # 内部调用
        print(self.__age)
        print(Foo.__age)  # 推荐
obj = Foo()
# 外部无法调用私有类变量
# print(Foo.__age)
# print(obj.__age)
# 外部通过类中的方法间接访问私有类变量
obj.f1()
```
其实外部还可以强制访问私有类变量：
```python
class Foo:
    __age = 12
    
obj = Foo()
# 外部强制访问
print(obj._Foo__age)
```
<hr>

###### 3. 私有实例变量
内部可以访问私有实例变量，外部不可以访问私有变量，但可以借助类中的方法间接访问私有变量。
```python
class Foo:
    def __init__(self, name):
        self.__name = name
    def f1(self):
        # 内部可以访问__name
        print(self.__name)
obj = Foo('Thanlon')
# obj.__name  # 访问失败
obj.f1()  # 间接可以访问
```
<hr>

#### 成员方法
<hr>

##### 1. 实例方法
需要使用对象中封装的变量，如name，就可以使用实例方法
```python
class Foo:
    def __init__(self, name):
        self.name = name
    # 实例化方法（一般方法）
    def f1(self):
        print(self.name)
obj = Foo('Thanlon')
obj.f1()
```
静态方法调用时，可以使用类.方法名，也可以使用对象.方法名，但推荐类来调用（调用字段的时候也是）。

( 1 ) 静态方法
如果方法无需使用对象中封装的值，那么就可以使用静态方法。写静态方法时，方法上方需要写@staticmethod，方法中参数可有可无，参数中不可以用self会出错，解释器执行时也不会将self自动传入参数列表。
```python
class Foo:
    def __init__(self, name):
        self.name = name

    # 静态方法，如果方法无需使用对象中封装的值，那么就可以使用静态方法
    @staticmethod
    def f2():
        print('静态方法')  # 没有使用对象封装的值

Foo.f2()  # 可以通过类调用静态方法

obj = Foo('Thanlon')
obj.f2()  # 也可以通过对象调用方法
```
静态方法调用时，可以使用类.方法名，也可以使用对象.方法名，但推荐类来调用（调用字段的时候也是）。

( 2 ) 类方法
如果在方法中会使用到当前类，那么就可以使用类方法。定义类方法时，方法上方写@classmethod，方法中至少有一个参数cls。
```python
class Foo:
    def __init__(self, name):
        self.name = name
    @classmethod
    def show(cls):  # 和实例方法一样至少有一个参数，自动传递当前类
        print(cls)
Foo.show()
f = Foo('')
f.show()
'''
类方法！ <class '__main__.Foo'>
'''
```
<font>类方法和静态方法一样，可以使用类.方法名，也可以使用对象.方法名，但推荐类来调用。</font>

<hr>

##### 2. 私有方法
( 1 ) 私有实例方法

对于私有实例方法可以通过非私有实例方法可以间接访问私有实例方法。	
```python
# 私有实例方法
class Foo:
    def __init__(self, name):
        self.name = name
    def __f(self):
        print(self.name)
    def getF(self):
        self.__f()
f = Foo('Thanlon')
# f.__f()  # 调用失败
f.getF()
'''
Thanlon
'''
```
( 2 ) 私有静态方法

对于私有静态方法，我们可以通过非私有实例方法可以间接访问私有静态实例方法。
```python
# 私有静态方法
class Foo:
    def __init__(self, name):
        self.name = name
    @staticmethod
    def __f():
        print('私有静态方法！')
    def get_f(self):
        self.__f()
        # Foo.__f()
# 类.静态方法调用失败
# Foo.__f()
# 通过非私有静态方法
obj = Foo('Thanlon')
obj.get_f()
'''
私有静态方法！
'''
```
通过非私有静态方法也可以间接访问私有静态实例方法：
```python
# 私有静态方法
class Foo:
    def __init__(self, name):
        self.name = name
    @staticmethod
    def __f():
        print('通过非私有静态方法调用私有静态实例方法！')
    @staticmethod
    def get_f():
        Foo.__f()
# 类.静态方法调用失败
# Foo.__f()
# 类通过调用非私有静态方法间接调用私有静态实例方法！
Foo.get_f()
# 对象通过调用非私有静态方法间接调用私有静态实例方法
obj = Foo('Thanlon')
obj.get_f()
'''
私有静态方法！
'''
```
( 3 ) 私有类方法

通过非私有实例方法可以间接访问私有类方法。
```python
# 私有类方法
class Foo:
    def __init__(self, name):
        self.name = name
    @classmethod
    def __f(cls):
        print(cls)
    def get_f(self):
        self.__f()
        # Foo.__f()
obj = Foo('Thanlon')
obj.get_f()
'''
<class '__main__.Foo'>
'''
```
通过非私有静态方法也可以间接访问私有类方法：
```python
# 私有类方法
class Foo:
    def __init__(self, name):
        self.name = name

    # 私有静态方法
    @classmethod
    def __f(cls):
        print(cls)

    def get_f(self):
        self.__f()
        # Foo.__f()

    # 静态方法
    @staticmethod
    def reget_f():
        Foo.__f()
        
# 类调用静态方法reget_f
Foo.reget_f()

# 对象调用静态方法reget_f
obj = Foo('Thanlon')
obj.get_f()

'''
<class '__main__.Foo'>
<class '__main__.Foo'>
'''
```

<hr>

#### 属性
<hr>

##### 1. 属性的概念
属性是通过方法改造胡的，属性代码编写时需要方法的上面加上 @property，方法的参数只有一个 self。属性在调用时，无需加括号，使用对象.方法。属性的应用场景是对于简单的方法，当不需要传参且有返回值时，可以使用。

<hr>

##### 2. 属性与私有属性
```python
class Foo:
    def __init__(self):
        pass

    @property
    def start(self):
        return 'start'

    @property
    def stop(self):
        return 'stop'
        
f_obj = Foo()
print(f_obj.start, f_obj.stop)
'''
start stop
'''
```
当然，属性有公有和私有之分，私有属性的定义可以在方法的前面加上双下划线。私有属性可以通过使用类中的其它方法访问：
```python
class Foo:
    def __init__(self):
        pass
    # 私有属性__start
    @property
    def __start(self):
        return 'start!'
        
    # 私有属性__stop
    @property
    def __stop(self):
        return 'stop!'
        
    # 通过方法访问私有属性
    def get_start_stop(self):
        print(self.__start)
        print(self.__stop)
        
f_obj = Foo()
f_obj.get_start_stop()
'''
start!
stop!
'''
```
<hr>

##### 3. 练习题
实现分页：
```python
# coding:utf-8
class Pagination:
    '''
    处理分页的类
    '''
    def __init__(self, lst, page_num, per_page_num=10):
        '''
        initialize
        :param lst:所有数据
        :param page_num:查看的页码
        :param per_page_num:每页显示的数据记录数
        '''
        self.lst = lst
        self.page_num = page_num
        self.per_page_num = per_page_num

    @property
    def start(self):
        '''
        计算索引的起始位置
        :return:self.per_page_num * (self.page_num - 1)
        '''
        return self.per_page_num * (self.page_num - 1)

    @property
    def end(self):
        '''
        计算索引的结束位置
        :return:self.per_page_num * self.page_num
        '''
        return self.per_page_num * self.page_num

    def show(self):
        print(self.lst[self.start:self.end])

lst = []
for items in range(0, 1000):
    lst.append(items)

while True:
    # 查看的页码
    page_num = int(input('请输入页码：'))
    # 每页显示10条数据
    obj = Pagination(lst, page_num)
    obj.show()
```
>请输入页码：1
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
请输入页码：2
[10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
请输入页码：3
[20, 21, 22, 23, 24, 25, 26, 27, 28, 29]
请输入页码：

<hr>

#### 组合
<hr>

组合：将一个类的对象封装到另一个类的对象的属性中，就叫组合。
```python
# 将教师类对象封装到学校类对象的属性中
class School(object):
    def __init__(self, sch_name, sch_addr, sch_postcode):
        self.sch_name = sch_name
        self.sch_addr = sch_addr
        self.sch_postcode = sch_postcode

    def teach_stu(self):
        pass


class Teacher(object):
    def __init__(self, name, age, salary):
        self.name = name
        self.age = age
        self.__salary = salary
        self.school = None


# 实例化School
school1 = School('华东理工大学', '中国上海', '200237')
school2 = School('华东师范大学', '中国上海', '200062')
# 实例化Teacher
teacher1 = Teacher('Thanlon', 23, 200000)
teacher2 = Teacher('Kiku', 25, 500000)
#为教师分配校区
teacher1.school = school1
teacher2.school = school2
#查看教师所在学校的相关信息
print(teacher1.school.sch_name)
print(teacher1.school.sch_addr)
print(teacher1.school.teach_stu())

print(teacher2.school.sch_name)
print(teacher2.school.sch_addr)
print(teacher2.school.teach_stu())
'''
华东理工大学
中国上海
None
华东师范大学
中国上海
None
'''
```
<hr>

#### 主动调用其他类的成员
<hr>

##### 1. 第一种方式
```python
class Base(object):
    def f1(self):
        print('Base.f1()')
        pass

class Foo(object):
    def f1(self):
        Base.f1(self)

obj = Foo()
obj.f1()
```
通过对象调用实例方法：
```python
obj = Base()
obj.f1()
```
等价于用类这样调用实例方法（不常用）：
```python
obj = Base()
Base.f1(obj)
```
总结：实例方法的调用可以不通过对象去调用，可以通过类调用实例方法，但是需要手动传入对象，Base.实例方法(自己传入self)。

##### 2. 第二种方式
```python
class Base(object):
    def f1(self):
        print('Base.f1()')
        pass

class Foo(Base):
    def f1(self):
        super().f1()

obj = Foo()
obj.f1()
'''
Base.f1()
'''
```
```python
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
先找Info类中有无f1方法，Info类中没有按照继承顺序，找下一个类Foo1。
Foo1中找到f1方法，即Info类执行Foo1中的f1方法。
Foo1中的f1方法执行super().f1()，super().f1()即按照Info类的继承顺序找下一个类，
执行Foo2类中的f1方法
'''
```

<hr>

#### 特殊成员

<hr>

##### 1. \_ \_ init \_ \_
类名 ( )：自动执行该方法
```python
# coding:utf-8
class Foo(object):
    def __init__(self):
        print('__init__')
f = Foo()
'''
__init__
'''
```
<hr>

##### 2. \_ \_ call \_ \_
对象 ( )：自动执行 <kbd>\_ \_ call \_ \_</kbd> 方法
```python
# coding:utf-8
class Foo(object):
    def __init__(self, name):
        self.name = name

    def __call__(self, *args, **kwargs):
        print(args, kwargs)

f = Foo('Thanlon')
# 对象()自动执行__call__方法：无返回值，返回None
f(1, 2, 3, k1=123)
```
<hr>

##### 3. \_ \_ getitem \_ \_

对象 [ ]：自动执行 <kbd>\_ \_ getitem \_ \_</kbd> 方法
```python
# coding:utf-8
class Foo(object):
    def __init__(self, name):
        self.name = name

    def __getitem__(self, item):
        print(item)
        return 'kiku'
        
f = Foo('Thanlon')
# 对象[]自动执行_ _getitem_ _ 方法
print(f['Love']) # 
'''
Love
kiku
'''
```
<hr>

##### 4. \_ \_ setitem \_ \_
对象 [ ]：自动执行 <kbd>\_ \_ getitem \_ \_</kbd> 方法
```python
# coding:utf-8
class Foo(object):
    def __init__(self, name):
        self.name = name

    def __getitem__(self, item):
        print(item)
        return 'kiku'
        
f = Foo('Thanlon')
# 对象[]自动执行_ _getitem_ _ 方法
print(f['Love']) # 
'''
Love
kiku
'''
```
age传给key，23传给value，如：f['age'] = 23。

##### 5. \_ \_ delitem \_ \_
del 对象[xxx]：自动执行 <kbd>\_ \_ delitem \_ \_</kbd>方法
```python
# coding:utf-8
class Foo(object):
    def __init__(self, name):
        self.name = name

    def __delitem__(self, key):
        print(key)
        
f = Foo('Thanlon')
del f['Thanlon'] # # 这种方式的写法是没有返回值的
'''
Thanlon
'''
```
<hr>

##### 6. \_ \_ add \_ \_
对象+对象：自动执行 <kbd>\_ \_ add \_ \_</kbd> 方法
```python
# coding:utf-8
class Foo(object):
    def __init__(self, x):
        self.x = x

    def __add__(self, other):
        return (self.x + other.x)  # f1.x+f2.x

f1 = Foo(1)
f2 = Foo(2)
print(f1 + f2)
'''
3
'''
```
<hr>

##### 7. \_ \_ enter \_ \_ 与 \_ \_ exit \_ \_
with 对象：自动执行 <kbd>\_ \_ enter \_ \_</kbd> 和 <kbd>\_ \_ exit \_ \_</kbd>方法
```python
# coding:utf-8
class Foo(object):
    def __init__(self, x):
        self.x = x

    def __enter__(self):
        print('__enter__')

    def __exit__(self, exc_type, exc_val, exc_tb):
        print('__exit__')

f1 = Foo(1)
with f1:
    print('with中的code!')
```
as 接收 \_ \_ enter \_ \_ 方法的返回值：
```python
# coding:utf-8
class Foo(object):
    def __init__(self, x):
        self.x = x

    def __enter__(self):
        print('__enter__')
        return 'return value '

    def __exit__(self, exc_type, exc_val, exc_tb):
        print('__exit__')

f1 = Foo(1)
with f1 as f:
    print(f)
    print('with中的code!')
'''
__enter__
return value 
with中的code!
__exit__
'''
```
##### 8. \_ \_ new \_ \_

类( )：其实先执行 \_ \_ new \_ \_ 方法，再执行 \_ \_ init \_ \_ 方法。在 \_ \_ new \_ \_ 中创建类的对象并返回，这样 \_ \_ init \_ \_ 中就有了对象。<font>\_ \_ new \_ \_ 返回哪个类执行哪个类的构造方法。</font>
```python
# coding:utf-8
class Foo(object):
    def __init__(self):
        print('__init__')

    def __new__(cls, *args, **kwargs):
        print('__new__')

f1 = Foo()

'''
_ _new_ _
'''
```
<font>如果没有自定义 \_ \_ new \_ \_ 方法打印 f1，则得到的是 f1 对象！</font>

程序执行了 \_ \_ new \_ \_ 方法，打印了 “\_ \_ new \_ \_ ”。但是，没有执行 \_ \_ new \_ \_ 方法中的 **`print('init')`** 语句，说明：先执行的是 \_ \_ new \_ \_ 方法，后执行 \_ \_ init \_ \_ 方法。
```python
# coding:utf-8
class Foo(object):
    def __init__(self, name):  # 初始化方法
        '''
        初始化空的对象(__new__方法返回的空对象)或者说为空对象进行数据初始化
        :param name:
        '''
        self.name = name
        print('__init__')

    def __new__(cls, *args, **kwargs):  # 构造方法
        '''
        创建一个当前类的空对象
        :param args:
        :param kwargs:
        :return:
        '''
        print('_ _new_ _')
        # 所有的对象都是object创建的
        return object.__new__(cls)  # Python内部创建一个当前类的空对象（该对象的内部是空的）

f1 = Foo('Thanlon')  # 这个对象实际上是由以上两个方法创建的

'''
_ _new_ _
__init__
'''
```
\_ \_ init \_ \_ 方法只有在 \_ \_ new \_ \_ 方法有返回值且返回值是当前类创建的对象时才能被调用。

特定 ( 相应 ) 的语法会触发 ( 对应 ) 面向对象中的特殊方法。

<hr>

#### isinstance、type和issubclass
<hr>

##### 1. isinstance
<kbd>isinstance</kbd> 函数：检查第一个参数（子类）是否是第二个参数（父类及父类的父类……）的子类。
```python
# coding:utf-8
class Base(object):
    pass

class Foo(Base):
    pass

class Foo2(Foo):
    pass

print(issubclass(Foo, Base))
print(issubclass(Foo2, Base))
'''
True
True
'''
```
<hr>

##### 2. type
type函数：返回对象的类型，获取对象是由哪个类创建的。
```python
# coding:utf-8
class Base(object):
    pass

b = Base()
print(b, type(b))
'''
<__main__.Base object at 0x000002337B1E9630> <class '__main__.Base'>
'''
if type(b) == Base:
   print('b是Base类型！')
```
type类的应用：计算类的数量
```python
# coding:utf-8
'''
计算类的数量
'''
class Foo1(object):
    pass

class Foo2(object):
    pass

def f(*args):
    foo1_count = 0
    foo2_count = 0
    for item in args:
        if type(item) == Foo1:
            foo1_count += 1
        else:
            foo2_count += 1
    return foo1_count, foo2_count  # 返回一个元组，等价于 return (foo1_count, foo2_count)

print(f(Foo1(), Foo2(), Foo1(), Foo2, Foo1()))
'''
(3, 2)
'''
ret1, ret2 = f(Foo1(), Foo2(), Foo1(), Foo2, Foo1())
print(ret1, ret2)
'''
3 2
'''
```
<hr>

##### 3. issubclass
<kbd>isinstance</kbd> 函数：判断第对象是否是某一个指定类或其及父类的实例。
```python
# coding:utf-8
'''
isinstance函数判断第一个参数（对象）是否是第二个参数（类及所有父类）的实例
'''

class Base(object):
    pass

class Foo(Base):
    pass

foo = Foo()
print(isinstance(foo, Foo))
print(isinstance(foo, Base))
'''
True
True
'''
b = Base()
print(isinstance(b, Base))
print(isinstance(b, Foo))  # 对象b不是Foo类的实例
'''
True
False
'''
```
<hr>

#### 区分函数和方法
<hr>

##### 1. 一般的判断方式
一般我们认为写在类中的是方法，写在外面的是函数。但这样说并不准确，下面将深入探讨方法和函数的区分：

在外部定义的是函数：
```python
def func():
    pass
    
print(func)
'''
<function func at 0x000001AC2340C1E0>
'''
```
在类内部定义的可以是方法：
```python
# coding:utf-8
class Foo(object):
    def f(self):
        pass
        
obj = Foo()
print(obj.f)
'''
<bound method Foo.f of <__main__.Foo object at 0x00000254215AB1D0>>
'''
```
<hr>

##### 2. 准确的判断方式
类调用静态方法，会把静态方法当作函数。所以，在类中定义的不一定是方法，还可以是函数：
```python
# coding:utf-8
'''
定义在类中的还可以是函数
'''
class Foo(object):
    def f(self):
        pass

    @staticmethod
    def f2():
        pass

obj = Foo()
print(Foo.f2)  # 函数
print(obj.f2)  # 函数
'''
<function Foo.f2 at 0x000001AF9471C7B8>
<bound method Foo.f of <__main__.Foo object at 0x000001AF9467B198>>
'''
```
再次探讨：使用类调用实例方法，会把实例方法当作函数，需要手动传 self。所以，类中定义的也不一定是方法：
```python
# coding:utf-8
class Foo(object):
    def f1(self):
        pass

    @staticmethod
    def f2():
        pass

obj = Foo()
Foo.f1(obj)  # obj需要自己传参
print(Foo.f1)  # 把f1当作函数

obj = Foo()
obj.f1()  # 不需要自己传参
print(obj.f1)  # 把f1当作方法
'''
<function Foo.f1 at 0x000001F67119C730>
<bound method Foo.f1 of <__main__.Foo object at 0x000001F671193588>>
'''
```
下面的例子中，lst 中的 f1 和 f2 应该是作为函数，而后来添加的 f3 是通过对象调用的，所以是方法：
```python
# coding:utf-8
class Foo(object):
    def f1(self):
        pass

    def f2(self):
        pass

    def f3(self):
        pass

    lst = [f1, f2]

obj = Foo()
obj.lst.append(obj.f3)
for item in Foo.lst:
    print(item)
'''
<function Foo.f1 at 0x000001E53675C730>
<function Foo.f2 at 0x000001E53675C7B8>
<bound method Foo.f3 of <__main__.Foo object at 0x000001E536753588>>
'''
```
准确判断是方法还是函数？
```python
# coding:utf-8
from types import MethodType, FunctionType

def check(param):
    if isinstance(param, MethodType):
        print(param, 'is a method!')
    elif isinstance(param, FunctionType):
        print(param, 'is a function!')
    else:
        print('Others!')

class Foo(object):
    def f1(self):
        pass

    @staticmethod
    def f2():
        pass

obj = Foo()
check(obj.f1)  # 方法
check(Foo.f2)  # 函数
check(obj.f2)  # 函数
'''
<bound method Foo.f1 of <__main__.Foo object at 0x000001F62C49C198>> is a method!
<function Foo.f2 at 0x000001F62C4A1510> is a function!
<function Foo.f2 at 0x000001F62C4A1510> is a function!
'''
```
大体上我们可以认为在类中是方法，写在外面的是函数。其实，这样判断是函数还是方法是不精准的。方法和函数的区分，不仅和定义的位置有关系，还和方法或函数的调用者有关系。

排除 “静态方法” 等特殊情况，我们认为如果通过 <kbd>对象.xxx</kbd> 调用，那么 xxx 就是方法；如果通过 <kbd>类.xxx</kbd> 调用或者直接执行 xxx，那么 xxx 就是个函数。面向对象中，方法中 self 不需要自己传参，而函数中每个参数都需要自己传参。

还有这样的说法：默认参数 self 自动传的是方法，自己传的是函数。
<hr>

#### 反射
<hr>

##### 1. 初识反射
( 1 ) 什么是反射
Python 面向对象中的反射就是通过字符串获取模块、对象或类的属性，进行操作。

( 2 ) 为什么使用反射

有这样的一种场景：用户输入函数序号来执行函数。当没有使用反射时，可以这样设计程序：
```python
# coding:utf-8
def func01():
    print('func01')

def func02():
    print('func02')

def func03():
    print('func03')
```
```python
# coding:utf-8
import deal

while True:
    print('''
    系统支持的函数：
    1、f1
    2、f2
    3、f3
    4、f4
    ''')
    func_name = input(' 请输入您要执行的函数序号：')
    if func_name == '1':
        deal.func01()
    elif func_name == '2':
        deal.func02()
    elif func_name == '3':
        deal.func03()
```
如果在函数很多的情况下，就需要写很多判断条件。下面你来看使用反射实现相同功能的程序代码：
```python
# coding:utf-8
import deal
from types import FunctionType

while True:
    print('''
    系统支持的函数：
    1、f1
    2、f2
    3、f3
    4、f4
    ''')
    func_name = input(' 请输入您要执行的函数序号：')
    # 使用反射：
    if hasattr(deal, func_name):
        func_or_value = getattr(deal, func_name)  # func_name是字符串，根据字符串去模块中找与之同名的成员
        if isinstance(func_or_value, FunctionType):  # 可能是值，也可能是函数，所以在这里需要去判断
            func_or_value()
        else:
            print(func_or_value)
    else:
        print('deal模块中不存在输入的函数名！')
```
如果不断增加函数，不使用反射会写很多判断条件。而使用反射，很明显程序中可以少写很多代码。
<hr>

##### 2. 反射在面向对象中的应用
( 1 ) getattr

getattr：根据字符串为参数去对象（对象、类、模块）中寻找与之同名的成员。根据字符串为参数去模块中寻找与之同名的成员：
```python
# coding:utf-8
name = 'Thanlon'
def f1(arg):
    print(arg, 'is good!')
```
```python
# coding:utf-8
import module
v =  getattr(module,'name')
print(v)
func_name = getattr(module,'f1')
func_name('Thanlon')
'''
Thanlon
Thanlon is good!
''
```
根据字符串为参数去类和对象中寻找与之同名的成员：
```python
# coding:utf-8
class Foo(object):
    country = 'China'

    def f1(self0):
        print('f1')

value_name = getattr(Foo, 'country') # 静态字段
print(value_name)

obj = Foo()
value_name = getattr(obj, 'country')# 实例变量
print(value_name)

func_name = getattr(Foo, 'f1') # 函数
print(func_name)

func_name = getattr(obj, 'f1') # 方法
print(func_name)
'''
China
China
<function Foo.f1 at 0x000001EAF1D9D7B8>
<bound method Foo.f1 of <__main__.Foo object at 0x000001EAF1DAD240>>
'''
```
练习：在用户对象中找到登录和注册方法
```python
# coding:utf-8
class User(object):
    func_lst = ['register', 'login']

    def register(self):
        print('register')

    def login(self):
        print('login')

    def run(self):
        print('''
            系统支持的函数：
            1、注册
            2、登录
            ''')
        choice = int(input('请输入要执行序号(序号对应相应的方法)：'))
        func_name = User.func_lst[choice - 1]  # 类变量优先通过类去调用，这里用User;当然也可以用对象self
        # func = getattr(User, func_name)  # User.register、User.login；类.函数
        # func(self)
        func = getattr(self, func_name)  # self.register、self.login；对象.方法
        func()

obj = User()
obj.run()
obj2 = User()
obj2.run()
```
( 2 ) hasattr
hasattr：根据字符串形式，去判断对象中是否有成员
```python
# coding:utf-8
import module
v_ret = hasattr(module,'name')
func_ret = hasattr(module,'f1')
print(v_ret,func_ret)
'''
True True
'''
```
( 3 ) setattr
setattr：根据字符串形式，动态去设置一个成员（内存）
```python
# coding:utf-8
import module
setattr(module,'lover','Kiku')
v = getattr(module,'lover')
print(v)
    
setattr(module,'f2',lambda x:x*2)
func_name = getattr(module,'f2')
print(func_name)
print(func_name(1996))
'''
Kiku
<function <lambda> at 0x0000020189A3C1E0>
3992
'''
```
注意：如果设置属性，为让大家明白，需要在清楚写明类中有哪些设置的成员，如在 <kbd>\_\_init\_\_</kbd> 方法中 self.age = None。不建议使用 <kbd>setattr</kbd> 方法。
```python
# coding:utf-8
import module

class Foo(object):
    def __init__(self, name):
        self.name = name
        self.age = None  # 等待setattr

obj = Foo('Thanlon')
setattr(obj, 'age', '23')
setattr(Foo, 'age', '23')
print(getattr(Foo,'age'))
```
( 4 ) delattr

delattr：根据字符串形式，动态删除一个成员（内存）
```python
# coding:utf-8
import module
setattr(module,'lover','Kiku')
v = getattr(module,'lover')
print(v)

setattr(module,'f2',lambda x:x*2)
func_name = getattr(module,'f2')
print(func_name)
print(func_name(1996))

delattr(module,'lover')
v = getattr(module,'lover')
delattr(module,'f2')
func_name = getattr(module,'f2')
```
<hr>

#### 约束
<hr>

##### 1. 约束的实现
Foo 类继承了父类 Base，Base 中存在 f 方法，f 方法中抛出一个 NotImplementedError 的异常。在 Foo 中没有重写 Base 中的 f 方法时，调用 f 方法，抛出异常，表示 Foo 方法中必须重写 f 方法。通过这种做法，强制类中必须重写父类中的方法，进而可以实现约束。
```python
# coding:utf-8
class Base(object):
    def f(self):
        raise NotImplementedError('f方法必须被重写！')

class Foo(Base):
    pass

obj = Foo()
obj.f()
'''
NotImplementedError: f方法必须被重写！
'''
···
重写父类中的f方法自然就没有异常信息。
```python
# coding:utf-8
class Base(object):
    def f(self):
        raise NotImplementedError('f方法必须被重写！')

class Foo(Base):
    def f(self):
        pass

obj = Foo()
obj.f()
```
<hr>

##### 2. 约束的应用场景
多个类，内部都必须有某些方法时，需要使用基类+异常进行约束。

<hr>

##### 3. 抽象类与抽象方法实现约束
定义抽象类和抽象方法，如果某类继承了抽象类，必须重写抽象方法，否则会报错
```python
from abc import ABCMeta, abstractmethod

class Base(object, metaclass=ABCMeta):  # 定义一个抽象类

    def f1(self):
        print('f1')

    @abstractmethod
    def f2(self):
        '''
        抽象方法
        :return:
        '''
        pass

class Foo(Base):
    pass

obj = Foo()
'''
如果没有重写抽象方法，不能实例化类
Can't instantiate abstract class Foo with abstract methods f2
'''
```
需要重写了抽象类的f2方法：
```python
from abc import ABCMeta, abstractmethod

class Base(object, metaclass=ABCMeta):  # 定义一个抽象类

    def f1(self):
        print('f1')

    @abstractmethod
    def f2(self):
        '''
        抽象方法
        :return:
        '''
        pass

class Foo(Base):
    def f2(self):
        pass

obj = Foo()
```
<hr>

#### 子类执行父类中的方法
<hr>

##### 1. 构造方法的执行
实例化对象时会执行构造方法，如果没有写，会执行父类的构造方法:
```python
# coding:utf-8
class Foo(object):
    pass

obj = Foo()  # 会执行构造方法，如果没有写，会执行父类的构造方法
```
<hr>

##### 2. 使用super执行父类的方法
使用到的方法：<kbd>super(Foo, self).func()</kbd>
```python
# coding:utf-8
class Base(object):
    def func(self):
        print('Base.func')

class Foo(Base):
    def func(self):
        # 方式一：根据mro的顺序执行方法
        super(Foo, self).func()
        print('Foo.func')

obj = Foo()
obj.func()
'''
Base.func
Foo.func
'''
```
```python
# coding:utf-8
class Base(object):
    def func(self):
        super(Base, self).func()
        print('Base.func')

class Bar(object):
    def func(self):
        print('Bar.func')

class Foo(Base, Bar):
    pass

obj = Foo()
obj.func()
'''
Base.func
Foo.func
'''
```
```python
# coding:utf-8
class Base(object):
    def func(self):
        super(Base, self).func()
        print('Base.func')

class Bar(object):
    def func(self):
        print('Bar.func')

class Foo(Base, Bar):
    pass

# obj = Foo()
# obj.func()
print(Foo.__mro__)
'''
(<class '__main__.Foo'>, <class '__main__.Base'>, <class '__main__.Bar'>, <class 'object'>)
'''
```
##### 3. 主动执行父类的方法

<kbd>Base.func(self)</kbd>
```python
# coding:utf-8
class Base(object):
    def func(self):
        print('Base.func')

class Foo(Base):
    def func(self):
        # 方式一：根据mro的顺序执行方法
        # super(Foo, self).func()
        # 方式二：主动执行Base类的方法
        Base.func(self)  # 如果是对象.func(),self会自动传进来
        print('Foo.func')

obj = Foo()
obj.func()
'''
Base.func
Foo.func
'''
```
```python
# coding:utf-8
class Base(object):
    def func(self):
        super(Base, self).func()
        print('Base.func')

class Bar(object):
    def func(self):
        print('Bar.func')

class Foo(Base, Bar):
    pass

obj = Base()
obj.func()
'''
AttributeError: 'super' object has no attribute 'func'
'''
```
<hr>

#### 进程与线程
<hr>

##### 1. 进程
程序的一次执行，程序装入内存，系统分配资源运行。每个进程有自己内存空间、数据栈等，只能使用进程间的通信，而不能直接共享信息。
<hr>

##### 2. 线程
所有线程运行在同一个进程中，共享相同的运行环境。每个独立的线程有一个程序运行的入口、顺序执行序列和程序的出口。线程的运行可以被抢占(中断)或者被暂时挂起(睡眠)，让其它线程运行(让步)。一个进程中的各个线程间共享同一片数据空间。
<hr>

#### 线程模块

<hr>

##### 1. 顺序执行单线程
```python
from threading import Thread
def count():
    for i in range(1000):
        pass
def main():
    pass
    import time
    start_time = time.time()
    for tid in range(2):
        t = Thread(target=count)
        t.start()
        t.join() # 阻塞线程，直到在执行的线程执行完毕，才继续执行下一个线程，实现两个顺序执行的单线程
    end_time = time.time()
    print('需要{}s时间'.format(end_time - start_time))
if __name__ == '__main__':
    main()
"""
需要0.0017230510711669922s时间
"""
```
<hr>

##### 2. 同时执行两个并发线程
```python
from threading import Thread
def count():
    for i in range(1000):
        pass
def main():
    import time
    thread_set = {}
    start_time = time.time()
    for tid in range(2):
        t = Thread(target=count)
        t.start()
        thread_set[tid] = t
    for i in range(0):
        # 分别阻塞两个线程直到执行完毕 
        thread_set[i].join()
    end_time = time.time()
    print('需要{}s时间'.format(end_time - start_time))
if __name__ == '__main__':
    main()

"""
需要0.0017502307891845703s时间
"""
```
结论：对与 Python 来说，多线程在提高执行效率还是有压力的，甚至没有单线程的执行效率高。

<hr>

#### 全局解释器锁
<hr>

##### 1. GIL概述
GIL 全称全局解释器锁（Global Interpreter Lock），GIL 并不是 Python 的特性，它是实现 Python 解释器（CPython）时引入的概念。GIL 是一把全局排他锁，同一时刻只有一个线程在运行。
<hr>

##### 2. GIL的缺点
GIL 的存在会对多线程的效率有很大影响，甚至就几乎等于 Python 就是一个单线程的程序。
<hr>

##### 3. multiprocessing
multiprocessing 库的出现解决很大程度上是为了弥补 thread 库（GIL低效的缺陷）。它完整地复制一套 thread 所提供的接口方便迁移。唯一的不同是它使用多进程而不是多线程。<font>每个进程有自己独立的 GIL，因此也不会出现进程之间的 GIL 争抢</font>。

<hr>

#### 多进程
<hr>

##### 1. fork操作
<font>fork是调用一次，返回一次</font>。因为操作系统自动把当前进程 ( 称为父进程 ) 复制一份 ( 称为子进程 )，然后分别在父进程和子进程内返回。子进程永远返回0，而父进程返回子进程的 ID。子进程只需要调用 <kbd>getppid()</kbd> 就可以拿到父进程的 ID。下面使用程序来执行：
```python
import os
print('当前进程的ID是：%s'%os.getpid())
pid = os.fork()
if pid == 0:
    print('我是子进程:%s,我的父进程是:%s'%(os.getpid(),os.getppid()))
else:
    print('我是父进程:%s，我创建了一个子进程:%s'%(os.getpid(),pid))
```
`执行记录：`
```js
当前进程的ID是：27409
我是父进程:27409，我创建了一个子进程:27410
我是子进程:27410,我的父进程是:27409
```
<hr>

##### 2. Process类
multiprocessing 是跨平台版本的多进程库，提供一个 Process 类来代表一个进程对象。如果我们不使用多进程的情况下：
```python
import time
def foo(n):
    time.sleep(1)
    print(n*n)
if __name__ == '__main__':
    start_time = time.time()
    for i in range(10):
        foo(i)
    end_time = time.time()
    print('花费时间：%s'%(end_time - start_time))
```
`执行记录：`
```js
0
1
4
9
16
25
36
49
64
81
花费时间：10.024896144866943
```
下面是使用 Process 类：
```python
from multiprocessing import Process
import time
def foo(n):
    time.sleep(1)
    print(n*n)
if __name__ == '__main__':
    start_time = time.time()
    for i in range(10):
        p = Process(target=foo,args=[i,])
        p.start()
    end_time = time.time()
    print('花费时间：%s'%(end_time - start_time))
```
`执行记录：`
```js
花费时间：0.12117958068847656
0
4
1
16
25
9
36
81
64
49
```
结论：可以看到如果使用单进程来写则需要执行 10s 以上的时间，而使用多进程则启动10个进程并行执行只需要不到 1s 的时间。

<hr>

##### 3. 进程间的通信
如果用线程不需要定义队列，因为多个线程共同操作同一块数据和内存空间，但是进程之间的资源是隔离的，所以需要建立队列进行数据之间的传递。<font>Queue 是多进程安全队列，可以使用 Queue 实现多进程之间的数据的传递。</font>
```python
from multiprocessing import Process,Queue
def write(q):
    for item in ['A','B','C','D']:
        # 把数据读到队列中
        q.put(item)
        # 打印读到队列中的数据
        print('Put %s to queue!'%item)
        # 读入队列后停0.5再读
        time.sleep(0.5)
def read(q):
    while True:
        print('get {} from queue'.format(q.get(True)))
if __name__ == '__main__':
    # 初始化队列
    q = Queue()
    # 开进程把数据读到队列中
    pw = Process(target=write,args=[q,])
    # 开进程把数据从队列中读出来
    pr = Process(target=read,args=[q,])
    # 开始“写”的进程
    pw.start()
    # 开始“读”的进程
    pr.start()
    # 阻塞进程，等待“读”的进程执行完后再继续执行其它的
    pr.join()
    # 关闭读的进程，防止死锁，将读的进程强制退出
    pr.terminate()
```
`执行记录：`
```py
Put A to queue!
get A from queue
Put B to queue!
get B from queue
Put C to queue!
get C from queue
Put D to queue!
get D from queue
```
<hr>

##### 4. 进程池Pool
进程池 Pool 用于批量创建子进程，可以灵活控制子进程的数量， 下面是进程池的例子：
```python
import time
from multiprocessing import Pool
def foo(x):
    print(x*x)
    time.sleep(2)
    return x*x
if __name__ == '__main__':
    # 设置启动进程的数量
    pool = Pool(processes=5)
    ret_list = []
    for i in range(10):
        # 这是以异步的方式启动进程，如果想以同步的方式启动进程，可以使用apply方法，也可以在每次启动进程后调用res.get()方法
        ret = pool.apply_async(foo,[i,])
        print('-------:',i)
        ret_list.append(ret)
    pool.close()
    pool.join()
    for item in ret_list:
        print('result:',item.get())
```
`执行记录：`
```py
0
1
4
9
16
-------: 0
-------: 1
-------: 2
-------: 3
-------: 4
-------: 5
-------: 6
-------: 7
-------: 8
-------: 9
25
36
49
64
81
result: 0
result: 1
result: 4
result: 9
result: 16
result: 25
result: 36
result: 49
result: 64
result: 81
```
<hr>

##### 5. 多进程与多线程
一般情况下多个进程的内存资源是独立的，而多线程可以共享同一个进程中的内存资源。下面是一个多进程与多线程区别的例子：
```python
from multiprocessing import Process
import threading
import time
lock = threading.Lock()
def run(data_list,i):
    lock.acquire()
    data_list.append(i)
    lock.release()
    print('%s\n'%data_list)
if __name__ == '__main__':
    data_list = []
    for i in range(10):
        # target为每个子进程执行函数，args给函数传递参数
        p = Process(target=run,args=[data_list,i])
        # 进程开始执行
        p.start()
    # 进程执行完后，执行线程的情况。为方便看结果，等待1s后执行线程
    print(data_list)
    time.sleep(1)
    print('--------线程执行--------')
    for i in range(10):
        t = threading.Thread(target=run,args=[data_list,i])
        t.start()
```
`执行记录：`
```py
[0]

[1]

[2]

[3]

[4]

[5]

[6]

[7]

[8]

[9]

--------线程执行--------
[0]

[0, 1]

[0, 1, 2]

[0, 1, 2, 3]

[0, 1, 2, 3, 4]

[0, 1, 2, 3, 4, 5]

[0, 1, 2, 3, 4, 5, 6]

[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

[0, 1, 2, 3, 4, 5, 6, 7, 8]

[0, 1, 2, 3, 4, 5, 6, 7]
```
<hr>

#### 协程
<hr>

##### 1. 协程举例
IO操作的时候就进行切换线程，提高线CPU调度线程的利用率：
```python
from greenlet import greenlet

'''
IO操作的时候就进行切换线程，提高线CPU调度线程的利用率！
'''


def test01():
    print(1)
    greenlet02.switch()  # IO操作
    print(2)
    greenlet02.switch()


def test02():
    print(3)
    greenlet01.switch()  # IO操作
    print(4)


if __name__ == '__main__':
    greenlet01 = greenlet(test01)
    greenlet02 = greenlet(test02)
    greenlet01.switch()
"""
1
3
2
4
"""
```
<hr>

<div style="width: 60px;height: auto;z-index: 99;bottom: 30%;position: fixed;right: 0px" id="plug-ins">
    <div style="position: relative;float: right">
        <a target="_blank" href="https://blog.csdn.net/thanlon" id="weibo"
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
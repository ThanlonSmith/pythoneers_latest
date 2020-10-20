![](../img/celery.png)
#### Celery
<hr>

##### 1. 概述
Celery 是一个简单灵活且可靠的，用于 <font>处理大量消息的分布式系统。</font>专注于 <font>实时处理的异步任务队列</font>，同时也 <font>支持任务调度。</font>

分布式系统：简单理解是指系统应用（例如网站），涉及到相关组件，如 web 服务器、web 应用、数据库、消息中间件等等。将系统应用的 <font>相关组件架构在不同的服务器上</font>，在 <font>不同的服务器上的不同组件之间通过消息通信的方式来实现协调工作的这种模式</font> 就是分布式系统。但是一定要做到，当用户访问分布式系统（多台服务器）的时候如访问一台服务器的用户感知是一样的。分布式系统可以 <font>实现负载均衡、避免单点故障。</font>

异步任务：异步对应同步，同步是阻塞。当发送一个请求遇到 IO 操作的时候，如果是同步请求，必须得等待着。当 IO 结束之后，主程序继续向下执行，<font>同步请求需要等待 IO 操作完成，浪费了资源</font>。异步请求发送之后遇到 IO 操作，不需要等待，不需要返回值，直接向下执行其他的业务操作。IO 操作什么时间完成，就把结果存到数据库中或者文件中，没有结果就算了。当主进程需要用到 IO 操作异步请求的结果时到数据库中取出来。<font>异步请求极大程度地利用资源，把 IO 操作的时间节省下来。</font>
<hr>

##### 2. 组成结构
Celery 由 “消息中间件” 和 “任务执行单元”，以及 “任务结果存储” 三部分组成！

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200725091415630.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RoYW5sb24=,size_15,color_FFFFFF,t_70)

( 1 ) 消息中间件：Celery 本身不提供消息服务，但是可以 <font>很方便地和第三方提供的消息中间件集成</font>，包括 RabbitMQ 和 Redis 等。<font>Redis 在一定程度上可以充当消息中间件，只不过没有 RabbitMQ 持久稳定，</font>官方推荐使用 RabbitMQ。</font>如果没有 Celery 可以使用并发技术，并发技术有线程、进程、协程、IO 多路复用！可以自己写，但是偏于复杂，偏底层操作！<font>使用 Celery 就可以实现，只需要知道 Celery 的接口调用方式。</font>

( 2 ) 任务执行单元：worker 是 Celery 提供的任务执行单元，<font>worker 并发地运行在分布式系统节点中</font>

( 3 ) 任务结果存储：用来存储 worker 执行的任务结果，Celery 支持不同的并发和序列化方式的存储任务结果，包括 AMQP，Redis 等。
<hr>

##### 3. 使用场景
Celery 是一个 <font>强大的分布式任务队列的异步处理框架，它可以让任务的执行完全脱离主程序，甚至可以被分配到其他主机上运行。</font>我们通常使用它来实现异步任务（ async task ）和定时任务（ crontab )：

( 1 ) 异步任务：将耗时操作任务提交给Celery去异步执行，<font>比如发送短信/邮件、消息推送、音视频处理等等</font>

( 2 ) 定时任务：定时执行某件事情，比如 <font>每天数据统计</font>
<hr>

##### 4. 优点
( 1 ) 简单：Celery 使用和维护都非常简单，并且 <font>不需要配置文件。</font>

( 2 ) 高可用：Worker 和 Client 会在网络连接丢失或者失败时自动进行重试，并且 <font>有的 Brokers 也支持 “双主” 或者 “主从” 的方式实现高可用。</font>

( 3 ) 快速：<font>单个的Celery进程每分钟可以处理百万级的任务</font>，并且只需要 <font>毫秒级的往返延迟</font>（ 使用 RabbitMQ, librabbitmq, 和优化设置时 ）。<font>应用了我们几乎能够利用的所有并发技术。</font>

( 4 ) 灵活：Celery 几乎每个部分都可以扩展使用，<font>自定义池实现、序列化、压缩方案、日志记录、调度器、消费者、生产者、broker传输等等。</font>
<hr>

##### 5. 安装
```py
$ pip install -U celery -i https://mirrors.aliyun.com/pypi/simple
```
<hr>

##### 6. 异步简单任务结构
消费者进程：**`celery_task.py`**
```py
import celery
import time

"""
消费者进程
"""
backend = 'redis://localhost:6379/1'  # 异步的结果
broker = 'redis://localhost:6379/2'  # 消息中间件
cel = celery.Celery('test', backend=backend, broker=broker)

@cel.task
def send_email(name):
    print(f'向{name}发送邮件！')
    time.sleep(5)
    print(f'向{name}发送邮件！')
    return 'ok'

@cel.task
def send_msg(name):
    print(f'向{name}发送短信！')
    time.sleep(5)
    print(f'向{name}发送短信！')
    return 'ok'
```
执行命令用于监听队列：
```py
$ celery worker -A celery_task -l info
```
><font>这条命令会使用 Celery 连接消息中间件（Redis ），创建一个队列并监听这个队列，启动多个 Worker 监听任务。</font>

```py
-------------- celery@thanlon v4.4.6 (cliffs)
--- ***** ----- 
-- ******* ---- Linux-5.4.0-42-generic-x86_64-with-glibc2.29 2020-07-29 11:44:44
- *** --- * --- 
- ** ---------- [config]
- ** ---------- .> app:         test:0x7fd3d1ac72b0
- ** ---------- .> transport:   redis://localhost:6379/2
- ** ---------- .> results:     redis://localhost:6379/1
- *** --- * --- .> concurrency: 8 (prefork)
-- ******* ---- .> task events: OFF (enable -E to monitor tasks in this worker)
--- ***** ----- 
-------------- [queues]
                .> celery           exchange=celery(direct) key=celery
[tasks]
  . celery_task.send_email
  . celery_task.send_msg

[2020-07-29 11:44:44,735: INFO/MainProcess] Connected to redis://localhost:6379/2
[2020-07-29 11:44:44,743: INFO/MainProcess] mingle: searching for neighbors
[2020-07-29 11:44:45,764: INFO/MainProcess] mingle: all alone
[2020-07-29 11:44:45,803: INFO/MainProcess] celery@thanlon ready.
```
生产者进程：**`produce_task.py`**
```py
from celery_task import send_email, send_msg  # 导入异步任务函数

# 调用delay方法，就会帮助生产者去连接消息中间中创建好的队列，有什么数据直接插入这个队列
ret1 = send_email.delay('erics')  # 结果不会被返回，ret1不会是返回的结果ok
print(ret1.id)  # 会把返回的值ok放在数据库中，每一步异步请求都会返回唯一的id值，在任何时刻都可以到数据库中拿这个结果
ret2 = send_msg.delay('erics')
print(ret2.id)
"""
aaa30e8a-e9c6-4195-ba36-b5455fd48f42
e063cbde-5b30-4f17-a755-751c5e796a83
"""
```
```py
[2020-07-29 12:09:05,649: WARNING/ForkPoolWorker-1] 向erics发送短信！
[2020-07-29 12:09:05,649: WARNING/ForkPoolWorker-8] 向erics发送邮件！
[2020-07-29 12:09:10,653: WARNING/ForkPoolWorker-1] 向erics发送短信！
[2020-07-29 12:09:10,654: WARNING/ForkPoolWorker-8] 向erics发送邮件！
```
获取结果：**`get_result.py`**
```py
from celery_task import cel
from celery.result import AsyncResult

async_result = AsyncResult(id='f0ef6bfe-063c-4d01-be92-bb66de9f60bd', app=cel)
if async_result.successful():
    ret = async_result.get()
    print(ret)  # ok
    # ret.forget()  # 将结果删除

elif async_result.failed():
    print('任务执行失败！')
elif async_result.status == 'PENDING':
    print('任务等待被执行中！')
elif async_result.status == 'RETRY':
    print('任务异常后正在重试！')
elif async_result.status == 'STARTED':
    print('任务已经开始被执行！')
"""
ok
"""
```
<hr>

##### 7. 异步多任务结构
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200729202551593.png)

消费者进程：**`celery.py`**
```py
from celery import Celery

cel = Celery('celery_demo', backend='redis://localhost:6379/1', broker='redis://localhost:6379/2',
             include=['celery_tasks.task01', 'celery_tasks.task02', ])
# 时区
cel.conf.timezone = 'Asia/Shanghai'
# 是否适用UTC
cel.conf.enable_utc = False
```
**`task01.py`**
```py
from celery_tasks.celery import cel
import time

@cel.task
def send_email(name):
    print(f'完成向{name}发送邮件的任务！')
    time.sleep(5)
    return '完成发送邮件！'
```
**`task02.py`**
```py
from celery_tasks.celery import cel
import time

@cel.task
def send_msg(name):
    print(f'完成向{name}发送短信的任务！')
    time.sleep(5)
    return '完成发送短信！'
```
执行 Celery 命令监听消息队列：
```py
$ celery worker -A celery_tasks -l info -P eventlet
```
生产者进程：**`produce_task.py`**
```py
from celery_tasks.task01 import send_email
from celery_tasks.task02 import send_msg

ret1 = send_email.delay('erics')
print(ret1.id)
ret2 = send_msg.delay('erics')
print(ret2.id)
```
获取结果：**`check_result.py`**
```py
from celery_tasks.celery import cel
from celery.result import AsyncResult

async_result = AsyncResult(id='ddeeb879-068d-4174-97da-e8c5681a3912', app=cel)
if async_result.successful():
    ret = async_result.get()
    print(ret)  # ok
    # ret.forget()  # 将结果删除。执行完成，结果不会删除
    # async_result.revoke(terminate=True)  # 无论现在是什么时候，都要终止
    # async_result.revoke(terminate=False)  # 如果任务还没有开始执行，那么就可以终止

elif async_result.failed():
    print('任务执行失败！')
elif async_result.status == 'PENDING':
    print('任务等待被执行中！')
elif async_result.status == 'RETRY':
    print('任务异常后正在重试！')
elif async_result.status == 'STARTED':
    print('任务已经开始被执行！')
```
<hr>

##### 8. 定时简单任务结构
执行定时任务只需要修改生产者部分，定时调度任务就可以，

方式1：
```py
from celery_task import send_email  # 导入异步任务函数
from datetime import datetime

# 方式1
v1 = datetime(2020, 7, 29, 20, 51, 00)
print(v1)
# 先把日期对象转换成时间戳，然后使用utcfromtimestamp把时间戳转换成国标的时间
v2 = datetime.utcfromtimestamp(v1.timestamp())  # v2是国标日期对象，差8个小时
print(v2)
result = send_email.apply_async(args=['erics', ], eta=v2)  # apply_async可以接纳更多参数， 如果没有eta与delay方法相同
print(result)
```
方式2：
```py
from celery_task import send_email  # 导入异步任务函数
from datetime import datetime, timedelta

ctime = datetime.now()
print(ctime)
# 默认使用utc时间
utc_ctime = datetime.utcfromtimestamp(ctime.timestamp())
time_delay = timedelta(seconds=10)
task_time = utc_ctime + time_delay
result = send_email.apply_async(args=['erics', ], eta=task_time)
print(result.id)
```
<hr>

##### 9. 定时多任务结构
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200729215111831.png)

**`celery.py:`**
```py
from celery import Celery
from datetime import timedelta

cel = Celery('celery_demo', backend='redis://localhost:6379/1', broker='redis://localhost:6379/2',
             include=['celery_tasks.task01', 'celery_tasks.task02', ])
# 时区
cel.conf.timezone = 'Asia/Shanghai'
# 是否适用UTC
cel.conf.enable_utc = False
# beat_schedule是定时任务相关的调度器，每一个键值对就是一个定时任务,celery beat命令会读这部分信息
cel.conf.beat_schedule = {
    # 名字随意命名（增加一个每10s执行的任务）
    'add-every-10-seconds': {
        # 执行tasks1下的test_celery函数
        'task': 'celery_tasks.task01.send_email',
        'schedule': 2.0,  # 每隔2秒执行一次
        # 'schedule': crontab(minute="*/1"),# 每一分钟
        # 'schedule': timedelta(seconds=10),  # 与'schedule': 6同，但是更丰富
        'args': ('Erics',)  # 传递参数
    },
    # 'add-every-12-seconds': {
    #     'task': 'celery_tasks.task01.send_email',
    #     每年4月11号，8点42分执行
    #     'schedule': crontab(minute=42, hour=8, day_of_month=11, month_of_year=4),
    #     'args': ('张三',)
    # },
}
```
><font>使用 Redis 存放在 Redis 链表中（ list ）。</font>

执行 Celery 命令监听消息队列：
```py
$ celery -A celery_tasks worker -l info -c 10
```
><font>如果任务比较多，没有设置并发数，Celery会开多个进程执行任务。</font>

定时任务的多任务结构，向消息队列中添加任务不需要使用生产者，只需要使用命令就可以了：
```py
$ celery beat -A celery_tasks
```
><font>每隔 n 秒中插入一次任务，那么监听的时候每隔n秒中执行一次任务。保持平衡的状态，队列中也不会存在遗留的任务。如果停止监听执行任务，但是不影响 celery beat 命令想消息队列插入任务。</font>

<hr>

##### 4. 应用
Django中使用Celery：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200730000443653.png)

**`config.py:`**
```py
broker_url = 'redis://127.0.0.1:6379/1'
result_backend = 'redis://127.0.0.1:6379/2'
```
**`main.py:`**
```py
# 主程序
import os
from celery import Celery

# 创建celery实例对象
app = Celery("sms")

# 把celery和django进行组合，识别和加载django的配置文件
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'celeryPros.settings.dev')

# 通过app对象加载配置
app.config_from_object("mycelery.config")

# 加载任务
# 参数必须是一个列表，里面的每一个任务都是任务的路径名称
# app.autodiscover_tasks(["任务1","任务2"])
app.autodiscover_tasks(["mycelery.sms", ]) # 不需要带task.py，默认是这个文件

# 启动Celery的命令
# 强烈建议切换目录到mycelery根目录下启动
# celery -A mycelery.main worker --loglevel=info
```
**`task.py:`**
```py
# celery的任务必须写在tasks.py的文件中，别的文件名称不识别!!!
from mycelery.main import app
import time

import logging

log = logging.getLogger("django")


@app.task  # name表示设置任务的名称，如果不填写，则默认使用函数名做为任务名
def send_sms(mobile):
    """发送短信"""
    print("向手机号%s发送短信成功!" % mobile)
    time.sleep(5)

    return "send_sms OK"


@app.task  # name表示设置任务的名称，如果不填写，则默认使用函数名做为任务名
def send_sms2(mobile):
    print("向手机号%s发送短信成功!" % mobile)
    time.sleep(5)

    return "send_sms2 OK"
```
**`views.py:`**
```py
from django.shortcuts import render, HttpResponse
from mycelery.sms.tasks import send_sms, send_sms2
from datetime import timedelta, datetime


def test(request):
    ############### 异步任务 #################

    # 1. 声明一个和celery一模一样的任务函数，但是我们可以导包来解决
    # send_sms.delay("110")
    # send_sms2.delay("119")
    # send_sms.delay() 如果调用的任务函数没有参数，则不需要填写任何内容

    ############### 定时任务 #################

    ctime = datetime.now()
    # 默认用utc时间
    utc_ctime = datetime.utcfromtimestamp(ctime.timestamp())
    time_delay = timedelta(seconds=10)
    task_time = utc_ctime + time_delay
    result = send_sms.apply_async(["911", ], eta=task_time)
    print(result.id)

    return HttpResponse('ok')
```
由于是异步调度，所以不影响视图显示，立刻能够显示。如果是同步需要 10s 后才能显示。

如果生产者和消费者在同一台服务器，只需要导入即可。如果生产者和消费者不在同一台服务器上，必须拷贝，一份是生产者调用、一份用于消费者监听。要保证生产者所在的服务器上要有消费者的一份代码，消费者所在的服务器上要有生产者的一份代码。
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
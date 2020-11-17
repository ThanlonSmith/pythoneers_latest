![第三方模块](https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=97021528,3921704330&fm=26&gp=0.jpg)
#### 第三方模块
一般我们使用 <kbd>$ pip install module_name</kbd> 命令来安装第三方库。
<hr>

##### 1. jieba
jieba是Python中一个重要的第三方 <font>分词</font> 函数库，能够将中文文本分割成中文词语的序列。jieba原理是将中文文本与分词词库对比，通过图结构和动态规划算法找出最大概率的词组。

<kbd>jieba.lcut(str)</kbd>：精确模式，将句子精确地分开，适合文本分析
```python
import jieba
str = '宁浩出任第22届上海国际电影节亚洲新人奖评委会主席'
ls =jieba.lcut(str)
print(ls)
"""
['宁浩', '出任', '第', '22', '届', '上海', '国际', '电影节', '亚洲', '新人奖', '评委会', '主席']
"""
```
<kbd>jieba.lcut_for_search(str)</kbd>：搜索引擎模式，在精确查找的基础上对长词再次切分，提高召回率，适合搜索引擎分词
```python
import jieba
str = '宁浩出任第22届上海国际电影节亚洲新人奖评委会主席'
ls =jieba.lcut_for_search(str)
print(ls)
"""
['宁浩', '出任', '第', '22', '届', '上海', '国际', '电影', '电影节', '亚洲', '新人', '新人奖', '评委', '委会', '评委会', '主席']
"""
```
<kbd>jieba.lcut(str,cut_all=True)</kbd>：全模式，把句子可以成词的语句都扫描出来，速度快但不能解决歧义
```python
import jieba
str = '宁浩出任第22届上海国际电影节亚洲新人奖评委会主席'
ls =jieba.lcut(str,cut_all=True)
print(ls)
"""
['宁', '浩', '出任', '第', '22', '届', '上海', '海国', '国际', '电影', '电影节', '亚洲', '新人', '新人奖', '奖评', '评委', '评委会', '委会', '会主', '主席']
"""
```
<hr>

##### 2. pyInstaller
pyInstaller可以在Windows、Linux、Mac 0S等操作系统下将.py的Python源文件打包成直接可运行的可执行文件。执行<kbd>pyinstaller -F test.py</kbd> 命令打包，执行完成后，源文件目录生成 dist 和 build
目录，build目录是PyInstaller存储临时文件的目录，可以完全删除。最终打包程序在dist内部与源文件同名的目录中。pyinstaller命令相关参数：

|   |   |
| - | - |
| -F或--onefile | 在dist文件夹中只生成独立的打包文件  |
| -h或--help | 帮助信息  |
| --clean |  清理打包过程中的临时文件 |
| -i <图标文件路径名.io>  | 指定打包程序使用的图标  |
| -D或--onedir  | 默认值，生成dist目录  |
|   |   |

通过对Python源文件打包，使Python程序在可以没有安装Python环境中运行，可作为独立文件方便传递和管理。此外，公司通常是不开放自己源代码的，将源文件打包成看不到源代码的可执行文件，安全性得到增强。
<hr>

##### 3. virtualenv
virtualenv可用来帮助我们创建Python虚拟环境，能够保证Python环境的干净，

<kbd>$ pip install virtualenv</kbd>：安装virtualenv<br><br>

<kbd>$ virtualenv env --no-site-packages</kbd>：创建一个名字为env名字的虚拟环境（不包括安装的其它第三方模块）<br><br>

<kbd>$ source env/bin/activate</kbd>：激活虚拟环境<br><br>

<kbd>$ deactivate</kbd>：退出虚拟环境<br><br>

<kbd>$ rm -r env</kbd>：删除虚拟环境（删除这个env这个文件夹就可以）
<br><br>
PyCharm中创建virtualenv环境：
![](../img/virtualenv.png)
<hr>

##### 4. wordcloud
wordcloud库是专门用来生成词云的Python第三方模块。词云：以词语为单位，根据文本出现的概率设计不同的size，形成关键词词文或关键词渲染。

<kbd>generate()</kbd>：由字符串的内容生成词云

<kbd>to_file()</kbd>：将词云图保存为图片

例1：
```py
from wordcloud import WordCloud
text = 'I like python, I am learning python.' # 标点符号不参与
wd = WordCloud().generate(text)
wd.to_file('test.png') # 其它图片格式也是可以的 
```
例2：
```py
import jieba
from wordcloud import WordCloud
text = '程序设计语言是计算机'
words = jieba.lcut(text)
print(words) # ['程序设计', '语言', '是', '计算机']
new_text = ' '.join(words)
print(new_text)
wc = WordCloud(font_path = None).generate(new_text)
wc.to_file('test.png')
```
<kbd>WordCloud()类更多的属性和解释</kbd>：

|   |    |
| - | - |
| font_path | 默认为None，指定字体文件的完整路径  |
| width  |  生成图片的宽度，默认是400px |
| height  | 生成图片的高度，默认是200px  |
| mask  | 词文形状，默认是None，默认是方型图  |
| min_font_size | 词云最小的字体字号，默认是4号  |
| max_font_size  | 词云最小的字体字号，默认是None，根据高度自动调节  |
| font_step | 字体间隔，模式是1  |
| max_words |  词云中最大词数，默认是200 |
| stop_words |  被排除词列表，排除词不在词云中显示 |
| background_color | 图片背景颜色，默认是黑色  |
|   |    |

<hr>

##### 5. multiprocessing
multiprocessing是一个跨平台的多进程模块，提供一个Process类来代表一个进程对象，下面是一个多进程示例：
```python
from multiprocessing import Process
import time

def f(n):
    time.sleep(1)
    print(n * n)

def main():
    for i in range(10):
        p = Process(target=f, args=[i, ])
        p.start()

# p.join()使用p.join()可阻塞进程，前面一个进程执行完，后面的进程才可以执行
if __name__ == '__main__':
    main()
```
程序使用单进程写则需要执行10s以上的时间，而使用多进程启用10个进程并行执行，只需要用1秒多的时间。Queue是多进程安全队列，可以使用Queue实现多进程之间的数据传递，下面是一个Queue相关的例子：
```python
from multiprocessing import Queue, Process
import time

def write(q):
    lst = ['A', 'B', 'C', 'D']
    for i in lst:
        q.put(i)
        print('Put %s to queue' % i)
        time.sleep(0.5)
def read(q):
    while True:
        v = q.get(True)
        print('get %s from queue' % v)
def main():
    q = Queue()
    pw = Process(target=write, args=(q,))
    pr = Process(target=read, args=(q,))
    pw.start()
    pr.start()
    pr.join()
    pr.terminate()
if __name__ == '__main__':
    main()
"""
Put A to queue
get A from queue
Put B to queue
get B from queue
Put C to queue
get C from queue
Put D to queue
get D from queue
"""
```
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
            <script>
                (adsbygoogle = window.adsbygoogle || []).push({});
            </script>
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
            <script>
                (adsbygoogle = window.adsbygoogle || []).push({});
            </script>
        </div>
</div>
<!--右侧广告 stop-->
![](../img/python3/202011180135.jpeg)
#### Word自动化
<hr>

##### 1. 安装库
python-docx 由于 PyPI 托管在 PyPI 上，因此安装相对简单，并且仅取决于您安装的安装实用程序。pip 如果可用，可能会安装：
```python
$ pip install python-docx -i https://mirrors.aliyun.com/pypi/simple
```
也可以使用安装 easy_install，尽管不建议这样做：
```python
$ easy_install python-docx
```
如果没有 pip，也不 easy_install 可用，也可以手动通过下载一封来自PyPI的分布，拆包的压缩包，运行安装setup.py：
```python
$ tar xvzf python-docx-{version}.tar.gz
$ cd python-docx-{version}
$ python setup.py install
```
python-docx 依赖 lxml，使用 pip 和 easy_install 会为你的环境满足这些依赖，但是如果你使用最后一种方法，你需要自己安装。

>python-docx依赖Python 2.6, 2.7, 3.3, or 3.4，lxml >= 2.3.2

<hr>

##### 2. 打开Word文件
您需要做的第一件事是处理文档。最简单的方法是这样的：
```python
from docx import Document
document = Document()
```
这将打开一个基于默认“模板”的空白文档，这几乎是在使用内置默认值在 Word 中启动新文档时所获得的，您可以使用来打开和处理现有的 Word 文档。
<hr>

##### 3. 增加一个段落
段落是Word的基础。它们用于正文，也用于标题和项目符号（如项目符号）。这是添加一个的最简单方法：
```python
paragraph = document.add_paragraph('Lorem ipsum dolor sit amet.')
```
此方法返回对段落的引用，该段落是在文档末尾新添加的段落。paragraph 在这种情况下，将为新段落指定引用，但是除非需要，否则我将在以下示例中将其省略。在您的代码中，添加项目后通常不会对它做任何事情，因此保留对它的引用并没有多大意义。

实操：
```python
"""
@from：https://pythoneers.cn
@author: qq3330447288
@contact: erics1996@yeah.net
@software: PyCharm
@file: 添加段落.py
@time: 2020/11/15 下午12:02
"""
from docx import Document

document = Document()
document.add_paragraph('1. Lorem ipsum dolor sit amet.')
document.add_paragraph('2. Lorem ipsum dolor sit amet.')
paragraph = document.add_paragraph('3. Lorem ipsum dolor sit amet.')
document.save('./result/增加段落.docx')
```
这将生成一个 Python 文件同级目录下生成一个名为 paragraph.docx 的文档：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201115113335980.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RoYW5sb24=,size_16,color_FFFFFF,t_70#)

也可以将一个段落用作“光标”，并在其上方直接插入一个新段落：
```python
prior_paragraph = paragraph.insert_paragraph_before('Lorem ipsum')
```
这样可以将段落插入文档的中间，这在修改现有文档而不是从头开始生成文档时通常很重要。

实操：
```python
"""
@from：https://pythoneers.cn
@author: qq3330447288
@contact: erics1996@yeah.net
@software: PyCharm
@file: 插入段落.py
@time: 2020/11/15 上午11:24
"""
from docx import Document

document = Document()
document.add_paragraph('1. Lorem ipsum dolor sit amet.')
document.add_paragraph('2. Lorem ipsum dolor sit amet.')
paragraph = document.add_paragraph('3. Lorem ipsum dolor sit amet.')
paragraph.insert_paragraph_before('4. Lorem ipsum dolor sit amet.')
document.save('./result/插入段落.docx')
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201115113959386.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RoYW5sb24=,size_16,color_FFFFFF,t_70#)

<hr>

##### 4. 添加标题
除最短文档外，正文中的正文均分为多个部分，每个部分均以标题开头。以下是添加方法：
```python
document.add_heading('The REAL meaning of the universe')
```
实操：
```python
"""
@from：https://pythoneers.cn
@author: qq3330447288
@contact: erics1996@yeah.net
@software: PyCharm
@file: 添加标题.py
@time: 2020/11/15 下午12:21
"""
from docx import Document

document = Document()
document.add_heading('The REAL meaning of the universe')
document.add_paragraph('1. Lorem ipsum dolor sit amet.')
document.add_paragraph('2. Lorem ipsum dolor sit amet.')
document.save('./result/添加标题-顶级标题.docx')
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201115122911217.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RoYW5sb24=,size_16,color_FFFFFF,t_70#)

默认情况下，这会添加一个顶级标题，在Word中显示为“标题1”。当您想要一个小节的标题时，只需将所需的级别指定为 1 到 9 之间的整数即可：
```python
document.add_heading('The role of dolphins', level=2)
```
如果将级别指定为 0，则会添加“标题”段落。这可以方便地开始一个相对简短的文档，该文档没有单独的标题页。
实操：
```python
"""
@from：https://pythoneers.cn
@author: qq3330447288
@contact: erics1996@yeah.net
@software: PyCharm
@file: 添加小结标题.py
@time: 2020/11/15 下午12:26
"""
from docx import Document

document = Document()
document.add_heading('The REAL meaning of the universe', level=2)
document.add_paragraph('1. Lorem ipsum dolor sit amet.')
document.add_heading('The REAL meaning of the universe', level=3)
document.add_paragraph('1. Lorem ipsum dolor sit amet.')
document.add_heading('The REAL meaning of the universe', level=4)
document.add_paragraph('1. Lorem ipsum dolor sit amet.')
document.add_heading('The REAL meaning of the universe', level=0)
document.add_paragraph('1. Lorem ipsum dolor sit amet.')
document.save('./result/添加标题-小结标题.docx')
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201115123033330.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RoYW5sb24=,size_16,color_FFFFFF,t_70#)

<hr>

##### 5. 添加分页
即使您所在的页面不完整，有时您也希望每隔一段时间将接下来的文本显示在单独的页面上。一个“硬”分页符可以做到这一点：
```python
document.add_page_break()
```
如果您发现自己经常使用它，则可能是更好地理解段落样式可能会受益的迹象。可以设置的一个段落样式属性是在具有该样式的每个段落之前立即中断页面。因此，您可以将标题设置为特定级别以始终开始新页面。稍后更多有关样式的信息。事实证明，它们对于真正充分利用 Word 至关重要。

实操：
```python
"""
@from：https://pythoneers.cn
@author: qq3330447288
@contact: erics1996@yeah.net
@software: PyCharm
@file: 添加分页.py
@time: 2020/11/15 下午1:07
"""
from docx import Document

document = Document()
document.add_paragraph('1. Lorem ipsum dolor sit amet.')
document.add_page_break()
document.add_paragraph('2. Lorem ipsum dolor sit amet.')
document.save('./result/添加分页.docx')
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201115131146360.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RoYW5sb24=,size_16,color_FFFFFF,t_70#)

<hr>

##### 6. 添加表格
人们经常会遇到一些内容，这些内容很适合表格显示，排列成整齐的行和列。Word在这方面做得很好。以下是添加表格的方法：
```python
table = document.add_table(rows=2, cols=2)
```
实操：
```python
"""
@from：https://pythoneers.cn
@author: qq3330447288
@contact: erics1996@yeah.net
@software: PyCharm
@file: 添加表格.py
@time: 2020/11/15 下午2:47
"""
from docx import Document

document = Document()
table = document.add_table(rows=2, cols=2)
document.save('./result/添加表格.docx')
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201115145050964.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RoYW5sb24=,size_16,color_FFFFFF,t_70#)

表具有几个属性和方法，您需要这些属性和方法来填充它们。访问单个单元可能是一个不错的起点。作为基准，您始终可以通过其行和列索引访问单元格：
```python
cell = table.cell(0, 1)
```
实操：
```python
"""
@from：https://pythoneers.cn
@author: qq3330447288
@contact: erics1996@yeah.net
@software: PyCharm
@file: 访问单元格.py
@time: 2020/11/15 下午2:51
"""
from docx import Document

document = Document()
table = document.add_table(rows=2, cols=2)
cell = table.cell(0, 1)
print(cell)  # <docx.table._Cell object at 0x7f01882b54c0>
```
这将在您刚创建的表格的第一行中为您提供右侧的单元格。请注意，行和列索引都是从零开始的，就像在列表访问中一样。

有了单元格后，您可以在其中放一些东西：
```python
cell.text = 'parrot, possibly dead'
```
实操：
```python
"""
@from：https://pythoneers.cn
@author: qq3330447288
@contact: erics1996@yeah.net
@software: PyCharm
@file: 在单元格中添加内容.py
@time: 2020/11/15 下午2:57
"""
from docx import Document

document = Document()
table = document.add_table(rows=2, cols=2)
cell = table.cell(0, 1)
cell.text = 'parrot, possibly dead'
document.save('./result/在单元格中添加内容.docx')
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201115145854834.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RoYW5sb24=,size_16,color_FFFFFF,t_70#)

通常，一次访问一行单元格比较容易，例如，从数据源填充可变长度的表时。.rows 表的属性提供对各个行的访问，每个行都有一个 .cells 属性。该 .cells 两个属性 Row 和 Column 支持索引访问，就像一个列表：
```python
row = table.rows[1]
row.cells[0].text = 'Foo bar to you.'
row.cells[1].text = 'And a hearty foo bar to you too sir!'
```
实操：
```python
"""
@from：https://pythoneers.cn
@author: qq3330447288
@contact: erics1996@yeah.net
@software: PyCharm
@file: 使用索引访问.py
@time: 2020/11/15 下午3:09
"""
from docx import Document

document = Document()
table = document.add_table(rows=2, cols=2)
print(table.rows, type(table.rows))  # <docx.table._Rows object at 0x7f01c117a0d0> <class 'docx.table._Rows'>
row = table.rows[1]
print(row)  # <docx.table._Row object at 0x7f79a666f370>
print(row.cells)  # (<docx.table._Cell object at 0x7fb7b8d41610>, <docx.table._Cell object at 0x7fb7b8d41670>)
row.cells[0].text = 'Foo bar to you.'
row.cells[1].text = 'And a hearty foo bar to you too sir!'
document.save('./result/使用索引访问.docx')
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201115151454935.png#pic_center)

表上的 .rows 和 .columns 集合是可迭代的，因此您可以在 for 循环中直接使用它们。与 .cells 行或列上的序列相同：
```python
for row in table.rows:
    for cell in row.cells:
        print(cell.text)
```
实操：
```python
"""
@from：https://pythoneers.cn
@author: qq3330447288
@contact: erics1996@yeah.net
@software: PyCharm
@file: for 循环中直接使用它们.py
@time: 2020/11/15 下午3:34
"""
from docx import Document

document = Document()
table = document.add_table(2, 2)

for row in table.rows:
    for cell in row.cells:
        row.cells[0].text = 'Foo bar to you.'
        row.cells[1].text = 'And a hearty foo bar to you too sir!'
        print(cell.text)
# Console show：
"""
Foo bar to you.
And a hearty foo bar to you too sir!
Foo bar to you.
And a hearty foo bar to you too sir!
"""
```
如果要想获取表中的行或列的数量，只需 len() 在序列上使用：
```python
row_count = len(table.rows)
col_count = len(table.columns)
```
实操：
```python
"""
@from：https://pythoneers.cn
@author: qq3330447288
@contact: erics1996@yeah.net
@software: PyCharm
@file: 获取表中的行或列的数量.py
@time: 2020/11/15 下午4:00
"""
from docx import Document

document = Document()
table = document.add_table(2, 2)
row_count = len(table.rows)
col_count = len(table.columns)
print(row_count, col_count)
"""
2 2
"""
```
您还可以像这样逐步向表中添加行：
```python
row = table.add_row()
```
实操：
```python
"""
@from：https://pythoneers.cn
@author: qq3330447288
@contact: erics1996@yeah.net
@software: PyCharm
@file: 逐步向表中添加行.py
@time: 2020/11/15 下午4:04
"""
from docx import Document

document = Document()
table = document.add_table(2, 2)
print('当前的行列数：{}{}'.format(len(table.rows), len(table.columns), ))
table.add_row()  # 默认加10行
print('当前的行列数：{}{}'.format(len(table.rows), len(table.columns), ))
"""
当前的行列数：22
当前的行列数：32
"""
```
对于我们上面提到的可变长度表方案，这可能非常方便。

实操：
```python
"""
@from：https://pythoneers.cn
@author: qq3330447288
@contact: erics1996@yeah.net
@software: PyCharm
@file: 可变长度表方案.py
@time: 2020/11/15 下午4:27
"""
from docx import Document

document = Document()

# 添加表
table = document.add_table(1, 3)

# 填充标题行
heading_cells = table.rows[0].cells
heading_cells[0].text = 'Qty'
heading_cells[1].text = 'SKU'
heading_cells[2].text = 'Description'

# 为每个项添加数据行
items = (
    (7, '1024', 'Plush kittens'),
    (3, '2042', 'Furbees'),
    (1, '1288', 'French Poodle Collars, Deluxe'),
)
for item in items:
    cells = table.add_row().cells
    cells[0].text = str(item[0])
    cells[1].text = item[1]
    cells[2].text = item[2]
"""
for row in table.rows:
    for cell in row.cells:
        print(cell.text)
"""
# 上面看的不太明显,所以保存在表格中查看更方便
document.save('./result/可变长度表方案.docx')
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201115163644306.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RoYW5sb24=,size_16,color_FFFFFF,t_70#pic_center)
尽管我还没有看到用例，但对列也适用。

Word 具有一组预格式化的表格样式，您可以从其表格样式库中选择它们。您可以像这样将其中之一应用于表：
```python
table.style = 'LightShading-Accent1'
```
实操：
```python
"""
@from：https://pythoneers.cn
@author: qq3330447288
@contact: erics1996@yeah.net
@software: PyCharm
@file: 预格式化的表格样式.py
@time: 2020/11/15 下午4:37
"""
from docx import Document

document = Document()

# 添加表
table = document.add_table(1, 3)

# 填充标题行
heading_cells = table.rows[0].cells
heading_cells[0].text = 'Qty'
heading_cells[1].text = 'SKU'
heading_cells[2].text = 'Description'

# 为每个项添加数据行
items = (
    (7, '1024', 'Plush kittens'),
    (3, '2042', 'Furbees'),
    (1, '1288', 'French Poodle Collars, Deluxe'),
)
for item in items:
    cells = table.add_row().cells
    cells[0].text = str(item[0])
    cells[1].text = item[1]
    cells[2].text = item[2]
"""
for row in table.rows:
    for cell in row.cells:
        print(cell.text)
"""
# 上面看的不太明显,所以保存在表格中查看更方便
table.style = 'LightShading-Accent1'
document.save('./result/预格式化的表格样式.docx')
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201115164440189.png#)
通过从表样式名称中删除所有空格来形成样式名称。您可以通过将鼠标悬停在 Word 的表格样式库中的缩略图缩略图上来找到表格样式名称。

<hr>

##### 7. 添加图片
Word使您可以使用菜单项将图像放置在文档中。这是在中的方法：Insert > Photo > Picture from file...python-docx
```python
document.add_picture('image-filename.png')
```
本示例使用路径，该路径从本地文件系统加载图像文件。您还可以使用类似文件的对象，本质上是任何行为类似于打开文件的对象。如果您要从数据库或网络中检索映像，并且不想涉及文件系统，这可能很方便。

实操：
```python
"""
@from：https://pythoneers.cn
@author: qq3330447288
@contact: erics1996@yeah.net
@software: PyCharm
@file: 添加图片.py
@time: 2020/11/15 下午5:08
"""
from docx import Document

document = Document()
document.add_picture(image_path_or_stream='./imgs/jujingyi.jpeg')
document.save('./result/添加图片.docx')
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201115174945161.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RoYW5sb24=,size_16,color_FFFFFF,t_70)
默认情况下，添加的图像以原始大小显示。这通常比您想要的要大。原始大小计算为。因此，具有 300 dpi 分辨率的300x300 像素图像出现在一个平方英寸中。问题是大多数图像不包含 dpi 属性，默认为 72 dpi。这样一来，同一张图像的一侧就会出现 4.167 英寸，大约在页面的一半左右。pixels / dpi

要获得所需大小的图像，可以以方便的单位（例如英寸或厘米）指定其宽度或高度：
```python
from docx.shared import Inches

document.add_picture('image-filename.png', width=Inches(1.0))
```
您可以自由指定宽度和高度，但是通常您不想这样做。如果仅指定一个，则 python-docx 使用它来计算另一个的正确缩放值。这样一来，就可以保持宽高比，并且图片看起来不会拉伸。

实操：
```python
"""
@from：https://pythoneers.cn
@author: qq3330447288
@contact: erics1996@yeah.net
@software: PyCharm
@file: 保持图片宽高比.py
@time: 2020/11/15 下午6:03
"""
from docx.shared import Inches
from docx import Document

document = Document()
document.add_picture(image_path_or_stream='./imgs/jujingyi.jpeg', width=Inches(3.5))
document.save('./result/保持图片宽高比.docx')
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/2020111518130166.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RoYW5sb24=,size_16,color_FFFFFF,t_70#)

该 Inches 和 Cm 被提供的类，让你指定派上用场单位测量。内部 python-docx 使用英制公制 914400 英寸。因此，如果您忘记了，只是放一些类似的东西，width=2 您将得到一个非常小的图像:)。您需要从 docx.shared 子包中导入它们。您可以在算术中使用它们，就像它们是整数一样，实际上它们是整数。因此，像这样的表达式效果很好。width = Inches(3) / thing_count

<hr>

##### 8. 应用段落样式
如果您不知道 Word 段落样式是什么，则一定要检查一下。基本上，它允许您一次将一整套格式选项应用于一个段落，它们很像 CSS 样式。

您可以在创建段落时直接应用段落样式：
```python
document.add_paragraph('Lorem ipsum dolor sit amet.', style='ListBullet')
```
这种特殊的样式使段落显示为项目符号，非常方便。您也可以在以后应用样式。这两行等效于上面的那一行：
```python
paragraph = document.add_paragraph('Lorem ipsum dolor sit amet.')
paragraph.style = 'List Bullet'
```
在此示例中，使用样式名称 “List Bullet” 指定样式。通常，样式名称与在 Word 用户界面（UI）中显示的名称完全相同。

实操：
```python
"""
@from：https://pythoneers.cn
@author: qq3330447288
@contact: erics1996@yeah.net
@software: PyCharm
@file: 应用段落样式.py
@time: 2020/11/15 下午6:35
"""
from docx import Document

document = Document()
# document.add_paragraph('Lorem ipsum dolor sit amet.', style='ListBullet')
paragraph = document.add_paragraph('Lorem ipsum dolor sit amet.')
paragraph.style = 'ListBullet'
document.save('./result/应用段落样式.docx')
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201115184859555.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RoYW5sb24=,size_16,color_FFFFFF,t_70#)

<hr>

##### 9. 应用粗体和斜体
为了了解粗体和斜体的工作原理，您需要对段落中的内容有所了解。简短的版本是这样的：

段落包含所有块级格式，例如缩进，行高，制表符等。

在运行级别应用字符级别的格式，例如粗体和斜体 。段落中的所有内容都必须在一行中，但可以有多个。因此，在中间有一个粗体字的段落将需要三个运行，一个普通的运行，一个包含该单词的加粗运行，以及后面的文本的另一个正常运行。

通过向 .add_paragraph() 方法提供文本来添加段落时，该段落将一次运行。您可以使用 .add_run() 以下段落中的方法添加更多内容：
```python
paragraph = document.add_paragraph('Lorem ipsum ')
paragraph.add_run('dolor sit amet.')
```
这将产生一个看起来像是从单个字符串创建的段落的段落。除非您查看 XML，否则不知道段落文本在何处分解。请注意第一个字符串末尾的尾随空格。您需要明确说明运行开始和结束处的空格。它们不会在两次运行之间自动插入。期望被那几次抓到:)。

Run 对象具有 .bold 和 .italic 属性，可让您设置运行的值：
```python
paragraph = document.add_paragraph('Lorem ipsum ')
run = paragraph.add_run('dolor')
run.bold = True
paragraph.add_run(' sit amet.')
```
请注意，.add_run() 如果您不需要其他结果，则可以在结果上设置粗体或斜体：
```python
paragraph.add_run('dolor').bold = True
```
等价于：
```python
run = paragraph.add_run('dolor')
run.bold = True
```
不必向该 .add_paragraph() 方法提供文本。如果您仍要从运行中构建段落，则可以使代码更简单：
```python
paragraph = document.add_paragraph()
paragraph.add_run('Lorem ipsum')
paragraph.add_run('dolor').bold = True
paragraph.add_run(' sit amet.')
```
实操：
```python
"""
@from：https://pythoneers.cn
@author: qq3330447288
@contact: erics1996@yeah.net
@software: PyCharm
@file: 应用粗体和斜体.py
@time: 2020/11/15 下午7:33
"""
from docx import Document

document = Document()
paragraph = document.add_paragraph()
paragraph.add_run('Lorem ipsum ')
paragraph.add_run('dolor').bold = True
"""
# paragraph.add_run('dolor').bold = True等价于
run = paragraph.add_run('dolor')
run.bold = True
"""
paragraph.add_run(' sit amet.')
document.save('./result/应用粗体和斜体.docx')
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/2020111519410118.png#)
<hr>

##### 10. 应用字体样式
除了指定一组段落级别设置的段落样式外，Word 还具有指定一组运行级别设置的字符样式。通常，您可以将字符样式视为指定字体，包括字体，大小，颜色，粗体，斜体等。

与段落样式一样，在使用 Document() 调用打开的文档中必须已经定义了一种样式（请参阅 了解样式）。

添加新的运行时可以指定字符样式：
```python
paragraph = document.add_paragraph('Normal text, ')
paragraph.add_run('text with emphasis.', 'Emphasis')
```
创建样式后，还可以将其应用于运行。这段代码产生与上面几行相同的结果：
```python
paragraph = document.add_paragraph('Normal text, ')
run = paragraph.add_run('text with emphasis.')
run.style = 'Emphasis'
```
与段落样式一样，样式名称与在 Word UI 中显示的一样。

实操：
```python
"""
@from：https://pythoneers.cn
@author: qq3330447288
@contact: erics1996@yeah.net
@software: PyCharm
@file: 应用字体样式.py
@time: 2020/11/15 下午7:47
"""
from docx import Document

document = Document()
paragraph = document.add_paragraph('Normal text, ')
paragraph.add_run('text with emphasis.', 'Emphasis')
document.save('./result/应用字体样式.docx')
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201115195035618.png#)

#### PPT自动化
<hr>

#### Excel自动化

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

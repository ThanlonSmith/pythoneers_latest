![数据结构与算法](../img/cv.jpg)
#### 概述与环境搭建
<hr>

##### 1. 概述
OpenCV 是 Intel 开源的计算机视觉库，由一系列 C 函数和少量 C++ 类构成，实现了图像处理和计算机视觉方面的很多通用算法，OpenCV 还拥有包括 300 多个 C 函数跨平台的中高层 API。

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200827143428930.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RoYW5sb24=,size_16,color_FFFFFF,t_70#pic_left)
<hr>

##### 2. 环境搭建
使用PyCharm IDE构建开发环境，创建项目，这里最好新建虚拟环境：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200827120428111.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RoYW5sb24=,size_16,color_FFFFFF,t_70#pic_left)

打开IDE自带的Terminal安装openCV：
```shell
$ pip install opencv-python -i https://mirrors.aliyun.com/pypi/simple
```
openCV只依赖 NumPy，所以执行上面的命令只会安装 NumPy 和 opencv-python 这两个库！
<hr>

#### 图像
<hr>

##### 1. 读入图像
读入图像使用的函数是 <kbd>cv2.imread()</kbd>，第一个传入的参数是 <font>图像的路径</font>，第二个传入的参数是 <font>读取图像的方式</font>。读取图片的方式有：

( 1 ) <kbd>cv2.IMREAD_COLOR</kbd>：读入一副彩色图像，图像的透明度会被忽略。这是默认参数

( 2 ) <kbd>cv2.IMREAD_GRAYSCALE</kbd>：以灰度模式读入图像

( 3 ) <kbd>cv2.IMREAD_UNCHANGED</kbd>：读入一幅图像，并且包括图像的 alpha 通道
```python
import cv2

cv2.imread('./images/u=625783906,2390041116&fm=11&gp=0.jpg', cv2.IMREAD_COLOR)
```
如果传入的图像路径是错误的，OpenCV 也不会报错。但是读入图像后的得到的 img 的值是 None。
<hr>

##### 2. 显示图像
显示图像使用的函数是 <kbd>cv2.imshow()</kbd>，显示图像的窗口会自动调整为图像大小。第一个传入的参数是 <font>窗口的名字</font>，第二个传入的参数是需要 <font>显示的图像</font>。可以创建多个窗口，但是必须设置不同的名字。为了不让图像持续显示而不是一闪而过，需要使用键盘绑定函数 <kbd>cv2.waitKey()</kbd>，参数为0时表示无限期等待键盘输入：
```python
import cv2

img = cv2.imread('./images/u=625783906,2390041116&fm=11&gp=0.jpg')
cv2.imshow('jubaobao_first', img)
cv2.imshow('jubaobao_second', img)
cv2.waitKey(0)
cv2.destroyAllWindows()
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200828120507771.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RoYW5sb24=,size_16,color_FFFFFF,t_70#pic_left)    ![在这里插入图片描述](https://img-blog.csdnimg.cn/20200828120628486.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RoYW5sb24=,size_16,color_FFFFFF,t_70#pic_)

<kbd>cv2.waitKe()</kbd>：是一个键盘绑定函数。需要指出的是它的时间尺度是毫秒级。函数等待特定的几毫秒，看是否有键盘输入。特定的几毫秒之内，如果按下任意键，这个函数会返回按键的 ASCII 码值，程序将会继续运行。如果没有键盘输入，返回值为 -1，如果我们设置这个函数的参数为 0，那它将会无限期的等待键盘输入。

<kbd>cv2.destroyAllWindows()</kbd>：可以轻易 <font>删除任何我们建立的窗口</font>。<kbd>cv2.destroyWindow()</kbd> 如果想删除特定的窗口可以在括号内输入你想删除的窗口名。

一种特殊的情况是，可以先创建一个窗口，之后再加载图像。这种情况下，你可以决定窗口是否可以调整大小。使用到的函数是 <kbd>cv2.namedWindow()</kbd> 。初始设定函数标签是 <kbd>cv2.WINDOW_AUTOSIZE</kbd>。但是如果你把标签改成 <kbd>cv2.WINDOW_NORMAL</kbd>，你就可以使用鼠标调整窗口大小了。<font>当图像维度太大，或者要添加轨迹条时，调整窗口大小将会很有用</font>。代码如下：
```python
import cv2

img = cv2.imread('./images/u=814827906,2707114620&fm=26&gp=0.jpg')
cv2.namedWindow('image',cv2.WINDOW_NORMAL)
cv2.imshow('image', img)
cv2.waitKey(0)
cv2.destroyAllWindows()
```
<hr>

##### 3. 保存图像
保存图像使用的函数是 <kbd>cv2.imwrite()</kbd>，第一个参数是图像保存后的一个文件名，第二个参数是你想要保存的图像：
```python
import cv2
img = cv2.imread('./images/u=3472372044,2573289519&fm=11&gp=0.jpg')
cv2.imwrite('jubaobao.jpg',img)
```
这样图像就会被保存到当前目录下！
<hr>

##### 4. 总结
下面的程序将会加载一个灰度图，显示图像，按下 ’s’ 键保存后退出，或者按下 ESC 键退出不保存：
```python
import cv2

img = cv2.imread('./images/u=2423156162,3851369683&fm=26&gp=0.jpg', 0)
cv2.imshow('image', img)
k = cv2.waitKey(0)
if k == 27:  # 如果按下ESC按键退出不保存
    cv2.destroyAllWindows()
elif k == ord('s'):  # 按下’s’键保存后退出
    cv2.imwrite('jubaobao.jpg', img)
    cv2.destroyAllWindows()
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200828125348717.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RoYW5sb24=,size_16,color_FFFFFF,t_70#pic_left)

图像的显示也可以使用 Matplotlib，Matplotib 是 python 的一个绘图库，里面有各种各样的绘图方法，使用之前需要安装：
```shell
$ pip install matplotlib -i https://mirrors.aliyun.com/pypi/simple
```
下面使用 Matplotlib 显示一幅图像，
```python
import cv2
from matplotlib import pyplot as plt

img = cv2.imread('./images/u=3472372044,2573289519&fm=11&gp=0.jpg', 0)
plt.imshow(img, cmap='gray', interpolation='bicubic')
plt.xticks([]),plt.yticks([])
plt.show()
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200828131522618.png#pic_left)

彩色图像使用 OpenCV 加载时是 BGR 模式。但是 Matplotib 是 RGB模式。所以彩色图像如果已经被 OpenCV 读取，那它将不会被 Matplotib 正确显示。
<hr>

#### 视频
<hr>

##### 1. 摄像头捕获视频
我们经常需要使用摄像头捕获实时图像。OpenCV 为这中应用提供了一个非常简单的接口。让我们使用摄像头来捕获一段视频，并把它转换成灰度视频显示出来。从这个简单的任务开始吧。

为了获取视频，你应该创建一个 <font>VideoCapture</font> 对象。他的参数可以是设备的索引号，或者是一个视频文件。设备索引号就是在指定要使用的摄像头。一般的笔记本电脑都有内置摄像头。所以参数就是 0。你可以通过设置成 1 或者其他的来选择别的摄像头。之后，你就可以一帧一帧的捕获视频了。但是最后，别忘了停止捕获视频。摄像头捕获视频需要使用到 <kbd>cv2.VideoCapture()</kbd> 函数。
```python
import cv2

cap = cv2.VideoCapture(0)
while (True):
    # 一帧一帧捕获
    ret, frame = cap.read()
    # 镜像水平翻转
    frame = cv2.flip(frame, 1)
    # 对帧的操作，转换成灰度图像
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    # 显示结果帧
    cv2.imshow('frame', gray)
    # 输入q退出捕获
    if cv2.waitKey(1) == ord('q'):
        break
# 当一切都完成后，释放捕获
cap.release()
# 销毁窗口
cv2.destroyAllWindows()
```
<kbd>cap.read()</kbd> 返回一个布尔值。如果帧读取的是正确的，就是 True。所以最后你可以通过检查他的返回值来查看视频文件是否已经到了结尾。

有时 cap 可能不能成功的初始化摄像头设备。这种情况下上面的代码会报错。你可以使用 <kbd>cap.isOpened()</kbd>，来检查是否成功初始化了。如果返回值是True，那就没有问题。否则就要使用函数 <kbd>cap.open()</kbd>。

你可以使用函数 <kbd>cap.get(propId)</kbd> 来获得视频的一些参数信息。这里 propId 可以是 0 到 18 之间的任何整数。每一个数代表视频的一个属性。其中的一些值可以使用 <kbd>cap.set(propId,value)</kbd> 来修改，value 就是你想要设置成的新值。例如，我可以使用 <kbd>cap.get(3)</kbd> 和 <kbd>cap.get(4)</kbd> 来查看每一帧的宽和高。默认情况下得到的值是 640X480。但是我可以使用 <kbd>ret=cap.set(3,320)</kbd> 和 <kbd>ret=cap.set(4,240)</kbd> 来把宽和高改成 320X240。

当程序报错时，首先应该检查你的摄像头是否能够在其他程序中正常工作（比如 linux 下的 Cheese）
<hr>

##### 2. 从文件中播放视频
与从摄像头中捕获一样，只需要把设备索引号改成视频文件的名字。在播放每一帧时，使用 <kbd>cv2.waiKey()</kbd> 设置适当的持续时间。如果设置的太低视频就会播放的非常快，如果设置的太高就会播放的很慢（可以使用这种方法控制视频的播放速度）。通常情况下 25 毫秒就可以了：
```python
import cv2

cap = cv2.VideoCapture(
    'https://vd4.bdstatic.com/mda-khuhakge1k4pj6u2/v1-cae/sc/mda-khuhakge1k4pj6u2.mp4?auth_key=1598678110-0-0-c3851c0b2d9af49ac6b86c9dde38f141&bcevod_channel=searchbox_feed&pd=1&pt=3')
while (True):
    # 一帧一帧捕获
    ret, frame = cap.read()
    # 对帧的操作，转换成灰度图像
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    # 显示结果帧
    cv2.imshow('frame', gray)
    # 输入q退出捕获
    if cv2.waitKey(25) == ord('q'):
        break
# 当一切都完成后，释放捕获
cap.release()
# 销毁窗口
cv2.destroyAllWindows()
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200829125010633.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RoYW5sb24=,size_16,color_FFFFFF,t_70#pic_left)
<hr>

##### 3. 保存视频
在我们捕获视频，并对每一帧都进行加工之后我们想要保存这个视频。对于图片来时很简单只需要使用 <kbd>cv2.imwrite()</kbd>。但对于视频来说就要多做点工作。

这次我们要创建一个 VideoWriter 的对象。我们应该确定一个输出文件的名字。接下来指定 FourCC 编码（下面会介绍）。播放频率和帧的大小也都需要确定。最后一个是 isColor 标签。如果是 True，每一帧就是彩色图，否则就是灰度图。

FourCC 就是一个 4 字节码，用来确定视频的编码格式。可用的编码列表可以从 fourcc.org 查到。这是平台依赖的。下面这些编码器对我来说是有用的。如：DIVX, XVID, MJPG, X264, WMV1, WMV2（MJPG产生高尺寸视频。X264给出非常小尺寸的视频）。FourCC 码以下面的格式传给程序，以 MJPG 为例：<kbd>cv2.cv.FOURCC('M','J','P','G')</kbd> 或者 <kbd>cv2.cv.FOURCC(*'MJPG')</kbd>。下面的代码是从摄像头中捕获视频，沿水平方向旋转每一帧并保存它：
```python
import cv2

cap = cv2.VideoCapture(0)
# 定义编解码器并创建VideoWriter对象
fourcc = cv2.VideoWriter_fourcc(*'XVID')
out = cv2.VideoWriter('output.avi', fourcc, 20.0, (640, 480))

while (cap.isOpened()):
    # 一帧一帧捕获
    ret, frame = cap.read()
    if ret:
        # 镜像水平翻转
        frame = cv2.flip(frame, 1)
        # 写翻转的帧
        out.write(frame)
        # 显示结果帧
        cv2.imshow('frame', frame)
        # 输入q退出捕获
        if cv2.waitKey(25) == ord('q'):
            break
    else:
        break
#  如果工作完成了就释放一切
cap.release()
out.release()
cv2.destroyAllWindows()
```
<hr>

#### 绘图函数
OpenCV 可以绘制不同几何图形，绘图相关的函数有 <kbd>cv2.line()</kbd>，<kbd>cv2.circle()</kbd>，<kbd>cv2.rectangle()</kbd>，<kbd>cv2.ellipse()</kbd>，<kbd>cv2.putText()</kbd>。些绘图函数需要设置下面这些参数：

|参数  | 解释|
|--|--|
|img |你想要绘制图形的那幅图像|
| color| 形状的颜色。以 RGB 为例，需要传入一个元组，例如（255,0,0）代表蓝色。对于灰度图只需要传入灰度值。 |
|thickness | 线条的粗细。如果给一个闭合图形设置为 -1，那么这个图形就会被填充。默认值是 1|
|	linetype|线条的类型，8 连接，抗锯齿等。默认情况是 8 连接。**`cv2.LINE_AA`** 为抗锯齿，这样看起来会非常平滑	|

<hr>

##### 1. 画线
要画一条线，你只需要告诉函数这条线的起点和终点。使用到的函数是：
```python
line(img, pt1, pt2, color, thickness=None, lineType=None, shift=None)
```
我们下面会画一条从左上方到右下角的蓝色线段：
```python
import numpy as np
import cv2

# 创建一幅黑色图像
img = np.zeros((200, 200, 3), np.uint8)

# 画一条粗细为5px的蓝色对角线
cv2.line(img, (0, 0), (199, 199), (255, 0, 0), 5)
cv2.imshow('line', img)
cv2.waitKey(0)
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200828134104727.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RoYW5sb24=,size_16,color_FFFFFF,t_70#pic_left)
<hr>

##### 2. 画矩形
要画一个矩形，你需要告诉函数的左上角顶点和右下角顶点的坐标。使用到的函数是：
```python
rectangle(img, pt1, pt2, color, thickness=None, lineType=None, shift=None)
```
这次我们会在图像的右上角画一个绿色的矩形：
```python
import numpy as np
import cv2

# 创建一幅黑色图像
img = np.zeros((300, 400, 3), np.uint8)
# 起点坐标： (299, 0)，终点坐标：(399, 99)，颜色：(0, 255, 0)，线条粗细：1
cv2.rectangle(img, (299, 0), (399, 99), (0, 255, 0), 1)
cv2.imshow('rectangle', img)
cv2.waitKey(0)
cv2.destroyAllWindows()
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200829133126295.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RoYW5sb24=,size_16,color_FFFFFF,t_70#pic_left)
<hr>

##### 3. 画圆
画圆只需要指定圆形的中心点坐标和半径大小。使用到的函数是：
```python
cv2.circle(img, center, radius, color, thickness=None, lineType=None, shift=None)
```
我们在上面的矩形中画一个圆：
```python
import numpy as np
import cv2

# 创建一幅黑色图像
img = np.zeros((300, 400, 3), np.uint8)
# 起点坐标： (299, 0)，终点坐标：(399, 99)，颜色：(0, 255, 0)，线条粗细：1
cv2.rectangle(img, (299, 0), (399, 99), (0, 255, 0), 1)
# 圆心坐标：(300, 63),半径：150,颜色： (0, 0, 255)，粗细：1（如果是-1表示填充）
cv2.circle(img, (150, 150), 148, (0, 0, 255), 2)
cv2.imshow('circle', img)
cv2.waitKey(0)
cv2.destroyAllWindows()
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200829133059483.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RoYW5sb24=,size_16,color_FFFFFF,t_70#pic_left)
<hr>

##### 4. 画椭圆
要绘制椭圆，我们需要传递几个参数。一个参数是中心位置（x，y）。下一个参数是轴长度（长轴长度，短轴长度）。angle 是椭圆沿逆时针方向旋转的角度。<font>startAngle</font> 和 <font>endAngle</font> 表示从主轴沿顺时针方向测量的椭圆弧的开始和结束。即给定值0和360给出完整的椭圆……。使用到的函数是 <kbd>cv2.ellipse()</kbd> ：
```python
cv2.ellipse(img, center, axes, angle, startAngle, endAngle, color, thickness=None, lineType=None, shift=None)
```
下面的例子是在图片的中心绘制半个椭圆：
```python
import numpy as np
import cv2

# 创建一幅黑色图像
img = np.zeros((300, 400, 3), np.uint8)
# 起点坐标： (299, 0)，终点坐标：(399, 99)，颜色：(0, 255, 0)，线条粗细：1
cv2.rectangle(img, (299, 0), (399, 99), (0, 255, 0), 1)
# 圆心坐标：(300, 63),半径：150,颜色： (0, 0, 255)，粗细：1（如果是-1表示填充）
cv2.circle(img, (150, 150), 148, (0, 0, 255), 2)
# 椭圆圆心：(150, 150)
# 长轴和短轴的长度：(100,80)
# 逆时针方向旋转的角度:0
# 椭圆弧演顺时针方向起始的角度和结束角度:0,180
# 颜色：(255, 0, 0)<=>255
# 粗细：-1（-1是填充整个椭圆）
cv2.ellipse(img, (150, 150), (100, 80), 0, 0, 180, 255, -1)
cv2.imshow('circle', img)
cv2.waitKey(0)
cv2.destroyAllWindows()
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200829140510725.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RoYW5sb24=,size_16,color_FFFFFF,t_70#pic_left)
<hr>

##### 5. 画多边形
要绘制多边形，首先需要顶点的坐标。将这些点设置为 ROWSx1x2 形状的数组，其中 ROWS 是顶点数，并且其类型应为 int32，绘制多边形使用的函数是：
```python
cv2.polylines(img, pts, isClosed, color, thickness=None, lineType=None, shift=None)
```
这里画一个黄色的具有四个顶点的多边形：
```python
import numpy as np
import cv2

winname = 'polygon'
cv2.namedWindow(winname)
# 创建一幅黑色图像
img = np.zeros((300, 400, 3), np.uint8)
pts = np.array([[10, 5], [20, 30], [70, 20], [50, 10]], np.int32)
"""
pts：
array([[10,  5],
       [20, 30],
       [70, 20],
       [50, 10]], dtype=int32)
"""
# reshape 的第一个参数为-1, 表明这一维的长度是根据后面的维度的计算出来的
pts = pts.reshape((-1, 1, 2))
"""
pts：
array([[[10,  5]],
       [[20, 30]],
       [[70, 20]],
       [[50, 10]]], dtype=int32)
"""
cv2.polylines(img, [pts], True, (0, 255, 255))
cv2.imshow(winname, img)
cv2.waitKey(0)
cv2.destroyWindow(winname)
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200830025359139.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RoYW5sb24=,size_16,color_FFFFFF,t_70#pic_left)

如果第三个参数为 False，您将获得一条连接所有点的折线，而不是闭合形状。<kbd>cv2.polylines()</kbd> 可以被用来画很多条线。只需要把想要画的线放在一个列表中，将这个列表传给函数就可以了。每条线都会被独立绘制。这会比用 <kbd>cv2.line()</kbd> 一条一条的绘制要快一些。**
<hr>

##### 6. 添加文字到图像
要在图片上绘制文字，你需要设置下列参数：你要绘制的文字，你要绘制的位置，字体类型（通过查看 <kbd>cv2.putText()</kbd> 的文档找到支持的字体），字体的大小，文字的一般属性如颜色、粗细、线条的类型等。为了更好看一点推荐使用
<font>linetype=cv2.LINE_AA</font>。添加文字到图像使用到的函数是：
```python
putText(img, text, org, fontFace, fontScale, color, thickness=None, lineType=None, bottomLeftOrigin=None)
```
在图像上绘制白色的 OpenCV-Python：
```python
import cv2

win_name = 'OpenCV-Python'
# cv2.namedWindow('OpenCV-Python',cv2.WINDOW_NORMAL)
cv2.namedWindow(win_name)
img = cv2.imread('../images/u=3938089569,3100006972&fm=26&gp=0.jpg')
font = cv2.FONT_HERSHEY_SIMPLEX
lineType = cv2.LINE_AA
# img：图像
# OpenCV-Python：要添加的文字
# (20, 110)：起始坐标
# font：字体
# 1：字体比例
# (255, 255, 255)：字的颜色
# 4：字的粗细
# lineType：线的类型：
cv2.putText(img, 'OpenCV-Python', (20, 110), font, 1, (255, 255, 255), 4, lineType)
cv2.imshow(win_name, img)
cv2.waitKey(0)
cv2.destroyWindow(win_name)
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200829143806709.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RoYW5sb24=,size_16,color_FFFFFF,t_70#pic_left)

所有绘图函数的返回值都是 None， 所以不能使用
```python
img = cv2.line(img, (0, 0), (199, 199), (255, 0, 0), 5)
```
<hr>

#### 鼠标作画笔
<hr>

##### 1. 鼠标作画笔简单演示
首先我们创建一个鼠标回调函数，该函数在发生鼠标事件时执行。鼠标事件可以是与鼠标相关的任何东西，例如左键按下，左键按下，左键双击等。它为我们提供了每个鼠标事件的坐标。可以通过执行下列代码查看所有被支持的鼠标事件：
```python
import cv2

events = [i for i in dir(cv2) if 'EVENT' in i]
print(events)
"""
[
'EVENT_FLAG_ALTKEY', 'EVENT_FLAG_CTRLKEY', 'EVENT_FLAG_LBUTTON', 
'EVENT_FLAG_MBUTTON', 'EVENT_FLAG_RBUTTON', 'EVENT_FLAG_SHIFTKEY', 
'EVENT_LBUTTONDBLCLK', 'EVENT_LBUTTONDOWN', 'EVENT_LBUTTONUP',
'EVENT_MBUTTONDBLCLK', 'EVENT_MBUTTONDOWN', 'EVENT_MBUTTONUP', 
'EVENT_MOUSEHWHEEL', 'EVENT_MOUSEMOVE', 'EVENT_MOUSEWHEEL',
'EVENT_RBUTTONDBLCLK', 'EVENT_RBUTTONDOWN', 'EVENT_RBUTTONUP'
]
"""
```
创建鼠标回调​​函数具有特定的格式，该格式在所有地方都相同。它仅在功能上有所不同。因此，我们的鼠标回调函数会做一件事，在我们双击的地方绘制一个圆圈：
```python
import cv2 as cv
import numpy as np


# 鼠标回调函数
def draw_circle(event, x, y, flags, param):
    if event == cv.EVENT_LBUTTONDBLCLK:
        cv.circle(img, (x, y), 50, 255, -1)


# 创建一个黑色图像，一个窗口
img = np.zeros((300, 400, 3), np.uint8)
winname = 'image'
cv.namedWindow(winname)
# 将函数绑定到窗口
cv.setMouseCallback(winname, draw_circle)
while (1):
    cv.imshow(winname, img)
    # 按esc按键退出
    if cv.waitKey(20) == 27:
        break
cv.destroyWindow(winname)
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200830094318368.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RoYW5sb24=,size_16,color_FFFFFF,t_70#pic_left)
<hr>

##### 2. 鼠标作画笔更高级演示
现在我们去寻求更好的应用程序。在这种情况下，我们像在 “画图” 应用程序中一样，通过拖动鼠标来绘制矩形或圆形（取决于我们选择的模式）。因此，我们的鼠标回调函数包含两个部分，一个用于绘制矩形，另一个用于绘制圆形。这个特定的示例对于创建和理解一些交互式应用程序（如对象跟踪，图像分割等）将非常有帮助。
```python
import numpy as np
import cv2 as cv

drawing = False  # 如果按下鼠标则为真
mode = True  # 如果为真，则绘制矩形。按“m”切换到曲线
ix, iy = -1, -1


# 鼠标回调函数
def draw_circle(event, x, y, flags, param):
    global ix, iy, drawing, mode
    # 按下鼠标
    if event == cv.EVENT_LBUTTONDOWN:
        drawing = True
        ix, iy = x, y
    # 移动鼠标
    elif event == cv.EVENT_MOUSEMOVE:
        if drawing is True:
            if mode is True:
                cv.rectangle(img, (ix, iy), (x, y), (0, 255, 0), -1)
            else:
                cv.circle(img, (x, y), 10, (0, 0, 255), -1)
    # 鼠标离开
    elif event == cv.EVENT_LBUTTONUP:
        drawing = False
        if mode is True:
            cv.rectangle(img, (ix, iy), (x, y), (0, 255, 0), -1)
        else:
            cv.circle(img, (x, y), 10, (0, 0, 255), -1)


# 创建一个黑色图像，一个窗口
img = np.zeros((300, 400, 3), np.uint8)
winname = 'image'
cv.namedWindow(winname)
# 将函数绑定到窗口
cv.setMouseCallback(winname, draw_circle)
while (1):
    cv.imshow(winname, img)
    # 按esc按键退出
    k = cv.waitKey(27)
    if k == ord('m'):
        mode = not mode
    elif k == 27:
        break
cv.destroyWindow(winname)
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200830102249447.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RoYW5sb24=,size_16,color_FFFFFF,t_70)
<hr>

#### 轨迹栏作调色板
在这里，我们将创建一个简单的应用程序，以显示您指定的颜色。您有一个显示颜色的窗口，以及三个用于指定B，G，R颜色的跟踪栏。滑动轨迹栏，并相应地更改窗口颜色。默认情况下，初始颜色将设置为黑色。

对于 <kbd>cv.createTrackbar()</kbd> 函数，第一个参数是 <font>跟踪栏名称</font>，第二个参数是其 <font>附加到的窗口名称</font>，第三个参数是 <font>默认值</font>，第四个参数是 font>最大值</font>，第五个参数是 <font>执行的回调函数每次跟踪栏值更改</font>。回调函数始终具有默认参数，即轨迹栏位置。在我们的例子中，函数什么都不做，所以我们简单地通过。

轨迹栏的另一个重要应用是将其用作按钮或开关。默认情况下，OpenCV 不具有按钮功能。因此，您可以使用轨迹栏来获得此类功能。在我们的应用程序中，我们创建了一个开关，只有在该开关为 ON 的情况下，该应用程序才能在其中运行，否则屏幕始终为黑色。
```python
import numpy as np
import cv2 as cv

def nothing(x) -> None:
    pass

# 创建黑色图像
img = np.zeros((200, 400, 3), np.uint8)
# 创建一个窗口
winname = 'image'
cv.namedWindow(winname)
# 创建用于颜色更改的轨迹栏
cv.createTrackbar('R', winname, 0, 255, nothing)
cv.createTrackbar('G', winname, 0, 255, nothing)
cv.createTrackbar('B', winname, 0, 255, nothing)
# 为开/关功能创建开关
switch = '0 : OFF \n 1 : ON'
cv.createTrackbar(switch, winname, 0, 1, nothing)
while (1):
    cv.imshow(winname, img)
    k = cv.waitKey(1)
    if k == 27:
        break
    # 获取四个轨迹条的当前位置
    r = cv.getTrackbarPos('R', winname)
    g = cv.getTrackbarPos('G', winname)
    b = cv.getTrackbarPos('B', winname)
    s = cv.getTrackbarPos(switch, winname)
    # 开关关闭
    if s == 0:
        img[:] = 0
    # 开关打开
    else:
        img[:] = [b, g, r]
cv.destroyWindow(winname)
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200830104444141.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RoYW5sb24=,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200830104432724.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RoYW5sb24=,size_16,color_FFFFFF,t_70#)
<hr>

#### 图像的基本操作
本节中的几乎所有操作都主要与 Numpy 而不是 OpenCV 有关,要使用 OpenCV 编写更好的优化代码，需要 Numpy 的丰富知识。
<hr>

##### 1. 访问和修改像素值
需要加载的彩色图像给你准备好了：

![在这里插入图片描述](https://img-blog.csdnimg.cn/2020083011165933.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RoYW5sb24=,size_16,color_FFFFFF,t_70#)

加载彩色图像：
```python
import cv2 as cv
img = cv.imread('../images/u=2875076343,2172557877&fm=15&gp=0.jpg')
```
通过像素值的行和列坐标来访问它，对于BGR图像，它将返回一个蓝色、绿色、红色值的数组。对于灰度图像，仅返回相应的强度：
```python
import cv2 as cv

img = cv.imread('../images/u=2875076343,2172557877&fm=15&gp=0.jpg')
# 通过像素值的行和列坐标来访问图像
px = img[100, 100]
print(px)  # [243 245 253]
# 仅访问蓝色像素
blue = img[100, 100, 0]
print(blue)  # 243
```
可以用相同的方式修改像素值：
```python
import numpy as np
import cv2 as cv

img = cv.imread('../images/u=2875076343,2172557877&fm=15&gp=0.jpg')
# 通过像素值的行和列坐标来访问图像
px = img[100, 100]
print(px)  # [243 245 253]
# 仅访问蓝色像素
blue = img[100, 100, 0]
print(blue)  # 243
# 修改像素值
img[100, 100] = [255, 255, 255]
print(img[100, 100])  # [255 255 255]
```
><font>Numpy是用于快速数组计算的优化库。因此，简单地访问每个像素值并对其进行修改将非常缓慢，因此不建议使用。</font>

上面的方法通常 <font>用于选择数组的区域，例如前5行和后3列</font>。对于单个像素访问，Numpy 数组方法 <kbd>array.item()</kbd> 和 <kbd>array.itemset()</kbd> 更好。它们总是返回标量，因此，如果要访问所有B，G，R值，则需要为每个值分别调用 <kbd>array.item()</kbd>。更好的像素访问和编辑方法：
```python
import cv2 as cv

img = cv.imread('../images/u=2875076343,2172557877&fm=15&gp=0.jpg')
# 通过像素值的行和列坐标来访问图像
px = img[100, 100]
print(px)  # [243 245 253]
# 仅访问蓝色像素
blue = img[100, 100, 0]
print(blue)  # 243
# 修改像素值
img[100, 100] = [255, 255, 255]
print(img[100, 100])  # [255 255 255]
# 更好的像素访问和编辑方法
px = img.item(100, 100, 2)
print(px)  # 255
img.itemset((100, 100, 2), 100)
px = img.item(100, 100, 2)
print(px)  # 100
```
##### 2. 访问图像属性
图像给你准备好了：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200830113131957.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RoYW5sb24=,size_16,color_FFFFFF,t_70#)

图像属性包括行数、列数和通道数；图像数据类型；像素数；等等

图像的形状可通过 <font>img.shape</font> 访问。它返回行、列和通道数的元组（如果图像是彩色的）：
```python
import cv2 as cv

img = cv.imread('../images/u=3126408186,2598873524&fm=15&gp=0.jpg')
# 图像的形状
print(img.shape)
"""
(400, 400, 3)
"""
```
><font>如果图像是灰度的，则返回的元组仅包含行数和列数，因此这是检查加载的图像是灰度还是彩色的好方法。</font>

像素总数可以使用 **`img.size`**：
```python
import cv2 as cv

img = cv.imread('../images/u=3126408186,2598873524&fm=15&gp=0.jpg')
# 像素总数
print(img.size)
"""
480000
"""
```
图像数据类型通过 **`img.dtype`** 获得：
```python
import cv2 as cv

img = cv.imread('../images/u=3126408186,2598873524&fm=15&gp=0.jpg')
# 图像数据类型
print(img.dtype)
"""
uint8
"""
```
<hr>

##### 3. 图像ROI
有时你需要对一幅图像的特定区域（感兴趣的区域，ROI）进行操作。例如我们要检测一副图像中眼睛的位置，我们首先应该在图像中找到脸，再在脸的区域中找眼睛，而不是直接在一幅图像中搜索。这样会提高程序的准确性和性能。ROI 也是使用 Numpy 索引来获得的。现在我们选择球的部分并把他拷贝到图像的其他区域，首先准备一幅图像：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200902124836167.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RoYW5sb24=,size_16,color_FFFFFF,t_70#)

实现把我们选择球的部分并把他拷贝到图像的其它区域：
```python
import cv2

img = cv2.imread('../../images/roi.jpg')
print(img.shape, img.size, img.dtype)  # (280, 450, 3) 378000 uint8
cv2.imshow('img1', img)
ball = img[231:270, 88:130]  # 第一个参数是高度范围，第二个参数是宽度范围，(88,231)(130,270)
# 显示选择的ROI部分
img[220:259, 10:52] = ball  # 高度范围和宽度范围要一致，(10,220)(52,259)
cv2.imshow('ball', ball)
cv2.imshow('img2', img)
cv2.waitKey(0)
cv2.destroyAllWindows()
```
ROI：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200902124919985.png#)

处理之后的效果：

![在这里插入图片描述](https://img-blog.csdnimg.cn/2020090212501793.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RoYW5sb24=,size_16,color_FFFFFF,t_70#)
<hr>

##### 4. 拆分和合并图像通道
有时您需要在图像的 BGR 通道上单独工作。在这种情况下，您需要将 BGR 图像拆分为单个通道。在其他情况下，您可能需要加入这些单独的渠道来创建 BGR 图像。您可以通过以下方式简单地做到这一点：
```python
import cv2

img = cv2.imread('../../images/u=523101760,644576813&fm=26&gp=0.jpg')
# print(img.shape, img.size, img.dtype)  # (400, 400, 3) 480000 uint8
cv2.imshow('img1', img)
b, g, r = cv2.split(img)  # cv.split()是一项昂贵的操作（就时间而言）。因此，仅在必要时使用它。否则请进行Numpy索引。
img = cv2.merge((b, g, r))
cv2.imshow('img2', img)
cv2.waitKey(0)
cv2.destroyAllWindows()
```
或者：
```python
import cv2

img = cv2.imread('../../images/u=946077695,626131535&fm=26&gp=0.jpg')
cv2.imshow('img1', img)
b = img[:, :, 0]  # 获取蓝色通道值
g = img[:, :, 1]  # 获取绿色通道值
r = img[:, :, 2]  # 获取红色通道值
img = cv2.merge((b, g, r))
cv2.imshow('img2', img)
cv2.waitKey(0)
cv2.destroyAllWindows()
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200902110256318.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RoYW5sb24=,size_16,color_FFFFFF,t_70#) ![在这里插入图片描述](https://img-blog.csdnimg.cn/2020090211031559.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RoYW5sb24=,size_16,color_FFFFFF,t_70#)

假如你想使所有像素的红色通道值都为 0，你不必先拆分再赋值。你可以直接使用 Numpy 索引，这会更快：
```python
import cv2

img = cv2.imread('../../images/u=946077695,626131535&fm=26&gp=0.jpg')
cv2.imshow('img1', img)
img[:, :, 2] = 0  # 红色通道值
cv2.imshow('img2', img)
cv2.waitKey(0)
cv2.destroyAllWindows()
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200902110256318.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RoYW5sb24=,size_16,color_FFFFFF,t_70#) ![在这里插入图片描述](https://img-blog.csdnimg.cn/20200902111248139.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RoYW5sb24=,size_16,color_FFFFFF,t_70#)
<kbd>cv2.split()</kbd> 是一个比较耗时的操作，只有真正需要时才用它，能用NumPy索引就尽量用。
<hr>

##### 5. 为图像设置边框
如果你想在图像周围创建一个边，就像相框一样，你可以使用 <kbd>cv2.copyMakeBorder()</kbd> 函数：
```python
copyMakeBorder(src, top, bottom, left, right, borderType, dst=None, value=None)
```
这经常在卷积运算或 0 填充时被用到。这个函数包括如下参数：

|参数  | 解释|
|--|--|
|	cv.BORDER_CONSTANT|添加指定的彩色边框，需要使用 value 参数配合	|
|cv2.BORDER_REFLECT	|边框将是边框元素的镜像，例如： fedcba \| abcdefgh \| hgfedcb|
|	cv2.BORDER_REFLECT_101|边框将是边框元素的镜像，但略有变化，例如： gfedcb \| abcdefgh \| gfedcba	|
|cv2.BORDER_REPLICATE	|最后一个元素被复制，例如： aaaaaa \| abcdefgh \| hhhhhhh	|
|	cv2.BORDER_WRAP|无法解释，它看起来像这样： cdefgh \| abcdefgh \| abcdefg	|
|value	|	边框颜色，如果边框类型为 cv.BORDER_CONSTANT 时|

为了更好的理解这几种类型请看下面的演示程序：
```python
import cv2
from matplotlib import pyplot as plt

RED = [255, 0, 0]
img1 = cv2.imread('../../images/u=857048284,4213054229&fm=26&gp=0.jpg')
constant = cv2.copyMakeBorder(img1, 50, 50, 50, 50, cv2.BORDER_CONSTANT, value=RED)  # 添加恒定的彩色边框,需要用到value参数
reflect = cv2.copyMakeBorder(img1, 50, 100, 50, 50, cv2.BORDER_REFLECT)  # 边框将是边框元素的镜像
reflect101 = cv2.copyMakeBorder(img1, 50, 50, 50, 50,
                                cv2.BORDER_REFLECT_101)  # 或者使用cv.BORDER_DEFAULT，边框将是边框元素的镜像，但略有变化
replicate = cv2.copyMakeBorder(img1,50, 50, 50, 50, cv2.BORDER_REPLICATE)  # 最后一个元素被复制
wrap = cv2.copyMakeBorder(img1, 50, 50, 50, 50, cv2.BORDER_WRAP)

plt.subplot(231), plt.imshow(img1, 'gray'), plt.title('ORIGINAL')
plt.subplot(232), plt.imshow(constant, 'gray'), plt.title('CONSTANT')
plt.subplot(233), plt.imshow(reflect, 'gray'), plt.title('REFLECT')
plt.subplot(234), plt.imshow(reflect101, 'gray'), plt.title('REFLECT_101')
plt.subplot(235), plt.imshow(replicate, 'gray'), plt.title('REPLICATE')
plt.subplot(236), plt.imshow(wrap, 'gray'), plt.title('WRAP')
plt.show()
```
结果如下（由于是使用 matplotlib 绘制，所以交换 R 和 B 的位置，OpenCV 中是按 BGR，matplotlib 中是按 RGB 排列）：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200902140008861.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RoYW5sb24=,size_16,color_FFFFFF,t_70#)
<hr>
<div style="width: 60px;height: auto;z-index: 99;bottom: 30%;position: fixed;right: 0px" id="plug-ins">
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
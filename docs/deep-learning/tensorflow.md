![数据结构与算法](../img/deep-learning/tensorflow.jpg)
#### Tensorflow
<hr>

##### 1. pip安装TensorFlow
这里使用 Ubuntu 20.04 作为操作系统平台，Ubuntu 20.04 默认安装了 Python3.8 版本，但是没有安装 pip，所以可以使用 apt 先安装 pip：
```shell
$ sudo apt install python3-pip -y
```
查看 pip 的版本，如果不是最新版本顺便将 pip 升级到最新版本：
```shell
$ pip3  -V
$ pip3 install --upgrade pip
```
><font>安装 pip 的方式很多，例如可以把 pip 下载到本地使用 Python 命令安装等。安装 TensorFlow2 需要使用高于 19.0 的 pip 版本</font>。

安装之前需要把 pip 更新到最新版：
```shell
$ pip3 install --upgrade pip
```
安装 virtualenv 来帮助我们创建虚拟环境，这里使用的是国内阿里云的镜像源，下载速度会快很多：
```shell
$ pip3 install -U virtualenv -i https://mirrors.aliyun.com/pypi/simple
```
创建一个新的 Python 虚拟环境，创建一个 ./venv 目录来存放它：
```shell
$ virtualenv ./venv/
```
><font>如果我们想把系统中已有的库也加入到虚拟环境中，可以加上 --system-site-packages。指定 Python 版本适用-p参数，如：-p python3</font>

激活该虚拟环境：
```shell
$ source venv/bin/activate
```
使用 pip 安装支持 GPU 的 TensorFlow 软件包，可以选择稳定版或预览版。安装稳定版的 TensorFlow：
```shell
(venv) $ pip install tensorflow -i https://mirrors.aliyun.com/pypi/simple/
```
><font>如果安装只支持 CPU 版本：pip install tensorflow-cpu；同理安装只支持 GPU 版本：pip install tensorflow-cpu。指定版本：pip install tensorflow-gpu==2.2.0</font>

安装预览版使用下面的命令：
```shell
(venv) $ pip install tf-nightly -i https://mirrors.aliyun.com/pypi/simple/
```
安装之前一定要 <font>保证/tmp空闲足够充足，大概需要3G~4G</font>，当然也可以通过命令临时更改 /tmp 容量：
```shell
$ sudo mount -t tmpfs -o size=4G /tmp
$ df -h
/dev/sda10      4.0G     0  4.0G    0% /tmp
```
查看已安装的所有包：
```py
(venv) $ pip list
```
测试不指定 CPU 和 GPU 版本的 TensorFlow 是否不区分 CPU 和 GPU，是否会支持 GPU。测试发现确实支持 GPU：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200704034512148.png)

><font>直接安装的 TensorFlow，并没有指定 GPU 版本，却得到 GPU 的支持。实际上新版本的 TensorFlow 不指定 GPU 版本同样支持 GPU。对于1.15及更早版本，CPU 和 GPU 软件包是分开的。pip install tensorflow==1.15 是 CPU 版本，pip install tensorflow-gpu==1.15 是 GPU 版本。</font>

<hr>

##### 2. Anaconda安装TensorFlow
Anaconda 是一个开源的 Python 发行版本，其中包含了很多流行的用于科学计算、数据分析的Python包。可以从官网下载，官网地址：**[https://www.anaconda.com/products/individual](https://www.anaconda.com/products/individual)**

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200703134238628.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RoYW5sb24=,size_16,color_FFFFFF,t_70)

也可以到清华镜像站下载，官网链接：**[https://mirrors.tuna.tsinghua.edu.cn/anaconda/archive/](https://mirrors.tuna.tsinghua.edu.cn/anaconda/archive/)**

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200703135637181.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RoYW5sb24=,size_16,color_FFFFFF,t_70)

我们这里直接从清华镜像站复制了 Anaconda 最新版本的链接，使用 wget 或者 axel 先下载到本地：
```shell
$ axel https://mirrors.tuna.tsinghua.edu.cn/anaconda/archive/Anaconda3-5.3.1-Linux-x86_64.sh
```
执行脚本安装 Anaconda，安装过程中根据提示结合自己需要做例如选择安装路径、是否安装 Visual Stadio Code 的一些操作：
```shell
$ ./Anaconda3-5.3.1-Linux-x86_64.sh
```
Anaconda 安装成功之后接下来就可以安装 TensorFlow 了，Anaconda 默认使用国外的镜像源，在我们安装 TensorFlow 之前先更换为国内的镜像源，如更换为 [**`中科大镜像源`**](https://mirrors.ustc.edu.cn/anaconda/pkgs/main)，第一个是最重要且主要的镜像源地址，第二个添不添加都可以：
```shell
$ conda config --add channels https://mirrors.ustc.edu.cn/anaconda/pkgs/main
$ conda config --add channels https://mirrors.ustc.edu.cn/anaconda/pkgs/free
```
更新 conda：
```shell
$ conda update -n base -c defaults conda
```
><font>conda 比 pip 更加强大，可以安装非 Python 库。所以，非常推荐使用 Anaconda 安装 TensorFlow！</font>

创建并进入虚拟环境，离开虚拟环境使用 **`conda deactivate`** 命令：
```shell
$ conda create -n venv python=3.8
$ conda activate venv
(venv) $ conda deactivate
```
安装 TensorFlow GPU 最新版本，当前最新版是 tensorflow-gpu-2.2.0，已知版本的情况下可以指定版本：
```shell
(venv) $ conda install tensorflow-gpu
```
为了检查安装的 TensorFlow 是否是 GPU 版本，需要安装 jupyter notebook 写程序测试：
```shell
(venv) $ conda install jupyter notebook
(venv) $ jupyter notebook
```
测试程序如下，说明我们已经成功安装支持 GPU 的TensorFlow：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200704032216938.png)

至此，Anaconda 安装 TensorFlow 大功告成！

<hr>

##### 3. 构建TensorFlow Docker容器
首先安装 Docker，Dockeer 官方安装文档：**[https://docs.docker.com/engine/install/ubuntu/](https://docs.docker.com/engine/install/ubuntu/)**

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200703203416604.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RoYW5sb24=,size_16,color_FFFFFF,t_70)

安装方式有三种，我这里选择存储库安装。卸载旧版本的 Docker，如果之前安装过：
```py
$ sudo apt remove docker docker-engine docker.io containerd runc
```
设置 Docker 存储库：
```shell
$ sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg-agent \
    software-properties-common
```
添加 Docker 的官方GPG密钥：
```shell
$ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
```
设置稳定的存储：
```shell
$ sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"
```
更新 apt 程序包索引，并安装最新版本的 Docker Engine 和容器：
```shell
$ sudo apt-get update && sudo apt-get install docker-ce docker-ce-cli containerd.io
```
运行 hello-world 映像来验证是否正确安装了 Docker Engine：
```shell
$ sudo docker run -it hello-world
```
查看 Docker 是否启动：
```shell
$ systemctl status docker.service 
```
至此 Docker 安装成功，下面开始安装 TensorFlow。首先下载 TensorFlow Docker 镜像，TensorFlow 提供了很多 ensorFlow Docker 镜像。官方 TensorFlow Docker
映像位于 **[tensorflow/tensorflow](https://hub.docker.com/r/tensorflow/tensorflow/)** Docker Hub 代码库中：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200703211731735.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RoYW5sb24=,size_16,color_FFFFFF,t_70)

>**References：[https://tensorflow.google.cn/install/docker#gpu_support](https://tensorflow.google.cn/install/docker#gpu_support)**

更换下载源为国内的镜像源 **Docker官方中国区**：[**https://registry.docker-cn.com**](https://registry.docker-cn.com) 或者 **阿里云**：[**https://pee6w651.mirror.aliyuncs.com**](https://pee6w651.mirror.aliyuncs.com)：
```shell
$ sudo vim /etc/docker/daemon.json
$ systemctl restart docker.service 
$ cat /etc/docker/daemon.json
{"registry-mirrors": ["https://pee6w651.mirror.aliyuncs.com"]}
```
这里就 pull 一个支持 GPU 和 Jupyter 的版本：
```shell
$ docker pull tensorflow/tensorflow:latest-gpu-jupyter  # latest release w/ GPU support and Jupyter
```
成功安装：
```shell
$ sudo docker images
REPOSITORY              TAG                  IMAGE ID            CREATED             SIZE
tensorflow/tensorflow   latest-gpu-jupyter   8d78dd1e1b64        8 weeks ago         3.99GB
```
查看本地已有的容器：
```shell
$ sudo docker images
REPOSITORY              TAG                  IMAGE ID            CREATED             SIZE
tensorflow/tensorflow   latest-gpu-jupyter   8d78dd1e1b64        8 weeks ago         3.99GB
tensorflow/tensorflow   latest-gpu           f5ba7a196d56        8 weeks ago         3.84GB
```
接下来运行 TAG 是 latest-gpu 的容器，进入容器后可以查看内置的 Python 版本以及安装好的 TensorFlow：
```shell
$ sudo docker run -it tensorflow/tensorflow:latest-gpu
root@c4fceafad48c:/# python -V
Python 3.6.9
root@c4fceafad48c:/# pip list
...
tensorflow-gpu         2.2.0
...
```
可以另外开一个 Terminal，查看正在运行的镜像：
```shell
$ sudo docker ps
CONTAINER ID        IMAGE                              COMMAND             CREATED             STATUS              PORTS               NAMES
49b31ca53c49        tensorflow/tensorflow:latest-gpu   "/bin/bash"         17 seconds ago      Up 16 seconds                           gallant_shirley
```
运行 TAG 是 latest-gpu-jupyter 的容器：
```shell
$ sudo docker run -p 8888:8888 tensorflow/tensorflow:latest-gpu-jupyter
```
浏览器访问下面的链接就可以使用 jupyter notebook：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200703225523709.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RoYW5sb24=,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/2020070322554697.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RoYW5sb24=,size_16,color_FFFFFF,t_70)

<hr>

##### 4. CUDA的安装
CUDA：[**https://developer.nvidia.com/cuda-toolkit**](https://developer.nvidia.com/cuda-toolkit)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200828145319154.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RoYW5sb24=,size_16,color_FFFFFF,t_70#pic_left)

选择平台，不同的平台有不同安装步骤：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200828150008310.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RoYW5sb24=,size_16,color_FFFFFF,t_70#pic_center)

根据下面的命令安装就可以了：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200828150001298.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RoYW5sb24=,size_16,color_FFFFFF,t_70#pic_center)
```python
$ wget https://developer.download.nvidia.com/compute/cuda/repos/ubuntu2004/x86_64/cuda-ubuntu2004.pin
$ sudo mv cuda-ubuntu2004.pin /etc/apt/preferences.d/cuda-repository-pin-600
$ wget https://developer.download.nvidia.com/compute/cuda/11.0.3/local_installers/cuda-repo-ubuntu2004-11-0-local_11.0.3-450.51.06-1_amd64.deb
$ sudo dpkg -i cuda-repo-ubuntu2004-11-0-local_11.0.3-450.51.06-1_amd64.deb
$ sudo apt-key add /var/cuda-repo-ubuntu2004-11-0-local/7fa2af80.pub
$ sudo apt-get update
$ sudo apt-get -y install cuda
```
CUDA 默认是被安装到 /usr/local/ 下，可以查看 CUDA 版本：
```python
$ cd /usr/local/cuda
$ cat version.txt 
CUDA Version 11.0.228
```
<hr>

##### 5. cuDNN的安装
cuDNN：[**https://developer.nvidia.com/cudnn**](https://developer.nvidia.com/cudnn)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200828145648541.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RoYW5sb24=,size_16,color_FFFFFF,t_70#pic_left)

需要登录才能进入下载页面，还需要填写调查问卷！最后才进入下载页面 [**https://developer.nvidia.com/rdp/cudnn-download**](https://developer.nvidia.com/rdp/cudnn-download)：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200828151940346.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RoYW5sb24=,size_16,color_FFFFFF,t_70#pic_left)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200828152856729.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RoYW5sb24=,size_16,color_FFFFFF,t_70#pic_left)

复制链接使用命令下载：
```python
$ wget https://developer.download.nvidia.cn/compute/machine-learning/cudnn/secure/8.0.2.39/11.0_20200724/cudnn-11.0-linux-x64-v8.0.2.39.tgz
```
解压缩：
```python
$ tar zxvf cudnn-11.0-linux-x64-v8.0.2.39.tgz
```
解压缩之后会得到 cuda 文件夹，接着执行下面的操作：
```python
$ sudo cp cuda/include/cudnn.h /usr/local/cuda/include/
$ sudo cp cuda/lib64/libcudnn* /usr/local/cuda/lib64/
$ sudo chmod a+r /usr/local/cuda/include/cudnn.h
$ sudo chmod a+r /usr/local/cuda/lib64/libcudnn*
```
查看版本号：
```python
$ cat cuda/include/cudnn_version.h |grep ^#
#ifndef CUDNN_VERSION_H_
#define CUDNN_VERSION_H_
#define CUDNN_MAJOR 8
#define CUDNN_MINOR 0
#define CUDNN_PATCHLEVEL 2
#define CUDNN_VERSION (CUDNN_MAJOR * 1000 + CUDNN_MINOR * 100 + CUDNN_PATCHLEVEL)
#endif /* CUDNN_VERSION_H */
```
版本是 v8.0.2！

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
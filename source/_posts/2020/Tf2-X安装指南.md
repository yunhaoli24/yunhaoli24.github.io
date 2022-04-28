---
title: Tf2.X安装指南
date: 2020-05-28 10:26:11
tags:
	- Machine learning
	- TensorFlow2
categories:
	- Machine learning
	- TensorFlow2
cover: https://img2.baidu.com/it/u=1618167363,156084292&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=500
---
## 下载Anaconda

从清华源下载 Anaconda
[下载地址](https://mirrors.tuna.tsinghua.edu.cn/anaconda/archive/)，选择自己系统的新版下载。
下载完成后一路next 在这个位置需要添加环境变量，便于以后从cmd访问conda
选Add Anaconda to my PATH environment variable
安装结束后重启计算机

## 配置Anaconda

win+R键，然后输入cmd并回车 在命令行输入

### 更新conda源

`conda config --set show_channel_urls yes`
退出cmd，用记事本打开`C:\Users\@@@.condarc`***@@@为你的用户名（这个文件默认是隐藏的）***，使用以下内容替换.condarc的内容：
```
    channels:
      - defaults
    show_channel_urls: true
    default_channels:
      - https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main
      - https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free
      - https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/r
    custom_channels:
      conda-forge: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
      msys2: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
      bioconda: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
      menpo: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
      pytorch: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
      simpleitk: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
```
保存退出，再次打开cmd

`pip install pip -U`

### 更换清华源

`pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple`


### 创建开发环境

`conda create -n tf2.0 python=3.6`

### 进入创建的开发环境

`conda activate tf2.0`


### 安装tensorflow GPU版本

`pip install tensorflow-gpu`

## 测试tensorflow-gpu版本是否安装成功

`pip install ipython` `ipython` 
在In[1]:中输入`iimport tensorflow as tf`回车，没有报错即为成功 在
In[2]:中输入 `tf.__version__`   回车，显示2.*即为成功 在
In[3]:中输入`tf.test.is_gpu_available()`回车，输出TRUE即为成功

## 安装PyCharm运行tensorflow

百度自行下载PyCharm并破解

### 配置PyCharm与TensorFlow

打开pycahrm，进行新建项目的一些设置 出现如下界面
选择运行环境。选中Existing Interpreter，点击右边设置按钮，选择Add Local
![img](https://i.loli.net/2019/12/02/79vVbeGZPhIAirl.png)
点击Conda Enviroment，选择环境
![img2](https://i.loli.net/2019/12/02/r1KOpGyeDAgnuTJ.png)
进入Anaconda安装路径，选择envs文件夹，里面有建立的环境，选择之前建立的tensorflow环境中的python.exe

### test.py文件测试tensorflow

这是一个简单利用MNIST数据集构建网络运行的小程序，程序会自动从网上下载MNIST数据集并进行训练
```python
    from __future__ import absolute_import, division, print_function, unicode_literals
    import tensorflow as tf
    mnist = tf.keras.datasets.mnist
    (x_train, y_train), (x_test, y_test) = mnist.load_data()
    x_train, x_test = x_train / 255.0, x_test / 255.0
    model = tf.keras.models.Sequential([
      tf.keras.layers.Flatten(input_shape=(28, 28)),
      tf.keras.layers.Dense(128, activation='relu'),
      tf.keras.layers.Dropout(0.2),
      tf.keras.layers.Dense(10, activation='softmax')
    ])
    model.compile(optimizer='adam',
                  loss='sparse_categorical_crossentropy',
                  metrics=['accuracy'])
    model.fit(x_train, y_train, epochs=5)
    model.evaluate(x_test,  y_test, verbose=2)
```
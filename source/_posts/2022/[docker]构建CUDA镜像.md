---
title: 「docker」构建CUDA镜像
date: 2022-5-24 18:00:44
tags:
	- Docker
	- Dockerfile
categories:
	- Docker
	- Dockerfile
cover: https://img2.baidu.com/it/u=4068033886,1626221935&fm=253&fmt=auto&app=120&f=PNG?w=640&h=286
---

# 背景

实验室的服务器内核版本太老了，有一个项目需要升级内核，但是服务器上还有一堆东西不敢随便升级。

于是就准备用docker构建一个镜像，安装CUDA和Python环境，平时ssh连进去炼丹

# 需求

炼丹必备的cuda肯定是必不可少的，ssh服务器也需要配置，既然准备写一个dockerfile，那python环境和换源之类的也就一块打包到镜像里去得了。

以后谁想炼丹直接新建一个容器，映射好端口之后容器里炼丹的基础设施就都有了。

# 安装

## 宿主机安装CUDA驱动

想要容器能用CUDA，宿主机肯定要安装CUDA驱动，这部分就不讲了，好多博客都有。

## 宿主机安装NVIDIA-CONTAINER-RUNTIME

在[https://nvidia.github.io/nvidia-container-runtime/](https://nvidia.github.io/nvidia-container-runtime/) 查看支持的操作系统和版本，并根据对应选项，添加源，因为我是centos7，所以添加方式为：

```shell
distribution=$(. /etc/os-release;echo $ID$VERSION_ID)
curl -s -L https://nvidia.github.io/nvidia-container-runtime/$distribution/nvidia-container-runtime.repo | \
sudo tee /etc/yum.repos.d/nvidia-container-runtime.repo
```

然后直接`yum install` 就可以安装docker cuda驱动

```shell
sudo yum install nvidia-container-runtime
```

进行测试，如果能成功出现显卡信息就可以了

```shell
docker run -it --rm --gpus all centos nvidia-smi
```

## 构建Dockerfile

直接把`Dockerfile`复制过去，build一下就完事了，可能需要根据自己的CUDA版本换一下第一行的`FROM`部分，具体根据[https://hub.docker.com/r/nvidia/cuda/tags](https://hub.docker.com/r/nvidia/cuda/tags)换一下版本号（如果不想安装ubuntu版本的那下边的`RUN apt install`命令都不能执行。

我这里给这个镜像换了阿里源，安装了显示图形界面必备的一些包，打开了ssh-server并设置初始密码为123456。这样镜像跑起来之后就可以直接用ssh连了，不需要`exec`进容器里再设置密码之类的，方便管理员批量创建。

```dockerfile
FROM nvidia/cuda:11.4.2-cudnn8-devel-ubuntu18.04
LABEL author="https://github.com/lealaxy"

ENV PASSWORD="123456" 

RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && echo 'Asia/Shanghai' >/etc/timezone \ 
    && sed -i "s/archive.ubuntu.com/mirrors.aliyun.com/g" /etc/apt/sources.list \
    && sed -i "s/security.ubuntu.com/mirrors.aliyun.com/g" /etc/apt/sources.list \
    && apt clean && apt update && apt install -yq --no-install-recommends sudo \
    && sudo apt install -yq --no-install-recommends python3 python3-pip libgl1-mesa-glx libglib2.0-0 libsm6 libxext6 libxrender-dev openssh-server \
    && sudo pip3 install --upgrade pip \
    && sudo pip3 config set global.index-url https://mirrors.aliyun.com/pypi/simple \
    && sudo pip3 install setuptools \
    && sed -i "s/#PubkeyAuthentication/PubkeyAuthentication/g" /etc/ssh/sshd_config \
    && sed -i "s/#AuthorizedKeysFile/AuthorizedKeysFile/g" /etc/ssh/sshd_config \
    && sed -i "s/#PermitRootLogin prohibit-password/PermitRootLogin yes/g" /etc/ssh/sshd_config \
    && sudo /etc/init.d/ssh restart \
    && echo "root:${PASSWORD}" | chpasswd
ENTRYPOINT /etc/init.d/ssh restart && /bin/bash
```

## 运行容器

把`Dockerfile`写好之后就可以build了

```shell
sudo docker build -t cuda:11.4.2-cudnn8-ubuntu18-py36 .
```

在启动docker容器的时候要注意加一些cuda的参数

* `-p`是映射端口，我这里把22端口映射出来供ssh使用
* `--gpus all`和`-e NVIDIA_VISIBLE_DEVICES=all`选择这个容器可见的显卡，直接全部就完事了
* `-e NVIDIA_DRIVER_CAPABILITIES=compute,utility`配置了一些cuda必备的包如nvidia-smi之类的

```shell
sudo docker run -itd -p 43251:22 --gpus all --name cuda -e NVIDIA_DRIVER_CAPABILITIES=compute,utility -e NVIDIA_VISIBLE_DEVICES=all cuda:11.4.2-cudnn8-ubuntu18-py36
```

运行容器之后就可以愉快的ssh连进去炼丹了，再也不用担心环境搞崩影响其他人了。

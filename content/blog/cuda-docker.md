---
title: 「docker」构建CUDA镜像
date: 2025-02-24
---

# 背景

实验室的服务器内核版本太老了，有一个项目需要升级内核，但是服务器上还有一堆东西不敢随便升级。

于是就准备用docker构建一个镜像，安装CUDA和Python环境，平时ssh连进去炼丹

# 需求

炼丹必备的cuda肯定是必不可少的，ssh服务器也需要配置，既然准备写一个dockerfile，那python环境和必要的包的也就一块打包到镜像里去得了。

以后谁想炼丹直接新建一个容器，映射好端口之后容器里炼丹的基础设施就都有了。

# 安装

## 宿主机安装CUDA驱动

```shell
apt install -y nvidia-driver-550 # you can use other version
```

## 宿主机安装显卡驱动

在[https://nvidia.github.io/nvidia-container-runtime/](https://nvidia.github.io/nvidia-container-runtime/) 查看支持的操作系统和版本，并根据对应选项，添加源，因为我是ubuntu，所以添加方式为：

```shell
curl -fsSL https://nvidia.github.io/libnvidia-container/gpgkey | sudo gpg --dearmor -o /usr/share/keyrings/nvidia-container-toolkit-keyring.gpg \
  && curl -s -L https://nvidia.github.io/libnvidia-container/stable/deb/nvidia-container-toolkit.list | \
    sed 's#deb https://#deb [signed-by=/usr/share/keyrings/nvidia-container-toolkit-keyring.gpg] https://#g' | \
    sudo tee /etc/apt/sources.list.d/nvidia-container-toolkit.list
```

然后直接运行下面的命令就可以安装docker cuda驱动

```shell
sudo apt-get update
apt-get install -y nvidia-container-toolkit
tee /etc/docker/daemon.json <<-'EOF'
{
    "runtimes": {
        "nvidia": {
            "path": "/usr/bin/nvidia-container-runtime",
            "runtimeArgs": []
        }
    },
    "default-runtime": "nvidia"
}
EOF
sudo systemctl restart docker
sudo nvidia-ctk runtime configure --runtime=containerd
```

进行测试，如果能成功出现显卡信息就可以了

```shell
docker run -it --rm --gpus all ubuntu nvidia-smi
```

## 构建Dockerfile

直接把`Dockerfile`复制过去，build即可，可能需要根据自己的CUDA版本换一下第一行的`FROM`部分，具体根据[https://hub.docker.com/r/pytorch/pytorch/tags](https://hub.docker.com/r/pytorch/pytorch/tags)换一下版本号。

我这里给这个镜像安装了显示图形界面必备的一些包，打开了ssh-server并通过环境变量设置初始密码。这样镜像跑起来之后就可以直接用ssh连了，不需要`exec`进容器里再设置密码，方便管理员批量创建。

```dockerfile
FROM pytorch/pytorch:2.6.0-cuda12.6-cudnn9-devel
LABEL author="li.yunhao@foxmail.com"

ENV PASSWORD="123456"

RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && echo 'Asia/Shanghai' >/etc/timezone \
    && conda config --set show_channel_urls yes && conda init\
    && apt clean && apt update && apt install -y --no-install-recommends sudo \
    && apt install -y --no-install-recommends psmisc iputils-ping git-lfs libgl1-mesa-glx libglib2.0-0 libsm6 libxext6 libxrender-dev openssh-server git wget curl vim screen unzip build-essential cmake libncurses5-dev libncursesw5-dev pkg-config libdrm-dev libgtest-dev libudev-dev \
    && sed -i -e '$a\PermitRootLogin yes' -e '$a\PasswordAuthentication yes' /etc/ssh/sshd_config \
    && echo "root:${PASSWORD}" | chpasswd \
    && mkdir -p /run/sshd \
    && conda init \
    && apt clean

# 安装nvtop
RUN git clone https://github.com/Syllo/nvtop.git /opt/nvtop \
    && mkdir -p /opt/nvtop/build \
    && cd /opt/nvtop/build \
    && cmake .. \
    && make && sudo make install \
    && rm -r /opt/nvtop

ENTRYPOINT echo "root:${PASSWORD}" | chpasswd && /usr/sbin/sshd -D

```

## 运行容器

把`Dockerfile`写好之后就可以build了，可以按照希求更改build tag。

```shell
sudo docker build -t server/pytorch/pytorch:2.6.0-cuda12.6-cudnn9-devel .
```

在启动docker容器的时候要注意加一些cuda的参数

* `-p`是映射端口，我这里把`50000`端口映射出来供ssh使用
* `--gpus all`和`-e NVIDIA_VISIBLE_DEVICES=all`选择这个容器可见的显卡，如果需要控制可见显卡，可以通过`--gpus 0,1 -e NVIDIA_VISIBLE_DEVICES=0,1`指定。
* `-e PASSWORD="your_container_password"`配置了容器的ssh密码

```shell
sudo docker run -itd \
    -p 50000:22 --name your_container_name \
    -e PASSWORD="your_container_password" \
    --shm-size=128g \
    --gpus all -e NVIDIA_VISIBLE_DEVICES=all \
    --restart=always \
    server/pytorch/pytorch:2.6.0-cuda12.6-cudnn9-devel
```

运行容器之后就可以愉快的ssh连进去炼丹了，再也不用担心环境搞崩影响其他人了。

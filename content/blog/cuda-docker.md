---
title: 构建PyTorch Docker镜像
date: 2025-02-24
---

::the-title
构建PyTorch Docker镜像
::

## 背景

实验室服务器的内核版本较旧，某个项目需要升级内核，但由于服务器上运行着大量关键服务，直接升级可能存在风险。

因此，计划通过 Docker 构建一个包含 CUDA 和 Python 环境的镜像，通过 SSH 连接到容器中进行深度学习模型训练。

### 需求

CUDA 是深度学习模型训练的核心依赖，必须包含在镜像中。此外，SSH 服务也需要配置以支持远程访问。为了简化环境管理，计划将 Python 环境及常用依赖包一并打包到镜像中。

未来，任何需要进行深度学习模型训练的用户，只需启动一个容器并映射相应端口，即可获得完整的训练环境。

## 安装

### 宿主机安装 CUDA 驱动

以下命令用于安装 NVIDIA 驱动程序（可根据需求选择其他版本）：

```shell
apt install -y nvidia-driver-550 # 可根据实际需求更换版本
```

### 宿主机安装 NVIDIA 容器工具包

访问 [https://nvidia.github.io/nvidia-container-runtime/](https://nvidia.github.io/nvidia-container-runtime/) 查看支持的操作系统和版本，并根据对应的选项添加软件源。以下步骤适用于 Ubuntu 系统：

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

## 构建容器

### 编写 Dockerfile

将以下 `Dockerfile` 复制并根据需求进行调整。如果需要适配不同的 CUDA 版本，请参考 [https://hub.docker.com/r/pytorch/pytorch/tags](https://hub.docker.com/r/pytorch/pytorch/tags) 修改 `FROM` 部分的版本号。

该镜像集成了图形界面所需的依赖包，并启用了 SSH 服务。通过环境变量设置了初始密码，便于管理员批量创建容器，无需手动进入容器设置密码。

```dockerfile [Dockerfile]
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

### build容器

把`Dockerfile`写好之后就可以build了，可以按照希求更改build tag。

```shell
sudo docker build -t server/pytorch/pytorch:2.6.0-cuda12.6-cudnn9-devel .
```

### 运行容器

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

---
title: Docker Caffe训练自定义模型
date: 2020-08-30 20:27:44
tags:
	- Machine learning
	- Caffe
	- Docker
	- Dockerfile
categories:
	- Machine learning
	- Caffe
cover: https://img0.baidu.com/it/u=1443653190,2014929959&fm=253&fmt=auto&app=120&f=JPEG?w=1080&h=608
---
## docker安装caffe

docker构建容器，新建文件Dockerfile，复制进下面的内容，然后运行build构建容器，读条完毕后CPU版的docker Caffe就安装好了。

```bash
docker build -t caffe:1.0 .
```

### Dockerfile

```dockerfile
FROM ubuntu:16.04
LABEL maintainer caffe-maint@googlegroups.com

RUN apt-get update && apt-get install -y --no-install-recommends \
        build-essential \
        cmake \
        git \
        wget \
        libatlas-base-dev \
        libboost-all-dev \
        libgflags-dev \
        libgoogle-glog-dev \
        libhdf5-serial-dev \
        libleveldb-dev \
        liblmdb-dev \
        libopencv-dev \
        libprotobuf-dev \
        libsnappy-dev \
        protobuf-compiler \
        python-dev \
        python-numpy \
        python-pip \
        python-setuptools \
        python-scipy && \
    rm -rf /var/lib/apt/lists/*

ENV CAFFE_ROOT=/opt/caffe
WORKDIR $CAFFE_ROOT

# FIXME: use ARG instead of ENV once DockerHub supports this
# https://github.com/docker/hub-feedback/issues/460
ENV CLONE_TAG=1.0

RUN git clone -b ${CLONE_TAG} --depth 1 https://gitee.com/mirrors/caffe.git . && \
    pip install -i https://pypi.tuna.tsinghua.edu.cn/simple pip -U && \
    pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple && \
    cd python && for req in $(cat requirements.txt) pydot; do pip install $req; done && cd .. && \
    mkdir build && cd build && \
    cmake -DCPU_ONLY=1 .. && \
    make -j"$(nproc)"

ENV PYCAFFE_ROOT $CAFFE_ROOT/python
ENV PYTHONPATH $PYCAFFE_ROOT:$PYTHONPATH
ENV PATH $CAFFE_ROOT/build/tools:$PYCAFFE_ROOT:$PATH
RUN echo "$CAFFE_ROOT/build/lib" >> /etc/ld.so.conf.d/caffe.conf && ldconfig

WORKDIR /workspace

```

## 样本分类和转化样本数据

运行python脚本，把样本数据装化成caffe可以识别的格式。

注意样本数据名称不能有空格如果有空格的话，需要运行下边这个脚本给样本批量重命名。

```bat
@echo off&setlocal EnableDelayedExpansion 
set a=1 
for /f "delims=" %%i in ('dir /b *.bmp') do ( 
if not "%%~ni"=="%~n0" ( 
if !a! LSS 10 (ren "%%i" "!a!.bmp") else ren "%%i" "!a!.bmp" 
set/a a+=1 
) 
)

```

![样本结构](http://img.peterli.club/img/20200830201247.png)



### 样本分类脚本

```python
# -*- coding: UTF-8 -*-
import os
import random

image_path = '../trainImages'  # "train文件夹的路径"
txt_path = '../'  # "生成txt文件夹的路径"

if __name__ == '__main__':
    # 将数据分成训练集，测试集和验证集
    val_percent = 0.2
    train_percent = 0.8

    labels = os.listdir(image_path)

    image_list = [os.path.join(root, fn) for root, dirs, files in os.walk(image_path) for fn in files]
    image_count = len(image_list)

    list = range(image_count)
    tv = int(image_count * val_percent)
    tr = int(image_count * train_percent)
    val = random.sample(list, tv)

    # 创建文件
    file_train = open(txt_path + '/train.txt', 'wt')
    file_val = open(txt_path + '/val.txt', 'wt')

    # 遍历生成文件内容
    for i in list:
        # 解析文件标签
        name = image_list[i]
        sub_name = name[:name.rindex("\\")]
        file_name = name[name.rindex("\\") + 1:]
        label = sub_name[sub_name.rindex("\\") + 1:]
        index = labels.index(label)
        if i in val:
            print('样本 (' + name + ') 标签 (' + str(index) + ') 标为验证集')
            file_val.write(label + '/' + file_name + ' ' + str(index) + '\n')
        else:
            print('样本 (' + name + ') 标签 (' + str(index) + ') 标为训练集')
            file_train.write(label + '/' + file_name + ' ' + str(index) + '\n')

    file_train.close()
    file_val.close()
    print('完成！')

    print('标签种类:')
    print(labels)

    print('样本总数:' + str(image_count))
    print('训练集总数:' + str(tr))
    print('验证集总数:' + str(tv))
    exit(1)

```

生成完txt后，txt里的数据应该是这个样的。

![2019-12-14
22-22-21屏幕截图.png](https://i.loli.net/2019/12/14/GjP5XkZ2vgNSQa7.png)

工程结构是这个样的

![](http://img.peterli.club/img/20200830201449.png)

## 开始训练

创建生成好的容器

```bash
docker run -id --name caffe caffe:1.0
```



输入下边脚本进入容器，并把整个工程复制到初始的`/workspace`目录下。

```bash
sudo docker exec -it 容器号 /bin/bash
```

```bash
docker cp 本地文件的路径 container_id:<docker容器内的路径>
```

### 模型文件

模型都放在工程目录下的`model`文件夹里

**solver.prototxt**

```
net: "/workspace/Caffe/model/train_val.prototxt" #这里时train_val.prototxt文件的路径
test_iter: 4                # x * 50 = 训练集大小
test_interval: 50
base_lr: 0.01
lr_policy: "step"
gamma: 0.1
stepsize: 100
display: 20
max_iter: 1000              #最大训练次数
momentum: 0.9
weight_decay: 0.0005
snapshot: 100                #每x次保存一次模型快照
snapshot_prefix: "/workspace/Caffe/save_model/" #生成快照的路径
solver_mode: CPU
```



**train_val.prototxt**

```prototxt
name: "LeNet"
layer {
  name: "mnist"
  type: "Data"
  top: "data"
  top: "label"
  include {
    phase: TRAIN
  }
  transform_param {
    mirror: true
    crop_size: 20
    mean_file: "/workspace/Caffe/train_mean.binaryproto"
  }
  data_param {
    source: "/workspace/Caffe/train_lmdb"
    batch_size: 32
    backend: LMDB
  }
}
layer {
  name: "mnist"
  type: "Data"
  top: "data"
  top: "label"
  include {
    phase: TEST		
  }
  transform_param {
    mirror: false
    crop_size: 20
    mean_file: "/workspace/Caffe/val_mean.binaryproto"
  }
  data_param {
    source: "/workspace/Caffe/val_lmdb"
    batch_size: 50
    backend: LMDB
  }
}
layer {
  name: "conv1"
  type: "Convolution"
  bottom: "data"
  top: "conv1"
  param {
    lr_mult: 1
  }
  param {
    lr_mult: 2
  }
  convolution_param {
    num_output: 20
    kernel_size: 5
    stride: 1
    weight_filler {
      type: "xavier"
    }
    bias_filler {
      type: "constant"
    }
  }
}
layer {
  name: "pool1"
  type: "Pooling"
  bottom: "conv1"
  top: "pool1"
  pooling_param {
    pool: MAX
    kernel_size: 2
    stride: 2
  }
}
layer {
  name: "conv2"
  type: "Convolution"
  bottom: "pool1"
  top: "conv2"
  param {
    lr_mult: 1
  }
  param {
    lr_mult: 2
  }
  convolution_param {
    num_output: 50
    kernel_size: 5
    stride: 1
    weight_filler {
      type: "xavier"
    }
    bias_filler {
      type: "constant"
    }
  }
}
layer {
  name: "pool2"
  type: "Pooling"
  bottom: "conv2"
  top: "pool2"
  pooling_param {
    pool: MAX
    kernel_size: 2
    stride: 2
  }
}
layer {
  name: "fc1"
  type: "InnerProduct"
  bottom: "pool2"
  top: "ip1"
  param {
    lr_mult: 1
  }
  param {
    lr_mult: 2
  }
  inner_product_param {
    num_output: 500
    weight_filler {
      type: "xavier"
    }
    bias_filler {
      type: "constant"
    }
  }
}
layer {
  name: "relu1"
  type: "ReLU"
  bottom: "ip1"
  top: "ip1"
}
layer {
  name: "ip2"
  type: "InnerProduct"
  bottom: "ip1"
  top: "ip2"
  param {
    lr_mult: 1
  }
  param {
    lr_mult: 2
  }
  inner_product_param {
    num_output: 7  #最后输出的分类数量
    weight_filler {
      type: "xavier"
    }
    bias_filler {
      type: "constant"
    }
  }
}
layer {
  name: "loss"
  type: "Softmax"
  bottom: "ip2"
  top: "loss"
}

```

**deploy.prototxt**

```
name: "LeNet"
layer {
  name: "data"
  type: "Input"
  top: "data"
  input_param { shape: { dim: 1 dim: 3 dim: 20 dim: 20} }
}
layer {
  name: "conv1"
  type: "Convolution"
  bottom: "data"
  top: "conv1"
  param {
    lr_mult: 1
  }
  param {
    lr_mult: 2
  }
  convolution_param {
    num_output: 20
    kernel_size: 5
    stride: 1
    weight_filler {
      type: "xavier"
    }
    bias_filler {
      type: "constant"
    }
  }
}
layer {
  name: "pool1"
  type: "Pooling"
  bottom: "conv1"
  top: "pool1"
  pooling_param {
    pool: MAX
    kernel_size: 2
    stride: 2
  }
}
layer {
  name: "conv2"
  type: "Convolution"
  bottom: "pool1"
  top: "conv2"
  param {
    lr_mult: 1
  }
  param {
    lr_mult: 2
  }
  convolution_param {
    num_output: 50
    kernel_size: 5
    stride: 1
    weight_filler {
      type: "xavier"
    }
    bias_filler {
      type: "constant"
    }
  }
}
layer {
  name: "pool2"
  type: "Pooling"
  bottom: "conv2"
  top: "pool2"
  pooling_param {
    pool: MAX
    kernel_size: 2
    stride: 2
  }
}
layer {
  name: "fc1"
  type: "InnerProduct"
  bottom: "pool2"
  top: "ip1"
  param {
    lr_mult: 1
  }
  param {
    lr_mult: 2
  }
  inner_product_param {
    num_output: 500
    weight_filler {
      type: "xavier"
    }
    bias_filler {
      type: "constant"
    }
  }
}
layer {
  name: "relu1"
  type: "ReLU"
  bottom: "ip1"
  top: "ip1"
}
layer {
  name: "ip2"
  type: "InnerProduct"
  bottom: "ip1"
  top: "ip2"
  param {
    lr_mult: 1
  }
  param {
    lr_mult: 2
  }
  inner_product_param {
    num_output: 7
    weight_filler {
      type: "xavier"
    }
    bias_filler {
      type: "constant"
    }
  }
}
layer {
  name: "loss"
  type: "Softmax"
  bottom: "ip2"
  top: "loss"
}
```



### 训练脚本

```shell
EXAMPLE=/workspace/Caffe #工程的路径
TOOLS=/opt/caffe/build/tools #caffe工具路径
TRAIN_DATA_ROOT=$EXAMPLE/trainImages/ #训练集路径
VAL_DATA_ROOT=$EXAMPLE/trainImages/ #测试集路径
RESIZE=true #这里是resize图片，我这里时开启此功能，resize成20*20
if $RESIZE; then
  RESIZE_HEIGHT=20
  RESIZE_WIDTH=20
else
  RESIZE_HEIGHT=0
  RESIZE_WIDTH=0
fi
if [ ! -d "$TRAIN_DATA_ROOT" ]; then
  echo "Error: 训练集路径错误: $TRAIN_DATA_ROOT"
  echo "Set the TRAIN_DATA_ROOT variable in create_imagenet.sh to the path" \
       "where the ImageNet training data is stored."
  exit 1
fi
if [ ! -d "$VAL_DATA_ROOT" ]; then
  echo "Error: 验证集路径错误: $VAL_DATA_ROOT"
  echo "Set the VAL_DATA_ROOT variable in create_imagenet.sh to the path" \
       "where the ImageNet validation data is stored."
  exit 1
fi
#生成前需要先删除已有的文件夹 必须，不然会报错
rm -rf $EXAMPLE/train_lmdb
rm -rf $EXAMPLE/val_lmdb
echo "删除已有的lmdb文件夹"
#训练_lmdb
echo "生成训练lmdb"
GLOG_logtostderr=1 $TOOLS/convert_imageset \
    --resize_height=$RESIZE_HEIGHT \
    --resize_width=$RESIZE_WIDTH \
    --shuffle \
    $TRAIN_DATA_ROOT \
    $EXAMPLE/train.txt \
    $EXAMPLE/train_lmdb
#生成的训练lmdb文件所在文件夹，注意train_lmdb是文件夹名称
#测试_lmdb
echo "生成测试lmdb"
GLOG_logtostderr=1 $TOOLS/convert_imageset \
    --resize_height=$RESIZE_HEIGHT \
    --resize_width=$RESIZE_WIDTH \
    --shuffle \
    $VAL_DATA_ROOT \
    $EXAMPLE/val.txt \
    $EXAMPLE/val_lmdb
#生成的测试lmdb文件所在文件夹，注意val_lmdb文件夹名称
#解锁生成的文件夹
echo "解锁lmdb文件夹"
chmod -R 777 $EXAMPLE/train_lmdb
chmod -R 777 $EXAMPLE/val_lmdb

#生成image_mean
$TOOLS/compute_image_mean $EXAMPLE/train_lmdb \
        $EXAMPLE/train_mean.binaryproto
$TOOLS/compute_image_mean $EXAMPLE/val_lmdb \
        $EXAMPLE/val_mean.binaryproto

#Caffe训练
mkdir -p $EXAMPLE/save_model
chmod -R 777 $EXAMPLE/save_model

caffe train --solver=$EXAMPLE/model/solver.prototxt
chmod -R 777 $EXAMPLE/save_model
echo "完成"
```

## 复制训练模型

训练结束后，可以使用以下命令复制出训练结束的模型到宿主机，

```bash
docker cp container_id:<docker容器内的路径> <本地保存文件的路径>
```


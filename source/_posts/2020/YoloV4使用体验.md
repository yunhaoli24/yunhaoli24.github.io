---
title: YoloV4使用体验
date: 2020-05-27 22:46:31
tags:
	- Machine learning
	- YOLOV4
categories:
	- Machine learning
	- YOLOV4
cover: https://img0.baidu.com/it/u=1701113910,2775267702&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500
---

# YOLOV4首发使用体验

## YOLOV4训练自己的数据集

> 训练配置基本上就是官方文档的翻译，加上一些自己的理解，英语好的可以直接看[官方文档](https://github.com/AlexeyAB/darknet#how-to-train-to-detect-your-custom-objects)

### 更改网络配置参数（cfg文件）

1. 从yolo给的cfg文件中复制`yolov4-custom.cfg`到自己的项目里，喜欢的可以改一个名字。

2. 更改`batch=64` `subdivisions=64`，YOLOV4提高了训练的要求，我的笔记本的1060居然被嫌弃了，改成64也不能正常开始训练，只好借用高性能台式2070来训练了

3. 设置 `max_batches`为(`classes*2000` 但是最小不能小于 `4000`), 意思就是你有三个目标需要检测就设置 `max_batches=6000`

4. 设置`steps `为80%和90%的 `max_batches`，意思就是你有三个目标需要检测就设置 `steps=4800,5400`

5. 设置网络的大小为 `width=416 height=416` 或任意一个32的倍数，yolov4默认是608*608，这就挺好的，没有必要改这个，改了这个之后后边的`anchors`锚点也需要改一下，如果你不知道怎么改锚点，就不用更改网络大小了。YOLO在检测的时候会自动resize你输入的图片为设置的大小。

6. 下图就是一个实例：

   ![image-20200426224150938](https://peter-md-image.oss-cn-beijing.aliyuncs.com/img/image-20200426224150938.png)

7. 下一步就是更改具体的yolo层的配置了，yolov4和v3一样，还是有三个yolo层，这三个yolo层都需要根据自己的数据集改一下，如果你在cfg里找不到可以搜索一下。

8. 更改classes为你自己的标签数量，然后更改yolo层上边的convolutional层的`filters`的数量为filters=(classes + 5)x3 。也就是说如果你有5个classes，就需要设置filters为（5+5）*3=30，就像下图展示的那样。这一步很关键，**三个YOLO层都需要这样设置，不能只设置一个YOLO层**。

      ![image-20200426224515277](https://peter-md-image.oss-cn-beijing.aliyuncs.com/img/image-20200426224515277.png)

9. 如果你用`[Gaussian_yolo]`的话是需要特殊的设置的，这里就不讲了，用到的话可以自己去看官方文档。

### 转化标注和制作train.txt

这一步比较简单，在我的另一篇博客里也写过了，就不赘述了。

### 编译Darknet

这一步网络上有很多的教程了，我就不再重复写一遍，直接贴一篇我觉的写的很好的

> [编译darknet](https://blog.csdn.net/qq_38737790/article/details/92797119)
>
> [CUDA和cuDNN安装及配置环境变量](https://blog.csdn.net/qq_37296487/article/details/83028394?depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromBaidu-3&utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromBaidu-3)

需要注意的是，编译darknet需要安装cuda和cuDNN并配置环境变量，不一定要安装CUDA9.0版本的，其他版本也可以

### 开始训练

如果你的环境和配置文件都准备好了，就可以开始训练了，不过这一步需要下载预训练权重，官方文档是从墙外下载的，我也好心上传了一份“[yolov4.conv.137](http://img.peterli.club/objectyolov4.conv.137)”，点击就可以直接下载。
	
darknet的训练代码也非常简单`darknet detector train custom.data yolov4-custom.cfg yolov4.conv.137`，直接打开cmd运行这句话就可以了，然后就可以开始训练了。

## 训练YOLOV4之后的体验

先贴出来我训练的mAP，可以看到YOLOV4训练的结果比较惨淡，在同样的数据集的情况下甚至还不如YOLOV3，可能是我使用的有点问题，不知道为什么会出现这样的情况。这个模型训练到后期loss一直在7.X降不下来，而同数据集下的YOLOV3就可以把loss降到2.X。
	
下图是YOLOV4训练过后的map，然后是相同数据集训练相同次数的yolov3的训练map。YOLOV4和YOLOV3我都是使用了官方推荐的训练配置进行训练，可以看到YOLOV3的效果要比4好一点，而且检测时间也比较快。

测试命令：`darknet.exe detector map data/custom.data yolov4-custom.cfg backup\yolov4-custom_last.weights`

![image-20200427122101454](http://img.peterli.club/img/image-20200427122101454.png)

![image-20200427122221534](http://img.peterli.club/img/image-20200427122221534.png)

训练完成之后，我又详细阅读了官方文档，上边说最终的loss可以降到从`0.05`（对于小模型和简单数据集）到`3.0`（对于大模型和困难数据集）。YOLOV3确实是达到了这个要求的，但是YOLOV4最终loss是稳定在7.X的，也许是我使用v4的方法有些不对，并没有看到很高的提升。
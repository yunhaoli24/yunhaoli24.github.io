---
title: Centos虚拟机多节点配置
date: 2020-07-08 21:58:36
tags:
	- Linux
categories:
	- Linux
cover: https://www.kagoya.jp/howto/wp-content/uploads/202106d_catch.jpg
---

# VMware创建虚拟机

## 单节点创建

### 导入ISO镜像

从[阿里源](https://mirrors.aliyun.com/centos/7/isos/x86_64/)下载Centos7镜像，并导入到VMware中，创建新的虚拟机。

![image-20200708203719531](http://img.peterli.club/img/image-20200708203719531.png)

### 给节点起名

因为要创建多节点，所以给新的虚拟机命名为`Centos7_1`，之后创建更多的节点就按序号命名。

![image-20200708203908179](http://img.peterli.club/img/image-20200708203908179.png)

### 选择硬件配置

虚拟机的硬件配置可以根据需要更改，如果不确定的话也可以安装完毕之后更改硬件配置。

![image-20200708204132565](http://img.peterli.club/img/image-20200708204132565.png)

### 安装Centos7

选择完硬件配置之后的安装过程就和普通的Cenots安装过程一样，等待一段时间后就会进入Centos安装界面。

**软件选择**这里选择开发及生成工作站，如果选择最小系统的话安装结束之后只有一个黑黑的命令行，看不到图形界面，不好操作。

**安装位置**新手选择自动分区就可以了。

![image-20200708205553927](http://img.peterli.club/img/image-20200708205553927.png)安装过程中可以顺便设置一下root密码。

## 单节点网卡配置

安装结束之后就可以看到令人兴奋的图形界面了，但是这个时候的Centos还不能联网，也不能和宿主机互通，使用`ifconfig`查看网卡信息也获取不到IP地址，所以需要一些设置。

![image-20200708210953349](http://img.peterli.club/img/image-20200708210953349.png)

### 配置VMware虚拟机网络设置

接下来需要去虚拟机设置界面设置**网络适配器**为桥接模式，方便后续固定IP地址。

![image-20200708211256177](http://img.peterli.club/img/image-20200708211256177.png)

### 使用命令自动分配IP地址

接下来需要切换到root用户(`su root`)，使用`dhclient`自动分配IP地址

![image-20200708211828301](http://img.peterli.club/img/image-20200708211828301.png)

分配完IP地址之后，我们再次查看IP地址就可以看到刚刚分配的IP地址了。

### 固定IP地址

刚才分配的IP地址其实是静态的，下次启动虚拟机就会变，所以我们需要进入网卡设置，固定IP地址`vi /etc/sysconfig/network-scripts/ifcfg-ens33`。这个文件初始化是这样的，我们需要更改其中的一些设置。按`Shift+I`插入，编辑文件。

![image-20200708212414957](http://img.peterli.club/img/image-20200708212414957.png)

配置好后的文件长成这个样，按`ESC`后`:wq`保存退出

![image-20200708212933020](http://img.peterli.club/img/image-20200708212933020.png)

退出后重启网卡`systemctl restart network.service`，重启成功后应该就可以访问外网了，ping百度试一下。

![image-20200708213434191](http://img.peterli.club/img/image-20200708213434191.png)

虚拟机访问外网已经成功了，这时候我们ping宿主机试一下（注意：**宿主机一定要关闭防火墙** ）。

* 查看宿主机的IP地址：

![image-20200708213949361](http://img.peterli.club/img/image-20200708213949361.png)

* ping宿主机：

![image-20200708214046652](http://img.peterli.club/img/image-20200708214046652.png)

* 宿主机ping虚拟机

  ![image-20200708214240873](http://img.peterli.club/img/image-20200708214240873.png)

都可以ping通之后单一节点的虚拟机就已经配置好了。

# 多节点虚拟机克隆

## 克隆第二个节点

单节点配置完成之后**关闭这个节点**，然后对这个节点进行克隆，克隆选项要选择完整克隆，就是这个节点的数据全部复制一份。

![image-20200708214510890](http://img.peterli.club/img/image-20200708214510890.png)

![image-20200708214652761](http://img.peterli.club/img/image-20200708214652761.png)

## 更改第二个节点的IP地址

进入第二个节点界面之后，再次使用`vi /etc/sysconfig/network-scripts/ifcfg-ens33`编辑节点的IP地址。（**一定要把第一个节点关机。不然会产生IP冲突！**）

![image-20200708215252715](http://img.peterli.club/img/image-20200708215252715.png)

编辑完成后使用`systemctl restart network.service`重启网卡，然后重复单一节点的ping验证操作。即**虚拟机ping外网**、**虚拟机ping宿主机**、**宿主机ping虚拟机**。

都ping通了之后，第二个虚拟机节点就创建完成了，第三个和更多的节点都是按照这个流程进行创建。
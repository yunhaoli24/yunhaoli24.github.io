---
title: ubuntu下回退内核版本
date: 2021-06-18 21:07:58
tags:
	- Linux
	- Kernel
	- Ubuntu
categories:
	- Linux
cover: https://object-lealaxy.oss-cn-beijing.aliyuncs.com/img/image-20200427113426863.png
---

查看可用内核信息
----------------

`grep menuentry /boot/grub/grub.cfg`

安装回退版本的内核
------------------

***x.x.x-x为内核版本,本文以4.18.0-18为例***
`sudo apt-get install linux-headers-x.x.x-x-generic linux-image-x.x.x-x-generic`

安装4.18.0-18版本内核
---------------------

`sudo apt-get install linux-headers-4.18.0-18-generic linux-image-4.18.0-18-generic`

修改GRUB
--------

`sudo gedit /etc/default/grub`
将`GRUB_DEFAULT=0`修改为你所想要还原的版本号，
如：`GRUB_DEFAULT="Advanced options for Ubuntu > Ubuntu, with Linux 4.18.0-18-generic"`

更新GRUB
--------

`sudo update-grub` ***然后重启电脑*** 使用`uname -r`查看内核版本
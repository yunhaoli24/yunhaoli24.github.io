---
title: Git仓库代码提交统计
date: 2020-07-07 14:42:02
tags:
	- 工具人
	- Git
categories:
	- 工具人
	- Git
cover: https://img0.baidu.com/it/u=2446728729,250871220&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500
---

## Git 代码统计

### 查看仓库提交者排名前3

```bash
git log --pretty='%aN' | sort | uniq -c | sort -k1 -n -r | head -n 3
```

![image-20200707143833213](https://img.peterli.club/img/image-20200707143833213.png)

### 给Git查看某一个用户代码量

```bash
git log --author="用户名" --pretty=tformat: --numstat | awk '{ add += $1; subs += $2; loc += $1 - $2 } END { printf "added lines: %s, removed lines: %s, total lines: %s\n", add, subs, loc }' 
```

![image-20200707143344921](https://img.peterli.club/img/image-20200707143344921.png)

### 统计每个人增删行数

```bash
git log --format='%aN' | sort -u | while read name; do echo -en "$name\t"; git log --author="$name" --pretty=tformat: --numstat | awk '{ add += $1; subs += $2; loc += $1 - $2 } END { printf "added lines: %s, removed lines: %s, total lines: %s\n", add, subs, loc }' -; done
```

![image-20200707143631623](https://img.peterli.club/img/image-20200707143631623.png)
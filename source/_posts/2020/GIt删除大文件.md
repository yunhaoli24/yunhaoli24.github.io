---
title: GIt删除大文件
date: 2020-05-27 22:48:21
tags:
	- 工具人
	- Git
categories:
	- 工具人
	- Git
cover: https://img0.baidu.com/it/u=1443653190,2014929959&fm=253&fmt=auto&app=120&f=JPEG?w=1080&h=608
---
# GIt从历史记录中删除大文件和查看文件大小

## 查看代码库的文件大小列表

```sh
git rev-list --objects --all \
| git cat-file --batch-check='%(objecttype) %(objectname) %(objectsize) %(rest)' \
| sed -n 's/^blob //p' \
| sort --numeric-sort --key=2 \
| cut -c 1-12,41- \
| $(command -v gnumfmt || echo numfmt) --field=2 --to=iec-i --suffix=B --padding=7 --round=nearest
```

![image-20200515163411737](http://img.peterli.club/img/20200515163441.png)



## 从所有分支和历史记录中删除大文件

```sh
git filter-branch --force --index-filter 'git rm --cached -r --ignore-unmatch 文件的相对路径' --prune-empty --tag-name-filter cat -- --all

```

## 回收git存储空间

```sh
rm -rf .git/refs/original/ 
git reflog expire --expire=now --all
git gc --prune=now
git gc --aggressive --prune=now
```



## 强制推送到远程仓库

```shell
git push origin --force --all
```
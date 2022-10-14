---
title: 搭建Docker私有仓库
date: 2022-10-14 10:48:08
tags:
- Docker
- DockerHub
categories:
- Docker
- DockerHub
cover: https://goharbor.io/img/logos/harbor-horizontal-color.png
---

# Harbor简介
![]( https://goharbor.io/img/logos/harbor-horizontal-color.png)
VMware开源的企业级Registry项目Harbor，以Docker公司开源的registry 为基础，提供了管理UI, 基于角色的访问控制(Role Based Access Control)，AD/LDAP集成、以及审计日志(Audit logging) 等企业用户需求的功能，同时还原生支持中文，主要特点：

* 基于角色的访问控制 - 用户与 Docker 镜像仓库通过“项目”进行组织管理，一个用户可以对多个镜像仓库在同一命名空间（project）里有不同的权限。
* 镜像复制 - 镜像可以在多个 Registry 实例中复制（同步）。尤其适合于负载均衡，高可用，混合云和多云的场景。
* 图形化用户界面 - 用户可以通过浏览器来浏览，检索当前 Docker 镜像仓库，管理项目和命名空间。
* AD/LDAP 支持 - Harbor 可以集成企业内部已有的 AD/LDAP，用于鉴权认证管理。
* 审计管理 - 所有针对镜像仓库的操作都可以被记录追溯，用于审计管理。
* 国际化 - 已拥有英文、中文、德文、日文和俄文的本地化版本。更多的语言将会添加进来。
* RESTful API - RESTful API 提供给管理员对于 Harbor 更多的操控, 使得与其它管理软件集成变得更容易。
* 部署简单 - 提供在线和离线两种安装工具， 也可以安装到 vSphere 平台(OVA 方式)虚拟设备

## Harbor架构
![Harobr架构图](https://github.com/goharbor/harbor/raw/release-2.0.0/docs/img/architecture/architecture.png)

Proxy: Harbor的registry、UI、token services等组件，都处在一个反向代理后边。该代理将来自浏览器、docker clients的请求转发到后端服务上。

Registry: 负责存储Docker镜像，以及处理Docker push/pull请求。因为Harbor强制要求对镜像的访问做权限控制， 在每一次push/pull请求时，Registry会强制要求客户端从token service那里获得一个有效的token。

Core services: Harbor的核心功能，主要包括如下3个服务:
1. UI: 作为Registry Webhook, 以图像用户界面的方式辅助用户管理镜像。
2. WebHook：WebHook是在registry中配置的一种机制， 当registry中镜像发生改变时，就可以通知到Harbor的webhook endpoint。Harbor使用webhook来更新日志、初始化同步job等。
3. Token 服务：负责根据用户权限给每个docker push/pull命令签发token. Docker 客户端向Regiøstry服务发起的请求,如果不包含token，会被重定向到这里，获得token后再重新向Registry进行请求。
Database：为core services提供数据库服务，负责储存用户权限、审计日志、Docker image分组信息等数据。

Job services: 主要用于镜像复制，本地镜像可以被同步到远程Harbor实例上。

Log collector: 负责收集其他组件的日志到一个地方

harbor-adminserver主要是作为一个后端的配置数据管理，harbor-ui所要操作的所有数据都通过harbor-adminserver这样一个数据配置管理中心来完成。

# Harbor安装
## 安装Docker
Harbor各个组件全部基于docker，在安装Harbor之前，需要预先安装docker、docker-compose
## 下载Harbor安装脚本
从[https://github.com/goharbor/harbor/releases](https://github.com/goharbor/harbor/releases)仓库中下载Harbor安装脚本，如果目标机器可以连接网络的话，下载在线安装版的就可以。
## 解压harbor安装包
```shell
tar xf harbor-online-installer-{}.tgz
```
## 生成SSL自签名证书
Harbor使用Docker-compose启动，使用Nginx作为反响代理，建议部署在机器的80和443端口上，并且进行SSL自签名，这样的话其他机器下载镜像时就不需要配置docker的信任仓库。
下面是生成SSL签名的流程，需要在机器上提前安装`openssl`软件包。

把下边代码中所有的IP地址都替换成您自己的IP地址。
```shell
# 生成默认 ca
openssl genrsa -out ca.key 2048
openssl req -x509 -new -nodes -key ca.key -subj "/CN=192.168.0.8" -days 5000 -out ca.crt

# 生成证书
openssl req -new -sha256 \
-key ca.key \
-subj "/C=CN/ST=Beijing/L=Beijing/O=UnitedStack/OU=Devops/CN=192.168.0.8" \
-reqexts SAN \
-config <(cat /etc/pki/tls/openssl.cnf \
<(printf "[SAN]\nsubjectAltName=IP:192.168.0.8")) \
-out ca.csr

# 签名证书
openssl x509 -req -days 365000 \
-in zchd.csr -CA ca.crt -CAkey ca.key -CAcreateserial \
-extfile <(printf "subjectAltName=IP:192.168.0.8") \
-out ca.pem

```
如果运行成功，会在当前目录下生成`ca.key`和`ca.pem`两个证书文件，在接下来修改Harbor配置文件的时候需要修改这两个文件路径
## 修改Harbor配置文件
重命名`harbor.yml.tmpl`为`harbor.yml`。该配置文件中需要注意的参数如下，其他的保持默认配置即可。
```yaml
hostname: 192.168.0.8         //设置访问地址，可以使用ip、域名，不可以设置为127.0.0.1或localhost。默认情况下，harbor使用的端口是80，若使用自定义的端口，除了要改docker-compose.yml文件中的配置外，这里的hostname也要加上自定义的端口，否则在docker login、push时会报错
#http配置
# http related config
http:
# port for http, default is 80. If https enabled, this port will redirect to https port
  port: 80

#https配置（如不需要可不配置,注释掉）
# https related config
https:
# https port for harbor, default is 443
  port: 443
  # The path of cert and key files for nginx
  certificate: /path_to/ca.pem
  private_key: /path_to/ca.key

harbor_admin_password: Harbor12345         # admin密码

#持久化数据目录
data_volume: /opt/application/harbor
```

# 运行Harbor
配置完毕之后就可以启动Harbor，运行安装脚本，Harbor就会自动安装。
```shell
./install.sh
```
# 进入Harbor
之后访问Harbor的WEB页面，默认用户名为`admin`，密码为`Harbor12345`

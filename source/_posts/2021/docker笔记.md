---
title: docker笔记
permalink: docker笔记
date: 2021-05-24 21:07:58
tags:
categories:
	- Docker
---
# 笔记
## 常用命令

```shell
attach    # 当前shell下attach连接指定运行镜像
build     # 通过Dockerfile定制镜像
commit    # 提交当前容器为新的镜像
cp        # 从容器中拷贝指定文件或目录到宿主机中
create    # 创建一个新的容器，同 run 但不启动容器
diff      # 查看 docker 容器变化
events    # 从docker服务器获取容器实时事件
exec      # 在已存在的容器上运行命令
export    # 导出容器的内容流作为一个 tar 归档文件【对应 import】
history   # 展示一个镜像形成历史
images    # 列出系统当前镜像
import    # 从tar包中的内容创建一个新的文件系统映像【对应 export】
info      # 显示系统相关信息
inspect   # 查看容器详细信息
kill      # kill 指定的容器
load      # 从一个 tar 包中加载一个镜像【对应 save】
login     # 注册或者登录一个 docker 源服务器
logout    # 从当前 Docekr registry 退出
logs      # 输出当前容器日志信息
```

![](http://img.peterli.club/img/20201121102110.png)

### 安装docker

```shell
sudo yum install docker -y
sudo mkdir -p /etc/docker
# 配置镜像顺便打开远程连接
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://wlwugsdq.mirror.aliyuncs.com"],
  "hosts":[
    "unix:///var/run/docker.sock",
    "tcp://0.0.0.0:2375"
  ]
}
EOF
sudo systemctl daemon-reload
sudo systemctl restart docker
systemctl enable docker
# 打开防火墙
iptables -I INPUT -ptcp --dport 2375 -j ACCEPT
```



### 重启

```bash
sudo service docker restart
```

### 自动重启容器

```shell
docker container update --restart=always 容器名
```

### 查看CPU状态

```shell
docker stats
```

### 查看容器详情

```shell
docker inspect id
```

### 本地卷

```shell
docker volume
```

## Dockerfile

![image-20201121102819378](http://img.peterli.club/img/image-20201121102819378.png)

### 构建Dockerfile

```dockerfile
# Dockerfile
FROM centos
MAINTAINER peter<295741554@qq.com>

ENV MYPATH /usr/local
WORKDIR $MYPATH

RUN yum install -y vim
RUN yum install -y net-tools

EXPOSE 80
CMD echo $MYPATH
CMD echo "-----end----"
CMD /bin/bash

# build 构建
# docker build -f centos-dockerfile -t mycentos:0.1 .

# ENTRYPOINT 命令行追加命令，直接追加在ENTRYPOINT后面
```

## Docker网络

### `Docker0`

![image-20201122091322470](http://img.peterli.club/img/image-20201122091322470.png)

```shell
# 启动tomcat 
docker run -d -p 8080:8080 --name tomcat01 tomcat
# 查看容器内部IP地址
docker exec -it tomcat01 ip addr
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host
       valid_lft forever preferred_lft forever
26: eth0@if27: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default
    link/ether 02:42:ac:11:00:03 brd ff:ff:ff:ff:ff:ff link-netnsid 0
    inet 172.17.0.3/16 scope global eth0
       valid_lft forever preferred_lft forever
    inet6 fe80::42:acff:fe11:3/64 scope link
       valid_lft forever preferred_lft forever
# docker可以ping通容器内部
```

> 原理

1. 每启动一个docker容器，docker就会给容器分配一个ip。安装docker，就会有一个网卡`docker0`，桥接模式，使用`veth-pair`技术

2. 启动一个容器，就会多出一对网卡。`veth-pair`就是一对虚拟设备接口，是成对出现的，一端连着协议，一端彼此相连。充当桥梁，连接虚拟网络设备。

3. 容器之间也可以相互ping通

   **所有容器不指定网络的情况下，都是由`docker0`路由的，docker为容器分配一个默认可用IP**

![image-20201122094418844](http://img.peterli.club/img/image-20201122094418844.png)

### --link(废弃)

   ```shell
docker run -d -P --name tomcat03 --link tomcat02 tomcat

# 通过--link可以通过容器名连接网络
docker exec -it tomcat03 ping tomcat02
PING tomcat02 (172.17.0.4) 56(84) bytes of data.
64 bytes from tomcat02 (172.17.0.4): icmp_seq=1 ttl=64 time=0.143 ms
64 bytes from tomcat02 (172.17.0.4): icmp_seq=2 ttl=64 time=0.051 ms
   ```

--link是再hosts配置中增加了映射

```shell
$ docker exec -it tomcat03 cat /etc/hosts
127.0.0.1       localhost
::1     localhost ip6-localhost ip6-loopback
fe00::0 ip6-localnet
ff00::0 ip6-mcastprefix
ff02::1 ip6-allnodes
ff02::2 ip6-allrouters
172.17.0.4      tomcat02 18a73f07b1c1
172.17.0.5      40cd4cbf4e21
```

### 自定义网络

![image-20201122100414348](http://img.peterli.club/img/image-20201122100414348.png)

> 网络模式
>
> 1. bridge： 桥接模式
> 2. none：不配置网络
> 3. host： 和宿主机共享网络
> 4. container： 容器内网络连通

```shell
# 创建docker网络
docker network create --driver bridge --subnet 192.168.0.0/16 --gateway 192.168.0.1 mynet
 
docker network ls
NETWORK ID          NAME                DRIVER              SCOPE
b50d910e8c6c        bridge              bridge              local
6463e6f691bd        host                host                local
3f8195ef9212        mynet               bridge              local
eaf98583bff5        none                null                local

# 查看网络
$ docker network inspect mynet
[
    {
        "Name": "mynet",
        "Id": "3f8195ef9212df0b92788e50fae3fe9dbb9e1804cad22177c12563dc7398dd06",
        "Created": "2020-11-22T10:11:47.121577758+08:00",
        "Scope": "local",
        "Driver": "bridge",
        "EnableIPv6": false,
        "IPAM": {
            "Driver": "default",
            "Options": {},
            "Config": [
                {
                    "Subnet": "192.168.0.0/16",
                    "Gateway": "192.168.0.1"
                }
            ]
        },
        "Internal": false,
        "Attachable": false,
        "Containers": {
            "36e54ef8ed34073451370465936861314a61a74043952e4a31a46828fff4b903": {
                "Name": "tomcat01-net",
                "EndpointID": "0103650ff1854283537d6ed45abf3544fab69a970d8a890dc954c9c1a3841910",
                "MacAddress": "02:42:c0:a8:00:02",
                "IPv4Address": "192.168.0.2/16",
                "IPv6Address": ""
            },
            "62e486ac7f1dfb06993a94c1c934be376772e4c7b108f74dbe4474addfb67b1e": {
                "Name": "tomcat02-net",
                "EndpointID": "89911b659cecd661a6605d433c46a65e9b43a96c92f7e9f1dd74c336c6611927",
                "MacAddress": "02:42:c0:a8:00:03",
                "IPv4Address": "192.168.0.3/16",
                "IPv6Address": ""
            }
        },
        "Options": {},
        "Labels": {}
    }
]

# 不使用--link也可以ping容器名
$ docker exec -it tomcat01-net  ping tomcat02-net
PING tomcat02-net (192.168.0.3) 56(84) bytes of data.
64 bytes from tomcat02-net.mynet (192.168.0.3): icmp_seq=1 ttl=64 time=0.052 ms
64 bytes from tomcat02-net.mynet (192.168.0.3): icmp_seq=2 ttl=64 time=0.049 ms
^C
--- tomcat02-net ping statistics ---
2 packets transmitted, 2 received, 0% packet loss, time 2ms
rtt min/avg/max/mdev = 0.049/0.050/0.052/0.007 ms
```

不同集群使用不同网络，保证集群健康

**自定义网络功能齐全，推荐使用自定义网络**

### 网络连通

```shell
# 网络连通
$ docker network connect --help

Usage:  docker network connect [OPTIONS] NETWORK CONTAINER

Connect a container to a network

Options:
      --alias stringSlice           Add network-scoped alias for the container
      --help                        Print usage
      --ip string                   IP Address
      --ip6 string                  IPv6 Address
      --link list                   Add link to another container (default [])
      --link-local-ip stringSlice   Add a link-local address for the container
```

![image-20201122103256321](http://img.peterli.club/img/image-20201122103256321.png)

```shell
# 连通tomcat01 与 mynet
docker network connect mynet tomcat01
# 一个容器，两个IP

# 连通之后，就可以ping通
$ docker exec -it tomcat01 ping tomcat01-net
PING tomcat01-net (192.168.0.2) 56(84) bytes of data.
64 bytes from tomcat01-net.mynet (192.168.0.2): icmp_seq=1 ttl=64 time=0.088 ms
64 bytes from tomcat01-net.mynet (192.168.0.2): icmp_seq=2 ttl=64 time=0.054 ms
^C
--- tomcat01-net ping statistics ---
2 packets transmitted, 2 received, 0% packet loss, time 999ms
rtt min/avg/max/mdev = 0.054/0.071/0.088/0.017 ms
```

### 部署Redis集群

![image-20201122103804310](http://img.peterli.club/img/image-20201122103804310.png)

```shell
# 创建网卡
docker network create redis --subnet 172.38.0.0/16
# 批量创建redis脚本
for port in $(seq 1 6); \
do \
mkdir -p /mydata/redis/node-${port}/conf
touch /mydata/redis/node-${port}/conf/redis.conf
cat << EOF >/mydata/redis/node-${port}/conf/redis.conf
port 6379 
bind 0.0.0.0
cluster-enabled yes 
cluster-config-file nodes.conf
cluster-node-timeout 5000
cluster-announce-ip 172.38.0.1${port}
cluster-announce-port 6379
cluster-announce-bus-port 16379
appendonly yes
EOF
done
# 启动reids
for port in $(seq 1 6); \
do \
docker run -p 637${port}:6379 -p 1637${port}:16379 --privileged=true --name redis-${port} \
    -v /mydata/redis/node-${port}/data:/data \
    -v /mydata/redis/node-${port}/conf/redis.conf:/etc/redis/redis.conf \
    -d --net redis --ip 172.38.0.1${port} redis:5.0.9-alpine3.11 redis-server /etc/redis/redis.conf
done

# 配置集群
redis-cli --cluster create 172.38.0.11:6379 172.38.0.12:6379 172.38.0.13:6379 172.38.0.13:6379 172.38.0.14:6379 172.38.0.15:6379 172.38.0.16:6379 --cluster-replicas 1
# 连接集群
redis-cli -c
```

## Docker Compose

> 管理多个容器和依赖关系

Compose is a tool for defining and running multi-container Docker applications. With Compose, you use a YAML file to configure your application’s services. Then, with a single command, you create and start all the services from your configuration. To learn more about all the features of Compose, see [the list of features](https://docs.docker.com/compose/#features).

Compose works in all environments: production, staging, development, testing, as well as CI workflows. You can learn more about each case in [Common Use Cases](https://docs.docker.com/compose/#common-use-cases).

三步骤：

Using Compose is basically a three-step process: 

1. Define your app’s environment with a `Dockerfile` so it can be reproduced anywhere.
2. Define the services that make up your app in `docker-compose.yml` so they can be run together in an isolated environment.
3. Run `docker-compose up` and Compose starts and runs your entire app.

### 安装

```shell
curl -L https://get.daocloud.io/docker/compose/releases/download/1.25.5/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
docker-compose --version
```

### 启动服务

![image-20201123172844845](http://img.peterli.club/img/image-20201123172844845.png)

## Docker Swarm



# 端口表

## 80 Jenkins

### 安装

```shell
docker pull jenkins/jenkins
```

### 启动

```shell
docker run -d -p 80:8080 -p 50000:50000 -v /var/jenkins_home -v /etc/localtime:/etc/localtime --name jenkins docker.io/jenkins/jenkins
```

### 获取初始密码

```shell
docker exec jenkins tail /var/jenkins_home/secrets/initialAdminPassword
```



## 3306 MySQL

### 安装

```bash
docker pull mysql
```

### 运行

```bash
docker run -di --name=mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=admin mysql
```


## 5671、5672 、15672 RabbitMQ

### 安装

```sh
docker pull rabbitmq:management
```

### 运行

```sh
docker run -id --name=rabbitmq -p 5671:5671 -p 5672:5672 -p 4369:4369 -p 15672:15672 -p 25672:25672 rabbitmq:management
```

## 9000 portainer

### 安装

```shell
docker pull portainer/portainer
```

### 运行

```shell
docker run -it -d --name portainer -p 9000:9000 --restart=always --privileged=true -v /var/run/docker.sock:/var/run/docker.sock  portainer/portainer
```



## 9200、9300 elasticsearch

### 集群

```yml
version: "3.1"
services:
  elasticsearch:
    image: elasticsearch:6.8.11
    restart: always
    container_name: elasticsearch
    environment:
      - cluster.name=docker-cluster
      - bootstrap.memory_lock=true
      - "ES_JAVA_OPTS=-Xms512m -Xmx512m"
    ulimits:
      memlock:
        soft: -1
        hard: -1
    volumes:
      - ./esdata:/usr/share/elasticsearch/data
    ports:
      - 9200:9200
  kibana:
    image: kibana:6.8.11
    restart: always
    container_name: kibana
    ports:
      - 5601:5601
    environment:
        # 这里记得修改为你的服务器ip
      - elasticsearch_url=http://192.168.111.134:9200
    depends_on:
      - elasticsearch
      
volumes:
  esdata:
    driver: local

```

### docker安装常见Bug

- elasticsearch用docker启动一会之后服务自动关闭的问题

  分配内存太小，需要将vm.max_map_count的值调大，网上查资料，得知用命令的方式来设置vm.max_map_count，命令如下：

  ```
  sysctl -w vm.max_map_count=2621441
  ```

  查看vm.max_map_count命令：

  ```
  sysctl -a|grep vm.max_map_count
  ```

但是以上方法在重启虚拟机之后就不生效，如果想要一直生效的话，到 /etc目录下编辑sysctl.conf文件，添加vm.max_map_count=262144就可以了。
 保存文件之后用sysctl -a|grep vm.max_map_count命令查看，显示的还是修改之前的值，**此时需要重启虚拟机才能生效**

- docker 启动 elasticsearch 异常 Failed to create node environment

  chmod 777 挂载目录路径

### 安装中文分词器

```bash
docker exec -it elasticsearch bash
# 去github上下载对应版本的ik(zip)
cd /usr/share/elasticsearch/bin/
./elasticsearch-plugin install http://39.97.240.81/resource/elasticsearch-analysis-ik-6.8.11.zip
```

之后重启elasticsearch容器（记住是重启，不是down掉再up!!!)

```
docker restart elasticsearch
```
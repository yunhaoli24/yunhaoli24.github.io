---
title: Nginx配置请求转发到后端
permalink: Nginx配置请求转发到后端
date: 2020-06-27 15:51:37
tags:
categories:
	- ※服务部署
---
### 新建一个nginx server

在nginx的配置文件中新建一个server监听前端部署的端口

```conf
server
{
	#监听端口
    listen 80;
    server_name 网站名称;
}
```



### 使用Nginx代理前端页面

然后在server中添加一个`location`，就是把访问路径指向前端项目打包后的地址

```conf
    location / {
    	root 前端项目打包后的地址;
    	index index.html index.htm;
    }
```

### nginx请求转发到后端

在部署前后端分离项目时，通常都要使用nginx把前端的请求转发到后端的接口上去，这就要配置nginx的`proxy_pass`功能。

```conf
	# 转发请求到后端
	location /api/ {
		proxy_set_header Host $http_host;
		proxy_set_header X-Real-IP $remote_addr;
		proxy_set_header REMOTE-HOST $remote_addr;
		proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
		# proxy_redirect off;
		# proxy_set_header X-NginX-Proxy true;
		proxy_pass 后端接口地址;
	}
```

### server其他的配置

```conf
    #一键申请SSL证书验证目录相关设置
    location ~ \.well-known{
        allow all;
    }
    #代理网站图标，可以注释
    location  = /favicon.ico {
      root /**/assets/;
    }
    
    #禁止访问的文件或目录
    location ~ ^/(\.user.ini|\.htaccess|\.git|\.svn|\.project|LICENSE|README.md)
    {
        return 404;
    }
    
    #访问日志
    access_log  /**/日志名;
    #错误日志
    error_log  /**/日志名;
```



### 重载Nginx配置

`nginx -s reload`

### 查看Nginx访问日志

`tail -f /**/日志名` 


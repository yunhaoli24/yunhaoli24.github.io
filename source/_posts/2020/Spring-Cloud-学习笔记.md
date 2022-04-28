---
title: Spring Cloud 学习笔记
date: 2020-05-27 21:38:56
tags:
	- Java
	- Spring
	- Spring Cloud
categories:
	- Java
	- Spring
	- Spring Cloud
cover: https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fphoto%2F2008-6-13%2F200806131108306030.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1653714142&t=57ad1ad0d887b8d54abdac0b8b4b6031
---
# Ⅰ、持久层


## 一.ORM （关系型映射）框架 
###  1.Mybatis
* 插件：通用Mapper tk.mapper

---

### 2.Mybatis-Plus
* 集成通用Mapper，不需要手动写CURD和分页功能

---

## 二、非关系型数据库
### 1. Redis
* Redis Desktop Manager

---
# Ⅱ、开发层

## 一、服务器
### 1.Tomcat
### 2.Nginx

* HTTP和反向代理web服务。负载均衡（服务器），请求转发

---

## 二、开发框架

### 1.Spring

### 2.SpringMVC

### 3.Spring Boot

---

## 三、权限管理

*  便捷的认证，授权，加密，会话管理

### 1.Spring Security

### 2.Shiro

---

## 四、容器

### 1.Docker

### 2.Kubernetesetes(k8s)

*  自动化部署平台

---

# Ⅲ、服务层（SOA分布式服务）

![图片.png](https://i.loli.net/2020/04/06/mQErsWDql6fFOng.png)


## 一、注册中心

### 1. Eurkea（已经停更）
* 客户端：`@EnableEurekaClient`
* 注册中心：`@EnableEurekaServer`
  * 关闭自我保护机制：服务不可用时立刻删除：保证可用性（A）`enable-self-preservation: false`
* 获得服务信息：

```java
@Resource
private DiscoveryClient discoveryClient;//springcloud包下的
List<String> services = discoveryClient.getServices();  //得到所有的微服务
for (String element : services) {
	log.info("element:" + element);
}
List<ServiceInstance> instances = discoveryClient.getInstances("CLOUD-PROVIDER-SERVICE"); //得到一个具体微服务的所有实例
for (ServiceInstance instance : instances) {
	log.info(instance.getServiceId() + "\t" + instance.getHost() + "\t" + instance.getPort() + "\t" + instance.getUri());
}
```
### 2. Zookeeper

* 使用consul或者zookeeper作为注册中心时注册服务`@EnableDiscoveryClient`

### 3. Consul

* 在Linux服务器上运行`nohup ./consul agent -dev -http-port 8500 -client 0.0.0.0 &`

---

## 二、负载均衡

### 1.Ribbon（已经停更）

* 进程内LB（LoadBalance），软负载均衡。属于一个类库，不同于Nginx在服务器级别负载均衡。
* Eureka默认引入Ribbon，不需要手动添加pom

### 2. OpenFeign

* 使用在消费端（Controller端）
* 开启Feign`@EnableFeignClients`
* 指定调用哪个微服务`@FeignClient(value = "XXXXX")`，在service接口上，需要在Controller端新建service接口使用注解

---

## 三、服务熔断、降级、限流

> 服务变多，服务链路越来越长，一个服务不可用会导致“服务雪崩”，导致整个系统级联故障。需要服务降级来中断链路。

* 服务降级：向调用方返回一个符合预期的、可处理的备选响应（FallBack），而不是长时间等待或抛出调用方法无法处理的异常
  * 程序运行异常
  * 程序运行超时
  * 服务熔断触发服务降级
  * 线程池满
* 服务熔断：服务器达到最大访问量之后就会直接拒绝访问，使服务降级

### 1.Hystrix（已经停更）

* 开启Hystrix（主函数）`@EnableHystrix`

* 服务降级

  ```java
  //在类上配置
  @DefaultProperties(defaultFallback = "fallcack方法名，可以写全类名")
  //在方法上配置
  @HystrixCommand(fallbackMethod = "降级方法名", commandProperties = {
      //设置这个线程的超时时间是3s，3s内是正常的业务逻辑，超过3s调用fallbackMethod指定的方法进行处理
      @HystrixProperty(name = "execution.isolation.thread.timeoutInMilliseconds", value = "3000")
  })
  ```

  * 客户端配置：为Feign客户端定义的接口添加一个服务降级处理的实现类，在Feign接口上添加`@FeignClient(value = "服务名" ,fallback = fallcack方法名.class)`，然后写一个类实现服务接口，统一为接口的方法进行异常处理。（为类添加`@Component`注解让Spring识别到）

* 服务熔断

  ```java
  @HystrixCommand(fallbackMethod = "服务熔断方法名", commandProperties = {
      @HystrixProperty(name = "circuitBreaker.enabled", value = "true"),   //是否开启断路器
      @HystrixProperty(name = "circuitBreaker.requestVolumeThreshold", value = "10"),  //请求次数
      @HystrixProperty(name = "circuitBreaker.sleepWindowInMilliseconds", value = "10000"),    //时间窗口期
      @HystrixProperty(name = "circuitBreaker.errorThresholdPercentage", value = "60"),    //失败率达到多少后跳闸
  })
  ```

* 管理工具（HystrixDashboard）`@EnableHystrixDashboard`

  * 需要在被监控端启动类上配置

    ```java
    /**
         * 此配置是为了服务监控而配置，与服务容错本身无关,SpringCloud升级后的坑
         * ServletRegistrationBean因为springboot的默认路径不是"/hystrix.stream"，
         * 只要在自己的项目里配置上下面的servlet就可以了
         */ 
    @Bean
    public ServletRegistrationBean getServlet() {
        HystrixMetricsStreamServlet streamServlet = new HystrixMetricsStreamServlet();
        ServletRegistrationBean registrationBean = new ServletRegistrationBean(streamServlet);
        registrationBean.setLoadOnStartup(1);
        registrationBean.addUrlMappings("/hystrix.stream");
        registrationBean.setName("HystrixMetricsStreamServlet");
        return registrationBean;
    }
    ```

---

## 四、服务网关

![图片.png](https://i.loli.net/2020/04/08/hdpiNkOs9zUGY3q.png)

> 反向代理、鉴权、流量控制、熔断、日志监控

### 1.zuul（已经停更）

* 阻塞I/O开发，基于Servlet 2.5 ，不支持长连接（如WebSocket）

### 2.Gateway

* 异步非阻塞模型开发，建立在Spring Farmework 5、Project Reactor 和 Spring Boot 2 之上。支持长连接。
* Route 路由：路由时构建网关的基本模块，它由ID，目标URI，一系列的断言和过滤器组成，如果断言为true则匹配该路由
* Predicate 断言：开发人员可以匹配HTTP请求中的所有内容（例如请求头或请求参数），如果请求与断言相匹配则进行路由
* Filter 过滤：在请求被路由前或者之后对请求进行修改

---

## 五、配置中心

> 管理所有微服务的配置。.yml

#### 1.Spring Cloud Config

* 激活配置中心服务端`@EnableConfigServer`
* 配置中心客户端`@EnableEurekaClient`

---

## 六、消息总线

![image-20200409132047341](https://peter-md-image.oss-cn-beijing.aliyuncs.com/img/image-20200409132047341.png)

> 用轻量级消息代理来构建一个共用的消息主题，并让系统中所有微服务实例都连接上来。由于该主题中产生的消息会被所有实例监听和消费，所以成为消息总线。在总线上的各个实例，都可以方便地广播一些需要让其他连接在该主题上的实例都知道的消息。

### 1.ActiveMQ

### 2.RebbitMQ

## 七、消息驱动

### 1.Spring Cloud Stream
> 屏蔽底层消息中间件差异，消息驱动微服务框架

![image-20200409134502181](https://peter-md-image.oss-cn-beijing.aliyuncs.com/img/image-20200409134502181.png)

* 常用注解

![常用注解](https://peter-md-image.oss-cn-beijing.aliyuncs.com/img/image-20200409135302145.png)

* 发送消息

  * 配置

    ```yml
          bindings: # 服务的整合处理
            output: # 这个名字是一个通道的名称
              destination: studyExchange # 中间件中topic的名字
              content-type: application/json # 设置消息类型，本次为json，文本则设为text/plain
              binder: defaultRabbit # 设置要绑定的消息服务的具体设置
    ```

    

  * 注解

    ```java
    //这不是传统的service,这是和rabbitmq打交道的，不需要加注解@Service
    //这里不调用dao，调用消息中间件的service
    //信道channel和exchange绑定在一起
    @EnableBinding(Source.class)
    public class MessageProviderImpl implements IMessageProvider {
        /**
         * 消息发送管道
         */
        @Resource
        private MessageChannel output;
    
        @Override
        public String send() {
            String serial = UUID.randomUUID().toString();
            output.send(MessageBuilder.withPayload(serial).build());
            System.out.println("serial = " + serial);
            return serial;
        }
    }
    ```

* 接收消息

  * 配置

    ```yml
          bindings: # 服务的整合处理
            input: # 这个名字是一个通道的名称
              destination: studyExchange # 中间件中topic的名字
              content-type: application/json # 设置消息类型，本次为json，文本则设为text/plain
              binder: defaultRabbit # 设置要绑定的消息服务的具体设置
              group: testgroup #给消息分组，避免重复消费
    ```

  * Controller

    ```java
    @Component
    @EnableBinding(Sink.class)
    public class ReceiveMessageListenerController {
    
        @StreamListener(Sink.INPUT)
        public void input(Message<String> message) {
            System.out.println("接收到的消息： " + message.getPayload());
        }
    }
    ```

## 八、分布式请求链路追踪

### 1.Spring Cloud Sleuth

* 一条链路通过Trace id 唯一标识，Span标识发起请求的信息，各Span通过parent id关联

---

# Ⅳ、方便的类库


## Hutool

* 项目中“util”包友好的替代，节省了开发人员对项目中公用类和公用工具方法的封装时间.

* [官方文档](https://hutool.cn/docs/#/)

* [官网](https://hutool.cn/)

  
---

## Lombok

* 通过简单的注解形式来帮助我们简化消除一些必须有但显得很臃肿的Java代码
> 需要安装 idea+lombok插件

```java
@Data //自动生成 @ToString、@EqualsAndHashCode、@Getter @Setter和@RequiredArgsConstructor
@AllArgsConstructor//生成一个全参数的构造方法
@NoArgsConstructor//生成一个无参构造方法
@Slf4j//自动生成logger。log.info("xxx");
```

---

## POI

* 操作excel表格

---

## Echars

*  百度开源的数据可视化工具，专门用来绘制各种图表

---

## Element UI

*  饿了吗开源的前端构建框架

---

## Fastjson

* 阿里开源的Json组件，快速进行Json to java bean

---

## Quartz

* 定时任务组件

---

# Ⅴ、🔧工具


## ElasticSearch

*  倒排索引的搜索框架（B+树），用于进行全文搜索

> 管理工具：kibana

---

## FastDFS

*  阿里开源的分布式文件存储系统

---

## Postman

*  便捷调试post请求

---

# Ⅵ、🏹IDEA 插件

---

## Translation

* 翻译软件

---

## Statistic

* 统计代码行数

---

## Rainbow Brackets

*  彩虹色括号

---

## MyBatis Log Plugin

* 在控制台打印并自动拼接SQL语句，查看给DB发送的最终SQL

---

## Free MyBatis Plugin

* 生成mapper xml文件
* 快速从代码跳转到mapper及从mapper返回代码
* mybatis自动补全及语法错误提示
* 集成mybatis generator gui界面
---

## JRebel and XRebel

* 自动热部署工具，写JavaWEB就不需要每次改完代码重启服务器了
> [安装教程](https://blog.csdn.net/qierkang/article/details/95095954)

---

## Alibaba Java Coding Guidelines

* 阿里巴巴代码规范审核工具

> 有一点过于严格了，其中有一些规则不想使用可以删掉
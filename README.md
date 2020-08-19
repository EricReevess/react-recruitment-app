# 立方体Cube招聘移动端App（实时聊天）
本应用使用 [Create React App](https://github.com/facebook/create-react-app).初始化

## 启动应用
npm run start

## 打包应用(按需)
npm run build

## 项目概述

1. 基于前后台分离的招聘的单页应用
2. 包括用户注册，登陆，求职者和招聘者的列表，基于WebSocket的实时聊天功能
3. 前端技术栈：使用React 全家桶 以及 Ant Design UI
4. 后端技术栈：基于NodeJs的服务端，使用MongoDB数据库
5. 使用模块化、组件化、工程化的模式进行开发

## 技术选型

* 前端部分（模块化）：React + react-router + redux + Ant Design UI
* 后台部分：NodeJs + express + MongoDB + mongoose + socket.iO
* 前后台交互
  * ajax请求部分：axios 
  * 交互模式：async await 
  * 实时信息传输：socket.io-client
  * 测试接口：postman
* 模块化：ES6 Babel
* 工程化项目构建：webpack + react脚手架 + eslint代码风格检查
* 辅助库：js-cookie 等

## 项目功能概述

* 登陆功能
  * 求职者登陆
  * 老板登陆
* 注册功能，需要输入账号信息以及选择头像和填写个人信息，比如用用户类型
* 注销功能
* 查看职位信息功能（求职者）
* 查看求职信息功能（老版）
* 即时聊天功能：双方实时聊天，并且可以发送表情,显示未读消息
* 历史消息记录：保留上次聊天的对象的消息
* 查看、修改个人信息功能

## 前端路由与组件

|        功能        |   相对路径(/)   |   组件(.jsx)   |
| :----------------: | :-------------: | :------------: |
|        注册        |    /register    |    register    |
|        登陆        |     /login      |     login      |
|      通用界面      |        /        |      main      |
|     老版主界面     |      /boss      |      boss      |
|    求职者主界面    |   /jobseeker    |   jobseeker    |
|    消息列表界面    |    /message     |    message     |
|    个人中心界面    |    /personal    |    personal    |
|  老板信息完善界面  |   /boss-info    |   boss-info    |
| 求职者信息完善界面 | /jobseeker-info | jobseeker-info |
|      聊天界面      |  /chat/:userid  |      chat      |
|      404页面       |   /not-found    |   not-found    |

主界面渲染逻辑

1. 在渲染主路径以`/`之前先判断当前浏览器cookie是否拥有userId
   1. 如果`userId`不存在，则直接跳转到登陆页面`/login`
   2. 如果`userId`存在，再判断redux中是否存在`_id`
      1. 如果`_id`存在，检查对应`userType`以及检查是否存在头像信息`avatar`
         1. 如果请求的是根路径`/` ，则计算跳转的默认路由
            1. 如果`avatar`存在，则直接渲染对应用户主界面
            2. 如果`avatar`不存在，通过`userType`判断得到`redirectTo`重定向路由信息，跳转到对应用户的信息完善页面
      2. 如果`_id`不存在，则说明网页被刷新，则使用cookie向服务器发送请求获取用户数据，渲染null

## 项目源码目录结构

* src
  * api  ajax请求相关的模块文件夹
  * assets 静态资源文件夹
  * components UI组件封装的模块文件夹
  * containers 容器组件模块文件夹（在此组装UI组件）
  * redux 状态管理相关模块
  * utils 工具类相关模块(md5 cookie socket.io等)
  * index.js webpack打包入口js文件

## 数据结构和字段
用户数据Schema:   users

|    字段名    | 字段类型 | 是否必要 |
| :----------: | :------: | :------: |
|   username   |  String  |    是    |
|   password   |  String  |    是    |
|   useType    |  String  |    否    |
|    avatar    |  String  |    否    |
|   position   |  String  |    否    |
| personalInfo |  String  |    否    |
| companyInfo  |  String  |    否    |
|    salary    |  String  |    否    |

聊天数据Schema:   chat

|   字段名    | 字段类型 |  是否必要   |
| :---------: | :------: | :---------: |
|   from_id   |  String  |     是      |
|    to_id    |  String  |     是      |
|   chat_id   |  String  |     是      |
|   content   |  String  |     是      |
|   hasRead   | Boolean  | 默认为false |
| create_time |  Number  |     否      |

* from_id 发送者id
* to_id 接受者id
* chat_id 聊天会话id，由发送接受者共同决定
* content 聊天内容
* hasRead 对方是否已读
* create_time 创建时间，排序使用

# 页面组件设计
## 登陆/注册页面组件

* UI 均使用antd-mobile组件进行构建
* 登陆页面
  * 必要字段信息
    * 用户名：手机号、邮箱、和8-12为的字符串构成
    * 密码：就是密码
  * 按钮：
    * 登陆：发送请求验证身份，并进入主页面
    * 注册账户：跳转到注册页面 
  * 附加项：
    * 登陆cookie持久化，维持登陆一天
* 注册页面
  * 必要字段信息
    * 用户名：手机号、邮箱、或者8-12为的字符串构成
    * 密码：6-12位的字符串构成，需要至少包含一个大写和小写字母和数字
    * 确认密码
    * 用户类型：单向按钮，选择求职者和老板其中一个，默认为求职者
  * 按钮
    * 注册：发送请求并添加账户信息，并进入主页面
    * 登陆：跳转到登陆页面
* 用户信息完善页面
  * 老板信息完善
    * 必要字段信息，均为字符串
      * 真实姓名
      * 招聘职位
      * 公司名称
      * 职位薪资
      * 职位要求
    * 按钮
      * 多个默认头像选择按钮，点击即选择头像
      * 保存按钮，信息正确后调整到主页面
  * 求职者信息完善
    * 必要字段信息，均为字符串
      * 姓名
      * 求职岗位
      * 个人简介
    * 按钮
      * 多个默认头像选择按钮，点击即选择头像
      * 保存按钮，信息正确后调整到主页面

## 用户主页面

* 导航标题部分
* 内容部分
* 底部导航栏部分
  * 求职信息/职位列表
  * 消息管理
  * 个人中心

## 个人中心页面

* 展示用户的基本信息包括头像
* 提供一个红色的注销按钮，点击后询问是否注销用户

## 消息页面

* 显示收到的聊天消息，以时间先后排序
* 显示未查看的信息数量，在导航栏显示红点
* 聊天功能
  * 从列表页面点击即可发起聊天，切换到聊天页面
  * 双方都可以发送即时消息
  * 双方能够发送表情

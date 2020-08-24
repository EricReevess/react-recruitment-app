# Cube招聘移动Web应用(具有聊天功能)
本应用使用 [Create React App](https://github.com/facebook/create-react-app) 初始化

## 项目地址

http://47.115.62.216:5000    

## 启动应用
npm run start

## 打包应用(按需)
npm run build

## 项目功能需求
* 登陆功能
  * 求职者登陆
  * 老板登陆
* 注册功能，需要输入账号信息以及选择头像和填写个人信息，比如用用户类型
* 注销功能
* 查看职位信息功能（求职者）
* 查看求职信息功能（老版）
* 聊天功能：双方实时聊天，并且可以发送表情
* 历史消息记录：保留上次聊天的对象的消息，且将最新消息置顶
* 查看个人信息功能

## 项目描述

1. 基于前后台分离的招聘的单页应用
2. 包括用户注册，登陆，求职者和招聘者的列表，实时聊天功能
3. 前端技术栈：使用React 全家桶 以及 Ant Design UI
4. 后端技术栈：基于NodeJs的服务端，使用MongoDB数据库
5. 使用模块化、组件化、工程化的模式进行开发

## 技术选型

* 前端部分（模块化）：React + react-router + redux + Ant Design UI
* 后台部分：NodeJs + express + MongoDB + mongoose + SocketIO
* 前后台交互
  * ajax请求部分：axios ，
  * 交互模式：async await 
  * 测试接口：postman
* 模块化：ES6 Babel
* 工程化项目构建：webpack + react脚手架 + eslint代码风格检查
* 辅助库：js-cookie blueimp-md5等

# 前端部分

## 项目源码目录结构

* src
  * api  ajax请求相关的模块文件夹
  * assets 静态资源文件夹
  * components UI组件封装的模块文件夹
  * containers 容器组件模块文件夹（在此组装UI组件）
  * redux 状态管理相关模块
  * utils 工具类相关模块(md5 cookie socket.io等)
  * index.js webpack打包入口js文件

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

  ![image-20200824150528879](C:\Users\Fusion\AppData\Roaming\Typora\typora-user-images\image-20200824150528879.png)

* 注册页面

  * 必要字段信息
    * 用户名：手机号、邮箱、或者8-12为的字符串构成
    * 密码：6-12位的字符串构成，需要至少包含一个大写或小写字母和数字
    * 确认密码
    * 用户类型：单向按钮，选择求职者和老板其中一个，默认为求职者
  * 按钮
    * 注册：发送请求并添加账户信息，并进入主页面
    * 登陆：跳转到登陆页面

  ![image-20200824150608189](C:\Users\Fusion\AppData\Roaming\Typora\typora-user-images\image-20200824150608189.png)

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

    ![image-20200824151242712](C:\Users\Fusion\AppData\Roaming\Typora\typora-user-images\image-20200824151242712.png)

## 用户主页面

* 导航标题部分

  * 求职者展示职位列表
  * 老板展示求职者列表

* 内容部分

* 底部导航栏部分

  * 求职信息/职位列表
  * 消息管理
  * 个人中心

  ![image-20200824151924518](C:\Users\Fusion\AppData\Roaming\Typora\typora-user-images\image-20200824151924518.png)![image-20200824152025843](C:\Users\Fusion\AppData\Roaming\Typora\typora-user-images\image-20200824152025843.png)

## 个人中心页面

* 展示用户的基本信息包括头像

* 提供一个红色的注销按钮，点击后询问是否注销用户

  ![image-20200824152054896](C:\Users\Fusion\AppData\Roaming\Typora\typora-user-images\image-20200824152054896.png)![image-20200824152103312](C:\Users\Fusion\AppData\Roaming\Typora\typora-user-images\image-20200824152103312.png)

## 消息页面

* 显示收到的聊天消息，以时间先后排序

* 显示未查看的信息数量，在导航栏显示红点

* 聊天功能

  * 从列表页面点击即可发起聊天，切换到聊天页面
  * 双方都可以发送即时消息
  * 双方能够发送表情

  ![image-20200824152257988](C:\Users\Fusion\AppData\Roaming\Typora\typora-user-images\image-20200824152257988.png)![image-20200824152434867](C:\Users\Fusion\AppData\Roaming\Typora\typora-user-images\image-20200824152434867.png)

  ![image-20200824152457445](C:\Users\Fusion\AppData\Roaming\Typora\typora-user-images\image-20200824152457445.png)

## 封装axios

```js
// src/api/ajax.js
import axios from 'axios'

export default function ajax (method = 'GET', url = '', data = {}) {
  if (method === 'GET') {
    return axios.get(url, {
      params: data
    })
  }
  if (method === 'POST') {
    return axios.post(url, data)
  }
}
/* src/api/index.js
* 网络接口模块
* 返回值均为Promise对象*/
import ajax from './ajax'

const requestRegister = user => ajax('POST', '/register', user)

const requestLogin = user => ajax('POST', '/login', user)

const requestUserUpdate = userInfo => ajax('POST', '/update-user-data', userInfo)

const requestUserData = () => ajax('GET', '/get-user-data')

const requestUserList = (userType) => ajax('GET', '/get-user-list', { userType })

const requestUserMsgData = () => ajax('GET','/get-msg-list')

const reqMsgHasRead = (from_id) => ajax('POST', '/has-read-msg', { from_id })
export {
  requestRegister,
  requestLogin,
  requestUserUpdate,
  requestUserData,
  requestUserList,
  requestUserMsgData,
  reqMsgHasRead
}

```

## webpack打包

* 下载按需打包模块

  ```npm
  npm i --save-dev babel-plugin-import react-app-rewired
  ```

  打包报错解决方案：https://blog.csdn.net/zoepriselife316/article/details/88063171

* 下载less-loader以实现自定义样式，因为`antd`的样式使用less书写

  * css-loader出错解决方案：

    ```js
    addLessLoader({
        lessOptions:{
            javascriptEnabled:true ,
            ModifyVars:{  '@primary-color':'#eee'  } 
        }
    })
    ```

* 实现对antd mobile 的样式按需打包

  ```js
  ./config-overrides.js
  const { override, fixBabelImports, addLessLoader, addWebpackAlias } = require('customize-cra')
  const path = require('path')
  const theme = require('./custom-antd-theme')
  
  function resolve (dir) {
    return path.join(__dirname, '.', dir)
  }
  
  module.exports = override(
    fixBabelImports('import', {
      libraryName: 'antd-mobile',
      libraryDirectory: 'es',
      style: true
    }),
    addLessLoader({
      lessOptions:{ // 新版需要使用lessOptions进行包裹
        javascriptEnabled: true,
        modifyVars: theme
      }
    }),
  
    addWebpackAlias({
      '@': resolve('src')
    }),
  
  )
  ```

## Socket.IO

socket.io是一个能实现多人实时聊天的库，同时包装H5的WebSocket和轮询机制，来保证兼容性

由于客户端涉及socketIO的代码量稀少，这里就没有将socketIO进行封装使用，而是直接在异步actions中使用单例模式初始化，将产生连接的实例挂到全局io对象的属性上，避免页面刷新导致的Socket实例重复创建

```js
// src/redux/actions.js
import io from 'socket.io-client'
// ...
const initWebSocket = (dispatch) => {
  if (!io.webSocket) {
    console.log('初始化WebSocket')
    io.webSocket = io('ws://47.115.62.216:5000')
    io.webSocket.on('serverMsg', data => {
      dispatch(receiveSingleMsg(data))
    })
  }
}
```

## 解决跨域问题

使用代理解决：在`package.json`中添加代理

```json
"proxy": "http://localhost:5000"
```

## Redux的初始化

* 集中管理action-types

  ```js
  /*
  * 包含多个action类型常量
  * */
  
  const USER_AUTH_SUCCESS = 'USER_AUTH_SUCCESS'
  const USER_UPDATE = 'USER_UPDATE'
  const USER_STATUS_RESET = 'USER_UPDATE_ERR'
  const ERROR_MSG = 'ERROR_MSG'
  const SENT_REQ = 'SENT_REQUEST'
  const RCVD_RES = 'RECEIVED_RESPONSE'
  const USER_LIST = 'USERS_LIST'
  const MESSAGE_DATA = 'MESSAGE_LIST'
  const RECEIVE_SINGLE_MSG = 'RECEIVE_SINGLE_MSG'
  const MESSAGE_HAS_READ = 'MESSAGE_HAS_READ'
  
  export
  {
    USER_AUTH_SUCCESS,
    ERROR_MSG,
    SENT_REQ,
    RCVD_RES,
    USER_UPDATE,
    USER_STATUS_RESET,
    USER_LIST,
    MESSAGE_DATA,
    RECEIVE_SINGLE_MSG,
    MESSAGE_HAS_READ
  }
  ```

* 初始化用户信息的状态

  * msg：存储服务器响应的错误、提示信息
  * redirectTo：存储路由生成模块返回的路由信息
  * isRequesting：请求状态标识，用于加载动画的显示与销毁

  ```js
  const initUser = {
    username: '',
    userType: '', // 用户类型
    msg: '', // 如果出错，存储错误信息,
    redirectTo: '',
    isRequesting: false,
  }
  ```

* 初始化聊天信息的状态，

  * users：保存当前所有用户的头像信息与名称
  * chatMessages：存储于登陆用户有关的所有聊天信息
  * unreadMsgcount：初始化信息的未读数量

  ```js
  const initChatData = {
    users: {}, // 属性名：用户id，属性值用户姓名，头像信息
    chatMessages: [],
    unreadMsgcount: 0
  }
  ```

  

  



## 主界面登陆、注册功能逻辑

* 在渲染主路径以`/`之前先判断当前浏览器cookie是否拥有userId
  * 如果`userId`不存在，则直接跳转到登陆页面`/login`
  * 如果`userId`存在，再判断redux中是否存在`_id`
    * 如果`_id`存在，检查对应`userType`以及检查是否存在头像信息`avatar`
      * 如果请求的是根路径`/` ，则计算跳转的默认路由
        * 如果`avatar`存在，则直接渲染对应用户主界面
        * 如果`avatar`不存在，通过`userType`判断得到`redirectTo`重定向路由信息，跳转到对应用户的信息完善页面
    * 如果`_id`不存在，则说明网页被刷新，则使用cookie向·服务器发送请求获取用户数据，渲染加载中页面





  ### 三个主要路由组件

* 注册`/register`、登陆`/login`、主页面`/`

  ```js
  ReactDOM.render((
    <Provider store={store}>
      <HashRouter>
        <Switch>
          <Route path='/register' component={Register}/>
          <Route path='/login' component={Login}/>
          <Route path='/' component={Main}/> {/*默认组件*/}
        </Switch>
      </HashRouter>
    </Provider>
    ), document.getElementById('root')
  )
  ```

  

* 路由生成模块 

  ```js
  /* src\utils\redirect-route\index.js
  * 在用户成功被授权后，路由拥有4种状态
  * 用户主界面：
  *   /boss
  *   /jobseeker
  * 用户信息完善页面：
  *   /boss-info
  *   /jobseeker-info
  * 判断是否已经完善信息: user.avatar
  *   如果头像信息不存在，用户信息完善页面
  * 判断用户类型:user.type
  * */
  function getRedirecUrl (userType, avatar) {
    let path
    if(userType === 'boss'){
      path = '/boss'
    }
    if(userType === 'jobseeker') {
      path = '/jobseeker'
    }
    if(!avatar){
      path += '-info'
    }
  
    return path
  
  }
  export {getRedirecUrl}
  ```

* 注册/登陆页面：通过表单验证后，调用redux中actions.js的异步action函数调用网络模块进行发送异步请求，在异步action中，使用async 函数配合await达到等待Promise返回的同步效果，并且简化了响应消息的接收方式

  ```js
  // 同步action
  const userAuthSuccess = (user) => ({
    type: USER_AUTH_SUCCESS,
    data: user
  })
  // 异步action返回一个函数,在此使用ES8新增的async
  const register = (user) => {
    return async dispatch => {
      /* 传统方法
      const promise = registerRequest(user)
      promise.then(response => {
        const result = response.data
      })
      */
      //  在此发送ajax请求
      dispatch(sentReq())
      // response 直接得到响应的data值
      const response = await requestRegister(user)
      const responseData = response.data
      if (responseData.code === 0) {
        //  注册成功，携带响应信息发布一个同步action到reducer中
        dispatch(userAuthSuccess(responseData.data))
  
      } else {
        //  注册失败，需要得到错误信息msg
        dispatch(errorMsg(responseData.msg))
      }
      dispatch(receivedRes())
    }
  }
  
  ```

* 注册成功：携带响应信息发布一个同步action到reducer中，并计算路由，此时浏览器得到服务器响应的一个cookie

* 注册失败：返回错误信息

  ```js
  const user = (state = initUser, action) => {
    switch (action.type) {
      //...
      case USER_AUTH_SUCCESS:
        const { userType, avatar } = action.data
        // 使用解构的目的是为了保留state原来的某些属性不被action数据所覆盖
        return { ...action.data, redirectTo: getRedirecUrl(userType, avatar) }
      //...
      default :
        return state
    }
  }
  ```

  当redux状态更新后，触发注册组件重新渲染，在渲染之前得到了redirectTo的值并且`react-router`的`Redirect`组件使用进行页面的跳转到对应信息完善页面

  ```js
  // 
    render () {
      const { userType } = this.state
      const {msg,redirectTo} = this.props.user
      // redirectTo 有值，则重定向，这个值是用户通过注册得到的
      if(redirectTo){
        return <Redirect to={redirectTo} />
      }
      return ( 
          // .....
      )
    }
  
  export default connect(
    // 连接
    state => ({
      user: state.user
    }),
    { register }
  )(Register)
  ```

  在信息完善页面与注册页面同理，区别在于对服务器返回的avatar字段信息进行非空判断，再跳转到对应页面

  ```js
  render () {
      //导航守卫
      const { userType, avatar } = this.props.user
      // 如果redux中有用户头像数据，则直接进入用户主页面
      if (avatar) {
        const redirectpath = getRedirecUrl(userType,avatar)
        return <Redirect to={redirectpath}/>
      }
      return (//...)
  }
  ```

* 自动登录

  当在刷新页面后，redux中的信息会全部丢失，但cookie保存在浏览器本地，此时需要使用另一个接口来实现自动登录的功能

  在除了/register 和 /login 之外的路由均为main组件的子路由，所以在子路由上执行刷新操作时，在main组件挂载后，会根据cookie发送一个获取用户信息的请求

  ```js
  // src/main/main.jsx
  //在挂载时如果cookie中userId存在，且redux中_id不存在，说明刷新过，此时发送请求
  componentDidMount () {
      const userId = Cookies.get('userId')
      console.log('componentDidMount:userId:',userId)
      const { _id } = this.props.user
      if (userId && !_id) {
        // 发送登陆请求
        this.props.getUserData()
      }
    }
  //...
  // 在渲染时，再次判断userid是否存在于cookie中
  render () {
      //导航守卫
      const userId = Cookies.get('userId')
      //如果cookie中userId不存在，重定向到登陆页面
      if (!userId) {
        return <Redirect to={'/login'}/>
      } else {
        const { user } = this.props
        //如果Redux中_id不存在，不显示任何数据 
        // 此处的判断是为了等待 ajax请求结果
        if (!user._id) {
          return null
        } else {
          let path = this.props.location.pathname
          if (path === '/') { // 如果请求的根路径，则检查信息是否完善，再跳转
            path = getRedirecUrl(user.userType, user.avatar)
            return <Redirect to={path}/>
          }
        }
      }
  }
  ```

* 主页面导航

  * 采用路由信息渲染不同用户的不同页面，但在大型应用中，路由信息列表一般由服务器返回

  * 路由信息存储在数组中，并分为2个不同类型的路由信息

    * 公共路由
    * 私有路由

    ```js
    navList = [
        {
          path: '/boss',
          component: Boss,
          title: '求职者列表',
          icon: 'jobseeker',
          text: '求职列表'
        },
        {
          path: '/jobseeker',
          component: Jobseeker,
          title: '职位列表',
          icon: 'job',
          text: '职位列表'
        }
      ]
    
      publicNavList = [
        {
          path: '/message',
          component: Message,
          title: '消息管理',
          icon: 'message',
          text: '消息管理'
        },
        {
          path: '/personal',
          component: Personal,
          title: '个人中心',
          icon: 'person',
          text: '个人中心'
        },
      ]
    ```

  * 通过判断，将私有路由与公共路由组合到一起，再声明到react的路由中,值得注意的是，底部导航栏需要通过当前路径获得的路由信息来判断是否显示，否则切换到聊天页面时，导航栏不会隐藏

    ```js
    render () {
        // ...
        // 获得路由列表
        const { navList, publicNavList } = this
        // 获得redux中的user状态
        const { user } = this.props
        // 获得当前所在页面的路径
        let path = this.props.location.pathname
        // 拿到当前所在页面的路由信息
        const currentNavInfo = [...navList, ...publicNavList].find(item => item.path === path)
        // 当前用户类型所对应的导航栏的路由列表
        const customNavTabs = [
          navList.find(item => item.path === `/${user.userType}`),
          ...publicNavList
        ]
    
        return (
          <div>
            // 渲染标题栏
            {currentNavInfo ? <NavBar className="sticky-header">{currentNavInfo.title}</NavBar> : null}
            <Switch>
            // 按用户类型组件注册不同的react路由
              {
                [...navList, ...publicNavList].map(item => (
                  <Route key={item.path} path={item.path} component={item.component}/>
                ))
              }
              <Route path='/boss-info' component={BossInfo}/>
              <Route path='/jobseeker-info' component={JobseekerInfo}/>
              <Route path='/chat/:userId' component={Chat}/>
              <Route component={NotFound}/>
            </Switch>
    		// 渲染导航栏
            {currentNavTabs ? <NavTabs unreadMsgcount={this.props.unreadMsgcount} customNavTabs={customNavtabs}/> : null}
    
          </div>
        )
      }
    ```

  ## 即时聊天部分

  * 接口

    * 连接服务器SocketIO
    * 即时接受服务器信息
    * 用户发送消息
    * 获得用户所有聊天消息

  * 确认未读消息

  * 使用同步action函数，通过单例模式初始化SocketIO，

  * 监听服务器socketIO的`serverMsg`事件，获取即时消息，并将获得的消息通过dispatch对应action更新状态，并改变未读消息数量

    ```js
    // actions中
    // 同步action
    const receiveSingleMsg = (message) => ({
      type: RECEIVE_SINGLE_MSG,
      data: message
    })
    // 初始化SocketIO
    const initWebSocket = (dispatch) => {
      if (!io.webSocket) {
        io.webSocket = io('ws://xxxxxxx:5000')
        // 监听服务器的消息
        io.webSocket.on('serverMsg', data => {
          dispatch(receiveSingleMsg(data))
        })
      }
    }
    // reducer中
    const chat = (state = initChatData, action) => {
      const userId = Cookies.get('userId')
      switch (action.type) {
        //...
        case RECEIVE_SINGLE_MSG:
          return {
            users: state.users,
            chatMessages: [...state.chatMessages, action.data],
            // 如果接受的消息中hasRead标志为false 并且 信息是对方发给我的消息，则将未读数量加1
            unreadMsgcount: state.unreadMsgcount + (!action.data.hasRead && action.data.to_id === userId ? 1 : 0)
          }
        //...
        default:
          return state
      }
    
    }
    ```

  * 初始化SocketIO的时机：向服务器请求聊天信息时，在异步action中进行调用

  * 发送获取聊天信息请求的时机：（自动）登陆、提交信息完善，并接收到成功的响应之后

    ```js
    const getMsgList = async (dispatch) => {
      // 初始化SocketIO，并传入其需要的dispatch
      initWebSocket(dispatch)
      const response = await requestUserMsgData()
      const responseData = response.data
      if (responseData.code === 0) {
        const { users, chatMessages } = responseData.data
        dispatch(getMessageData({ users, chatMessages }))
      }
    }
    ```

  * 发送即时聊天信息时机：点击发送按钮、按下enter键时，使用异步action通过socketIO实例向服务器发布事件clientMsg

    ```js
    const sendMessage = (from_id, to_id, content) => {
      // 不需要要使用ajax发送请求，使用socket发送
      return () => {
        io.webSocket.emit('clientMsg', { from_id, to_id, content })
      }
    }
    ```

  * 确认未读消息的时机：进入、离开聊天页面时，在聊天前后的信息均可以被确认

    ```js
    const hasReadMessage = (targetId) => {
      return async dispatch => {
        const response = await reqMsgHasRead(targetId)
        const responseData = response.data
        if (responseData.code === 0) {
          const count = responseData.data
          dispatch(messageHasRead(count, targetId))
        }
      }
    }
    ```

  * 获取用户与相关用户的最后一条聊天信息：处理chatMessages

    ![image-20200824205442000](C:\Users\Fusion\AppData\Roaming\Typora\typora-user-images\image-20200824205442000.png)

    * 创建一个对象`latestMessagesObj`，遍历`chatMessages`数组，也就是单个元素为上图对象的数组，将每个chat_id创建为这个对象的一个属性，通过对比相同chat_id中的create_time字段，选择最后一个chat_id的信息

      ![image-20200824213535812](C:\Users\Fusion\AppData\Roaming\Typora\typora-user-images\image-20200824213535812.png)

    * 然后使用for in 对对象的key进行遍历，将`latestMessagesObj`对象中每个chat_id中的内容推入数组中，再使用sort以内部最后一条信息的create_time来进行排序，得到接收消息时间降序的数组

      ![image-20200824213601017](C:\Users\Fusion\AppData\Roaming\Typora\typora-user-images\image-20200824213601017.png)

      ```js
      const getLatestMsg = (chatMessages, user_id) => {
          let latestMessagesObj = {}
          let latestMessagesArray = []
          chatMessages.forEach(msg => {
            const chatId = msg.chat_id
            // 初始化定义对象属性，如果没有对应属性则使用Object.defineProperty对齐进行添加，可枚举与可写一定要声明为true，不然无法遍历和更改
            if (!latestMessagesObj[chatId]) {
              Object.defineProperty(latestMessagesObj, chatId, {
                value: {},
                writable: true,
                enumerable: true
              })
              // 定义以chat_id为属性名的属性内部的三个属性
              Object.defineProperties(latestMessagesObj[chatId], {
                latestMsg: {   // 存放一条完整的聊天信息
                  value: msg,
                  writable: true,
                  enumerable: true
                },
                unreadCount: { // 存放未读数量，初始化时需要判断
                  value: !msg.hasRead && msg.to_id === user_id ? 1 : 0,
                  writable: true,
                  enumerable: true,
                },
                targetId: { // 存放对方的userId
                  value: msg.to_id !== user_id ? msg.to_id : msg.from_id,
                  enumerable: true
                }
              })
            } else {
              // 在已经初始化了上述对象之后，默认执行以下语句
              // 对比消息时间，把最新的消息信息放入latestMsg的属性中
              if (msg.create_time > latestMessagesObj[chatId].latestMsg.create_time) {
                latestMessagesObj[chatId].latestMsg = msg
              }
              // 统计未读消息数量
              if (!msg.hasRead && msg.to_id === user_id) {
                latestMessagesObj[chatId].unreadCount++
              }
            }
          })
      	// 将上述的对象的属性抛弃chat_id转换为数组元素，并通过创建时间进行排序
          for (let key in latestMessagesObj) {
            latestMessagesArray.push(latestMessagesObj[key])
          }
          return latestMessagesArray.sort((a, b) => b.latestMsg.create_time - a.latestMsg.create_time)
        }
      ```

      

# NodeJs后端部分

## 服务器代码目录结构

src

* bin http服务模块文件夹
* db mongoose的module模块，连接数据库
* public 静态资源文件夹
* router 路由模块，提供接口
* socket-io socketIO模块
* app.js 服务器入口模块

## API接口设计

* 端口：5000

* 用户注册接口

  * 路径：/register

  * 请求方式：POST

  * 接收参数：

    * username 
    * password ，
    * userType, administrator为管理员用户名

  * 注册成功：返回

    ```js
    {code:0,data:{ _id:'xxx', username:'xxx'}}
    ```

  * 注册失败：返回

    ```js
    {code:1,msg: '用户名已存在，或不可使用'}
    ```

* 用户登陆接口

  * 路径：/login

  * 请求方式：POST

  * 接收参数：

    * username
    * password

  * 登陆成功：返回

    ```js
    {code:0,data:userDoc}
    ```

  * 登陆失败：返回

    ```js
    {code:1,msg:'用户名或密码错误'}
    ```

* 更新用户信息接口

  * 路径：/update-user-data

  * 请求方式：POST

  * 接收参数：

    * name 真实姓名
    * avatar 头像信息
    * position 职位信息（老板）
    * personalInfo 职位要求、个人简介
    * companyInfo 公司信息 （老板）
    * salary 薪资信息（老板）

  * cookie不存在，返回

    ```js
    {code:1,msg:'请先登录'}
    ```

  * 更新成功：

    ```js
    {code:0,data:user}
    ```

  * id查找到的信息不存在，更新失败，返回

    ```js
    {code:1,msg:'请先登录'}
    ```

* 获取用户信息接口（自动登录）

  * 路径：/get-user-data

  * 请求方式：GET

  * 接收参数：

    * userId cookie中的userId

  * 找不到userId 对应的用户信息，返回

    ```js
    {code:1,msg:'请先登录'}
    ```

  * 找到了，并且返回userId对应的用户信息

    ```js
    {code:0,data:user}
    ```

  

* 获取用户列表

  * 路径：/get-user-list

  * 请求方式：GET

  * 接收参数：

    * userType

  * 没有信息返回，返回：

    ```js
    {code:1,msg:'当前无内容'}
    ```

  * 寻找到信息，返回：

    ```js
    {code:0,data:usersDoc}
    ```

* 聊天接口

  * 获取当前用户所有聊天信息列表

    * 路径：/get-msg-list
    * 请求方式：GET
    * 接收参数：无
    * 返回：
      * 所有用户的id，姓名以及头像信息，因为不能确定向某个用户发送信息，使用用户的id作为对象属性名

  * 当前用户与某个用户的聊天信息数据结构,chatMessages 为数组类型，内部包含多个聊天信息对象

        ![image-20200824205442000](C:\Users\Fusion\AppData\Roaming\Typora\typora-user-images\image-20200824205442000.png)

  * 修改指定消息为已读

  * 路径：/has-read-msg

  * 请求方式：POST

    * 接收参数：from_id

      * from_id 当前消息列表中对方的id

    * 在点击未读消息时，客户端向服务器发起当前请求，修改

    * 返回：

    * ```js
      {code: 0,data: msgDoc.nModified // .nModified返回修改的条目总数}
      ```

  * socket.io接口

    * url: ws://xxxxxxx:5000

## 使用mongoose操作数据库

引入mongoose，连接到MongoDB

```js
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/test',
  { useNewUrlParser: true, useUnifiedTopology: true })

const mongooseConnection = mongoose.connection

mongooseConnection.on('connected', () => {
  console.log('数据库连接成功！！')
})
```



定义一个用户身份信息的约束文档结构Schema，以及聊天信息约束文档结构Schema

```js
const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  userType: { type: String, required: true },
  name: { type: String },
  avatar: { type: String },
  position: { type: String }, // 职位信息
  personalInfo: { type: String }, // 个人信息、职位要求
  companyInfo: { type: String },
  salary: { type: String }
})
const chatSchema = mongoose.Schema({
  from_id: { type: String, required: true }, // 消息的发起者的用户id
  to_id: { type: String, required: true }, // 消息的接受者的用户id
  chat_id: { type: String, required: true }, // 消息的聊天室id
  content: { type: String, required: true },
  hasRead: { type: Boolean, default: false },
  create_time: { type: String },
})
```

定义用于操作集合的Model，其本质为构造函数

```js
const UserModel = mongoose.model('users', userSchema)
const ChatModel = mongoose.model('chats', chatSchema)
```

## 向执行客户端Socket发送消息

由于初次入门SocketIO，没有SocketIO的room深入研究，这里使用用户连接服务器时携带的cookie进行用户在线检测，并向特定用户发送实时聊天信息

```js
module.exports = (server) => {
  const io = require('socket.io')(server)
  //io对象监听连接，每有一个连接建立，即创建一个socket
  io.on('connection', socket => {
    console.log('client connected')
    // 监听客户端信息，在此处每有一个客户端连接，就会创建一个socket对象
    socket.on('clientMsg', ({ from_id, to_id, content }) => {
      console.log('收到客户端:', from_id, '的消息')
      // 保存客户端消息到数据库
      const chat_id = [from_id, to_id].sort().join('_')
      const create_time = Date.now()
      new ChatModel({ from_id, to_id, content, chat_id, create_time })
        .save((err, chatMsg) => {
          // 向客户端返回消息
          socket.emit('serverMsg', chatMsg)
          // 通过请求中的to_id，去获得模板客户端的socketId
          let toSocketId = getSocketIdFromCookie(to_id, io)
          console.log(toSocketId)
          // 如果对方socketId存在，则说明对方在线
          if (toSocketId) {
            io.sockets.connected[toSocketId].emit('serverMsg', chatMsg)
            console.log('向客户端', from_id, '发送消息')
          }
        })
    })
  })
}
// 通过消息接受者的用户id 获取对应的socketId
const getSocketIdFromCookie = (to_id, io) => {
  // 在io.sockets.connected对象中可获取到所有已经连接的客户端的信息，其每个属性以socketId标识
  const connectedClient = io.sockets.connected
  // 将所有socketId保存到数组中
  const connectedClientSocketIds = Object.keys(connectedClient)
  // 遍历每个属性内的内容，这里主要是找到对应对象中的cookies，但cookies是以字符串形式保存
  for (let key of connectedClientSocketIds) {
    if (connectedClient[key].handshake.headers.cookie) {
      // 尝试匹配到userId=******** ，如果匹配到，则使用正则进行去除，由此拿到目标的userId
      let targetCookies = connectedClient[key].handshake.headers.cookie.match(/userId=[\w|\s]*/)
      let targetId = targetCookies ? targetCookies.toString().replace(/userId=/g,''): null
      // 如果扫描到的userId与聊天信息中的to_id相同，则返回这个SocketId
      if (targetId === to_id) {
        return connectedClient[key].id
      }
    }
  }
  return false
}
```



## 项目总结与评估

* 前端部分
  * 基本熟悉了一个比较完整的开发流程
  * 体验了一次工程化、组件化、模块化的开发模式，尽管在配置按需打包时，遇到一些问题，而且对webpack并不是很熟悉
  * 掌握使用react-create-app脚手架初始化项目
  * 学会使用react全家桶的SPA的开发，包括路由和状态管理
  * 学会使用react第三方UI组件库 Ant Design Mobile构建页面
  * 基本用axios与后台进行数据交互
  * 学会使用 socket.io 库实现实时通信，但实现的方式有许多不妥以及不稳定之处，需要继续对socket.io进行探索
* 后台部分
  * 熟悉了使用express框架以及mongoose进行NodeJs的后台开发
  * 学会使用express搭建后台路由，编写接口
  * 通过查阅文档，学会使用基本的mongoose来操作MongoDB数据库

存在问题

  * 服务器的接口编写不严密，错误的数据请求可能会让服务器进程崩溃

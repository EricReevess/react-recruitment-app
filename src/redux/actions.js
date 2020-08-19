/*
* 包含多个action creator,生成对应action对象，给reducer，且可能携带参数
* 同步action
* 异步action：需要使用Redux.applyMiddleware()中间件来进行异步请求，并dispatch给处理异步的reducer
* */
import {
  requestRegister,
  requestLogin, requestUserUpdate,
  requestUserData, requestUserList,
  requestUserMsgData,
  reqMsgHasRead
} from '../api'
import {
  USER_AUTH_SUCCESS,
  ERROR_MSG,
  SENT_REQ,
  RCVD_RES,
  USER_UPDATE,
  USER_STATUS_RESET,
  USER_LIST,
  MESSAGE_DATA, RECEIVE_SINGLE_MSG,
  MESSAGE_HAS_READ
} from './action-types'
import io from 'socket.io-client'

// 每个action-type都对应一个同步action
const userAuthSuccess = (user) => ({
  type: USER_AUTH_SUCCESS,
  data: user
})

const userUpdate = (user) => ({
  type: USER_UPDATE,
  data: user
})

const userStatusReset = (msg) => ({
  type: USER_STATUS_RESET,
  data: msg
})

const userList = (userList) => ({
  type: USER_LIST,
  data: userList
})

const errorMsg = (msg) => ({
  type: ERROR_MSG,
  data: msg
})

const sentReq = () => ({
  type: SENT_REQ,
  data: { isRequesting: true }
})

const receivedRes = () => ({
  type: RCVD_RES,
  data: { isRequesting: false }
})

const getMessageData = (messageData) => ({
  type: MESSAGE_DATA,
  data: messageData
})

const receiveSingleMsg = (message) => ({
  type: RECEIVE_SINGLE_MSG,
  data: message
})

const messageHasRead = (count, from_id) => ({
  type: MESSAGE_HAS_READ,
  data: { count, from_id }
})

const logout = () => {
  return userStatusReset('你已经退出登录咯')
}

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
    const response = await requestRegister(user)
    const responseData = response.data
    if (responseData.code === 0) {
      //  注册成功
      dispatch(userAuthSuccess(responseData.data))

    } else {
      //  注册失败，需要得到错误信息msg
      dispatch(errorMsg(responseData.msg))
    }
    dispatch(receivedRes())
  }
}

const login = (user) => {
  // 异步action返回一个函数,在此使用ES8新增的async
  return async dispatch => {
    //  在此发送ajax请求
    dispatch(sentReq())
    const response = await requestLogin(user)
    const responseData = response.data
    if (responseData.code === 0) {
      //  登陆成功
      dispatch(userAuthSuccess(responseData.data))
      await getMsgList(dispatch)

    } else {
      //  登陆失败，需要得到错误信息msg
      dispatch(errorMsg(responseData.msg))
    }
    dispatch(receivedRes())
  }
}

// 用户信息完善
const updateUserData = (user) => {
  return async dispatch => {
    dispatch(sentReq())
    const response = await requestUserUpdate(user)
    const responseData = response.data
    if (responseData.code === 0) {
      //  更新成功
      dispatch(userUpdate(responseData.data))
      await getMsgList(dispatch)
    } else {
      //  更新失败，需要得到错误信息msg
      dispatch(userStatusReset(responseData.msg))
    }
    dispatch(receivedRes())
  }
}

// 自动登录
const getUserData = () => {
  return async dispatch => {
    dispatch(sentReq())
    const response = await requestUserData()
    const responseData = response.data
    if (responseData.code === 0) {
      //  更新成功
      dispatch(userUpdate(responseData.data))
      await getMsgList(dispatch)
    } else {
      //  更新失败，需要得到错误信息msg
      dispatch(userStatusReset(responseData.msg))
    }
    dispatch(receivedRes())
  }
}

const getUserList = (userType) => {
  return async dispatch => {
    dispatch(sentReq())
    const response = await requestUserList(userType)
    const responseData = response.data
    if (responseData.code === 0) {
      //  更新成功
      dispatch(userList(responseData.data))
    } else {
      //  更新失败，需要得到错误信息msg
      dispatch(errorMsg(responseData.msg))
    }
    dispatch(receivedRes())
  }
}
/*
* 单例对象
* 1.创建对象之前，判断对象是否已经存在，否则创建对象
* 2.创建对象之后，当前对象，作为下一次判断*/
// 将webSocket变为单例对象，内存中只存在一个对象

const initWebSocket = (dispatch) => {
  if (!io.webSocket) {
    console.log('初始化WebSocket')
    io.webSocket = io('ws://localhost:5000')
    io.webSocket.on('serverMsg', data => {
      dispatch(receiveSingleMsg(data))
    })
  }
}

const sendMessage = (from_id, to_id, content) => {
  // 不需要要使用ajax发送请求，使用socket发送
  return () => {
    io.webSocket.emit('clientMsg', { from_id, to_id, content })
  }
}

// 非组件调用的异步函数
const getMsgList = async (dispatch) => {
  initWebSocket(dispatch)
  const response = await requestUserMsgData()
  const responseData = response.data
  if (responseData.code === 0) {
    const { users, chatMessages } = responseData.data
    dispatch(getMessageData({ users, chatMessages }))
  }
}

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

export {
  register,
  login,
  updateUserData,
  getUserData,
  getUserList,
  logout,
  sendMessage,
  hasReadMessage
}


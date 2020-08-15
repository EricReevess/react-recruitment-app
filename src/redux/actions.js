/*
* 包含多个action creator,生成对应action对象，给reducer，且可能携带参数
* 同步action
* 异步action：需要使用Redux.applyMiddleware()中间件来进行异步请求，并dispatch给处理异步的reducer
* */
import { registerRequest, loginRequest, updateUserDataRequest, getUserDataRequest,getUsersListRequest } from '../api'
import { USER_AUTH_SUCCESS, ERROR_MSG, SENT_REQ, USER_UPDATE, USER_STATUS_RESET, USER_LIST } from './action-types'

// 每个action-type都对应一个同步action
const userAuthSuccess = (user) => ({
  type: USER_AUTH_SUCCESS,
  data: Object.assign({isRequesting:false},user)
})

const userUpdate = (user) => ({
  type: USER_UPDATE,
  data: Object.assign({isRequesting:false},user)
})

const userStatusReset = (msg) => ({
  type: USER_STATUS_RESET,
  data: {msg:msg,isRequesting:false}
})

const userList = (userList) => ({
  type: USER_LIST,
  data: userList
})

const errorMsg = (msg) => ({
  type: ERROR_MSG,
  data: {msg:msg,isRequesting:false}
})

const sentReq = () => ({
  type: SENT_REQ,
  data: {isRequesting:true}
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
    const response = await registerRequest(user)
    const responseData = response.data
    if (responseData.code === 0) {
      //  注册成功
      dispatch(userAuthSuccess(responseData.data))

    } else {
      //  注册失败，需要得到错误信息msg
      dispatch(errorMsg(responseData.msg))
    }
  }
}

const login = (user) => {
  // 异步action返回一个函数,在此使用ES8新增的async
  return async dispatch => {
    //  在此发送ajax请求
    dispatch(sentReq())
    const response = await loginRequest(user)
    const responseData = response.data
    if (responseData.code === 0) {
      //  登陆成功
      dispatch(userAuthSuccess(responseData.data))
    } else {
      //  登陆失败，需要得到错误信息msg
      dispatch(errorMsg(responseData.msg))
    }
  }
}

const updateUserData = (user) => {
  return async dispatch => {
    dispatch(sentReq())
    const response = await updateUserDataRequest(user)
    const responseData = response.data
    if (responseData.code === 0) {
      //  更新成功
      dispatch(userUpdate(responseData.data))
    } else {
      //  更新失败，需要得到错误信息msg
      dispatch(userStatusReset(responseData.msg))
    }
  }
}

const getUserData = () => {
  return async dispatch => {
    dispatch(sentReq())
    const response = await getUserDataRequest()
    const responseData = response.data
    if (responseData.code === 0) {
      //  更新成功
      dispatch(userUpdate(responseData.data))
    } else {
      //  更新失败，需要得到错误信息msg
      dispatch(userStatusReset(responseData.msg))
    }
  }
}

const getUserList = (userType) => {
  return async dispatch => {
    const response = await getUsersListRequest(userType)
    const responseData = response.data
    if (responseData.code === 0) {
      //  更新成功
      dispatch(userList(responseData.data))
    } else {
      //  更新失败，需要得到错误信息msg
      dispatch(errorMsg(responseData.msg))
    }
  }
}


export {register, login , updateUserData, getUserData, getUserList ,logout}

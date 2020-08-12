/*
* 包含多个action creator,生成对应action对象，给reducer，且可能携带参数
* 同步action
* 异步action：需要使用Redux.applyMiddleware()中间件来进行异步请求，并dispatch给处理异步的reducer
* */
import { registerRequest, loginRequest } from '../api'
import { USER_AUTH_SUCCESS, ERROR_MSG, SENT_REQ} from './action-types'

// 每个action-type都对应一个同步action
const userAuthSuccess = (user) => ({
  type: USER_AUTH_SUCCESS,
  data: Object.assign({},user,{isLoading:false})
})

const errorMsg = (msg) => ({
  type: ERROR_MSG,
  data: {msg:msg,isLoading:false}
})

const sentReq = () => ({
  type: SENT_REQ,
  data: {isLoading:true}
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

export {register, login}

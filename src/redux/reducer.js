/*
* 多个reducer函数，根据旧的State和指定的action.type 返回一个新的state
* Redux 提供了一个combineReducers方法，用于 Reducer 的拆分。
* 你只要定义各个子 Reducer 函数，然后用这个方法，将它们合成一个大的 Reducer。
* */
import { combineReducers } from 'redux'
import { USER_AUTH_SUCCESS, ERROR_MSG, SENT_REQ, USER_UPDATE,USER_STATUS_RESET,USER_LIST } from './action-types'
import { getRedirecUrl } from '../utils/redirect-route'
import Cookies from 'js-cookie'

const initUser = {
  username: '',
  userType: '', // 用户类型
  msg: '', // 如果出错，存储错误信息,
  redirectTo:'',
  isRequesting: false,
}


const user = (state = initUser, action) => {
  switch (action.type) {
    case SENT_REQ:
      return {...state,...action.data}
    case USER_AUTH_SUCCESS:
      const {userType,avatar} = action.data
      // 使用解构的目的是为了保留state原来的某些属性不被action数据所覆盖
      return {...action.data,redirectTo:getRedirecUrl(userType,avatar)}
    case USER_UPDATE:
      return {...state,...action.data} // 此处返回后，直接进入主界面
    case USER_STATUS_RESET:
      Cookies.remove('userId')
      return { ...initUser, ...action.data }
    case ERROR_MSG:
      return { ...state, ...action.data }
    default :
      return state
  }
}

const initUserList = []
const userList = (state = initUserList, action) => {
  switch (action.type) {
    case USER_LIST:
      return action.data
    default:
      return state
  }
}

// 暴露一个合并的reducer对象{reducerDemo:reducerDemo}
export default combineReducers({
  user,
  userList
})

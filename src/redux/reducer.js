/*
* 多个reducer函数，根据旧的State和指定的action.type 返回一个新的state
* Redux 提供了一个combineReducers方法，用于 Reducer 的拆分。
* 你只要定义各个子 Reducer 函数，然后用这个方法，将它们合成一个大的 Reducer。
* */
import { combineReducers } from 'redux'
import {
  ERROR_MSG,
  MESSAGE_DATA,
  MESSAGE_HAS_READ,
  RECEIVE_SINGLE_MSG,
  SENT_REQ,
  RCVD_RES,
  USER_AUTH_SUCCESS,
  USER_LIST,
  USER_STATUS_RESET,
  USER_UPDATE
} from './action-types'
import { getRedirecUrl } from '../utils/redirect-route'
import Cookies from 'js-cookie'

const initUser = {
  username: '',
  userType: '', // 用户类型
  msg: '', // 如果出错，存储错误信息,
  redirectTo: '',
  isRequesting: false,
}


const user = (state = initUser, action) => {
  switch (action.type) {
    case SENT_REQ:
      return { ...state, ...action.data }
    case RCVD_RES:
      return { ...state, ...action.data }
    case USER_AUTH_SUCCESS:
      const { userType, avatar } = action.data
      // 使用解构的目的是为了保留state原来的某些属性不被action数据所覆盖
      return { ...action.data, redirectTo: getRedirecUrl(userType, avatar) }
    case USER_UPDATE:
      return { ...state, ...action.data } // 此处返回后，直接进入主界面
    case USER_STATUS_RESET:
      return { ...initUser, msg: action.data }
    case ERROR_MSG:
      return { ...state, msg: action.data }
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
const initChatData = {
  users: {}, // 属性名：用户id，属性值用户姓名，头像信息
  chatMessages: [],
  unreadMsgcount: 0
}

const chat = (state = initChatData, action) => {
  const userId = Cookies.get('userId')
  switch (action.type) {
    case MESSAGE_DATA:
      const { users, chatMessages } = action.data
      return {
        users,
        chatMessages,
        unreadMsgcount: chatMessages.reduce((pre, msg) =>
          pre + (!msg.hasRead && msg.to_id === userId ? 1 : 0)
          , 0)
      }
    case RECEIVE_SINGLE_MSG:
      return {
        users: state.users,
        chatMessages: [...state.chatMessages, action.data],
        unreadMsgcount: state.unreadMsgcount + (!action.data.hasRead && action.data.to_id === userId ? 1 : 0)
      }
    case MESSAGE_HAS_READ:
      const { count, from_id } = action.data
      return {
        users: state.users,
        chatMessages: state.chatMessages.map(msg => {
          if (msg.from_id === from_id && msg.to_id === userId && !msg.hasRead) {
            return { ...msg, hasRead: true }
          } else {
            return msg
          }

        }),
        unreadMsgcount: state.unreadMsgcount - count
      }
    default:
      return state
  }

}
// 暴露一个合并的reducer对象{reducerDemo:reducerDemo}
export default combineReducers({
  user,
  userList,
  chat
})

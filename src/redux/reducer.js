/*
* 多个reducer函数，根据旧的State和指定的action.type 返回一个新的state
* Redux 提供了一个combineReducers方法，用于 Reducer 的拆分。
* 你只要定义各个子 Reducer 函数，然后用这个方法，将它们合成一个大的 Reducer。
* */
import { combineReducers } from 'redux'
import { USER_AUTH_SUCCESS, ERROR_MSG, SENT_REQ } from './action-types'

const initUser = {
  username: '',
  userType: '', // 用户类型
  msg: '', // 如果出错，存储错误信息,
  redirectTo:'',
  isLoading: false,
}

const user = (state = initUser, action) => {
  switch (action.type) {
    case SENT_REQ:
      console.log('SENT_REQ')
      return {...state,...action.data}
    case USER_AUTH_SUCCESS:
      // 使用解构的目的是为了保留state原来的某些属性不被action数据所覆盖
      return {...action.data,redirectTo:'/'}
    case ERROR_MSG:
      return { ...state, ...action.data }
    default :
      return state
  }
}


// 暴露一个合并的reducer对象{reducerDemo:reducerDemo}
export default combineReducers({
  user
})

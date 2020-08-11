/*
* 多个reducer函数，根据旧的State和指定的action.type 返回一个新的state
* Redux 提供了一个combineReducers方法，用于 Reducer 的拆分。
* 你只要定义各个子 Reducer 函数，然后用这个方法，将它们合成一个大的 Reducer。
* */
import {combineReducers} from  'redux'

const reducerDemo =  (state = 0, action) => {

  return state

}

// 暴露一个合并的reducer对象{reducerDemo:reducerDemo}
export default combineReducers({
  reducerDemo
})

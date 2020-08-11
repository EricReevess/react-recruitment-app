/*
* 状态管理核心模块
* */
import {createStore, applyMiddleware} from 'redux'
import reducer from './reducer'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

// 暴露store对象
export default createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
)

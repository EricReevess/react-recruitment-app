/*
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

/*
* 网络接口模块
* 返回值均为Promise对象*/
import ajax from './ajax'

const registerRequest = user => ajax('POST', '/register', user)

const loginRequest = user => ajax('POST', '/login', user)

const updateUserDataRequest = userInfo => ajax('POST', '/update-user-data', userInfo)

const getUserDataRequest = () => ajax('GET', '/get-user-data')

const getUsersListRequest = (userType) => ajax('GET', '/get-user-list', { userType })

export {
  registerRequest,
  loginRequest,
  updateUserDataRequest,
  getUserDataRequest,
  getUsersListRequest
}

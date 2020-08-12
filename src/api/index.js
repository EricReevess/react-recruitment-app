/*
* 网络接口模块
* 返回值均为Promise对象*/
import ajax from './ajax'

const registerRequest = (user) => {
  return ajax('POST', '/register', user)
}
const loginRequest = (user) => {
  return ajax('POST', '/login', user)
}
const userUpdateRequest = (userInfo => {
  return ajax('POST', '/user-update', userInfo)
})

export { registerRequest, loginRequest, userUpdateRequest  }

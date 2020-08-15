/*
* 在用户成功被授权后，路由拥有4种状态
* 用户主界面：
*   /boss
*   /jobseeker
* 用户信息完善页面：
*   /boss-info
*   /jobseeker-info
* 判断是否已经完善信息: user.avatar
*   如果头像信息不存在，用户信息完善页面
* 判断用户类型:user.type
* */
function getRedirecUrl (userType, avatar) {
  let path
  if(userType === 'boss'){
    path = '/boss'
  }
  if(userType === 'jobseeker') {
    path = '/jobseeker'
  }
  if(!avatar){
    path += '-info'
  }

  return path

}
export {getRedirecUrl}

/*
注册路由组件
 */
import React, { Component } from 'react'
import { register } from '../../redux/actions'
import { connect } from 'react-redux'
import Logo from '../../components/logo/logo'
import { NavBar, WingBlank, WhiteSpace, List, InputItem, Radio, Button, Toast, NoticeBar } from 'antd-mobile'
import './register.less'
import { Redirect } from 'react-router-dom'

const ListItem = List.Item

class Register extends Component {

  state = {
    username: '',
    password: '',
    confirmPwd: '',
    userType: 'jobSeeker',
    nameError: false,
    pwdError: false,
    pwd2Error: false,

  }

  registerHandler = () => {
    const { nameError, pwdError, pwd2Error,username, password, confirmPwd } = this.state
    const user = {
      username: this.state.username,
      password: this.state.password,
      userType: this.state.userType
    }
    const hasContent = username && password && confirmPwd
    if (!(nameError || pwdError || pwd2Error) && hasContent) {
      this.props.register(user)
    } else {
      Toast.info('您输入的信息格式有误')
    }

    // if(this.props.user.msg !== ''){
    //   Toast.fail(this.props.user.msg)
    // }
    //Toast.loading('加载中...',0)
  }

  handleChange = (type, value) => {
    this.setState({
      [type]: value
    })
  }
  toLogin = () => {
    this.props.history.replace('/login')
  }

  onErrorClick = (type) => {
    if (this.state.nameError && type === 'username') {
      Toast.info('请输入正确的手机号，邮箱，或者8-12个字符的用户名')
    }
    if (this.state.pwdError && type === 'password') {
      Toast.info('密码长度为6-12，至少包含一个大/小写字母和数字')
    }
    if (this.state.pwd2Error && type === 'confirmPwd') {
      Toast.info('确认密码不正确')
    }

  }
  handleValidate = (type, value) => {
    if (type === 'username') {
      const usernameReg = /^\d{11}$|^(?![0-9]+$)[0-9A-Za-z_]{8,12}$|^\w{5,16}@\D{2,}\.(com|net|org|cn)$/
      if (!usernameReg.test(value)) {
        this.setState({
          nameError: true
        })
      } else {
        this.setState({
          nameError: false
        })
      }
    }

    if (type === 'password') {
      const passwordReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/
      if (!passwordReg.test(value)) {
        this.setState({
          pwdError: true
        })
      } else {
        this.setState({
          pwdError: false
        })
      }
    }

    if (type === 'confirmPwd') {
      if (this.state.password !== value) {
        this.setState({
          pwd2Error: true
        })
      } else {
        this.setState({
          pwd2Error: false
        })
      }
    }

  }
  UNSAFE_componentWillReceiveProps (nextProps, nextContext) {
    const {isRequesting} = nextProps.user
    isRequesting ? Toast.loading('加载中...',0):Toast.hide()
  }

  render () {
    const { userType } = this.state
    const {msg,redirectTo} = this.props.user
    // redirectTo 有值，则重定向，这个值是用户通过注册得到的
    if(redirectTo){
      return <Redirect to={redirectTo} />
    }
    return (
      <div>
        <NavBar>
          C u b e
        </NavBar>
        {msg? <NoticeBar icon={null}>{msg}</NoticeBar>:null }
        <WhiteSpace size="xl"/>
        <Logo/>
        <WhiteSpace size="xl"/>
        <WingBlank>
          <List>
            <InputItem
              clear
              placeholder="请输入用户名"
              value={this.state.username}
              error={this.state.nameError}
              onErrorClick={_ => this.onErrorClick('username')}
              onChange={value => {
                this.handleChange('username', value)
                this.handleValidate('username', value)
              }}>
              用户名:
            </InputItem>
            <InputItem
              clear
              placeholder="请输入密码"
              type="password"
              value={this.state.password}
              error={this.state.pwdError}
              onErrorClick={_ => this.onErrorClick('password')}
              onChange={value => {
                this.handleChange('password', value)
                this.handleValidate('password', value)
              }}>
              密&nbsp;&nbsp;&nbsp;码:
            </InputItem>
            <InputItem
              clear
              placeholder="请确认密码" type="password"
              value={this.state.confirmPwd}
              error={this.state.pwd2Error}
              onErrorClick={_ => this.onErrorClick('confirmPwd')}
              onChange={value => {
                this.handleChange('confirmPwd', value)
                this.handleValidate('confirmPwd', value)
              }}>
              确认密码:
            </InputItem>
            <ListItem>
              <span>用户类型:</span>
              <Radio
                className="my-radio"
                checked={userType === 'jobseeker'}
                onChange={() => {
                  this.handleChange('userType', 'jobseeker')
                }}>
                求职者
              </Radio>
              <Radio
                className="my-radio"
                checked={userType === 'boss'}
                onChange={() => {
                  this.handleChange('userType', 'boss')
                }}>
                老板
              </Radio>
            </ListItem>
          </List>
          <WhiteSpace/>
          <Button type="primary" onClick={this.registerHandler}> 注 册 </Button>
          <WhiteSpace/>
          <Button onClick={this.toLogin}> 已有账户？到这登陆 </Button>
        </WingBlank>
      </div>
    )
  }
}

export default connect(
  // 连接
  state => ({
    user: state.user
  }),
  { register }
)(Register)

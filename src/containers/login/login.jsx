/*
注册路由组件
 */
import React, { Component } from 'react'
import { Button, InputItem, List, NavBar, NoticeBar, Toast, WhiteSpace, WingBlank } from 'antd-mobile'
import Logo from '../../components/logo/logo'
import { Redirect } from 'react-router-dom'
import { login } from '../../redux/actions'
import { connect } from 'react-redux'

class Login extends Component {
  state = {
    username: '',
    password: '',
    nameError: false,

  }

  loginHandler = () => {
    const {username,password,nameError} = this.state
    const user = {
      username,
      password
    }
    if( !nameError && password ) {
      this.props.login(user)
    } else {
      Toast.info('请输入密码',2)
    }
  }

  handleChange = (type, value) => {
    this.setState({
      [type]: value
    })
  }
  handleValidate = (value) => {
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
  toRegister = () => {
    this.props.history.replace('/register')
  }

  onErrorClick = () => {
    if (this.state.nameError) {
      Toast.info('请输入正确的用户名')
    }

  }
  componentWillReceiveProps (nextProps, nextContext) {
    const {isLoading} = nextProps.user
    isLoading ? Toast.loading('登陆中...',0):Toast.hide()
  }

  render () {
    const {msg,redirectTo} = this.props.user
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
              onErrorClick={this.onErrorClick}
              onBlur={value => this.handleValidate(value)}
              onChange={value => {
                this.handleChange('username', value)
              }}>
              用户名:
            </InputItem>
            <InputItem
              clear
              placeholder="请输入密码"
              type="password"
              value={this.state.password}
              onChange={value => {
                this.handleChange('password', value)
              }}>
              密&nbsp;&nbsp;&nbsp;码:
            </InputItem>
          </List>
          <WhiteSpace/>
          <Button type="primary" onClick={this.loginHandler}> 登 陆 </Button>
          <WhiteSpace/>
          <Button onClick={this.toRegister}> 没有账户？ </Button>
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
  { login }
)(Login)

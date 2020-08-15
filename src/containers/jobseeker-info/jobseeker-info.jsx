/*
* 求职者注册信息完善界面*/
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, NavBar, InputItem, TextareaItem, Toast } from 'antd-mobile'
import AvatarSelector from '../../components/avatar-selector/avatar-selector'
import { Redirect } from 'react-router-dom'
import { updateUserData } from '../../redux/actions'

class JobseekerInfo extends Component {
  state = {
    name: '',
    avatar: '', // 头像
    position: '', // 职位信息
    personalInfo: '', // 个人信息、职位要求,
    salary: '' // 期望薪水
  }
  handleChange = (type, value) => {
    this.setState({
      [type]: value
    })
  }
  setAvatar = (avatar) => {
    this.setState({
      avatar
    })
  }
  handelSave = () => {
    // const {name,avatar,position,personalInfo} = this.state
    this.props.updateUserData(this.state)
  }

  UNSAFE_componentWillReceiveProps (nextProps, nextContext) {
    const { isRequesting } = nextProps.user
    isRequesting ? Toast.loading('保存中...', 0) : Toast.hide()
  }

  render () {
    //导航守卫
    const { userType, avatar } = this.props.user
    // 如果redux中有用户头像数据，则直接进入用户主页面
    if (avatar) {
      const redirectpath = userType === 'boss' ? '/boss' : '/jobseeker'
      return <Redirect to={redirectpath}/>
    }
    const { name, position,salary, personalInfo } = this.state
    return (
      <div>
        <NavBar>
          求职者信息完善
        </NavBar>
        <AvatarSelector setAvatar={this.setAvatar}/>
        <InputItem
          onChange={value => this.handleChange('name', value)}
          value={name}
          required
          placeholder="请输入您的真实姓名">
          姓名:
        </InputItem>
        <InputItem
          onChange={value => this.handleChange('position', value)}
          value={position}
          placeholder="请输入您的理想职位">
          求职岗位:
        </InputItem>
        <InputItem
          onChange={value => this.handleChange('salary', value)}
          value={salary}
          placeholder="请输入您的理想薪资">
          理想薪资:
        </InputItem>
        <TextareaItem
          onChange={value => this.handleChange('personalInfo', value)}
          value={personalInfo}
          placeholder="简单的介绍一下自己吧"
        title="个人简介"
        rows="3"/>
        <Button onClick={this.handelSave} type="primary">保存</Button>
      </div>
    )
  }
}

export default connect(
  state => ({
    user: state.user
  }),
  { updateUserData }
)(JobseekerInfo)

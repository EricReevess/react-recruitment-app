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
    salary: '', // 期望薪水
    nameError: false,
  }
  handleChange = (type, value) => {
    this.setState({
      [type]: value.trim()
    })
  }
  setAvatar = (avatar) => {
    this.setState({
      avatar
    })
  }
  handelSave = () => {
    const { nameError, position, salary, personalInfo, avatar } = this.state
    if (nameError || !position || !salary || !personalInfo) {
      Toast.info('请按照提示正确填写所需信息')
    } else if (!avatar) {
      Toast.info('需要选择一个头像')
    } else {
      this.props.updateUserData(this.state)
    }

  }

  UNSAFE_componentWillReceiveProps (nextProps, nextContext) {
    const { isRequesting } = nextProps.user
    isRequesting ? Toast.loading('保存中...', 0) : Toast.hide()
  }

  handleValidate = (value) => {
    const nameReg = /[\u4e00-\u9fa5]{2,10}/
    if (!nameReg.test(value)) {
      this.setState({
        nameError: true
      })
    } else {
      this.setState({
        nameError: false
      })
    }
  }

  render () {
    //导航守卫
    const { userType, avatar } = this.props.user
    // 如果redux中有用户头像数据，则直接进入用户主页面
    if (avatar) {
      const redirectpath = userType === 'boss' ? '/boss' : '/jobseeker'
      return <Redirect to={redirectpath}/>
    }
    const { name, position, salary, personalInfo } = this.state
    return (
      <div>
        <NavBar>
          求职者信息完善
        </NavBar>
        <AvatarSelector setAvatar={this.setAvatar}/>
        <InputItem
          clear
          onChange={value => this.handleChange('name', value)}
          onBlur={value => {
            this.handleValidate(value)
          }}
          error={this.state.nameError}
          value={name}
          required
          placeholder="请输入您的中文姓名，2-10个汉字">
          姓名:
        </InputItem>
        <InputItem
          clear
          onChange={value => this.handleChange('position', value)}
          value={position}
          placeholder="请输入您的理想职位">
          求职岗位:
        </InputItem>
        <InputItem
          clear
          onChange={value => this.handleChange('salary', value)}
          value={salary}
          placeholder="请输入您的理想薪资">
          理想薪资:
        </InputItem>
        <TextareaItem
          clear
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

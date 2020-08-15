import React, { Component } from 'react'
import { Grid, List } from 'antd-mobile'
import PropTypes from 'prop-types'
import './avatar-selector.less'

export default class AvatarSelector extends Component {
  static propTypes = {
    setAvatar: PropTypes.func.isRequired
  }
  state = {
    selectedAvatar: null
  }

  constructor (props) {
    super(props)
    // 准备头像数据
    this.avatarIcons = Array.from(new Array(15)).map((value, idx) => ({
      icon: require(`../../assets/avatar-icon/icon-${idx}.png`),
      text: `icon-${idx}`,
    }))
  }

  // 得到点击的头像信息
  handleAvatarClick = ({ icon, text }) => {
    this.setState({
      selectedAvatar: icon
    })
    this.props.setAvatar(text)
  }

  render () {
    const { selectedAvatar } = this.state
    const listHeader =
      <div className="listHeader">
        {
          !selectedAvatar ?
            <span>请选择一个头像</span>
            :
            <span>
            <img src={selectedAvatar} alt="avatar" width="40px"/>
          </span>
        }
      </div>
    return (
      <List renderHeader={() => listHeader}>
        <Grid
          onClick={this.handleAvatarClick}
          data={this.avatarIcons}
          columnNum={5}
          renderItem={dataItem => (
            <div style={{ padding: '15px' }}>
              <img src={dataItem.icon} style={{ width: '40px'}} alt=""/>
            </div>
          )}
        />
      </List>
    )
  }
}

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List, Icon, NavBar, InputItem, Button, Grid } from 'antd-mobile'
import './chat.less'
import { hasReadMessage, sendMessage } from '../../redux/actions'
import emojis from './emojis'

const Item = List.Item
const Brief = Item.Brief


class Chat extends Component {

  state = {
    inputMsg: '',
    isShow: false,
    listClass: 'chat-list'
  }


  handleSendMsg = () => {
    const from_id = this.props.user._id
    const to_id = this.props.match.params.userId
    const message = this.state.inputMsg.trim()
    if (message) {
      this.props.sendMessage(from_id, to_id, message)
      this.setState({
        inputMsg: '',
        isShow: false,
        listClass: 'chat-list',
        hasNewMsg: false
      })
    }


  }

  toggleShow = () => {
    const isShow = !this.state.isShow
    this.setState({ isShow })
    // 解决标签bug
    if (isShow) {
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'))
      }, 0)
      this.setState({
        listClass: 'chat-list-show-pannel'
      })
    } else {
      this.setState({
        listClass: 'chat-list'
      })
    }

  }


  componentDidMount () {
    const to_id = this.props.match.params.userId
    window.scrollTo(0, document.body.scrollHeight)
    this.props.hasReadMessage(to_id)
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    window.scrollTo(0, document.body.scrollHeight)
  }

  componentWillReceiveProps (nextProps, nextContext) {
    if (nextProps.chat.chatMessages.length !== this.props.chat.chatMessages.length) {
      this.setState({
        hasNewMsg: true
      })
    } else {
      this.setState({
        hasNewMsg: false
      })
    }
  }

  componentWillUnmount () {
    const to_id = this.props.match.params.userId
    if (this.state.hasNewMsg) {
      this.props.hasReadMessage(to_id)
      console.log('请求更新')
    }
  }

  render () {
    const from_id = this.props.user._id
    const to_id = this.props.match.params.userId
    const { users, chatMessages } = this.props.chat
    const currentMessages = chatMessages.filter(
      msg => [from_id, to_id].sort().join('_') === msg.chat_id
    )
    return (
      <div className="chat">
        <NavBar
          className="sticky-header"
          icon={<Icon type="left"/>}
          onLeftClick={() => this.props.history.goBack()}>
          {users[to_id] ? users[to_id].name : null}
        </NavBar>
        {
          currentMessages.length === 0 ?
            <div className="empty-chat">试着友好地交流一下</div> : null
        }
        <List
          className={this.state.listClass}>
          {
            currentMessages.map(msg => {
              if (msg.from_id === from_id) {
                return (
                  <Item
                    key={msg._id}
                    className="massage-box-my"
                    thumb={<img src={require(`../../assets/avatar-icon/${users[from_id].avatar}.png`)}
                                className="avatar" alt="avatar"/>}

                    align="top"
                    wrap>
                    {msg.content}
                    <Brief>{new Date(Number(msg.create_time)).toLocaleTimeString()}</Brief>
                  </Item>
                )
              } else {
                return (
                  <Item
                    key={msg._id}
                    thumb={<img src={require(`../../assets/avatar-icon/${users[to_id].avatar}.png`)} className="avatar"
                                alt="avatar"/>}

                    align="top"
                    wrap>
                    {msg.content}
                    <Brief>{new Date(Number(msg.create_time)).toLocaleTimeString()}</Brief>
                  </Item>
                )
              }
            })
          }
        </List>
        <div className="input">
          <div className="message-input">
            <InputItem
              className="input-box"
              extra={
                <span role='img' aria-labelledby="panda1" onClick={this.toggleShow}>
                  😃
                </span>
              }
              onChange={value => this.setState({ inputMsg: value })}
              value={this.state.inputMsg}>
            </InputItem>
            <Button
              onClick={this.handleSendMsg}
              className="send-msg-btn"
              style={{ height: 44 }}
              type="primary">
              发送
            </Button>
          </div>
          {
            this.state.isShow ? (
              <Grid
                className="emoji"
                onClick={item => this.setState({
                  inputMsg: this.state.inputMsg + item.text
                })}
                data={emojis}
                isCarousel={true}
                columnNum={8}
                carouselMaxRow={4}/>
            ) : null
          }
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({
    user: state.user,
    chat: state.chat
  }),
  { sendMessage, hasReadMessage }
)(Chat)

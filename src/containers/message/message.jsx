import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Badge, List } from 'antd-mobile'
import './message.less'
import QueueAnim from 'rc-queue-anim'

const Item = List.Item
const Brief = Item.Brief

class Message extends Component {


  getLatestMsg = (chatMessages, user_id) => {
    let latestMessagesObj = {}
    let latestMessagesArray = []
    chatMessages.forEach(msg => {
      const chatId = msg.chat_id
      if (!latestMessagesObj[chatId]) {
        Object.defineProperty(latestMessagesObj, chatId, {
          value: {},
          enumerable: true
        })
        Object.defineProperties(latestMessagesObj[chatId], {
          latestMsg: {
            value: msg,
            writable: true,
            enumerable: true
          },
          unreadCount: {
            value: !msg.hasRead && msg.to_id === user_id ? 1 : 0,
            writable: true,
            enumerable: true,
          },
          targetId: {
            value: msg.to_id !== user_id ? msg.to_id : msg.from_id,
            enumerable: true
          }
        })
      } else {
        if (msg.create_time > latestMessagesObj[chatId].latestMsg.create_time) {
          latestMessagesObj[chatId].latestMsg = msg
        }
        if (!msg.hasRead && msg.to_id === user_id) {
          latestMessagesObj[chatId].unreadCount++
        }
      }
    })

    for (let key in latestMessagesObj) {
      latestMessagesArray.push(latestMessagesObj[key])
    }
    return latestMessagesArray.sort((a, b) => b.latestMsg.create_time - a.latestMsg.create_time)
  }

  render () {

    const { user } = this.props
    const { users, chatMessages } = this.props.chat
    const latestMessages = this.getLatestMsg(chatMessages, user._id)

    return (
      <List className="message">
        <QueueAnim
          type='left'
          duration={1000}
          interval={300}>
          {
            latestMessages.length === 0 ?
              <div className="empty-message">一点消息也没有</div>
              :
              latestMessages.map(msg => (
                <Item
                  onClick={_ => this.props.history.push(`/chat/${msg.targetId}`)}
                  key={msg.targetId}
                  extra={<Badge text={msg.unreadCount}/>}
                  thumb={require(`../../assets/avatar-icon/${users[msg.targetId].avatar}.png`)}>
                  {users[msg.targetId].name}
                  <Brief>{msg.latestMsg.content}</Brief>
                </Item>
              ))
          }
        </QueueAnim>
      </List>
    )
  }
}

export default connect(
  state => ({
    user: state.user,
    chat: state.chat
  }),
  {}
)(Message)

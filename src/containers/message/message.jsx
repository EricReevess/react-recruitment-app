import React, { Component } from 'react'
import { connect } from 'react-redux'

class Message extends Component {
  render () {
    return (
      <div style={{ marginTop: 50 }}>
        Message
      </div>
    )
  }
}

export default connect(
  state => ({}),
  {}
)(Message)

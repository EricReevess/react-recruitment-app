import { Button, Icon, WingBlank } from 'antd-mobile'
import './not-found.less'
import React from 'react'
import { useHistory } from 'react-router-dom'

const NotFound = () => {
  const history = useHistory()
  return (
    <WingBlank className="not-found" size="sm">

      <Icon size="lg" type="cross-circle"/>
      <h2>
        抱歉，找不到该页面</h2>
      <div className="button">
        <Button
          onClick={() => {
            history.replace('/')
          }}
          type="primary">
          返回首页
        </Button>
      </div>
    </WingBlank>
  )
}

export default NotFound


import React from 'react'
import { connect } from 'react-redux'
import { Result, List, Button, WhiteSpace, Modal } from 'antd-mobile'
import { logout } from '../../redux/actions'

const Item = List.Item
const Brief = Item.Brief
const alert = Modal.alert

const Personal = (props) => {
  const { name, userType, avatar, position, salary, personalInfo, companyInfo } = props.user

  return (
    <div style={{marginTop:50}}>
      <Result
        title={name}
        message={userType === 'jobseeker' ? '求职者' : '老板'}
        img={<img src={require(`../../assets/avatar-icon/${avatar}.png`)} alt="avatar"/>}
      />

      <List renderHeader={() => '个人信息'}>
        <Item>
          {companyInfo ? <Brief>公司信息：{companyInfo}</Brief> : null}
          <Brief>
            {userType === 'boss' ? '招聘' : null}
            职位：{position}
          </Brief>
          <Brief>个人简介：{personalInfo}</Brief>
          <Brief>薪资：{salary}</Brief>
        </Item>
      </List>
      <WhiteSpace size="lg"/>
      <Button
        type="warning"
        onClick={() =>
          alert('注销', '你确定要退出登录吗？', [
            { text: '不，我点错了', onPress:null },
            { text: '是的，退出吧', onPress: () => props.logout() }
          ])
        }>
        注销
      </Button>
    </div>
  )
}

export default connect(
  state => ({
    user: state.user
  }),
  { logout }
)(Personal)

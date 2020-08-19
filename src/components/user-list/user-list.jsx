/*
* 显示指定用户类型的列表*/
import React from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { Card, WingBlank, WhiteSpace } from 'antd-mobile'

const Body = Card.Body
const Header = Card.Header

const UserList = (props) => {
  // 非路由组件，需要加入useHistory
  const history = useHistory()
  const { userList } = props
  return (
    <WingBlank size="lg" style={{marginBottom:50,marginTop:50}}>
      {
        userList.map(user => (
          <div key={user._id} onClick={ _ => history.push(`/chat/${user._id}`)} >
            <Card>
              <Header
                title={user.name}
                thumb={require(`../../assets/avatar-icon/${user.avatar}.png`)}
                extra={<span>{user.position}</span>}
              />
              <Body>
                {user.companyInfo ? <div>公司：{user.companyInfo}</div>:null}
                {}
                <div>
                  {user.userType === 'jobseeker' ? '期望':null}
                  薪资：{user.salary}
                </div>
                <div>{user.userType === 'jobseeker' ? '个人简介':'岗位描述'}：{user.personalInfo}</div>
              </Body>
            </Card>
            <WhiteSpace size="lg"/>
          </div>
        ))

      }
    </WingBlank>
  )
}

UserList.propTypes = {
  userList: PropTypes.array.isRequired
}

export default UserList



/*export default class UserList extends Component {
  static propTypes = {
    userList: PropTypes.array.isRequired
  }

  render () {
    const { userList } = this.props
    return (
      <WingBlank size="lg">
        {
          userList.map(user => (
            <div key={user._id}>
              <WhiteSpace size="lg"/>
              <Card>
                <Header
                  title={user.name}
                  thumb={require(`../../assets/avatar-icon/${user.avatar}`)}
                  extra={<span>this is extra</span>}
                />
                <Body>
                  <div>职位：{user.position}</div>
                  {user.companyInfo ? <div>公司：{user.companyInfo}</div>:null}
                  {}
                  <div>
                    {user.userType === 'jobseeker' ? '期望':null}
                    薪资：{user.salary}
                  </div>
                  <div>描述：{user.personalInfo}</div>
                </Body>
              </Card>
            </div>
          ))

        }
      </WingBlank>
    )
  }
}*/

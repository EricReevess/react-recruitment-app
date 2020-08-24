import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import UserList from '../../components/user-list/user-list'
import { getUserList } from '../../redux/actions'


const Jobseeker = (props) => {

  useEffect(() => {
    props.getUserList('boss')
  },[])

  return <UserList userList={props.userList}/>
}

export default connect(
  state => ({
    userList: state.userList
  }),
  { getUserList }
)(Jobseeker)

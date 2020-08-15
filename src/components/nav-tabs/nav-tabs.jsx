import React from 'react'
import { TabBar } from 'antd-mobile'
import PropTypes from 'prop-types'
import { useHistory, useLocation } from 'react-router-dom'
import './nav-tabs.less'
const TabItem = TabBar.Item


const NavTabs = (props) => {
  // 希望在非路由组件中使用路由api
  const location = useLocation()
  const history = useHistory()
  const path = location.pathname

    return (
        <TabBar tintColor="#549ca5">
          {
            props.customNavtabs.map(item => (
              <TabItem
                key={item.path}
                title={item.text}
                icon={{ uri: require(`./nav-icon/${item.icon}.png`) }}
                selectedIcon={{ uri: require(`./nav-icon/${item.icon}-selected.png`) }}
                selected={path === item.path}
                onPress={() => history.replace(item.path)}
              />
            ))
          }
        </TabBar>
      )
}

NavTabs.propTypes = {
  customNavtabs: PropTypes.array.isRequired
}

// 向外暴露添加添加了路由api的NavTabs
export default NavTabs

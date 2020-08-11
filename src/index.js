/*
* 入口js文件
* */

import React from 'react'
import ReactDOM from 'react-dom'
import './assets/index.css'
import { HashRouter, Route, Switch } from 'react-router-dom'
import {Provider} from 'react-redux'
import Register from './containers/register/register'
import Login from './containers/login/login'
import Main from './containers/main/main'
import store from './redux/store'

ReactDOM.render((
  <Provider store={store}>
    <HashRouter>
      <Switch>
        <Route path='/register' component={Register}></Route>
        <Route path='/login' component={Login}></Route>
        <Route component={Main}></Route> {/*默认组件*/}
      </Switch>
    </HashRouter>
  </Provider>

  ), document.getElementById('root')
)

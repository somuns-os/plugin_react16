import React, { Component } from 'react'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import asyncComponent from '../utils/asyncComponent'

const router = [
  {
    path: '/login',
    component: () => import('../pages/login/login.jsx')
  },
  {
    path: '/home',
    component: () => import('../pages/home-page.jsx')
  }
]

class RouterIndex extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          { router.map(item => (<Route key={ item.path } exact path={ item.path } component={ asyncComponent(item.component) } />))
          }
          <Redirect exact from="/" to="/login" />
        </Switch>
      </HashRouter>
    )
  }
}

export default RouterIndex

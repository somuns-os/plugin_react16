import React, { Component } from 'react'
import { HashRouter, Switch } from 'react-router-dom'
import asyncComponent from '../utils/asyncComponent'
import FrontendAuth from '../components/FrontendAuth/FrontendAuth'
import { routerConfig } from './routerConfig'

class RouterIndex extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <FrontendAuth routerConfig={ routerConfig }/>
        </Switch>
      </HashRouter>
    )
  }
}

export default RouterIndex

import React from 'react'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import FrontendAuth from '@/components/FrontendAuth'
import firstRoutes from '@/router/first-router'
import store from './store'
import asyncComponent from '@/utils/asyncComponent'

ReactDOM.render(
  <Provider store={ store }>
    <Router>
      {
        firstRoutes.map((route, ids) => <FrontendAuth key={ ids } route={ route }></FrontendAuth>)
      }
    </Router>
  </Provider>,
  document.getElementById('root'))

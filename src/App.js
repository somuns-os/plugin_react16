import React from 'react'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import FrontendAuth from '@/components/AuthRoute'
import firstRoutes from '@/router/first-router'
import store from './store'
import asyncComponent from '@/utils/asyncComponent'

ReactDOM.render(
  <Provider store={ store }>
    <Router>
      <Switch>
        <Route path="/" exact render={ () => <Redirect to="/login" /> } />
        {
          firstRoutes.map((item, ids) => <Route path={ item.path } key={ ids } component={ item.component }/>)
        }
        <Route path="*" render={ () => <Redirect to="/home"/> }/>
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root'))

import React from 'react'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import store from './store'
import RouterIndex from './router'

ReactDOM.render(
  <Provider store={ store }>
    <RouterIndex />
  </Provider>,
  document.getElementById('root'))

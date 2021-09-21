import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import Cookies from 'js-cookie'

export function AuthRoute({ component: Component, ...rest }) {
  const isLogin = Cookies.get('token')
  return (
    <Route
      { ...rest }
      render={ props => {
        if (isLogin || !rest.auth) {
          return <Component { ...props } />
        } else {
          return isLogin ? <Redirect to="/404" /> : <Redirect to="/login" />
        }
      } }
    />
  )
}

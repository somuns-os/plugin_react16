import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import Cookies from 'js-cookie'


export function FrontendAuth({ route, ...reset }) {
  const { path } = route
  const isLogin = Cookies.get('token')
  if (route.redirect) {
    return <Redirect to={ route.redirect || '/login' } />
    // return isLogin ? <Redirect to="/home" /> : <Redirect to="/login" />
  }
  if (route && !route.auth) {
    const { component } = route
    console.log(route)
    return <Route path={ path } component={ component } />
  }
  if (isLogin) {
    // 如果是登陆状态，想要跳转到登陆，重定向到主页
    if (path === '/login') {
      return <Redirect to="/home/pages" />
    } else {
      // 如果路由合法，就跳转到相应的路由
      if (route) {
        return <Route path={ path } component={ route.component } />
      } else {
        // 如果路由不合法，重定向到 404 页面
        return <Redirect to="/404" />
      }
    }
  } else {
    // 非登陆状态下，当路由合法时且需要权限校验时，跳转到登陆页面，要求登陆
    if (route && route.auth) {
      return <Redirect to="/login" />
    } else {
      // 非登陆状态下，路由不合法时，重定向至 404
      return <Redirect to="/login" />
    }
  }
}

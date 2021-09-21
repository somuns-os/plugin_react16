import React, { Component } from 'react'
import {
  Redirect,
  Route,
  Switch
} from 'react-router-dom'

import { Layout } from 'antd'

import { AuthRoute } from '@/components/AuthRoute'
import homeRoutes from '@/router/home'
import HomeMenu from './HomeMenu'
import TabMenu from '@/components/TabMenu/TabMenu'

import { flatArr } from '@/utils/utils'

const { Header, Content, Sider } = Layout


import './HomePage.styl'


class HomePage extends Component {

  state = {
    collapsed: false
  }

  onCollapse = collapsed => {
    this.setState({ collapsed })
  }

  render() {
    const { collapsed } = this.state
    const routes = flatArr(homeRoutes, 'children')
    return (
      <Layout style={ { minHeight: '100vh' } }>
        <Sider>
          <div className="logo">
            后台管理
          </div>
          <HomeMenu menus={ homeRoutes } { ...this.props } />
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={ { padding: 0 } } />
          <div className="tabs">
            <TabMenu { ...this.props }></TabMenu>
          </div>
          <Content style={ { margin: '0 16px' } }>
            <div className="site-layout-background">
              <Switch>
                <Route path="/home" exact render={ () => <Redirect to="/home/pages" /> } />
                {
                  routes.map((item, ids) => <AuthRoute key={ ids } { ...item } ></AuthRoute>
                  )
                }
              </Switch>
            </div>
          </Content>
        </Layout>
      </Layout>
    )
  }
}

export default HomePage

import React from 'react'
import { NavLink } from 'react-router-dom'

import { connect } from 'react-redux'
import { setTabMenus, setCurMenu } from '@/store/action'

import { flatArr } from '@/utils/utils'

import { Layout, Menu } from 'antd'

class HomeMenu extends React.Component {

  constructor(props) {
    super(props)
    this.handleSelectMenu = this.handleSelectMenu.bind(this)
    const path = this.props.location.pathname
    const curMenu = flatArr(this.state.menuList, 'children').find(item => item.path === path)
    if (!curMenu) return
    this.handleTabMenu({
      tabName: curMenu.title,
      tabId: path,
      type: 'A'
    }, this.state.tabMenus)
  }

  state = {
    tabMenus: this.props.tabMenus,
    curMenu: this.props.curMenu,
    menuList: [ ...this.props.menus ] || [],
    defaultSelectMenu: [ this.props.location.pathname ]
  }

  componentDidMount() {
    const path = this.props.location.pathname
    setTimeout(_ => {
      this.setState({
        defaultOpenKeys: [ path ]
      })
    })
  }


  handleTabMenu(params, tabMenus = []) {
    const { tabId, tabName, type } = params
    if (type === 'D') {
      tabMenus = tabMenus.filters(item => item.tabId !== tabId)
    } else {
      const ids = tabMenus.findIndex(item => item.tabId === tabId)
      if (ids === -1) {
        tabMenus.push(params)
      }
    }
    this.props.setTabMenus(tabMenus)
    this.props.setCurMenu({
      tabId,
      tabName
    })
    return tabMenus
  }

  handleSelectMenu({ key }) {
    const curMenu = flatArr(this.state.menuList, 'children').find(item => item.path === key)
    this.handleTabMenu({
      tabName: curMenu.title,
      tabId: key,
      type: 'A'
    }, this.state.tabMenus)
  }

  render() {
    const { SubMenu } = Menu
    const renderSubMenu = (menus) => (
      menus.map(item => {
        if (item.children && item.children.length > 0) {
          return (
            <SubMenu key={ item.path } title={ item.title }>
              { renderSubMenu(item.children) }
            </SubMenu>
          )
        } else {
          return (
            <Menu.Item key={ item.path }>
              <NavLink to={ item.path }>{ item.title }</NavLink>
            </Menu.Item>
          )
        }
      })
    )
    return (
      <Menu
        theme="dark"
        defaultSelectedKeys={ this.state.defaultSelectMenu }
        mode="inline"
        onSelect={ this.handleSelectMenu }
      >
        { renderSubMenu(this.state.menuList) }
      </Menu>
    )
  }
}

const mapStateToProps = ({ reducer }) => ({
  tabMenus: reducer.tabMenus,
  curMenu: reducer.curMenu
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  setTabMenus: (params) => dispatch(setTabMenus(params, ownProps)),
  setCurMenu: (params) => dispatch(setCurMenu(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeMenu)

import React from 'react'
import { connect } from 'react-redux'

import { setTabMenus, setCurMenu } from '@/store/action'

import {
  CloseOutlined,
  CaretLeftOutlined,
  CaretRightOutlined
} from '@ant-design/icons'

import './TabMenu.styl'


class TabMenu extends React.Component {

  constructor(props) {
    super(props)
    this.handleCloseTab = this.handleCloseTab.bind(this)
  }

  handleCloseTab(item) {
    const tabList = [ ...this.props.tabMenus ]
    const curMenu = this.props.curMenu
    let newTab = {}
    const newTabList = tabList.filter(menu => menu.tabId !== item.tabId)
    this.props.setTabMenus(newTabList).then(_ => {
      if (curMenu.tabId === item.tabId) {
        const ids = tabList.findIndex(menu => menu.tabId === curMenu.tabId)
        if (ids - 1 >= 0) {
          newTab = newTabList[ids - 1]
        } else {
          newTab = {}
        }
        this.props.setCurMenu({ ...newTab })
        this.props.history.push(newTab.tabId)
      }
    })
  }

  render() {
    return (
      <div className="tab-menu">
        <div className="left">
          <CaretLeftOutlined />
        </div>
        <div className="content">
          {
            this.props.tabMenus.map((item, ids) => {
              if (ids === 0) {
                return (
                  <div className={ item.tabId === this.props.curMenu?.tabId ? 'item active' : 'item' } key={ item.tabId }>
                    <span className="name">{ item.tabName }</span>
                  </div>
                )
              } else {
                return (
                  <div className={ item.tabId === this.props.curMenu?.tabId ? 'item active' : 'item' } key={ item.tabId }>
                    <span className="name">{ item.tabName }</span>
                    <CloseOutlined className="close-icon" onClick={ () => this.handleCloseTab(item) } />
                  </div>
                )
              }
            })
          }
        </div>
        <div className="right">
          <CaretRightOutlined />
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ reducer }) => ({
  tabMenus: reducer.tabMenus,
  curMenu: reducer.curMenu
})

const mapDispatchToProps = (dispatch) => ({
  setTabMenus: (params) => dispatch(setTabMenus(params)),
  setCurMenu: (params) => dispatch(setCurMenu(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(TabMenu)

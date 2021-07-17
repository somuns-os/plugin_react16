import React, { Component } from 'react'

import '@/styles/HomePage/HomePage.styl'

class HomePage extends Component {

  render() {
    // const { SubMenu } = Menu

    // // submenu keys of first level
    // const rootSubmenuKeys = [ 'sub1', 'sub2', 'sub4' ]

    // const Sider = () => {
    //   const [ openKeys, setOpenKeys ] = React.useState([ 'sub1' ])

    //   const onOpenChange = keys => {
    //     const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1)
    //     if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
    //       setOpenKeys(keys)
    //     } else {
    //       setOpenKeys(latestOpenKey ? [ latestOpenKey ] : [])
    //     }
    //   }
    // }
    return (
      <div className="home-page">
        123
      </div>
      // <Menu mode="inline"  style={ { width: 256 } }>
      // </Menu>
    )
  }
}

export default HomePage

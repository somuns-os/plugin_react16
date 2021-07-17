import React, { Component } from 'react'

import { Menu } from 'antd'
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons'

class SubMenu extends Component {


  render() {
    const { SubMenu } = Menu
    return (
      <SubMenu key="sub1" icon={ <MailOutlined /> } title="Navigation One">
        <Menu.Item key="1">Option 1</Menu.Item>
        <Menu.Item key="2">Option 2</Menu.Item>
        <Menu.Item key="3">Option 3</Menu.Item>
        <Menu.Item key="4">Option 4</Menu.Item>
      </SubMenu>
    )
  }
}

export default SubMenu

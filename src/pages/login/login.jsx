import React, { Component } from 'react'
import Cookies from 'js-cookie'
import md5 from 'md5'

import { Form, Input, Button } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import './login.styl'
import { loginPost } from '../../api/login'

class Login extends Component {

  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }

    this.handleUsernameChange = this.handleUsernameChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.submit = this.submit.bind(this)
    this.handleForgetPassword = this.handleForgetPassword.bind(this)
    this.handleRegister = this.handleRegister.bind(this)
  }

  handleUsernameChange(e) {
    const value = e.target.value
    this.setState({
      username: value.trim()
    })
  }

  handlePasswordChange(e) {
    const value = e.target.value
    this.setState({
      password: value
    })
  }

  submit() {
    const params = {
      userName: this.state.username,
      password: md5(this.state.password)
    }
    loginPost(params).then(res => {
      const token = res.data.token
      Cookies.set('token', token)
      this.props.history.push('/home')
    })
  }

  handleForgetPassword() {
    console.log('忘记密码')
  }

  handleRegister() {
    this.props.history.push('/signup')
  }

  render() {
    return (
      <div className="login">
        <div className="content">
          <Form
            name="normal_login"
            className="login-form"
            initialValues={ { remember: true } }
            onFinish={ this.submit }
          >
            <Form.Item
              name="username"
              rules={ [ { required: true, message: '请输入用户名！' } ] }
            >
              <Input
                id="username_inp"
                value={ this.state.username }
                prefix={ <UserOutlined className="site-form-item-icon" /> }
                placeholder="请输入用户名"
                autoComplete="off"
                onChange={ this.handleUsernameChange }
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={ [ { required: true, message: '请输入密码！' } ] }
            >
              <Input.Password
                id="password_inp"
                prefix={ <LockOutlined className="site-form-item-icon" /> }
                type="password"
                placeholder="请输入密码"
                autoComplete="off"
                value={ this.state.password }
                onChange={ this.handlePasswordChange }
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button submit-btn">
                登录
              </Button>
            </Form.Item>
            <Form.Item className="forget-register">
              <span className="login-form-forgot" onClick={ this.handleForgetPassword }>
                忘记密码？
              </span>
              <span onClick={ this.handleRegister }>注册</span>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}

export default Login

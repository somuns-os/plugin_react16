import React, { Component } from 'react'
import { connect } from 'react-redux'
import md5 from 'md5'

import SelfValidate from '@/components/SelfValidate/SelfValidate'
import { Form, Input, Button } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import './login.styl'
import { setUserInfo } from '@/store/action'

class Login extends Component {

  constructor(props) {
    super(props)
    this.state = {
      validateVal: '',
      isFirst: true
    }
    this.form = React.createRef()

    this.submit = this.submit.bind(this)
    this.handleForgetPassword = this.handleForgetPassword.bind(this)
    this.handleRegister = this.handleRegister.bind(this)
    this.handleValidateCode = this.handleValidateCode.bind(this)
  }

  componentDidMount() {
  }

  submit() {
    this.form.current.validateFields().then(values => {
      const params = {
        userName: values.username,
        password: md5(values.password)
      }
      this.props.setUserInfo(params).then(res => {
        this.props.history.push('/home')
      })
    })
  }

  handleValidateCode(val) {
    if (!this.state.isFirst) {
      this.setState({
        validateVal: val,
        isFirst: false
      }, () => {
        this.form.current.validateFields([ 'code' ])
      })
    } else {
      this.setState({
        validateVal: val,
        isFirst: false
      })
    }
  }

  handleForgetPassword() {
    this.props.history.push('/modPassword')
  }

  handleRegister() {
    this.props.history.push('/signup')
  }

  codeValidate = (rule, value) => {
    if (!value) {
      return Promise.resolve()
    } else if (value.toUpperCase() !== this.state.validateVal.toUpperCase()) {
      return Promise.reject('请输入不正确，请重新输入')
    } else {
      return Promise.resolve()
    }
  }

  render() {
    return (
      <div className="login">
        <div className="content">
          <Form
            ref={ this.form }
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
                prefix={ <UserOutlined className="site-form-item-icon" /> }
                placeholder="请输入用户名"
                autoComplete="off"
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
              />
            </Form.Item>
            <Form.Item
              name="code"
              rules={ [
                {
                  required: true,
                  message: '请输入验证码！'
                },
                { validator: this.codeValidate.bind(this) }
              ] }
            >
              <div className="code-box">
                <Input
                  className="code-val"
                  autoComplete="off"
                  placeholder="请输入验证码"
                />
                <SelfValidate width={ 120 } height={ 50 } change={ this.handleValidateCode }></SelfValidate>
              </div>
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

const mapStateToProps = (state) => ({
  userInfo: state.userInfo
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  setUserInfo: (params) => dispatch(setUserInfo(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)

import React, { Component } from 'react'

import { Form, Input, Button, message } from 'antd'

import { eMailReg, passwordReg } from '../../utils/reg'

import { sendEmail } from '@/api/modPw'
import { emailValidate } from '@/utils/validator'

import './ModifyPassword.styl'

class ModifyPassword extends Component {
  constructor() {
    super()
    this.handleSendEmail = this.handleSendEmail.bind(this)
    this.handleModifyPassword = this.handleModifyPassword.bind(this)
  }

  state = {
    btnText: '发送邮件',
    isCode: false,
    isModPw: false
  }
  form = null
  count = 5
  timer = undefined

  handleSendEmail(email) {
    const obj = emailValidate(email)
    if (!obj.pass) {
      return message.warning(obj.message)
    }
    if (this.timer || this.count !== 5) return
    this.timer = 1
    this.setState({
      sended: 'sended',
      btnText: `已发送(${this.count})`
    })
    return new Promise((resolve, reject) => {
      sendEmail({ email }).then(res => {
        message.success('邮件发送成功')
        this.setState({
          isModPw: true
        })
        resolve(res)
      })
        .finally(_ => {
          this.timer = setInterval(_ => {
            this.count--
            this.setState({
              sended: 'sended',
              btnText: `已发送(${this.count})`
            })
            if (this.count === 0) {
              this.setState({
                sended: '',
                btnText: '发送邮件'
              })
              clearInterval(this.timer)
              this.count = 5
              this.timer = undefined
            }
          }, 1000)
        })
    })
  }

  handleModifyPassword(value) {
    if (!this.state.isModPw) {
      this.handleSendEmail(value.email)
    }
  }

  render(h) {
    const layout = {
      labelCol: {
        span: 0
      },
      wrapperCol: {
        span: 24
      }
    }
    const tailLayout = {
      wrapperCol: {
        offset: 0,
        span: 24
      }
    }
    const checkedPassWord = _ => ({
      validator(rule, value) {
        console.log(value)
        if (!value) {
          return Promise.reject('密码不能为空')
        } else {
          const flag = passwordReg.test(value)
          if (!flag) {
            return Promise.reject('密码包含大小写字母、数字、特称字符，且长度为8~30')
          }
          return Promise.resolve()
        }
      }
    })
    return (
      <div className="modify-password">
        <div className="content">
          <Form
            { ...layout }
            className="form"
            onFinish={ this.handleModifyPassword }
          >
            <Form.Item
              className="item"
              name="email"
              rules={
                [
                  {
                    validator(_, value) {
                      if (!value) {
                        return Promise.reject(new Error('邮箱不能为空！'))
                      }
                      if (value && !eMailReg.test(value)) {
                        return Promise.reject(new Error('邮箱格式不正确！'))
                      }
                      return Promise.resolve()
                    }
                  }
                ]
              }
            >
              <Input
                className="email"
                placeholder="请输入邮箱地址"
              ></Input>
            </Form.Item>
            {
              this.state.isModPw ? (
                <>
                  <Form.Item
                    name="validateCode"
                  >
                    <Input
                      className="validateCode"
                      placeholder="请输入验证码"
                    ></Input>
                  </Form.Item>
                  <Form.Item
                    name="password"
                    rules={ [
                      checkedPassWord
                    ] }
                  >
                    <Input.Password
                      className="email"
                      placeholder="请输入密码"
                    ></Input.Password>
                  </Form.Item>

                  <Form.Item
                    name="conPassword"
                    rules={ [
                      {
                        required: true,
                        message: '请再次输入密码'
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('password') === value) {
                            return Promise.resolve()
                          }

                          return Promise.reject(new Error('The two passwords that you entered do not match!'))
                        }
                      })
                    ] }
                  >
                    <Input.Password
                      className="email"
                      placeholder="请再次输入密码"
                    ></Input.Password>
                  </Form.Item>
                </>
              ) : null
            }

            <Form.Item { ...tailLayout }>
              <Button type="primary" htmlType="submit" className={ [ 'send-email-btn', this.state.sended ].join(' ') } type="primary">
                { this.state.btnText }
              </Button>
            </Form.Item>

          </Form>
          { /* <div className="form">
            <div className="item">
              <Input
                className="email"
                placeholder="请输入邮箱地址"
                placeholder="请输入邮箱"
                value={ this.state.email }
                onChange={ this.handleInputChange }
              ></Input>
              <Button className={ [ 'send-email-btn', this.state.sended ].join(' ') } type="primary" onClick={ this.handleSendEmail }>{ this.state.btnText }</Button>
            </div>
            <div className="item">
              <Button>下一步</Button>
            </div>
          </div> */ }
        </div>
      </div>
    )
  }
}

export default ModifyPassword

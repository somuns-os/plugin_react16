import React, { Component } from 'react'
import {
  Form,
  Input,
  Tooltip,
  Button,
  Upload
} from 'antd'
import ImgCrop from 'antd-img-crop'
import md5 from 'md5'
import { QuestionCircleOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import './signup.styl'
import { registerPost } from '../../api/login'

class Signup extends Component {
  constructor(props) {
    super(props)
    this.form = React.createRef()
    this.handleRegister = this.handleRegister.bind(this)
    this.goLoginPage = this.goLoginPage.bind(this)
    this.handleUploadChange = this.handleUploadChange.bind(this)
  }

  state = {
    loading: false,
    imgUrl: '',
    avatarId: ''
  }

  handleRegister() {
    const form = this.form.current
    form.validateFields().then(values => {
      const password = values.password
      values.password = md5(password)
      values.confirm = md5(password)
      const params = {
        ...values,
        avatarId: this.state.avatarId + ''
      }
      registerPost(params).then(res => {
        console.log(res)
      })
    })
      .catch(err => {
        console.log(err, 'err')
      })
  }
  handleUploadChange(info) {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true })
      return
    }
    if (info.file.status === 'done') {
      this.setState({
        imgUrl: `/api/file/preview/${info.file.response.data}`,
        loading: false,
        avatarId: info.file.response.data
      })
    }
  }

  goLoginPage() {
    this.props.history.push('/login')
  }

  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 }
      }
    }
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 18,
          offset: 6
        }
      }
    }

    const checkedUserName = ({ getFieldValue }) => ({
      validator(rule, value) {
        if (!value) {
          return Promise.resolve()
        } else {
          const flag = /^[0-9a-zA-Z_]*$/g.test(value)
          const length = value.length
          if (!flag) {
            return Promise.reject('用户名仅支持英文、数字、下划线格式')
          }
          if (length < 3 || length > 10) {
            return Promise.reject('用户名长度在3~10之间')
          }
          return Promise.resolve()
        }
      }
    })
    const checkedPassWord = ({ getFieldValue }) => ({
      validator(rule, value) {
        if (!value) {
          return Promise.resolve()
        } else {
          const flag = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9])[^]{8,30}$/.test(value)
          if (!flag) {
            return Promise.reject('密码包含大小写字母、数字、特称字符，且长度为8~30')
          }
          return Promise.resolve()
        }
      }
    })

    const { loading, imgUrl } = this.state

    const uploadButton = (
      <div>
        { this.loading ? <LoadingOutlined /> : <PlusOutlined /> }
        <div style={ { marginTop: 8 } }>Upload</div>
      </div>
    )

    return (
      <div className="signup">
        { /* <input type="file" onChange={ this.upload.bind(this) } /> */ }
        <Form
          { ...formItemLayout }
          ref={ this.form }
          className="form-content"
          name="register"
          // onFinish={ this.onFinish }
          scrollToFirstError
        >
          <Form.Item name="avatarId" className="Item" label="头像">
            <div className="avatar-box">
              <ImgCrop
                rotate
                modalOk="确定"
                modalCancel="取消"
              >
                <Upload
                  name="file"
                  accept="image/*"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={ false }
                  action="/api/upload/avatar"
                  onChange={ this.handleUploadChange }
                >
                  { imgUrl ? <img src={ imgUrl } alt="avatar" style={ { width: '100%' } } /> : uploadButton }
                </Upload>
              </ImgCrop>
            </div>
          </Form.Item>
          <Form.Item
            name="email"
            label="邮箱"
            rules={ [
              {
                type: 'email',
                message: '邮件格式有误！'
              },
              {
                required: true,
                message: '邮箱不能为空！'
              }
            ] }
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="userName"
            label={
              <span>
                用户名&nbsp;
                <Tooltip title="用户名一旦注册，无法再次修改">
                  <QuestionCircleOutlined />
                </Tooltip>
              </span>
            }
            rules={ [
              {
                required: true,
                message: '用户名不能为空！'
              },
              checkedUserName
            ] }
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="nickName"
            label={
              <span>
            昵称&nbsp;
                <Tooltip title="你想别人如何称呼你？">
                  <QuestionCircleOutlined />
                </Tooltip>
              </span>
            }
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="密码"
            rules={ [
              {
                required: true,
                message: '请输入密码！'
              },
              checkedPassWord
            ] }
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="确认密码"
            dependencies={ [ 'password' ] }
            hasFeedback
            rules={ [
              {
                required: true,
                message: '请确认您的密码！'
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject('输入的两个密码不匹配！')
                }
              })
            ] }
          >
            <Input.Password />
          </Form.Item>

          <Form.Item { ...tailFormItemLayout } className="form-footer">
            <div className="opera">
              <Button type="primary" onClick={ this.handleRegister }>
                注册
              </Button>
              <span className="target-login">已有账号，去 <i className="login-text" onClick={ this.goLoginPage }>登陆</i></span>
            </div>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

export default Signup

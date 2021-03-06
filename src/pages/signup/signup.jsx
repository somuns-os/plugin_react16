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
            return Promise.reject('???????????????????????????????????????????????????')
          }
          if (length < 3 || length > 10) {
            return Promise.reject('??????????????????3~10??????')
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
            return Promise.reject('??????????????????????????????????????????????????????????????????8~30')
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
          <Form.Item name="avatarId" className="Item" label="??????">
            <div className="avatar-box">
              <ImgCrop
                rotate
                modalOk="??????"
                modalCancel="??????"
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
            label="??????"
            rules={ [
              {
                type: 'email',
                message: '?????????????????????'
              },
              {
                required: true,
                message: '?????????????????????'
              }
            ] }
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="userName"
            label={
              <span>
                ?????????&nbsp;
                <Tooltip title="??????????????????????????????????????????">
                  <QuestionCircleOutlined />
                </Tooltip>
              </span>
            }
            rules={ [
              {
                required: true,
                message: '????????????????????????'
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
            ??????&nbsp;
                <Tooltip title="??????????????????????????????">
                  <QuestionCircleOutlined />
                </Tooltip>
              </span>
            }
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="??????"
            rules={ [
              {
                required: true,
                message: '??????????????????'
              },
              checkedPassWord
            ] }
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="????????????"
            dependencies={ [ 'password' ] }
            hasFeedback
            rules={ [
              {
                required: true,
                message: '????????????????????????'
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject('?????????????????????????????????')
                }
              })
            ] }
          >
            <Input.Password />
          </Form.Item>

          <Form.Item { ...tailFormItemLayout } className="form-footer">
            <div className="opera">
              <Button type="primary" onClick={ this.handleRegister }>
                ??????
              </Button>
              <span className="target-login">?????????????????? <i className="login-text" onClick={ this.goLoginPage }>??????</i></span>
            </div>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

export default Signup

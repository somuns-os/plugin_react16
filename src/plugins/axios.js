import axios from 'axios'
import { notification } from 'antd'
import Cookies from 'js-cookie'

axios.defaults.withCredentials = true
// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 15e3 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    const token = Cookies.get('token')
    if (token && !config.url.includes('login')) {
      config.headers['Authorization'] = 'Bearer ' + token // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config
  },
  error => Promise.reject(error)
)

// response拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.status !== 200) {
      notification['error']({
        className: 'no-close-notify',
        message: '错误',
        description: res.message,
        duration: 3
      })
      return Promise.reject('error')
    } else {
      if (!res.success) {
        notification['error']({
          className: 'no-close-notify',
          message: '错误',
          description: res.message,
          duration: 3
        })
        return Promise.reject('error')
      }
    }
    return response.data
  },
  error => {
    notification['error']({
      className: 'no-close-notify',
      message: '错误',
      description: error.message,
      duration: 3
    })
    return Promise.reject(error)
  }
)

export function get(api, data) {
  return service({
    url: api,
    method: 'GET',
    params: data
  })
}

export function post(api, params, data) {
  return service({
    url: api,
    method: 'POST',
    params: params,
    data: data
  })
}

export function upload(api, params, data) {
  return service({
    url: api,
    method: 'POST',
    params: params,
    data: data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export function wait(t) {
  return new Promise(function(resolve) {
    setTimeout(function() {
      resolve()
    }, t)
  })
}

export default service

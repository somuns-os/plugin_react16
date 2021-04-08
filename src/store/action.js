import { loginPost } from '@/api/login'
import Cookies from 'js-cookie'

export const setUserInfo = (params) => (dispatch) => new Promise((resolve, reject) => {
  loginPost(params).then(res => {
    const token = res.data.token
    dispatch({ type: 'SET_USER_INFO', userInfo: res.data.userInfo })
    Cookies.set('token', token)
    resolve(res.data.userInfo)
  })
    .catch(err => {
      reject(err)
    })
})

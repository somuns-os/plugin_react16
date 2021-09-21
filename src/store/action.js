import { loginPost } from '@/api/login'
import {
  SET_USER_INFO,
  SET_TAB_MENUS,
  SET_CUR_MENU
} from './actionType'

import Cookies from 'js-cookie'

export const setUserInfo = (params) => (dispatch) => new Promise((resolve, reject) => {
  loginPost(params).then(res => {
    const token = res.data.token
    dispatch({ type: SET_USER_INFO, data: { userInfo: res.data.userInfo }})
    resolve(res.data.userInfo)
  })
    .catch(err => {
      reject(err)
    })
})

export const setTabMenus = (params) => (dispatch) => new Promise((resolve, reject) => {
  dispatch({ type: SET_TAB_MENUS, data: { tabMenus: params || [] }})
  resolve()
})

export const setCurMenu = (params) => (dispatch) => new Promise((resolve, reject) => {
  dispatch({ type: SET_CUR_MENU, data: { curMenu: params }})
  resolve()
})

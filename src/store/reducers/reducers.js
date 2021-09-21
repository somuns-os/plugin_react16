import { combineReducers } from 'redux'
import defaultState from '../state'
import {
  SET_USER_INFO,
  SET_TAB_MENUS,
  SET_CUR_MENU
} from '../actionType'

const reducer = (state = defaultState, action) => {
  switch (action.type) {
  case SET_USER_INFO:
    return { ...state, ...action.data }
  case SET_CUR_MENU:
    return { ...state, ...action.data }
  case SET_TAB_MENUS:
    return { ...state, ...action.data }
  default:
    return { ...state }
  }
}


export default combineReducers({
  reducer
})

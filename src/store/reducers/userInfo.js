import defaultState from '../state'
import { SET_USER_INFO } from '../actionType'

export const userReducerFn = (state = defaultState.userInfo, action) => {
  switch (action.type) {
  case SET_USER_INFO:
    return { ...defaultState, userInfo: action.userInfo }
  default:
    return { ...defaultState }
  }
}

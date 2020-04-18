import {
  LoginAPI
} from '../api'
import actionTypes from './actionTypes'

const startLogin = () => {
  return {
    type: actionTypes.START_LOGIN
  }
}

const loginSuccess = (userInfo) => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    payload: {
      userInfo
    }
  }
}

const loginFailed = () => {
  window.localStorage.removeItem('token')
  window.localStorage.removeItem('userInfo')
  window.sessionStorage.removeItem('token')
  window.sessionStorage.removeItem('userInfo')
  return {
    type: actionTypes.LOGIN_FAILED
  }
}

export const logout = () => {
  return dispatch => {
    // 告诉服务端退出, 暂不做
    dispatch(loginFailed())
  }
}

export const login = (userInfo) => {
  return dispatch => {
    dispatch(startLogin())
    LoginAPI.login(userInfo)
      .then(res => {
        if (res.status === 200) {
          const {
            token,
            ...userInfo
          } = res.data
          if(userInfo.remember === true) {
            window.localStorage.setItem('token', token)
            window.localStorage.setItem('userInfo', JSON.stringify(userInfo))
          } else {
            window.sessionStorage.setItem('token', res.data.token)
            window.sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
          }
          dispatch(loginSuccess({
            ...res.data
          }))
        } else {
          dispatch(loginFailed())
        }
      })
  }
}
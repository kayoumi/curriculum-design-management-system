import base from './base'
import axios from '../http/axios'

const Login = {
  // 用户登录
  login(params) {
    return new Promise((resolve, reject) => {
      axios.post(`${base.login}`, params).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err.data)
      })
    })
  },

  // 时间令牌
  timeToken() {
    return new Promise((resolve, reject) => {
      axios.get(`${base.timeToken}`).then((res) => {
        resolve(res.data)
      }).catch((error) => {
        reject(error.data)
      })
    })
  }
}

export default Login;
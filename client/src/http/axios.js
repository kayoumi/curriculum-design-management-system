import axios from 'axios'
// import qs from 'qs'
import { message } from 'antd'
message.config({
	top: 100,
	duration: 2,
	maxCount: 3
});

// axios.defaults.baseURL = 'http://127.0.0.1:7001/api'
axios.defaults.baseURL = 'http://rap2.taobao.org:38080/app/mock/250751/api'
axios.defaults.timeOut = 10000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
//允许axios请求携带cookies
axios.defaults.withCredentials = true;

// 请求拦截
axios.interceptors.request.use(
  config => {
    // if(config.method === 'post') {
    //   config.data = qs.stringify(config.data)
    // }
    if(sessionStorage.token) {
      config.headers.Authorization = sessionStorage.token || sessionStorage.admin
    }
    config.data = Object.assign({}, config.data, {
      authToken: 'grnughruightruaig'
    })
    return config
  }, 
  error => Promise.reject(error)
)

// 响应拦截
axios.interceptors.response.use(
  response => {
    if(response.status === 200) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  },
  error => {
    if(error.response.status) {
      switch (error.response.status) {
        case 403:
          message.error('登录过期，请重新登录')
          sessionStorage.removeItem('token')
          break
        case 404:
          message.error('资源不存在')
          break
        default:
          message.error('请求有误')
      }
    }
  }
)

export default axios
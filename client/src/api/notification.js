import base from './base'
import axios from '../http/axios'

const Notification = {
  // 获取消息列表
  getNotifications(params) {
    return new Promise((resolve, reject) => {
      axios.post(`${base.getNotifications}`, params).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err.data)
      })
    })
  }
}

export default Notification
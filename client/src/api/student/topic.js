import base from '../base'
import axios from '../../http/axios'

const StudentTopic = {
  // 获取课题列表
  getTopicList(params) {
    return new Promise((resolve, reject) => {
      axios.post(`${base.getTopicList}`, params).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err.data)
      })
    })
  },

  // 选择课题
  choiceTopic(params) {
    return new Promise((resolve, reject) => {
      axios.post(`${base.choiceTopic}`, params).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err.data)
      })
    })
  },

  // 搜索课题
  searchTopic(params) {
    return new Promise((resolve, reject) => {
      axios.post(`${base.searchTopic}`, params).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err.data)
      })
    })
  },
}

export default StudentTopic;
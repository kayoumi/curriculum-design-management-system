import base from '../base'
import axios from '../../http/axios'

const StudentGroup = {
  // 小组列表
  getGroupList(params) {
    return new Promise((resolve, reject) => {
      axios.post(`${base.getGroupList}`, params).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err.data)
      })
    })
  },

  // 加入小组
  joinGroup(params) {
    return new Promise((resolve, reject) => {
      axios.post(`${base.joinGroup}`, params).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err.data)
      })
    })
  },

  // 获取小组成员
  getGroupMember(params) {
    return new Promise((resolve, reject) => {
      axios.post(`${base.getGroupMember}`, params).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err.data)
      })
    })
  }
}

export default StudentGroup;
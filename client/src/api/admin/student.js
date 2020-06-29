import base from '../base'
import axios from '../../http/axios'

const Student = {
  // 获取学生列表
  getStudentList(params) {
    return new Promise((resolve, reject) => {
      axios.post(`${base.getStudentList}`, params).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err.data)
      })
    })
  },

  // 添加学生信息
  addStudentInfo(params) {
    return new Promise((resolve, reject) => {
      axios.post(`${base.addStudentInfo}`, params).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err.data)
      })
    })
  },

  // 更新学生信息
  updateStudentInfo(params) {
    return new Promise((resolve, reject) => {
      axios.post(`${base.updateStudentInfo}`, params).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err.data)
      })
    })
  },

  // 删除学生
  deleteStudentInfo(params) {
    return new Promise((resolve, reject) => {
      axios.post(`${base.deleteStudentInfo}`, params).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err.data)
      })
    })
  },

  // 搜索学生
  searchStudentByName(params) {
    return new Promise((resolve, reject) => {
      axios.post(`${base.searchStudentByName}`, params).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err.data)
      })
    })
  }
}

export default Student
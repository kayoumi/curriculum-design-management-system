import base from './base'
import axios from '../http/axios'

const Teacher = {
  // 获取教师列表
  getTeacherList(params) {
    return new Promise((resolve, reject) => {
      axios.post(`${base.getTeacherList}`, params).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err.data)
      })
    })
  },
  getTeacherInfoById(params) {
    return new Promise((resolve, reject) => {
      axios.post(`${base.getTeacherInfoById}`, params).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err.data)
      })
    })
  },
  // 添加教师信息
  addTeacher(params) {
    return new Promise((resolve, reject) => {
      axios.post(`${base.addTeacher}`, params).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err.data)
      })
    })
  },

  // 更新教师信息
  updateTeacherInfo(params) {
    return new Promise((resolve, reject) => {
      axios.post(`${base.updateTeacherInfo}`, params).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err.data)
      })
    })
  },

  // 删除教师
  deleteTeacherInfo(params) {
    return new Promise((resolve, reject) => {
      axios.post(`${base.deleteTeacherInfo}`, params).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err.data)
      })
    })
  },

  // 搜索教师
  searchTeacherByName(params) {
    return new Promise((resolve, reject) => {
      axios.post(`${base.searchTeacherByName}`, params).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err.data)
      })
    })
  },

  // 批量删除教师
  bulkDeleteTeacher(params) {
    return new Promise((resolve, reject) => {
      axios.post(`${base.bulkDeleteTeacher}`, params).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err.data)
      })
    })
  },

  // 批量添加教师
  bulkAddTeacher(params) {
    return new Promise((resolve, reject) => {
      axios.post(`${base.bulkAddTeacher}`, params).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err.data)
      })
    })
  }
}

export default Teacher
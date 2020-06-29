import base from '../base'
import axios from '../../http/axios'

const TeacherGroup = {
  // 小组列表
  getCourseListTeacher(params) {
    return new Promise((resolve, reject) => {
      axios.post(`${base.getCourseListTeacher}`, params).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err.data)
      })
    })
  },

  getGroupMemberById(params) {
    return new Promise((resolve, reject) => {
      axios.post(`${base.getGroupMemberById}`, params).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err.data)
      })
    })
  },

  getGroupListTree(params) {
    return new Promise((resolve, reject) => {
      axios.post(`${base.getGroupListTree}`, params).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err.data)
      })
    })
  },

  deleteGroup(params) {
    return new Promise((resolve, reject) => {
      axios.post(`${base.deleteGroup}`, params).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err.data)
      })
    })
  },

  deleteMember(params) {
    return new Promise((resolve, reject) => {
      axios.post(`${base.deleteMember}`, params).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err.data)
      })
    })
  },

  searchGroup(params) {
    return new Promise((resolve, reject) => {
      axios.post(`${base.searchGroup}`, params).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err.data)
      })
    })
  },

  searchMember(params) {
    return new Promise((resolve, reject) => {
      axios.post(`${base.searchMember}`, params).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err.data)
      })
    })
  },
}

export default TeacherGroup
import base from '../base'
import axios from '../../http/axios'

const Course = {
  // 获取课程列表
  getCourseList(params) {
    return new Promise((resolve, reject) => {
      axios.post(`${base.getCourseList}`, params).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err.data)
      })
    })
  },

  getCourseInfoById(params) {
    return new Promise((resolve, reject) => {
      axios.post(`${base.getCourseInfoById}`, params).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err.data)
      })
    })
  },
  // 课题名搜索
  searchCourseByName(params) {
    return new Promise((resolve, reject) => {
      axios.post(`${base.searchCourseByName}`, params).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err.data)
      })
    })
  },
  // 删除课程
  deleteCourseInfo(params) {
    return new Promise((resolve, reject) => {
      axios.post(`${base.deleteCourseInfo}`, params).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err.data)
      })
    })
  },
  // 添加课程
  addCourse(params) {
    return new Promise((resolve, reject) => {
      axios.post(`${base.addCourse}`, params).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err.data)
      })
    })
  },
}

export default Course
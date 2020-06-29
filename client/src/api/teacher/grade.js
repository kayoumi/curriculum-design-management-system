import base from '../base'
import axios from '../../http/axios'

const TeacherGrade = {
  // 小组列表
  getGradeListTree(params) {
    return new Promise((resolve, reject) => {
      axios.post(`${base.getGradeListTree}`, params).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err.data)
      })
    })
  },

  // 获取学生成果等信息
  getAchievementByStudentId(params) {
    return new Promise((resolve, reject) => {
      axios.post(`${base.getAchievementByStudentId}`, params).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err.data)
      })
    })
  },

  // 获取班级列表
  getClassList(params) {
    return new Promise((resolve, reject) => {
      axios.post(`${base.getClassList}`, params).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err.data)
      })
    })
  },

  // 通过班级id获取学生列表
  getStudentListByClassId(params) {
    return new Promise((resolve, reject) => {
      axios.post(`${base.getStudentListByClassId}`, params).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err.data)
      })
    })
  },
}

export default TeacherGrade
import base from '../base'
import axios from '../../http/axios'

const StudentGrade = {
  // 获取学生成绩
  getGradeData(params) {
    return new Promise((resolve, reject) => {
      axios.post(`${base.getGradeData}`, params).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err.data)
      })
    })
  },
}

export default StudentGrade
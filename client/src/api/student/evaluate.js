import base from '../base'
import axios from '../../http/axios'

const StudentEvaluate = {
  // 获取自我评价
  getEvaluateData(params) {
    return new Promise((resolve, reject) => {
      axios.post(`${base.getEvaluateData}`, params).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err.data)
      })
    })
  },

  // 编辑自我评价
  editEvaluate(params) {
    return new Promise((resolve, reject) => {
      axios.post(`${base.editEvaluate}`, params).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err.data)
      })
    })
  },
}

export default StudentEvaluate
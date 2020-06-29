import * as XLSX from 'xlsx';
import {
  message
} from 'antd';

const ExcelUtil = {
  importExcel(file) {
    const files = file
    const fileReader = new FileReader()
    let data = []
    fileReader.onload = event => {
      try {
        const {
          result
        } = event.target
        const workbook = XLSX.read(result, {
          type: 'binary'
        })
        for (const sheet in workbook.Sheets) {
          if (workbook.Sheets.hasOwnProperty(sheet)) {
            data = data.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]))
          }
        }
        message.success('文件解析成功！')
        data = JSON.parse(JSON.stringify(data).replace(/序号/g, "key"))
        console.log(data)
      } catch (e) {
        message.error('文件类型不正确！')
      }
    }
    fileReader.readAsBinaryString(files)
    return data
  },
  exportExcel(headers, data, fileName = '教师信息表.xlsx') {
    const _headers = headers
      .map((item, i) => Object.assign({}, {
        key: item.key,
        title: item.title,
        position: String.fromCharCode(65 + i) + 1
      }))
      .reduce((prev, next) => Object.assign({}, prev, {
        [next.position]: {
          key: next.key,
          v: next.title
        }
      }), {})

    const _data = data
      .map((item, i) => headers.map((key, j) => Object.assign({}, {
        content: item[key.key],
        position: String.fromCharCode(65 + j) + (i + 2)
      })))
      .reduce((prev, next) => prev.concat(next))
      .reduce((prev, next) => Object.assign({}, prev, {
        [next.position]: {
          v: next.content
        }
      }), {})

    const output = Object.assign({}, _headers, _data)
    const outputPos = Object.keys(output)
    const ref = `${outputPos[0]}:${outputPos[outputPos.length - 1]}`
    const wb = {
      SheetNames: ['mySheet'],
      Sheets: {
        mySheet: Object.assign({},
          output, {
            '!ref': ref,
            '!cols': [{
              wpx: 120
            }, {
              wpx: 100
            }, {
              wpx: 50
            }, {
              wpx: 50
            }, {
              wpx: 150
            }, {
              wpx: 150
            }, {
              wpx: 100
            }, {
              wpx: 100
            }]
          }
        )
      }
    }
    XLSX.writeFile(wb, fileName)
  }
}

export default ExcelUtil
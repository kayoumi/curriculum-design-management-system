import React, { Component } from 'react'
import { Upload, Button, Table, Card, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import * as XLSX from 'xlsx';
import { TeacherAPI } from '../../../api'
// import ExcelUtil from '../../util/excelUtil'

const titleDisplayMap = {
  key: '序号',
  id: '编号',
  name: '姓名',
  phone: '电话',
}

export default class BatchEntry extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      fileList: [],
      data: [],
      columns: [],
      isLoading: false,
    }
  }

  // 导入excel数据
  onImportExcel = file => {
    const files = file;
    const fileReader = new FileReader();
    fileReader.onload = event => {
      try {
        const { result } = event.target;
        const workbook = XLSX.read(result, { type: 'binary' });
        let data = [];
        for (const sheet in workbook.Sheets) {
          if (workbook.Sheets.hasOwnProperty(sheet)) {
            data = data.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
          }
        }
        message.success('文件解析成功！')
        data = JSON.parse(JSON.stringify(data).replace(/序号/g, "key"))
        data = JSON.parse(JSON.stringify(data).replace(/编号/g, "id"))
        data = JSON.parse(JSON.stringify(data).replace(/姓名/g, "name"))
        data = JSON.parse(JSON.stringify(data).replace(/电话/g, "phone"))

        const columnKeys = Object.keys(data[0])
        const columns = this.createColumns(columnKeys)
        
        this.setState({
          data,
          columns
        })

      } catch (e) {
        message.error('文件类型不正确！');
      }
    };
    fileReader.readAsBinaryString(files);
  }

  // 创建表头
  createColumns = (columnKeys) => {
    let columns = columnKeys.map(item => {
      return {
        title: titleDisplayMap[item],
        dataIndex: item,
        key: item,
      }
    })

    return columns
  }

  // 取消录入
  onCancel = () => {
    this.setState({
      fileList: [],
      data: [],
      columns: [],
    })
  }

  // 批量录入
  handleSubmit = () => {
    this.setState({
      isLoading: true
    })

    const params = this.state.data
    TeacherAPI.bulkAddTeacher(params)
      .then(res => {
        message.success(res.data.message)
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        this.setState({
          isLoading: false
        })
      })
  }

  render() {
    return (
      <div>
        <Upload
          onRemove={(file) => {
            this.setState(({ fileList }) => {
              const index = fileList.indexOf(file);
              const newFileList = fileList.slice();
              newFileList.splice(index, 1);
              return {
                fileList: newFileList,
              };
            });
            this.setState({
              data: []
            })
          }}
          beforeUpload={(file) => {
            this.onImportExcel(file)
            this.setState(({ fileList }) => ({
              fileList: [...fileList, file],
            }));
            return false;
          }}
          fileList={this.state.fileList}
        >
          <Button
            style={{ marginBottom: '0.625rem' }}
            disabled={this.state.fileList.length > 0}
          >
            <UploadOutlined />
            选择文件
          </Button>
        </Upload>
        <Card style={{ width: '100%', height: '100%' }}>
          <Table
            dataSource={this.state.data}
            columns={this.state.columns}
          />
          <div style={{ marginTop: '1rem' }}>
            <Button
              type="primary"
              htmlType='submit'
              onClick={this.handleSubmit}
              loading={this.state.isLoading}
            >
              录入数据
            </Button>
            <Button 
              style={{marginLeft: '1.25rem'}}
              onClick={this.onCancel}
            >
              取消录入
            </Button>
          </div>
        </Card>
      </div>
    )
  }
}

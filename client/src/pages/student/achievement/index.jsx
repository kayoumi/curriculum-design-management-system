import React, { Component } from 'react'
import { Card, Upload, message, Button, Table } from 'antd'
import { UploadOutlined, DownloadOutlined, DeleteOutlined } from '@ant-design/icons'
import moment from 'moment'

export default class Achievement extends Component {
  constructor() {
    super()
    this.state = {
      fileType: ['系统分析'], // 默认类型：系统分析
      fileList: [],

    }

    this.columns = [
      {
        title: '文件类型',
        dataIndex: 'fileType',
        key: 'fileType',
      },
      {
        title: '文件名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '上传时间',
        dataIndex: 'uploadDate',
        key: 'uploadDate',
      },
      {
        title: '文件大小',
        dataIndex: 'size',
        key: 'size',
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        render: (record) => (
          <span>
            <Button size='default' type='link'><DownloadOutlined />下载</Button>
            <Button size='default' type='link'><DeleteOutlined />删除</Button>
          </span>
        ),
      },
    ];

    this.files = {
      name: 'file',
      action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      headers: {
        authorization: 'authorization-text',
      }
    }
  }

  onChange = info => {
    if (info.file.status !== 'uploading') {
      const fileList = info.fileList.map((item, i) => {
        return {
          uploadDate: moment(item.lastModifiedDate).format('YYYY-MM-DD, HH:MM:SS A'),
          name: item.name,
          size: item.size,
          uid: item.uid,
          fileType: this.state.fileType[i],
        }
      })
      this.setState({
        fileList
      })
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }

  // 选择类型
  onButtonClick = (e,value) => {
    let fileType = this.state.fileType
    fileType.push(value)
    this.setState({
      fileType
    })
  }

  render() {
    return (
      <Card
        title='成果管理'
        bordered={false}
        style={{ height: '100%' }}
        extra={(
          <span>
            <Button onClick={e => this.onButtonClick(e, '系统分析')}>系统分析</Button>
            <Button onClick={e => this.onButtonClick(e, '系统实现')} style={{margin: '0 5px'}}>系统实现</Button>
            <Button onClick={e => this.onButtonClick(e, '系统测试')}>系统测试</Button>
            <Button onClick={e => this.onButtonClick(e, '源代码')} style={{margin: '0 5px'}}>源代码</Button>
            <Button onClick={e => this.onButtonClick(e, '小论文')}>小论文</Button>
          </span>
        )}
      >
        <Upload 
          {...this.files}
          onChange={this.onChange}
          showUploadList={false}
        >
          <Button>
            <UploadOutlined /> Click to Upload
          </Button>
        </Upload>
        <Table 
          dataSource={this.state.fileList} 
          columns={this.columns} 
          rowKey={record => record.uid}
          pagination={false}
        />
      </Card>
    )
  }
}

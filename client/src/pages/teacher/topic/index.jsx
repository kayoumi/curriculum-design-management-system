import React, { Component } from 'react'
import { Card, Table, Button, Input } from 'antd'
import { PlusOutlined, ExportOutlined } from '@ant-design/icons';
import AddForm from './addForm'
import ExcelUtil from '../../../util/excelUtil'
const { Search } = Input

const dataSource = [
  {
    key: '1',
    name: '课程设计管理系统',
    difficulty: '★★★★',
    description: '课程设计管理系统',
    number: 1,
  },
  {
    key: '2',
    name: '课程设计管理系统',
    difficulty: '★★★★★',
    description: '课程设计管理系统',
    number: 2,
  },
];

const columns = [
  {
    title: '项目名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '难度',
    dataIndex: 'difficulty',
    key: 'difficulty',
  },
  {
    title: '描述',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: '已选组数',
    dataIndex: 'number',
    key: 'number',
  },
  {
    title: '操作',
      key: 'action',
      render: (record) => (
        <Button size='default' type='link'>删除</Button>
      ),
  }
];

export default class Topic extends Component {

  constructor() {
    super()
    this.state = {
      addVisible: false
    }
  }

  // 显示添加界面
  showDrawer = () => {
    this.setState({
      addVisible: true,
    });
  };

  // 关闭添加界面
  onClose = () => {
    this.setState({
      addVisible: false,
    });
  };

  // 导出名单
  onExportExcel = () => {
    ExcelUtil.exportExcel(this.state.columns, this.state.dataSource, '教师名单.xlsx')
  }

  render() {
    return (
      <Card
        title='课题管理'
        bordered={false}
        style={{ height: '100%' }}
        extra={
          <span>
            <Search
              placeholder="搜素课题"
              // onSearch={value => this.onSearchGroup(value)}
              style={{ width: 400, marginRight: '20px' }}
              allowClear
            />
            <Button
              onClick={this.showDrawer}
            >
              <PlusOutlined />
              添加课题
            </Button>
            <Button onClick={this.onExportExcel}><ExportOutlined />导出excel</Button>
          </span>
        }
      >
        <Table dataSource={dataSource} columns={columns} />
        <AddForm
          onClose={this.onClose}
          visible={this.state.addVisible}
        />
      </Card>
    )
  }
}

import React, { Component } from 'react'
import { Layout, Tree, Table, Input, Button, Modal, Typography, message } from 'antd'
import { TeacherGroupAPI } from '../../../api'
import { DownOutlined } from '@ant-design/icons'

const { Header, Sider, Content } = Layout;
const { Search } = Input

export default class Group extends Component {

  constructor(props) {
    super(props)
    this.state = {
      columns: null,
      showClassId: '',
      dataSource: null,
      subDataSource: null,
      expandedRowKeys: [],
      isDataSourceLoading: false,
      isSubDataSourceLoading: false,
      treeData: [],
      isShowModal: false,
      deleteInfoName: null,
      deleteConfirmLoading: false,
      deleteInfoID: null,
      deleteType: null,
    }
  }

  componentDidMount() {
    this.getGroupListTree()
  }

  // 创建表头
  createColumns = () => {
    const columns = [
      { title: 'ID', dataIndex: 'id', key: 'id' },
      { title: '组名', dataIndex: 'name', key: 'name' },
      { title: '组长', dataIndex: 'leader', key: 'leader' },
      { title: '小组人数', dataIndex: 'number', key: 'number' },
      {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        render: (text, record) => (
          <span>
            <Button type='primary' disabled={record.number >= 5 ? true : false} style={{ marginRight: '5px' }} onClick={this.showAddMemberModel.bind(this, record)}>添加组员</Button>
            <Button type='danger' onClick={this.showDeleteModal.bind(this, record)}>删除小组</Button>
          </span>
        ),
      },
    ];
    return columns
  }

  // 展开表
  expandedRowRender = () => {
    const columns = [
      { title: '学号', dataIndex: 'id', key: 'id' },
      { title: '姓名', dataIndex: 'name', key: 'name' },
      { title: '班级', dataIndex: 'class', key: 'class' },
      {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        render: (text, record) => (
          <span className="table-operation">
            <Button type='danger' onClick={this.showDeleteModal.bind(this, record)}>删除组员</Button>
          </span>
        ),
      },
    ];
    return (
      <Table
        columns={columns}
        dataSource={this.state.subDataSource}
        pagination={false}
        showHeader={false}
        rowKey={record => record.id}
        loading={this.state.isSubDataSourceLoading}
        size="small"
      />
    )
  };

  // 获取小组树数据
  getGroupListTree = () => {
    TeacherGroupAPI.getGroupListTree()
      .then(res => {
        const treeData = this.setTreeNodes(res.data.class)
        const columns = this.createColumns()
        this.setData({
          showClassId: res.data.class[0],
          treeData: treeData,
          columns,
        }, () => {
          this.getGroupData(this.state.showClassId)

        })
      })
  }

  // 设置树数据
  setTreeNodes = data => {
    data.map((item) => {
      if (item.children) {
        this.setTreeNodes(item.children)
      }
      item.title = item.name
      item.key = item.id
      return item
    })
    return data
  }

  // 获取班级小组数据
  getGroupData = (classId) => {
    this.setData({
      isDataSourceLoading: true
    })
    TeacherGroupAPI.getCourseListTeacher({ classId })
      .then(res => {
        this.setData({
          dataSource: res.data.group
        })
      })
      .finally(() => {
        this.setData({
          isDataSourceLoading: false
        })
      })
  }

  // 小组信息
  getGroupById = (groupId) => {
    const params = {
      id: groupId
    }
    TeacherGroupAPI.getGroupMemberById(params)
      .then(res => {
        const group = [
          { ...res.data.group }
        ]
        this.setData({
          dataSource: group,
          subDataSource: group.member,
        })
      })
  }

  onSelect = (selectedKeys, info) => {
    if (info.node.children) {
      this.getGroupData(selectedKeys)
    } else {
      this.getGroupById(selectedKeys)
    }
  };

  onExpand = (expanded, record) => {
    this.setData({
      isSubDataSourceLoading: true
    })
    const params = {
      id: record.id
    }
    TeacherGroupAPI.getGroupMemberById(params)
      .then(res => {
        this.setData({
          subDataSource: res.data.group.member
        })
      })
      .finally(() => {
        this.setData({
          isSubDataSourceLoading: false
        })
      })
  }

  onExpandedRowsChange = (expandedRows) => {
    this.setData({
      subDataSource: []
    })
    if (expandedRows.length > 1) {
      expandedRows.shift()
    }
    this.setData({
      expandedRowKeys: expandedRows
    })
  }

  // 显示删除弹窗
  showDeleteModal = (record) => {
    this.setData({
      deleteType: record.member ? 1 : 2,
      isShowModal: true,
      deleteInfoName: record.name,
      deleteInfoID: record.id,
    })
  }

  // 隐藏删除弹窗
  hideDeleteModal = () => {
    this.setData({
      isShowModal: false,
      deleteInfoName: null,
      deleteConfirmLoading: false
    })
  }

  // 删除
  deleteGroup = () => {
    this.setData({
      deleteConfirmLoading: true,
      isShowModal: false
    })
    const params = {
      id: this.state.deleteInfoID
    }

    if (this.state.deleteType === 1) {
      TeacherGroupAPI.deleteGroup(params)
        .then(res => {
          message.success(res.data.message)
        })
        .finally(() => {
          this.setData({
            deleteConfirmLoading: false
          })
          this.getGroupData(this.state.showClassId)
        })
    } else {
      TeacherGroupAPI.deleteMember(params)
        .then(res => {
          message.success(res.data.message)
        })
        .finally(() => {
          this.setData({
            deleteConfirmLoading: false
          })
          this.getGroupData(this.state.showClassId)
        })
    }
  }

  // 显示添加模块
  showAddMemberModel = (record) => {
    console.log(record);
  }

  // 搜素小组
  onSearchGroup = (value) => {
    console.log(value);
    const params = {
      name: value
    }
    TeacherGroupAPI.searchGroup(params)
      .then(res => {
        this.setData({
          dataSource: res.data.group
        })
      })
      .finally(() => {
        this.setData({
          isDataSourceLoading: false
        })
      })
  }

  // 搜索组员
  onSearchMember = (value) => {
    const params = {
      name: value
    }
    TeacherGroupAPI.searchMember(params)
      .then(res => {
        const group = [
          { ...res.data.group }
        ]
        this.setData({
          dataSource: group,
          subDataSource: group.member,
        })
      })
  }

  // 如果请求完成之后组件已经销毁，就不再setState
  setData = (state) => {
    if (!this.updater.isMounted(this)) return
    this.setState(state)
  }

  render() {
    return (
      <Layout style={{ height: '100%' }}>
        <Sider
          style={{ height: '100%', backgroundColor: '#fff' }}
        >
          <Tree
            style={{ height: '100%' }}
            onSelect={this.onSelect}
            treeData={this.state.treeData}
            showLine={true}
            switcherIcon={<DownOutlined />}
          />
        </Sider>
        <Content
          style={{ height: '100%', backgroundColor: '#fff' }}
        >
          <Header style={{ background: '#fff', textAlign: 'center' }}>
            <Search
              placeholder="搜素小组"
              onSearch={value => this.onSearchGroup(value)}
              style={{ width: 400, marginRight: '20px' }}
              allowClear
            />
            <Search
              placeholder="搜素组员"
              onSearch={value => this.onSearchMember(value)}
              style={{ width: 400, marginRight: '20px' }}
              allowClear
            />
            <Button type='primary'>添加小组</Button>
          </Header>
          <Table
            className="components-table-demo-nested"
            columns={this.state.columns}
            expandedRowRender={this.expandedRowRender}
            onExpand={this.onExpand}
            dataSource={this.state.dataSource}
            pagination={false}
            rowKey={record => record.id}
            expandedRowKeys={this.state.expandedRowKeys}
            onExpandedRowsChange={this.onExpandedRowsChange}
            loading={this.state.isDataSourceLoading}
          />
          <Modal
            title='此操作不可逆，请谨慎！！！'
            visible={this.state.isShowModal}
            onCancel={this.hideDeleteModal}
            okText='残忍删除'
            cancelText='点错了'
            confirmLoading={this.state.deleteConfirmLoading}
            onOk={this.deleteGroup}
          >
            <Typography>
              确定要删除<span style={{ color: '#f00' }}>{this.state.deleteInfoName}</span>吗？
          </Typography>
          </Modal>
        </Content>
      </Layout>
    )
  }
}

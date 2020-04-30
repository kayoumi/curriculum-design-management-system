import React, { Component } from 'react'
import {
  Card,
  Button,
  Table,
  Modal,
  Typography,
  Input,
  message
} from 'antd';
import moment from 'moment'
import { PlusOutlined, DeleteOutlined, ExportOutlined } from '@ant-design/icons';
import AddForm from './addForm'
import { TeacherAPI } from '../../../api'
import ExcelUtil from '../../../util/excelUtil'
const { Search } = Input

const titleDisplayMap = {
  id: 'ID',
  name: '姓名',
  password: '密码',
  phone: '电话',
  createdAt: '添加时间',
  updatedAt: '上次修改时间'
}

export default class Index extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedRowKeys: [],
      addVisible: false,
      dataSource: [],
      total: 0,
      columns: [],
      loading: false,
      offset: 0,
      limited: 10,
      deleteTeacherInfoID: null,
      deleteTeacherInfoName: null,
      isShowTeacherModal: false,
      deleteTeacherConfirmLoading: false,
      bulkDeleteButton: true,
      bulkDeleteLoading: false,
    }
  }

  componentDidMount() {
    this.getTableData()
  }

  // 获取教师列表
  getTableData = () => {
    this.setState({
      loading: true
    })
    const params = {
      offset: this.state.offset,
      limited: this.state.limited
    }
    TeacherAPI.getTeacherList(params)
      .then(res => {
        const columnKeys = Object.keys(res.data.list[0])
        const columns = this.createColumns(columnKeys)
        let dataSource = res.data.list
        dataSource = dataSource.map((item, index) => {
          return {
            ...item,
            key: index
          }
        })
        this.setState({
          total: res.data.total,
          columns,
          dataSource,
        })
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        this.setState({
          loading: false
        })
      })
  }

  // 设置表头
  createColumns = columnKeys => {
    let columns = columnKeys.map(item => {
      if (item === 'createdAt') {
        return {
          title: titleDisplayMap[item],
          dataIndex: item,
          key: item,
          render: (text, record) => {
            const { createdAt } = record
            return moment(createdAt).format('YYYY/MM/DD HH:mm:ss')
          }
        }
      } else if(item === 'updatedAt') {
        return {
          title: titleDisplayMap[item],
          dataIndex: item,
          key: item,
          render: (text, record) => {
            const { updatedAt } = record
            return moment(updatedAt).format('YYYY/MM/DD HH:mm:ss')
          }
        }
      }
      return {
        title: titleDisplayMap[item],
        dataIndex: item,
        key: item,
      }
    })
    columns.push({
      title: '操作',
      key: 'action',
      render: (record) => (
        <span>
          <Button size='default' type='primary' onClick={this.toEdit.bind(this, record)}>详情</Button>
          <Button size='default' type='danger' onClick={this.showDeleteModal.bind(this, record)}>删除</Button>
        </span>
      ),
    })
    return columns
  }

  // 跳转到教师修改页面
  toEdit = (record) => {
    this.props.history.push({
      pathname: `/back/admin/teacher/edit/${record.id}`,
      state: {
        name: record.name
      }
    })
  }

  // 选择改变
  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
    if(selectedRowKeys.length > 1) {
      this.setState({ bulkDeleteButton: false })
    } else {
      this.setState({ bulkDeleteButton: true })
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

  // 分页
  onPageChange = (page, pageSize) => {
    this.setState({
      limited: pageSize,
      offset: pageSize * (page - 1),
    }, () => {
      this.getTableData()
    })
  }

  // 每页显示数据量
  onShowSizeChange = (current, size) => {
    this.setState({
      offset: 0,
      limited: size
    }, () => {
      this.getTableData()
    })
  }

  // 显示删除弹窗
  showDeleteModal = (record) => {
    this.setState({
      isShowTeacherModal: true,
      deleteTeacherInfoName: record.name,
      deleteTeacherInfoID: record.id,
    })
  }

  // 隐藏删除弹窗
  hideDeleteModal = () => {
    this.setState({
      isShowTeacherModal: false,
      deleteTeacherInfoName: null,
      deleteTeacherConfirmLoading: false
    })
  }

  // 删除教师信息
  deleteTeacherInfo = () => {
    this.setState({
      deleteTeacherConfirmLoading: true,
    })
    TeacherAPI.deleteTeacherInfo({ id: this.state.deleteTeacherInfoID })
      .then(res => {
        message.success(res.data.message)
        this.setState({
          offset: 0
        }, () => {
          this.getTableData()
        })
      })
      .finally(() => {
        this.setState({
          deleteTeacherConfirmLoading: false,
          isShowTeacherModal: false
        })
      })
  }

  // 批量删除
  bulkDelete = () => {
    this.setState({
      bulkDeleteLoading: true
    })
    let idList = []
    this.state.selectedRowKeys.map((item) => {
      return idList.push({id: this.state.dataSource[item].id})
    })
    TeacherAPI.bulkDeleteTeacher(idList)
      .then(res => {
        message.success(res.data.message)
        this.setState({
          offset: 0
        }, () => {
          this.getTableData()
        })
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        this.setState({
          offset: 0,
          bulkDeleteLoading: false
        }, () => {
          this.getTableData()
        })
      })
  }

  // 搜索
  onSearchTeacher = (value) => {
    this.setState({
      loading: true
    })
    const params = {
      offset: this.state.offset,
      limited: this.state.limited,
      name: value
    }
    TeacherAPI.searchTeacherByName(params)
      .then(res => {
        const columnKeys = Object.keys(res.data.teachers[0])
        const columns = this.createColumns(columnKeys)
        let dataSource = res.data.teachers
        dataSource = dataSource.map((item, index) => {
          return {
            ...item,
            key: index
          }
        })
        this.setState({
          total: res.data.total,
          columns,
          dataSource,
        })
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        this.setState({
          loading: false
        })
      })
  }

  render() {
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      hideDefaultSelections: true,
      selections: [
        Table.SELECTION_ALL,
        Table.SELECTION_INVERT,
        {
          key: 'odd',
          text: '选择奇数列',
          onSelect: changableRowKeys => {
            let newSelectedRowKeys = [];
            newSelectedRowKeys = changableRowKeys.filter((key, index) => {
              if (index % 2 !== 0) {
                return false;
              }
              return true;
            });
            this.setState({ selectedRowKeys: newSelectedRowKeys });
          },
        },
        {
          key: 'even',
          text: '选择偶数列',
          onSelect: changableRowKeys => {
            let newSelectedRowKeys = [];
            newSelectedRowKeys = changableRowKeys.filter((key, index) => {
              if (index % 2 !== 0) {
                return true;
              }
              return false;
            });
            this.setState({ selectedRowKeys: newSelectedRowKeys });
          },
        },
      ],
    };

    return (
      <Card
        style={{ height: '90%' }}
        title="教师列表"
        extra={
          <span>
            <Search
              placeholder="搜素课程"
              onSearch={value => this.onSearchTeacher(value)}
              style={{ width: 400, marginRight: '20px' }}
            />
            <Button
              onClick={this.showDrawer}
            >
              <PlusOutlined />
              添加教师
            </Button>
            <Button onClick={this.onExportExcel}><ExportOutlined />导出excel</Button>
            <Button onClick={this.bulkDelete} disabled={this.state.bulkDeleteButton}><DeleteOutlined />批量删除</Button>
          </span>
        }
        bordered={false}
      >
        <Table
          size="middle"
          loading={this.state.loading}
          rowSelection={rowSelection}
          columns={this.state.columns}
          dataSource={this.state.dataSource}
          pagination={{
            current: this.state.offset / this.state.limited + 1,
            total: this.state.total,
            hideOnSinglePage: true,
            showQuickJumper: true,
            showSizeChanger: true,
            onShowSizeChange: this.onShowSizeChange,
            onChange: this.onPageChange,
          }}
        />;

        <Modal
          title='此操作不可逆，请谨慎！！！'
          visible={this.state.isShowTeacherModal}
          onCancel={this.hideDeleteModal}
          okText='残忍删除'
          cancelText='点错了'
          confirmLoading={this.state.deleteTeacherConfirmLoading}
          onOk={this.deleteTeacherInfo}
        >
          <Typography>
            确定要删除<span style={{ color: '#f00' }}>{this.state.deleteTeacherInfoName}</span>吗？
          </Typography>
        </Modal>

        <AddForm
          onClose={this.onClose}
          visible={this.state.addVisible}
        />
      </Card>
    )
  }
}

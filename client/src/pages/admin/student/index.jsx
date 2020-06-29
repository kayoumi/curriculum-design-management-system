import React, { Component } from 'react'
import {
  Card,
  Button,
  Table,
  Modal,
  Typography,
  message,
  Input,
} from 'antd';
import moment from 'moment'
import { PlusOutlined } from '@ant-design/icons';
import AddForm from './addForm'
import { StudentAPI } from '../../../api'
import ExcelUtil from '../../../util/excelUtil'

const { Search } = Input

const titleDisplayMap = {
  id: 'ID',
  name: '姓名',
  sex: '性别',
  nation: '民族',
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
      deleteStudentInfoID: null,
      deleteStudentInfoName: null,
      isShowStudentModal: false,
      deleteStudentConfirmLoading: false,
    }
  }

  componentDidMount() {
    this.getTableData()
  }

  // 获取学生列表
  getTableData = () => {
    this.setState({
      loading: true
    })
    const params = {
      offset: this.state.offset,
      limited: this.state.limited
    }
    StudentAPI.getStudentList(params)
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
        this.setData({
          total: res.data.total,
          columns,
          dataSource,
        })
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        this.setData({
          loading: false
        })
      })
  }

  // 如果请求完成之后组件已经销毁，就不再setState
  setData = (state) => {
    if (!this.updater.isMounted(this)) return
    this.setState(state)
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
            return moment(createdAt).format('YYYY年MM月DD日 HH:mm:ss')
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
          <Button size='default' type='link' onClick={this.toEdit.bind(this, record)}>修改</Button>
          <Button size='default' type='link' onClick={this.showDeleteModal.bind(this, record)}>删除</Button>
        </span>
      ),
    })
    return columns
  }

  // 跳转到学生修改页面
  toEdit = (record) => {
    this.props.history.push({
      pathname: `/admin/student/edit/${record.id}`,
      state: {
        name: record.name
      }
    })
  }

  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
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
    console.log({ page, pageSize });
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
      isShowStudentModal: true,
      deleteStudentInfoName: record.name,
      deleteStudentInfoID: record.id,
    })
  }

  // 隐藏删除弹窗
  hideDeleteModal = () => {
    this.setState({
      isShowStudentModal: false,
      deleteStudentInfoName: null,
      deleteStudentConfirmLoading: false
    })
  }

  // 删除学生信息
  deleteStudentInfo = () => {
    this.setState({
      deleteStudentConfirmLoading: true,
    })
    StudentAPI.deleteStudentInfo({ id: this.state.deleteStudentInfoID })
      .then(res => {
        message.success(res.message)
        this.setState({
          offset: 0
        }, () => {
          this.getTableData()
        })
      })
      .finally(() => {
        this.setState({
          deleteStudentConfirmLoading: false,
          isShowStudentModal: false
        })
      })
  }

  // 搜索
  onSearchStudent = (value) => {
    this.setState({
      loading: true
    })
    const params = {
      offset: this.state.offset,
      limited: this.state.limited,
      name: value
    }
    StudentAPI.searchStudentByName(params)
      .then(res => {
        const columnKeys = Object.keys(res.data.students[0])
        const columns = this.createColumns(columnKeys)
        let dataSource = res.data.students
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
          text: 'Select Odd Row',
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
          text: 'Select Even Row',
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
        title="学生列表"
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
              添加学生
            </Button>
            <Button onClick={this.onExportExcel}>导出excel</Button>
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
          visible={this.state.isShowStudentModal}
          onCancel={this.hideDeleteModal}
          okText='残忍删除'
          cancelText='点错了'
          confirmLoading={this.state.deleteStudentConfirmLoading}
          onOk={this.deleteStudentInfo}
        >
          <Typography>
            确定要删除<span style={{ color: '#f00' }}>{this.state.deleteStudentInfoName}</span>吗？
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

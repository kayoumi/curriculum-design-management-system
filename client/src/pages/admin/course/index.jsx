import React, { Component } from 'react'
import {
  Card,
  Button,
  Input,
  Table,
  Modal,
  Typography,
  message,
  Form,
  Select,
} from 'antd'
import moment from 'moment'
import { CourseAPI, TeacherAPI } from '../../../api'
const { Search } = Input
const { Option } = Select

const titleDisplayMap = {
  id: 'ID',
  name: '课程名',
  course: '教师',
  createdAt: '创建时间',
  updatedAt: '修改时间',
}

export default class Index extends Component {
  constructor(props) {
    super(props)
    this.addFormRef = React.createRef()
    this.updateFormRef = React.createRef()
    this.state = {
      loading: false,
      offset: 0,
      limited: 10,
      dataSource: [],
      total: 0,
      columns: [],
      teacherList: [],
      addCourseModalLoading: false,
      deleteCourseInfoID: null,
      deleteCourseInfoName: null,
      isShowDeleteCourseModal: false,
      deleteCourseConfirmLoading: false,
      isShowAddCourseModal: false,
      isShowUpdateCourseModal: false,
      updateCourseModalLoading: false,
      updateCourseName: null,
      updateCourseTeacher: null,

    }
  }

  componentDidMount() {
    this.getTableData()
  }

  // 获取课程列表
  getTableData = () => {
    this.setState({
      loading: true
    })
    const params = {
      offset: this.state.offset,
      limited: this.state.limited
    }
    CourseAPI.getCourseList(params)
      .then(res => {
        const columnKeys = Object.keys(res.data.courses[0])
        const columns = this.createColumns(columnKeys)
        let dataSource = res.data.courses
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

  // 创建表头
  createColumns = (columnKeys) => {
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
      } else if (item === 'updatedAt') {
        return {
          title: titleDisplayMap[item],
          dataIndex: item,
          key: item,
          render: (text, record) => {
            const { updatedAt } = record
            return moment(updatedAt).format('YYYY年MM月DD日 HH:mm:ss')
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
          <Button size='default' type='link' onClick={this.showUpdateCourseModal.bind(this, record)}>修改</Button>
          <Button size='default' type='link' onClick={this.showDeleteModal.bind(this, record)}>删除</Button>
        </span>
      ),
    })
    return columns
  }

  // 显示修改模块
  showUpdateCourseModal = record => {
    this.setState({
      isShowUpdateCourseModal: true,
      updateCourseName: record.name,
      updateCourseTeacher: record.teacher,
    })
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

  // 搜索课程
  onSearchCourse = (value) => {
    this.setState({
      loading: true
    })
    const params = {
      offset: this.state.offset,
      limited: this.state.limited,
      name: value
    }
    CourseAPI.searchCourseByName(params)
      .then(res => {
        const columnKeys = Object.keys(res.data.courses[0])
        const columns = this.createColumns(columnKeys)
        let dataSource = res.data.courses
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

  // 显示删除弹窗
  showDeleteModal = (record) => {
    this.setState({
      isShowDeleteCourseModal: true,
      deleteCourseInfoName: record.name,
      deleteCourseInfoID: record.id,
    })
  }

  // 隐藏删除弹窗
  hideDeleteModal = () => {
    this.setState({
      isShowDeleteCourseModal: false,
      deleteCourseInfoName: null,
      deleteCourseConfirmLoading: false
    })
  }

  // 删除课程信息
  deleteCourseInfo = () => {
    this.setState({
      deleteCourseConfirmLoading: true,
    })
    CourseAPI.deleteCourseInfo({ id: this.state.deleteCourseInfoID })
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
          deleteCourseConfirmLoading: false,
          isShowDeleteCourseModal: false
        })
      })
  }

  // 添加课程
  showAddModal = () => {
    this.setState({
      isShowAddCourseModal: true
    })
    this.getTeacherList()
  }

  // 获取教师列表
  getTeacherList = () => {
    
    TeacherAPI.getTeacherList()
      .then(res => {
        let teacherList = res.data.list
        teacherList = teacherList.map(item => {
          return {
            name: item.name
          }
        })
        this.setState({
          teacherList
        })
      })
  }

  // 提交添加模块表单
  handleAddModelSubmit = () => {
    this.setState({
      addCourseModalLoading: true
    })
    this.addFormRef.current.validateFields()
      .then(values => {
        const params = {
          ...values,
          createdAt: new Date().getTime()
        }
        CourseAPI.addCourse(params)
          .then(res => {
            message.success(res.data.message)
          }) 
      }) 
      .finally(() => {
        this.setState({
          isShowAddCourseModal: false,
          addCourseModalLoading: false
        })
      })
  }

  // 关闭添加模块
  cannelAddCourse = () => {
    this.setState({
      isShowAddCourseModal: false
    })
  }

  // 关闭修改模块
  cannelUpdateCourse = () => {
    this.setState({
      isShowUpdateCourseModal: false
    })
  }
  
  render() {
    return (
      <Card title="课程管理"
        extra={
          <span>
            <Search
              placeholder="搜素课程"
              onSearch={value => this.onSearchCourse(value)}
              style={{ width: 400, marginRight: '20px' }}
            />
            <Button onClick={this.showAddModal}>添加课程</Button>
          </span>
        }
        bordered={false}
        style={{ width: '100%' }}
      >

        <Table
          size="middle"
          loading={this.state.loading}
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
        />

        <Modal
          title='此操作不可逆，请谨慎！！！'
          visible={this.state.isShowDeleteCourseModal}
          onCancel={this.hideDeleteModal}
          okText='残忍删除'
          cancelText='点错了'
          confirmLoading={this.state.deleteCourseConfirmLoading}
          onOk={this.deleteCourseInfo}
        >
          <Typography>
            确定要删除<span style={{ color: '#f00' }}>{this.state.deleteCourseInfoName}</span>吗？
          </Typography>
        </Modal>

        <Modal
          title="添加课程"
          visible={this.state.isShowAddCourseModal}
          footer={null}
          getContainer={true}
        >
          <Form
            name="addCourse"
            scrollToFirstError
            ref={this.addFormRef}
          >
            <Form.Item
              name="name"
              label="课程名"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input 
                disabled={this.state.addCourseModalLoading}
              />
            </Form.Item>
            <Form.Item
              name="teacher"
              label="教师"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select>
                {
                  this.state.teacherList.map((item, index) => {
                    return <Option value={item.name} key={index}>{item.name}</Option>
                  })
                }
              </Select>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={this.state.addCourseModalLoading}
                onClick={this.handleAddModelSubmit}
              >
                添加
              </Button>
              <Button
                type="primary"
                onClick={this.cannelAddCourse}
                style={{float: 'right'}}
              >
                取消
              </Button>
            </Form.Item>
          </Form>
        </Modal>
              
        <Modal
          title="修改课程"
          visible={this.state.isShowUpdateCourseModal}
          footer={null}
          getContainer={true}
        >
          <Form
            name="addCourse"
            scrollToFirstError
            ref={this.updateFormRef}
          >
            <Form.Item
              name="name"
              label="课程名"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input 
                disabled={this.state.updateCourseModalLoading}
              />
            </Form.Item>
            <Form.Item
              name="teacher"
              label="教师"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
              >
                {
                  this.state.teacherList.map((item, index) => {
                    return <Option value={item.name} key={index}>{item.name}</Option>
                  })
                }
              </Select>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={this.state.updateCourseModalLoading}
                onClick={this.handleSubmit}
              >
                修改
              </Button>
              <Button
                type="primary"
                onClick={this.cannelUpdateCourse}
                style={{float: 'right'}}
              >
                取消
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </Card>
    )
  }
}

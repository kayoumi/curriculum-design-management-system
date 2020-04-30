import React, { Component } from 'react'
import {
  Card,
  Button,
  Form,
  Input,
  message,
  Select,
  DatePicker
} from 'antd'
import moment from 'moment';
import { TeacherAPI } from '../../../api'
const { Option } = Select

class Edit extends Component {
  constructor(props) {
    super(props)
    this.formRef = React.createRef();
    this.state = {
      managementCourse: [],
      allClass: [],
    }
  }

  componentDidMount() {
    this.getData()
  }

  // 获取数据
  getData = () => {
    TeacherAPI.getTeacherInfoById({ id: this.props.match.params.id })
      .then(res => {
        res.data.teacher.created_at = moment(res.data.teacher.created_at)
        const { teacher } = res.data
        this.formRef.current.setFieldsValue(teacher)
        this.setState({
          managementCourse: res.data.course,
          allClass: res.data.class,
        })
      })
  }

  // 返回教师管理主页
  backIndex = () => {
    this.props.history.push('/back/admin/teacher')
  }

  // 提交
  handleSubmit = () => {
    this.formRef.current.validateFields()
      .then(values => {
        values.created_at = moment(values.created_at).valueOf()
        values.updated_at = Date.parse(new Date())
        console.log(values);
        TeacherAPI.updateTeacherInfo(values)
          .then(res => {
            message.success(res.data.message)
          })
      })
  }

  render() {
    return (
      <Card
        title="教师信息编辑"
        extra={(
          <span>
            <Button style={{ marginRight: '1.25rem' }}>上一个</Button>
            <Button>下一个</Button>
          </span>
        )}
        bordered={false}
      >
        <Form
          name="register"
          scrollToFirstError
          ref={this.formRef}
          onSubmit={this.handleSubmit}
        >
          <Form.Item
            name="id"
            label="ID"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              disabled
            />
          </Form.Item>
          <Form.Item
            name="name"
            label="姓名"
            rules={[
              {
                required: true,
                message: '请输入姓名!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="密码"
            rules={[
              {
                required: true,
                message: '请输入密码!',
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="phone"
            label="电话"
            rules={[
              {
                required: true,
                message: '请输入电话号码!',
              },
              {
                len: 11
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="管理课程"
          >
            {
              this.state.managementCourse.map(item => {
                return (
                  <div
                    key={item.id}
                    style={{ margin: '15px 0' }}
                  >
                    <Button
                      type="primary"
                      style={{ minWidth: '12rem' }}
                    >
                      {item.name}
                    </Button>
                    <Select
                      disabled
                      mode="multiple"
                      style={{ float: 'right', width: '85%' }}
                      defaultValue={item.class.map(itemClass => {
                        return itemClass.name
                      })}
                    >
                      {
                        this.state.allClass.map(itemClass => {
                          return (
                            <Option key={itemClass.id} >{itemClass.name}</Option>
                          )
                        })
                      }
                    </Select>
                  </div>
                )
              })
            }
          </Form.Item>
          <Form.Item
            name="created_at"
            label="创建时间"
          >
            <DatePicker />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              onClick={this.handleSubmit}
            >
              保存修改
            </Button>
            <Button
              style={{ marginLeft: '1.25rem' }}
              onClick={this.backIndex}
            >
              取消修改
            </Button>
          </Form.Item>
        </Form>
      </Card>
    )
  }
}

export default Edit
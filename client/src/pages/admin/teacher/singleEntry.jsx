import React, { Component } from 'react'
import { Form, Button, Input, Card, message } from 'antd'
import { TeacherAPI } from '../../../api'
import './index.scss'

class SingleEntry extends Component {
  constructor(props) {
    super(props)
    this.formRef = React.createRef()
    this.state = {}
  }
  
  // 重置表单
  onReset = () => {
    this.formRef.current.resetFields();
  }

  // 添加教师
  handleSubmit = () => {
    this.formRef.current.validateFields()
      .then(values => {
        console.log(values);
        TeacherAPI.addTeacher(values)
          .then(res => {
            message.success(res.data.message)
          })
          .finally(() => {
            this.onReset()
          })
      })
  }

  render() {
    return (
      <Card
        style={{ width: '100%' }}
        bordered={true}
      >
        <Form
          name="register"
          scrollToFirstError
          ref={this.formRef}
          onSubmit={this.handleSubmit}
        >
          <Form.Item
            name="id"
            label="编号"
            rules={[
              {
                required: true,
                message: '请输入编号!',
              },
            ]}
          >
            <Input />
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
            name="confirm"
            label="确认密码"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: '请再次输入密码!',
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject('两次输入的密码不符合!');
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="phone"
            label="电话"
            rules={[
              {
                required: true,
                message: '请输入电话!',
              },
              {
                len: 11
              }
            ]}
          >
            <Input
              style={{
                width: '100%',
              }}
            />
          </Form.Item>
          <Form.Item >
            <Button 
              type="primary" 
              htmlType="submit"
              onClick={this.handleSubmit}
            >
              录入
            </Button>
            <Button 
              style={{marginLeft: '1.25rem'}}
              onClick={this.onReset}
            >
              重置
            </Button>
          </Form.Item>
        </Form>
      </Card>
    )
  }
}

export default SingleEntry
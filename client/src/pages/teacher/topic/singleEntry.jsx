import React, { Component } from 'react'
import { Form, Button, Input, Card, message, Rate } from 'antd'
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

  // 添加
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
            name="name"
            label="项目名称"
            rules={[
              {
                required: true,
                message: '请输入项目名称!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="difficulty"
            label="项目难度"
            rules={[
              {
                required: true,
                message: '请输入项目难度!',
              },
            ]}
          >
            <Rate />
          </Form.Item>
          
          <Form.Item
            name="description"
            label="项目描述"
          >
            <Input.TextArea />
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
import React, { Component } from 'react'
import { Form, Button, Input, InputNumber, Divider } from 'antd'
import { StudentEvaluateAPI } from '../../../api'
const { TextArea } = Input;

export default class Evaluate extends Component {
  constructor() {
    super()
    this.formRef = React.createRef()
    this.state = {
      userId: null,

    }
  }

  componentDidMount() {
    const userId = JSON.parse(sessionStorage.getItem('userInfo')).id || JSON.parse(localStorage.getItem('userInfo').id)
    this.setData({
      userId
    })
    this.getEvaluateData()
  }

  getEvaluateData = () => {
    const params = {
      userId: this.state.userId
    }
    StudentEvaluateAPI.getEvaluateData(params)
      .then(res => {
        if (res.data.evaluate) {
          this.formRef.current.setFieldsValue(res.data.evaluate)
        }
      })
  }

  // 重置表单
  onReset = () => {
    this.formRef.current.resetFields();
  }

  handleSubmit = () => {
    this.formRef.current.validateFields()
      .then(values => {
        const params = {
          userId: this.state.userId,
          ...values,
        }
        console.log(params);
      })
  }

  // 如果请求完成之后组件已经销毁，就不再setState
  setData = (state) => {
    if (!this.updater.isMounted(this)) return
    this.setState(state)
  }

  render() {
    return (
      <Form
        name="basic"
        ref={this.formRef}
        onSubmit={this.handleSubmit}
      >
        <Form.Item
          label="完成度"
          name="completion"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <InputNumber
            min={0}
            max={100}
            formatter={value => `${value}%`}
            parser={value => value.replace('%', '')}
          />
        </Form.Item>
        <Divider />

        <Form.Item
          label="自我估分"
          name="assessment"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <InputNumber
            min={0}
            max={100}
          />

        </Form.Item>
        <Divider />

        <Form.Item
          label="自我评价"
          name="evaluate"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <TextArea
            placeholder="自我评价"
            autoSize={{ minRows: 4, maxRows: 10 }}
          />

        </Form.Item>
        <Divider />
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            onClick={this.handleSubmit}
          >
            提交
          </Button>
          <Button
            style={{ marginLeft: '1.25rem' }}
            onClick={this.onReset}
          >
            重置
            </Button>
        </Form.Item>

      </Form>
    )
  }
}

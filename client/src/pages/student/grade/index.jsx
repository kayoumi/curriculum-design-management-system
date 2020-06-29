import React, { Component } from 'react'
import { Card, Form, InputNumber, Input } from 'antd'
import { StudentEvaluateAPI, StudentGradeAPI } from '../../../api'
const { TextArea } = Input

export default class Grade extends Component {

  constructor() {
    super()
    this.evaluateRef = React.createRef()
    this.gradeRef = React.createRef()
    this.state = {
      userId: null,

    }
  }

  componentDidMount() {
    const userId = JSON.parse(sessionStorage.getItem('userInfo')).id || JSON.parse(localStorage.getItem('userInfo').id)
    this.setData({
      userId
    })
    this.getGradeData()
    this.getEvaluateData()
  }

  // 获取学生成绩
  getGradeData = () => {
    const params = {
      userId: this.state.userId
    }
    StudentGradeAPI.getGradeData(params)
      .then(res => {
        this.gradeRef.current.setFieldsValue(res.data.grade)
      })
  }

  // 获取自我评价数据
  getEvaluateData = () => {
    const params = {
      userId: this.state.userId
    }
    StudentEvaluateAPI.getEvaluateData(params)
      .then(res => {
        this.evaluateRef.current.setFieldsValue(res.data.evaluate)
      })
  }

  // 如果请求完成之后组件已经销毁，就不再setState
  setData = (state) => {
    if (!this.updater.isMounted(this)) return
    this.setState(state)
  }

  render() {
    return (
      <div style={{ display: 'flex' }}>
        <Card
          title='学生成绩'
          bordered={false}
          style={{ height: '100%', flex: 1 }}
        >
          <Form
            name="grade"
            ref={this.gradeRef}
          >
            <Form.Item
              label="完成度"
              name="completion"
            >
              <InputNumber
                disabled={true}
                min={0}
                max={100}
                formatter={value => `${value}%`}
                parser={value => value.replace('%', '')}
              />
            </Form.Item>

            <Form.Item
              label="平时成绩"
              name="usualResults"
            >
              <InputNumber
                disabled={true}
                min={0}
                max={100}
              />

            </Form.Item>

            <Form.Item
              label="考核成绩"
              name="examResults"
            >
              <InputNumber
                disabled={true}
                min={0}
                max={100}
              />
            </Form.Item>
            <Form.Item
              label="最终成绩"
              name="finalResults"
            >
              <InputNumber
                disabled={true}
                min={0}
                max={100}
              />
            </Form.Item>
            <Form.Item
              label="老师评语"
              name="comment"
            >
              <TextArea
                disabled={true}
                placeholder="教师评价"
                autoSize={{ minRows: 5, maxRows: 10 }}
              />

            </Form.Item>
          </Form>
        </Card>

        <Card
          title='自我评价'
          bordered={false}
          style={{ height: '100%', flex: 1 }}
        >
          <Form
            name="evaluate"
            ref={this.evaluateRef}
          >
            <Form.Item
              label="完成度"
              name="completion"
            >
              <InputNumber
                disabled={true}
                min={0}
                max={100}
                formatter={value => `${value}%`}
                parser={value => value.replace('%', '')}
              />
            </Form.Item>

            <Form.Item
              label="自我估分"
              name="assessment"
            >
              <InputNumber
                min={0}
                max={100}
                disabled={true}
              />
            </Form.Item>
            <Form.Item
              label="自我评价"
              name="evaluate"
            >
              <TextArea
                disabled={true}
                placeholder="自我评价"
                autoSize={{ minRows: 4, maxRows: 10 }}
              />

            </Form.Item>
          </Form>
        </Card>
      </div>
    )
  }
}

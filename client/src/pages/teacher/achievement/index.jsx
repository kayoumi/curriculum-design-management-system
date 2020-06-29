import React, { Component, createRef } from 'react'
import { Layout, Tree, Table, Form, InputNumber, Input, Card, Button } from 'antd'
import { TeacherGradeAPI } from '../../../api'
import { DownOutlined, DesktopOutlined, DownloadOutlined } from '@ant-design/icons'
import echarts from 'echarts'
import './index.scss'

const { TextArea } = Input
const { Content, Sider } = Layout

export default class Achievement extends Component {

  constructor() {
    super()
    this.state = {
      treeData: [],
      fileList: [],
      selectedKeys: '',
      evaluate: null,

    }

    this.articleAmount = createRef()
    this.gradeRef = createRef()
    this.evaluateRef = createRef()

    this.columns = [
      {
        title: '文件类型',
        dataIndex: 'fileType',
        key: 'fileType',
      },
      {
        title: '文件名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '上传时间',
        dataIndex: 'uploadDate',
        key: 'uploadDate',
      },
      {
        title: '文件大小',
        dataIndex: 'size',
        key: 'size',
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        render: (record) => (
          <span>
            <Button size='small' type='link'><DesktopOutlined />预览</Button>
            <Button size='small' type='link'><DownloadOutlined />下载</Button>
          </span>
        ),
      },
    ];
  }

  componentDidMount() {
    this.getGroupListTree()
    this.initArticleChart()
  }

  // 获取小组树数据
  getGroupListTree = () => {
    TeacherGradeAPI.getGradeListTree()
      .then(res => {
        const treeData = this.setTreeNodes(res.data.class)
        this.setData({
          showClassId: res.data.class[0],
          treeData: treeData,
          // columns,
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

  onSelect = (selectedKeys, info) => {
    if (!info.node.children) {
      this.setState({
        selectedKeys
      }, () => {
        this.getAchievementData()
      })
    }
  };

  // 获取学生数据
  getAchievementData = () => {
    const params = {
      id: this.state.selectedKeys
    }
    TeacherGradeAPI.getAchievementByStudentId(params)
      .then(res => {
        console.log(res);
        const { achievement, evaluate } = res.data
        this.setState({
          fileList: achievement,
        })
        this.evaluateRef.current.setFieldsValue(evaluate)
      })
  }

  setData = (state) => {
    if (!this.updater.isMounted(this)) return
    this.setState(state)
  }

  initArticleChart = () => {
    this.articleChart = echarts.init(this.articleAmount.current)

    const option = {
      title: {
        text: '考勤情况',
        textStyle: {
          fontStyle: 'normal',
          fontSize: '16'
        }
      },
      xAxis: {
        type: 'category',
        data: ['03-01', '03-08', '03-15', '03-22', '03-29', '04-05', '04-12', '04-19', '04-26', '05-03', '05-10', '05-17']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1],
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(220, 220, 220, 0.8)'
        }
      }]
    };
    this.articleChart.setOption(option);
  }

  render() {
    return (
      <Layout style={{ height: '100%' }}>
        <Sider
          style={{ height: '100%', background: '#fff', marginRight: '5px' }}
        >
          <Tree
            style={{ height: '100%' }}
            onSelect={this.onSelect}
            treeData={this.state.treeData}
            showLine={true}
            switcherIcon={<DownOutlined />}
          />
        </Sider>
        <Layout style={{ height: '100%' }}>
          <Layout style={{ height: '100%' }}>
            <Content
              style={{ background: '#fff', height: '100%' }}
            >
              <Table
                dataSource={this.state.fileList}
                columns={this.columns}
                rowKey={record => record.id}
                pagination={false}
                size='small'
              />
            </Content>
            <Content
              style={{ background: '#fff', margin: '5px 0', height: '100%' }}
            >
              <Card
                title='学生自评'
                bordered={false}
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
                    />
                  </Form.Item>
                  <Form.Item
                    label="自我评价"
                    name="evaluate"
                  >
                    <TextArea
                      placeholder="自我评价"
                      autoSize={{ maxRows: 2 }}
                    />
                  </Form.Item>
                </Form>
              </Card>
            </Content>
            <Content
              style={{ background: '#fff', height: '100%' }}
            >

              <div
                ref={this.articleAmount}
                style={{ height: '15rem', width: '80%', float: 'left' }}
              />
            </Content>
          </Layout>
          <Sider
            className='grade-model'
            style={{ background: '#fff', marginLeft: '5px' }}
          >
            <Card
              title='学生成绩评定'
              bordered={false}
              style={{ height: '100%' }}
            >
              <Form
                name="grade"
                ref={this.gradeRef}
                style={{ width: '100%' }}
              >
                <Form.Item
                  label="项目完成度"
                  name="completion"
                >
                  <InputNumber
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
                    min={0}
                    max={100}
                  />

                </Form.Item>

                <Form.Item
                  label="考核成绩"
                  name="examResults"
                >
                  <InputNumber
                    min={0}
                    max={100}
                  />
                </Form.Item>
                <Form.Item
                  label="最终成绩"
                  name="finalResults"
                >
                  <InputNumber
                    min={0}
                    max={100}
                  />
                </Form.Item>
                <Form.Item
                  label="老师评语"
                  name="comment"
                >
                  <TextArea
                    placeholder="教师评价"
                    autoSize
                  />
                </Form.Item>
                <Form.Item>
                  <Button type='primary'>提交</Button>
                </Form.Item>
              </Form>
            </Card>
          </Sider>
        </Layout>
      </Layout>
    )
  }
}

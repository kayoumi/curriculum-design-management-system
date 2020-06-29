import React, { Component, createRef } from 'react'
import { Layout, Input, Tree, Button, Table, Tag } from 'antd'
import { TeacherGradeAPI } from '../../../api'
import echarts from 'echarts'
import { DownOutlined } from '@ant-design/icons'

const { Search } = Input
const { Sider, Content, Header } = Layout

export default class Grade extends Component {
  constructor() {
    super()
    this.avgClassGrade = createRef()
    this.passClassGrade = createRef()
    this.state = {
      showClassId: '',
      treeData: [],
      studentList: [],
    }

    this.columns = [
      {
        title: '学号',
        dataIndex: 'id',
        key: 'id',
        sorter: {
          compare: (a, b) => a.id - b.id,
          multiple: 3,
        },
      },
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        sorter: {
          compare: (a, b) => a.name.length - b.name.length,
          multiple: 3,
        },
      },
      {
        title: '课题',
        dataIndex: 'topic',
        key: 'topic',
      },
      {
        title: '成绩',
        key: 'grade',
        dataIndex: 'grade',
        sorter: {
          compare: (a, b) => a.grade - b.grade,
          multiple: 3,
        },
        render: grade => (
          <>
            {
              grade < 60
                ? <Tag color='volcano'>{grade}</Tag>
                : grade < 90
                  ? <Tag color='blue'>{grade}</Tag>
                  : <Tag color='green'>{grade}</Tag>
            }
          </>
        )
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <Button type="link" size='small'>详情</Button>
        ),
      },
    ];
  }

  componentDidMount() {
    this.getClassList()
    this.initAvgClassGradeChart()
    this.initPassClassGradeChart()

  }

  // 获取小组树数据
  getClassList = () => {
    TeacherGradeAPI.getClassList()
      .then(res => {
        const treeData = this.setTreeNodes(res.data.class)
        console.log(treeData);

        this.setData({
          treeData,

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

  // 初始化班级平均成绩图表
  initAvgClassGradeChart = () => {
    this.avgClassGradeChart = echarts.init(this.avgClassGrade.current)
    const option = {
      title: {
        text: '各班班级平均分',
        left: 'center',
        textStyle: {
          color: '#000'
        }

      },
      xAxis: {
        type: 'category',
        data: ['2017级软件工程一班', '2017级软件工程一班', '2017级软件工程一班', '2017级软件工程一班']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [80, 90, 85, 95],
        type: 'bar',
        barWidth: '50%'
      }],
      grid: {
        x: 30,
        y: 50,
        x2: 0,
        y2: 30
      },
    };

    this.avgClassGradeChart.setOption(option);
  }

  // 初始化班级及格图表
  initPassClassGradeChart = () => {
    this.passClassGradeChart = echarts.init(this.passClassGrade.current)
    const option = {
      title: {
        text: '班级成绩图表',
        left: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: [
            { value: 20, name: '优秀' },
            { value: 160, name: '及格' },
            { value: 10, name: '不及格' }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ],
      grid: {
        x: 30,
        y: 50,
        x2: 0,
        y2: 30
      },
    };

    this.passClassGradeChart.setOption(option);
  }

  // 选择班级
  onSelect = (selectedKeys, info) => {
    this.getStudentListByClassId(selectedKeys);
  };

  // 通过班级id获取学生列表
  getStudentListByClassId = (classId) => {
    const params = {
      id: classId
    }

    TeacherGradeAPI.getStudentListByClassId(params)
      .then(res => {
        console.log(res);
        this.setData({
          studentList: res.data.student
        })
      })
  }



  setData = (state) => {
    if (!this.updater.isMounted(this)) return
    this.setState(state)
  }

  onSearchStudent = (value) => {
    console.log(value);
  }


  render() {
    return (
      <Layout style={{ height: '100%' }}>
        <Sider
          style={{ background: '#fff', width: '100%' }}
        >
          <Tree
            style={{ height: '100%' }}
            onSelect={this.onSelect}
            treeData={this.state.treeData}
            showLine={true}
            switcherIcon={<DownOutlined />}
          />
        </Sider>
        <Layout style={{ height: '100%', marginLeft: '5px' }}>
          <Header
            style={{ background: '#fff' }}
          >
            <Search
              placeholder="搜素学生"
              onSearch={value => this.onSearchStudent(value)}
              style={{ width: 400, margin: '16px 20px 0 0', float: 'right' }}
              allowClear
            />
          </Header>
          <Content style={{ display: 'flex', flexDirection: 'column', alignContent: 'center' }}>
            <Content style={{ background: '#fff', flex: 1, margin: '5px 0', display: 'flex' }}>
              <div ref={this.avgClassGrade} span={12} style={{ width: '40rem', height: '12.5rem', marginRight: '2rem' }} />
              <div ref={this.passClassGrade} span={12} style={{ width: '40rem', height: '12.5rem' }} />
            </Content>
            <Content style={{ background: '#fff', flex: 2 }}>
              <Table
                dataSource={this.state.studentList}
                columns={this.columns}
                size='small'
                rowKey={record => record.id}
                pagination={false}
              />
            </Content>
          </Content>
        </Layout>
      </Layout>
    )
  }
}

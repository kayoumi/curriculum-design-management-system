import React, { Component } from 'react'
import { Layout, Input, Tree } from 'antd'
import { TeacherGradeAPI } from '../../../api'
// import echarts from 'echarts'
import { DownOutlined } from '@ant-design/icons'

const { Search } = Input
const { Sider, Content, Header } = Layout

export default class Attendance extends Component {

  constructor() {
    super()
    this.state = {
      showClassId: '',
      treeData: [],
      studentList: [],
    }
  }

  componentDidMount() {
    this.getClassList()
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

  // 选择班级
  onSelect = (selectedKeys, info) => {
    // this.getStudentListByClassId(selectedKeys);
    console.log(selectedKeys);
  };

  setData = (state) => {
    if (!this.updater.isMounted(this)) return
    this.setState(state)
  }

  onSearchStudent = (value) => {
    console.log(value);
  }

  render() {
    return (
      <Layout style={{height: '100%'}}>
        <Sider
          style={{background: '#fff', width: '100%'}}
        >
          <Tree
            style={{ height: '100%' }}
            onSelect={this.onSelect}
            treeData={this.state.treeData}
            showLine={true}
            switcherIcon={<DownOutlined />}
          />
        </Sider>
        <Layout style={{height: '100%', marginLeft: '5px'}}>
          <Header
            style={{background: '#fff'}}
          >
            <Search
              placeholder="搜素学生"
              onSearch={value => this.onSearchStudent(value)}
              style={{ width: 400, margin: '16px 20px 0 0', float: 'right' }}
              allowClear
            />
          </Header>
          <Content style={{display: 'flex', flexDirection: 'column', alignContent: 'center'}}>
            <Content style={{background: '#fff', flex: 1, margin: '5px 0', display: 'flex'}}>
              <div style={{flex: 1}}>1</div>
              <div style={{flex: 1}}>2</div>
            </Content>
            <Content style={{background: '#fff', flex: 2}}>www</Content>
          </Content>
        </Layout>
      </Layout>
    )
  }
}

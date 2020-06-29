import React, { Component } from 'react'
import { Card, Table } from 'antd'
import { StudentGroupAPI } from '../../../api'

export default class GroupMember extends Component {

  constructor(){
    super()
    this.state = {
      leader: '',
      member: [],
      description: '',
      name: '',
      isLoading: false,

    }
    this.columns = [
      {
        title: '学号',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '班级',
        dataIndex: 'class',
        key: 'class',
      },
      {
        title: '组长',
        dataIndex: 'leader',
        key: 'leader',
      },
    ];
  }

  componentDidMount(){
    this.setData({
      isLoading: true
    })
    this.getMemberList()
  }

  // 获取成员列表
  getMemberList = () => {
    const userId = JSON.parse(sessionStorage.getItem("userInfo")).id || JSON.parse(localStorage.getItem("userInfo").id)
    StudentGroupAPI.getGroupMember({userId})
      .then(res => {
        const { leader, name, description, member } = res.data.group
        member.map((item, index) => {
          item.leader = leader
          item.key = index
          return item
        })
        this.setData({
          leader: leader,
          member: member,
          description: description,
          name: name,
        })
      })
      .catch(res => {
        console.log(res.errMsg)
      })
      .finally(() => {
        this.setData({
          isLoading: false
        })
      })
  }

  // 如果请求完成之后组件已经销毁，就不再setState
  setData = (state) => {
    if (!this.updater.isMounted(this)) return
    this.setState(state)
  }

  render() {
    return (
      <Card
        loading={this.state.isLoading}
        style={{ height: '90%' }}
        title={this.state.name + '成员'}
        extra={
          <p>{this.state.description}</p>
        }
      >
        <Table 
          dataSource={this.state.member} 
          columns={this.columns}
          pagination={false}
        ></Table>
      </Card>
    )
  }
}

import React, { Component } from 'react'
import { Card, Button, message } from 'antd';
import { StudentGroupAPI } from '../../../api'

import './index.scss'

import Member from './member'

const { Meta } = Card;
export default class Group extends Component {

  constructor(props) {
    super(props)
    this.state = {
      groupList: [],
      isJoinGroupLoading: false,
      isLoading: false,
    }
  }

  componentDidMount() {
    this.setData({
      isLoading: true
    })
    this.getGroupList()
  }

  // 获取小组列表
  getGroupList = () => {
    StudentGroupAPI.getGroupList()
      .then(res => {
        this.setData({
          groupList: res.data.group
        })
      })
      .finally(() => {
        this.setData({
          isLoading: false
        })
      })
  }

  // 加入小组
  JoinGroup = (group) => {
    this.setData({
      isJoinGroupLoading: true
    })
    const userId = JSON.parse(sessionStorage.getItem('userInfo')).id || JSON.parse(localStorage.getItem('userInfo')).id
    const params = {
      groupId: group.id,
      userId: userId
    }
    StudentGroupAPI.joinGroup(params)
      .then(res => {
        message.success(res.data.message + group.name)
      })
      .catch(res => {
        message.error(res.errMsg)
      })
      .finally(() => {
        this.setData({
          isJoinGroupLoading: false
        })
        this.props.history.push({
          pathname: `/back/student/member`,
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
        title="小组列表"
        style={{ height: '90%' }}
        bordered={false}
        loading={this.state.isLoading}
      >
        <div className='group-container'>
        {
          this.state.groupList.map(item => {
            return (
              <Card
                key={item.id}
                className='group-item'
                cover={
                  <Member member={item.member}/>
                }
              >
                <Meta
                  title={item.name}
                  description={item.description}
                />
                <div className="group-model">
                  <Button
                    type="primary"
                    loading={this.state.isJoinGroupLoading}
                    onClick={() => this.JoinGroup(item)}
                  >
                    加入小组
                  </Button>
                </div>
              </Card>
            )
          })
        }
        </div>
      </Card>
    )
  }
}

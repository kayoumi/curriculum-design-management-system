import React, { Component } from 'react'
import { Table, Card, Button, Input, message } from 'antd'
import { StudentTopicAPI } from '../../../api'

const { Search } = Input

export default class Topic extends Component {

  constructor() {
    super()
    this.state = {
      dataSource: [],
      isLoading: false,
      isSubmitLoading: false,
      selectedRowKeys: [],

    }
    this.columns = [
      {
        title: '项目名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '难度',
        dataIndex: 'difficulty',
        key: 'difficulty',
      },
      {
        title: '描述',
        dataIndex: 'description',
        key: 'description',
      },
    ];
  }

  componentDidMount() {
    this.getTopicList()
  }

  // 获取课题数据
  getTopicList = () => {
    this.setData({
      isLoading: true
    })
    StudentTopicAPI.getTopicList()
      .then(res => {
        const dataSource = res.data.topic
        dataSource.map(item => {
          item.key = item.id
          return item
        })
        this.setData({
          dataSource
        })
      })
      .finally(() => {
        this.setData({
          isLoading: false
        })
      })
  }

  onSelectChange = selectedRowKeys => {
    this.setData({ selectedRowKeys });
  };

  // 搜索课题
  onSearchTopic = (value) => {
    this.setData({
      isLoading: true
    })
    const params = {
      name: value
    }
    StudentTopicAPI.searchTopic(params)
      .then(res => {
        console.log(res);
        
        const dataSource = res.data.topic
        dataSource.map(item => {
          item.key = item.id
          return item
        })
        this.setData({
          dataSource
        })
      })
      .finally(() => {
        this.setData({
          isLoading: false
        })
      })
  }

  // 选择课题
  handleSubmit = () => {
    this.setData({
      isSubmitLoading: true
    })
    const params = {
      id: this.state.selectedRowKeys
    }
    StudentTopicAPI.choiceTopic(params)
      .then(res => {
        message.success(res.data.message)
      })
      .finally(() => {
        this.setData({
          isSubmitLoading: false
        })
        this.getTopicList()
      })
  }

  // 如果请求完成之后组件已经销毁，就不再setState
  setData = (state) => {
    if (!this.updater.isMounted(this)) return
    this.setState(state)
  }

  render() {
    const { selectedRowKeys } = this.state
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    return (
      <Card
        title='选择课题'
        bordered={false}
        style={{ height: '100%' }}
        extra={(
          <span>
            <Search
              placeholder="搜素课题"
              onSearch={value => this.onSearchTopic(value)}
              style={{ width: 400, marginRight: '3.125rem' }}
              allowClear
            />
            <Button 
              type='primary' 
              htmlType="submit"
              onClick={this.handleSubmit}
              loading={this.state.isSubmitLoading}
            >提交</Button>
          </span>
        )}
      >
        <Table
          rowSelection={{
            type: 'radio',
            ...rowSelection,
          }}
          loading={this.state.isLoading}
          rowKey={record => record.id}
          dataSource={this.state.dataSource}
          columns={this.columns}
        />
      </Card>
    )
  }
}

import React, { Component } from 'react'
import { Drawer, Card } from 'antd';

import SingleEntry from './singleEntry'
import BatchEntry from './batchEntry'

const tabList = [
  {
    key: 'tab1',
    tab: '单个录入',
  },
  {
    key: 'tab2',
    tab: '批量录入',
  },
];
const contentList = {
  tab1: <SingleEntry />,
  tab2: <BatchEntry />,
};

export default class AddForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      key: 'tab1',
      noTitleKey: 'app',
    }
  }

  onTabChange = (key, type) => {
    this.setState({ [type]: key });
  };

  render() {
    return (
      <Drawer
        width={720}
        visible={this.props.visible}
        onClose={this.props.onClose}
        bodyStyle={{ padding: '0 0.625rem'}}
      >
        <Card
          style={{ width: '100%' }}
          title="添加教师"
          tabList={tabList}
          activeTabKey={this.state.key}
          onTabChange={key => {
            this.onTabChange(key, 'key');
          }}
          bordered={false}
        >
          {contentList[this.state.key]}
        </Card>
      </Drawer>
    );
  }
}

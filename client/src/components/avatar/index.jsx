import React, { Component } from 'react'
import { Avatar, Menu, Dropdown, Badge } from 'antd';
import { connect } from 'react-redux'
import { logout } from '../../actions/user'
import { getNotificationList } from '../../actions/notifications'
import { withRouter } from 'react-router-dom'
import { DownOutlined } from '@ant-design/icons';

import './index.scss'

const mapState = state => {
  return {
    notificationsCount: state.notifications.list.filter(item => item.hasRead === false).length,
    notifications: 2,
    avatar: state.user.avatar,
    displayName: state.user.displayName
  }
}

class Index extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.props.getNotificationList()
  }

  onDropdownMenuClick = ({ key }) => {
    if (key === '/logout') {
      this.props.logout()
    } else {
      this.props.history.push(key)
    }
  }

  renderDropDown = () => (
    <Menu
      onClick={this.onDropdownMenuClick}
    >
      <Menu.Item
        key="/back/notifications"
      >
        <Badge dot={Boolean(this.props.notificationsCount)}>
          通知中心
        </Badge>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item
        key="/back/profile"
      >
        个人设置
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item
        key="/back/logout"
      >
        退出登录
      </Menu.Item>
    </Menu>
  );
  render() {

    return (
      <span>
        <Avatar
          size="large"
          src={this.props.avatar}
        />
        <span className="userInfo-username">欢迎您!{this.props.displayName}</span>
        <Dropdown overlay={this.renderDropDown}>
          <DownOutlined
            style={{ color: '#fff', marginLeft: '4px'}}
          />
        </Dropdown>
      </span>
    )
  }
}

export default withRouter(connect(mapState, { getNotificationList, logout })(Index))
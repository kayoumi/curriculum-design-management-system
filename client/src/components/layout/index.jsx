import React, { Component } from 'react'
import './index.scss'
import Logo from './images/logo.png'
import Avatar from '../avatar/index'
import { withRouter } from 'react-router-dom'

import {
  Layout,
  Menu,
  Breadcrumb
} from 'antd';

import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  AppstoreOutlined,
  PieChartOutlined,
  MailOutlined,
} from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout

class Index extends Component {
  constructor() {
    super()
    this.state = {
      collapsed: false,
    }
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  onMenuClick = ({ key }) => {
    this.props.history.push(key)
  }

  render() {
    const defaultSelectedKeysArr = this.props.location.pathname.split('/')
    defaultSelectedKeysArr.length = 3
    return (
      <Layout
        className="site-layout" 
        style={{ height: '100vh' }}
      >
        <Header className="site-layout-background">
          <span className='logo'>
            <img src={Logo} alt="logo" />
          </span>
          <span className="collapse-logo">
            {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: this.toggle,
            })}
          </span>
          <span className="userInfo-avatar">
            <Avatar />
          </span>
        </Header>
        <Layout>
          <Sider trigger={null} collapsed={this.state.collapsed} style={{ backgroundColor: 'rgb(32, 37, 42)' }}>
            <Menu
              defaultSelectedKeys={[defaultSelectedKeysArr.join('/')]}
              // defaultOpenKeys={['sub1']}
              onClick={this.onMenuClick}
              mode="inline"
              theme='dark'
              className='nav-Menu'
            >
              <Menu.Item key="/admin/course">
                <PieChartOutlined />
                <span>课程管理</span>
              </Menu.Item>
              <Menu.Item key="/admin/teacher">
                <MailOutlined />
                <span>教师管理</span>
              </Menu.Item>
              <Menu.Item key="/admin/student">
                <AppstoreOutlined />
                <span>学生管理</span>
              </Menu.Item>
            </Menu>
          </Sider>
          <Content style={{ height: '100%', margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>admin</Breadcrumb.Item>
              <Breadcrumb.Item>admin</Breadcrumb.Item>
            </Breadcrumb>
            <div className="content-background">
              {this.props.children}
            </div>
            <Footer style={{ textAlign: 'center' }}>CURRICULUM DESIGN MANAGEMENT SYSTEM ©2020 Created by Wu Tao</Footer>
          </Content>
        </Layout>
      </Layout >
    )
  }
}

export default withRouter(Index)
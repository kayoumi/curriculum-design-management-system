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
const { SubMenu } = Menu;
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
              defaultOpenKeys={['/back/admin/course']}
              onClick={this.onMenuClick}
              mode="inline"
              theme='dark'
              className='nav-Menu'
            >
              <SubMenu
                key="/back/admin/course"
                title={
                  <span>
                    <MailOutlined />
                    <span>管理员功能</span>
                  </span>
                }
              >
                <Menu.Item key="/back/admin/course">
                  <PieChartOutlined />
                  <span>课程管理</span>
                </Menu.Item>
                <Menu.Item key="/back/admin/teacher">
                  <MailOutlined />
                  <span>教师管理</span>
                </Menu.Item>
                <Menu.Item key="/back/admin/student">
                  <AppstoreOutlined />
                  <span>学生管理</span>
                </Menu.Item>
              </SubMenu>
              <SubMenu
                key="/back/teacher/group"
                title={
                  <span>
                    <MailOutlined />
                    <span>教师功能</span>
                  </span>
                }
              >
                <Menu.Item key="/back/teacher/group">
                  <AppstoreOutlined />
                  <span>小组管理</span>
                </Menu.Item>
                <Menu.Item key="/back/teacher/topic">
                  <AppstoreOutlined />
                  <span>课题管理</span>
                </Menu.Item>
                <Menu.Item key="/back/teacher/attendance">
                  <AppstoreOutlined />
                  <span>考勤管理</span>
                </Menu.Item>
                <Menu.Item key="/back/teacher/grade">
                  <AppstoreOutlined />
                  <span>成绩管理</span>
                </Menu.Item>
                <Menu.Item key="/back/teacher/achievement">
                  <AppstoreOutlined />
                  <span>成果管理</span>
                </Menu.Item>
              </SubMenu>
              <SubMenu
                key="/back/student/student"
                title={
                  <span>
                    <MailOutlined />
                    <span>学生功能</span>
                  </span>
                }
              >
                <Menu.Item key="/back/student/group">
                  <MailOutlined />
                  <span>选择小组</span>
                </Menu.Item>
                <Menu.Item key="/back/student/topic">
                  <MailOutlined />
                  <span>选择课题</span>
                </Menu.Item>
                <Menu.Item key="/back/student/achievement">
                  <AppstoreOutlined />
                  <span>成果管理</span>
                </Menu.Item>
                <Menu.Item key="/back/student/evaluate">
                  <AppstoreOutlined />
                  <span>自我评价</span>
                </Menu.Item>
                <Menu.Item key="/back/student/grade">
                  <AppstoreOutlined />
                  <span>学生成绩</span>
                </Menu.Item>
              </SubMenu>
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
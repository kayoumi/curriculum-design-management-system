import React, { Component } from 'react'
import { Checkbox, Input, Form, Button } from 'antd';
import './index.scss'
import { Redirect } from 'react-router-dom'
import { login } from '../../actions/user'
import { connect } from 'react-redux'

const mapState = state => ({
  isLogin: state.user.isLogin,
  isLoading: state.user.isLoading
})

class Index extends Component {
  constructor(props) {
    super(props)
    this.formRef = React.createRef();
    this.state = {
      confirmMessage: '',
      confirmResult: ''
    }
  }

  componentDidMount() {
    this.handleCreate()
  }
  
  handleSubmit = () => {
    this.formRef.current.validateFields()
      .then(values => {
        this.props.login(values)
      })
  }

  // 生成验证信息
  handleCreate = () => {
    let a = Math.floor(Math.random() * 100)
    let b = Math.floor(Math.random() * 100)
    let result = a + b
    this.setState({
      confirmMessage: `${a} + ${b} = ?`,
      confirmResult: parseInt(result)
    })
  }

  // 确认验证消息
  handleConfirm = (rules, value) => {
    if (!value || parseInt(value) === this.state.confirmResult) {
      return Promise.resolve();
    } else {
      return Promise.reject('验证信息不正确');
    }
  }

  
  render() {
    return (
      this.props.isLogin
      ?
        <Redirect to='/admin'/>
      :
        <div className="container">
          <Form
            ref={this.formRef}
            className="login-form"
            initialValues={{
              remember: true,
            }}
          >
            <h2>登录</h2>
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: '请输入用户名'
                }
              ]}
            >
              <Input
                disabled={this.props.isLoading}
                type='text'
                placeholder="用户名"
                // onChange={this.handleUser}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: '请输入密码'
                }
              ]}
            >
              <Input
                disabled={this.props.isLoading}
                type="password"
                placeholder="密码"
                // onChange={this.handleUser}
              />
            </Form.Item>
            <Form.Item
              name="code"
              rules={[
                {
                  required: true,
                  message: '请输入验证码'
                },
                {
                  validator: this.handleConfirm
                }
              ]}
            >
              <Input
                disabled={this.props.isLoading}
                type="text"
                placeholder={this.state.confirmMessage}
                style={{ width: '60%', float: 'left' }}
              />
            </Form.Item>
            <Form.Item className="pwd-setting">
              <Form.Item name="remember" valuePropName="checked" noStyle >
                <Checkbox
                  style={{ float: 'left' }}
                  disabled={this.props.isLoading}
                >
                  记住密码
                </Checkbox>
              </Form.Item>
              <a className="login-form-forgot" href="https://www.baidu.com">
                忘记密码 >>
              </a>
            </Form.Item>
            <Button
              htmlType='submit'
              type="primary"
              loading={this.props.isLoading}
              onClick={this.handleSubmit}
            >
              立即登录
            </Button>

            <div style={{ marginTop: '1.75rem' }}>
              <a href="https://www.baidu.com">还没有账户？去注册一个 >> </a>
            </div>
          </Form>
        </div>
    )
  }
}

export default connect(mapState, {login})(Index)

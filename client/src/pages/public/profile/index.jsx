import React, { Component } from 'react'
import { Card, Form, Input, Button, Upload } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { UserAPI } from '../../../api'
import beforeUpload from '../../../util/beforeUpload'
import getBase64 from '../../../util/getBase64'

class Profile extends Component {

  constructor(props) {
    super(props)
    this.formRef = React.createRef()
    this.state = {
      loading: false,
      imageUrl: '',
    }
  }

  componentDidMount() {
    const userInfo = JSON.parse(sessionStorage.getItem('userInfo')) || JSON.parse(localStorage.getItem('userInfo'))
    this.getUserData(userInfo)
  }

  getUserData = (userInfo) => {
    if (userInfo.role === '001') {
      UserAPI.getUserInfo({ ...userInfo })
        .then(res => {
          this.formRef.current.setFieldsValue(res.data.user)
        })
    } else if (userInfo.role === '002') {
      UserAPI.getUserInfo({ ...userInfo })
        .then(res => {
          this.formRef.current.setFieldsValue(res.data.user)
        })
    } else if (userInfo.role === '003') {
      UserAPI.getUserInfo({ ...userInfo })
        .then(res => {
          this.formRef.current.setFieldsValue(res.data.user)
        })
    }
  }

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        }),
      );
    }
  };

  render() {
    const uploadButton = (
      <div>
        {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    return (
      <Card
        title="个人信息编辑"
        extra={<Button>取消</Button>}
        bordered={false}
      >
        <Form
          name="profile"
          scrollToFirstError
          ref={this.formRef}
        >
          <Form.Item
            name="id"
            label="ID"
          >
            <Input
              disabled
            />
          </Form.Item>
          <Form.Item
            name="role"
            label="role"
          >
            <Input
              disabled
            />
          </Form.Item>
          <Form.Item
            name="name"
            label="name"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            hasFeedback
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={['password']}
            hasFeedback
            rules={[
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject('两次密码不一致！');
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name='avatar'
            label='头像'
          >
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              beforeUpload={beforeUpload}
              onChange={this.handleChange}
            >
              {this.state.imageUrl ? <img src={this.state.imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              onClick={this.handleSubmit}
            >
              保存修改
            </Button>
          </Form.Item>
        </Form>
      </Card>
    )
  }
}
export default Profile
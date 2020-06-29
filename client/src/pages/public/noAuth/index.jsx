import React, { Component } from 'react'
import { SmileOutlined, RollbackOutlined } from '@ant-design/icons'
import { Button } from 'antd'

export default class NoAuth extends Component {

  goBack = () => {
    this.props.history.goBack()
  }

  render() {
    return (
      <div
        style={{width: '100%', height: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap'}}
      >
        <div style={{height: '18.75rem', width: '200px', textAlign: 'center'}}>
          <SmileOutlined 
            style={{fontSize: '9.375rem', color: 'yellow'}}
          />
          <div 
            style={{marginTop: '2.5rem', textAlign: 'center'}}
          >
            你没有权限 !!!
          </div>
          <div style={{marginTop: '2.5rem'}}>
            <Button 
              type='primary' 
              style={{width: '100%'}}
              onClick={this.goBack}
            >
              <RollbackOutlined />
              返回上一页
            </Button>
          </div>
        </div>
        
      </div>
    )
  }
}

import React from 'react'
import {
  Spin
} from 'antd'

export default function Loading() {
  return ( 
    <div style = {
      {
        textAlign: 'center',
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }
    } >
    <Spin 
      size="large"
    />
    </div>
  )
}
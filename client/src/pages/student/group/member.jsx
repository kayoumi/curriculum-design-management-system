import React from 'react'

export default function Member(props) {
  
  return (
    <div
      className='group-item-member'
    >
      {
        props.member.map((item, index) => {
          return (
            <span key={index}>{item.name}</span>
          )
        })
      }
    </div>
  )
}
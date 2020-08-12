import React from 'react'
import './logo.less'
import logo from './logo.png'

export default function Logo () {
  return (
    <div className="logo-wrap">
      <img src={logo} alt="logo" className="logo-img"/>
    </div>
  )
}

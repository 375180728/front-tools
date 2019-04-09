import React, { Component } from 'react'


export default class Error404 extends Component {
  render() {
    return (
      <div className='error-404'>
        <div className='image-box'>
          <div className='container'></div>
        </div>
        <div className='text-box'>
          <h1>404</h1>
          <div className="exception-desc">抱歉，你访问的页面不存在</div>
          <button onClick={() => window.location.href = '#/'}>返回首页</button>
        </div>
      </div>
    )
  }
}

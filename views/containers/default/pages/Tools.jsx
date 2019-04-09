import React, { Component } from 'react'
import { DOMAIN } from '../../../constants/config'
import Card from 'antd/lib/card';
import Icon from 'antd/lib/icon';

const toolsList = [
  {title: 'JSON Editor', uri: '#/tools/json-editor', desc:'JSON编译器，格式化JSON，JSON转对象，可视化编辑...', img: DOMAIN + 'tools/json-editor.jpg', height: '1000px'},
  {title: 'Regex 正则表达式', uri: '#/tools/regex', desc:'正则表达式测试，常用正则表达式...', img: DOMAIN + 'tools/regex.jpg', height: '800px'},
  {title: 'base64图像转换', uri: '#/tools/image-base64', desc:'可将图像转换为BASE64格式，也可编译base64至图像...', img: DOMAIN + 'tools/image-base64.jpg', height: '800px'},
  {title: '二维码生成器', uri: '#/tools/qr-code', desc:'文字、链接生成二维码...', img: DOMAIN + 'tools/qr-code.jpg', height: '800px'},
  {title: '字符串编码解码', uri: '#/tools/en-decode', desc:'提供各种类型的字符串编码与解码格式...', img: DOMAIN + 'tools/en-decode.jpg', height: '800px'},
  {title: '时间戳转换', uri: '#/tools/timestamp', desc:'转换各种日期格式，时区转换...', img: DOMAIN + 'tools/timestamp.jpg', height: '1100px'}
]

export class tools extends Component {
  
  constructor(props){
    super(props);
  }

  componentWillReceiveProps(nextProps){

  }

  render() {
    return (
      <div className='tools-containers'>
        <header><a href='#/'>FE Assist - FE Tools</a></header>
        {
          _.find(toolsList, {uri: document.location.hash}) ? 
          <ToolDetail />
          :
          <ToolsList />
        }
      </div>
    )
  }
}

export default tools

class ToolsList extends Component {
  render() {
    return (
      <div className="contents">
        <h2>前端小工具集合</h2>
        <div className="title-line-wrapper page1-line">
          <div className="title-line" />
        </div>
        <div className='card-content'>
          {
            toolsList.map((item, index) =>
              <a href={item.uri} key={index} >
                <Card hoverable style={{ width: 275, minHeight: 300, margin: '20px' }} cover={<img alt={item.title} src={item.img} />}>
                  <Card.Meta
                    title={item.title}
                    description={item.desc}
                  />
                </Card>
              </a>
            )
          }
        </div>
      </div>
    )
  }
}

class ToolDetail extends Component {
  render() {
    const { uri, height } = _.find(toolsList, {uri: document.location.hash});
    return (
      <div className="contents">
        <a href="#/tools/list" style={{ lineHeight: '40px', fontSize: 14}}><Icon type="double-left" />返回列表页</a>
        <iframe src={DOMAIN + uri.substr(2)} style={{border: 0, width: '100%', height: height}}/>
      </div>
    )
  }
}